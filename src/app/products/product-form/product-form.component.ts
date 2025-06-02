import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  productId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        descripcion: ['', [Validators.required, Validators.minLength(3)]],
        costoCompra: ['', [Validators.required, this.stringIsDecimalOrInteger]],
        estado: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
        existencia: ['', [Validators.required, this.stringIsInteger]],
        categoriaId: ['', [Validators.required, this.stringIsInteger]],
        precioVentaActual: ['', [Validators.required, this.stringIsDecimalOrInteger]],
        precioVentaAnterior: ['', [this.stringIsDecimalOrInteger]],
        referencia: ['', [Validators.required]],
        stockMaximo: ['', [Validators.required, this.stringIsInteger]],
        tieneIva: [0],
        fotoProducto: [''],
      },
      {
        validators: [this.precioAnteriorNoMayorActualValidator],
      }
    );

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdit = true;
      this.productId = +paramId;
      this.svc.getById(this.productId).subscribe((producto) => {
        this.populateForm(producto);
      });
    }
  }

  private populateForm(prod: Product): void {
    this.form.patchValue({
      descripcion: prod.descripcion,
      costoCompra: this.formatDecimalForDisplay(prod.costoCompra),
      estado: prod.estado,
      existencia: this.formatIntegerForDisplay(prod.existencia),
      categoriaId: this.formatIntegerForDisplay(prod.idCategoria),
      precioVentaActual: this.formatDecimalForDisplay(prod.precioVentaActual),
      precioVentaAnterior: prod.precioVentaAnterior
        ? this.formatDecimalForDisplay(prod.precioVentaAnterior)
        : '',
      referencia: prod.referencia,
      stockMaximo: this.formatIntegerForDisplay(prod.stockMaximo),
      tieneIva: prod.tieneIva,
      fotoProducto: prod.fotoProducto || '',
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    const costoCompraCentavos = this.parseStringToInteger(raw.costoCompra);
    const precioActualCentavos = this.parseStringToInteger(raw.precioVentaActual);
    const precioAnteriorCentavos = raw.precioVentaAnterior
      ? this.parseStringToInteger(raw.precioVentaAnterior)
      : 0;

    const existenciaInt = this.parseStringToPureInteger(raw.existencia);
    const stockMaxInt = this.parseStringToPureInteger(raw.stockMaximo);
    const categoriaIdInt = this.parseStringToPureInteger(raw.categoriaId);

    const finalId: number = this.isEdit
      ? this.productId!
      : Math.floor(Math.random() * 32767) + 1;

    const newProduct: Product = {
      id: finalId,
      descripcion: raw.descripcion,
      costoCompra: costoCompraCentavos,
      estado: raw.estado,
      existencia: existenciaInt,
      fotoProducto: '', // se establece desde el backend
      idCategoria: categoriaIdInt,
      precioVentaActual: precioActualCentavos,
      precioVentaAnterior: precioAnteriorCentavos,
      referencia: raw.referencia,
      stockMaximo: stockMaxInt,
      tieneIva: raw.tieneIva ? 1 : 0,
    };

    const formData = new FormData();
    formData.append("producto", JSON.stringify(newProduct));
    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }

    this.svc.createRaw(formData).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  private formatDecimalForDisplay(value: number | null): string {
    if (value == null) return '';
    const real = value / 1;
    return real
      .toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, ',');
  }

  private parseStringToInteger(value: string): number {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9.]/g, '');
    const asFloat = parseFloat(cleaned);
    return isNaN(asFloat) ? 0 : Math.round(asFloat);
  }

  private formatIntegerForDisplay(value: number | null): string {
    if (value == null) return '';
    return value
      .toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/,/g, ',');
  }

  private parseStringToPureInteger(value: string): number {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9]/g, '');
    const asInt = parseInt(cleaned, 10);
    return isNaN(asInt) ? 0 : asInt;
  }

  onBlurFormatDecimal(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    const rawValue: string = ctrl.value || '';
    const cleaned = rawValue.replace(/[^0-9.]/g, '');
    const asNumber = parseFloat(cleaned);
    if (isNaN(asNumber)) {
      ctrl.setValue('', { emitEvent: false });
      return;
    }
    const formatted = asNumber
      .toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, ',');
    ctrl.setValue(formatted, { emitEvent: false });
  }

  onFocusRawDecimal(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    const rawValue: string = ctrl.value || '';
    ctrl.setValue(rawValue.replace(/,/g, ''), { emitEvent: false });
  }

  onBlurFormatInteger(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    const rawValue: string = ctrl.value || '';
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const asInt = parseInt(cleaned, 10);
    if (isNaN(asInt)) {
      ctrl.setValue('', { emitEvent: false });
      return;
    }
    ctrl.setValue(
      asInt.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replace(/,/g, ','),
      { emitEvent: false }
    );
  }

  onFocusRawInteger(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    ctrl.setValue((ctrl.value || '').replace(/,/g, ''), { emitEvent: false });
  }

  private stringIsDecimalOrInteger(control: AbstractControl): ValidationErrors | null {
    const v: string = control.value || '';
    if (!v) return null;
    const text = v.replace(/,/g, '');
    return /^\d+(\.\d{0,2})?$/.test(text) ? null : { invalidDecimal: true };
  }

  private stringIsInteger(control: AbstractControl): ValidationErrors | null {
    const v: string = control.value || '';
    if (!v) return null;
    const text = v.replace(/,/g, '');
    return /^\d+$/.test(text) ? null : { invalidInteger: true };
  }

  private precioAnteriorNoMayorActualValidator = (group: FormGroup): ValidationErrors | null => {
    const actualStr = group.get('precioVentaActual')?.value || '';
    const anteriorStr = group.get('precioVentaAnterior')?.value || '';
    const actualVal = this.parseStringToInteger(actualStr);
    const anteriorVal = this.parseStringToInteger(anteriorStr);
    return anteriorVal > actualVal ? { precioAnteriorMayor: true } : null;
  };

  // Getters
  get descripcionCtrl()         { return this.form.get('descripcion'); }
  get costoCompraCtrl()         { return this.form.get('costoCompra'); }
  get existenciaCtrl()          { return this.form.get('existencia'); }
  get categoriaIdCtrl()         { return this.form.get('categoriaId'); }
  get precioVentaActualCtrl()   { return this.form.get('precioVentaActual'); }
  get precioVentaAnteriorCtrl() { return this.form.get('precioVentaAnterior'); }
  get referenciaCtrl()          { return this.form.get('referencia'); }
  get stockMaximoCtrl()         { return this.form.get('stockMaximo'); }
}
