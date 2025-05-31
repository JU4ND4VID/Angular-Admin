// src/app/products/product-form/product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatSelectModule }     from '@angular/material/select'; // <<< volver a importar
import { MatOptionModule }     from '@angular/material/core';   // <<< y MatOption

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService }         from '../product.service';
import { Product }                from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,     // <<< necesario para <mat-select>
    MatOptionModule,     // <<< necesario para <mat-option>
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

  constructor(
    private fb: FormBuilder,
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Construir el FormGroup con todos los controles y validadores
    this.form = this.fb.group(
      {
        descripcion: ['', [Validators.required, Validators.minLength(3)]],
        costoCompra: [
          '',
          [Validators.required, this.stringIsDecimalOrInteger],
        ],
        estado: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
        existencia: ['', [Validators.required, this.stringIsInteger]],
        categoriaId: ['', [Validators.required, this.stringIsInteger]],
        precioVentaActual: [
          '',
          [Validators.required, this.stringIsDecimalOrInteger],
        ],
        precioVentaAnterior: ['', [this.stringIsDecimalOrInteger]],
        referencia: ['', [Validators.required]],
        stockMaximo: ['', [Validators.required, this.stringIsInteger]],
        tieneIva: [0], // 0 = No, 1 = Sí
        fotoProducto: [''], // Guardará Base64 o URL
      },
      {
        validators: [this.precioAnteriorNoMayorActualValidator],
      }
    );

    // Si hay parámetro “id” en la ruta, pasamos a modo edición
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdit = true;
      const producto = this.svc.getById(+paramId);
      if (producto) {
        this.populateForm(producto);
      }
    }
  }

  /**
   * Rellena el formulario con los valores del producto (formateándolos con comas).
   */
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

  /**
   * Formatea un número DECIMAL (guardado en centavos) a cadena con comas y dos decimales.
   * Ejemplo: 123456 → “1,234.56”
   */
  private formatDecimalForDisplay(value: number | null): string {
    if (value == null) return '';
    const real = value / 1; // Dividimos centavos a unidad monetaria
    return real
      .toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, ',');
  }

  /**
   * Convierte la cadena de un campo DECIMAL (“1,234.56”) a un entero en centavos (123456).
   */
  private parseStringToInteger(value: string): number {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9.]/g, ''); // Quitamos comas y caracteres no numéricos
    const asFloat = parseFloat(cleaned);
    if (isNaN(asFloat)) return 0;
    return Math.round(asFloat);
  }

  /**
   * Formatea un número ENTERO (sin parte decimal) a cadena con comas de miles.
   * Ejemplo: 123456 → “123,456”
   */
  private formatIntegerForDisplay(value: number | null): string {
    if (value == null) return '';
    return value
      .toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/,/g, ',');
  }

  /**
   * Convierte la cadena de un campo ENTERO (“123,456”) a un number 123456.
   */
  private parseStringToPureInteger(value: string): number {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9]/g, ''); // Sólo dígitos
    const asInt = parseInt(cleaned, 10);
    return isNaN(asInt) ? 0 : asInt;
  }

  /**
   * Al perder foco en un campo DECIMAL, lo formateamos con comas y dos decimales.
   */
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

  /**
   * Al hacer foco en un campo DECIMAL, removemos comas para edición.
   */
  onFocusRawDecimal(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    const rawValue: string = ctrl.value || '';
    const withoutCommas = rawValue.replace(/,/g, '');
    ctrl.setValue(withoutCommas, { emitEvent: false });
  }

  /**
   * Al perder foco en un campo ENTERO, lo formateamos con comas de miles.
   */
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
    const formatted = asInt
      .toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/,/g, ',');
    ctrl.setValue(formatted, { emitEvent: false });
  }

  /**
   * Al hacer foco en un campo ENTERO, removemos comas para edición.
   */
  onFocusRawInteger(fieldName: string): void {
    const ctrl = this.form.get(fieldName);
    if (!ctrl) return;
    const rawValue: string = ctrl.value || '';
    const withoutCommas = rawValue.replace(/,/g, '');
    ctrl.setValue(withoutCommas, { emitEvent: false });
  }

  /**
   * Validador de cadenas numéricas DECIMALES: admite dígitos y punto decimal (máx. 2 decimales).
   * No falla si está vacío (ese caso lo maneja Validators.required).
   */
  private stringIsDecimalOrInteger(
    control: AbstractControl
  ): ValidationErrors | null {
    const v: string = control.value || '';
    if (!v) return null;
    const text = v.replace(/,/g, '');
    if (/^\d+(\.\d{0,2})?$/.test(text)) {
      return null;
    }
    return { invalidDecimal: true };
  }

  /**
   * Validador de cadenas ENTERAS: sólo dígitos, sin punto decimal.
   */
  private stringIsInteger(
    control: AbstractControl
  ): ValidationErrors | null {
    const v: string = control.value || '';
    if (!v) return null;
    const text = v.replace(/,/g, '');
    if (/^\d+$/.test(text)) {
      return null;
    }
    return { invalidInteger: true };
  }

  /**
   * Validador global: asegura que precioVentaAnterior ≤ precioVentaActual (en centavos).
   */
  private precioAnteriorNoMayorActualValidator = (
    group: FormGroup
  ): ValidationErrors | null => {
    const actualStr: string = group.get('precioVentaActual')?.value || '';
    const anteriorStr: string = group.get('precioVentaAnterior')?.value || '';
    const actualVal: number = this.parseStringToInteger(actualStr);
    const anteriorVal: number = this.parseStringToInteger(anteriorStr);
    if (anteriorVal && actualVal && anteriorVal > actualVal) {
      return { precioAnteriorMayor: true };
    }
    return null;
  };

  /**
   * Maneja la selección de la imagen y la convierte a Base64.
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.get('fotoProducto')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Método llamado en ngSubmit. Convierte los valores formateados a su representación
   * interna (enteros para centavos y enteros puros), luego crea/actualiza.
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    // Convertir DECIMALES a centavos:
    const costoCompraCentavos = this.parseStringToInteger(raw.costoCompra);
    const precioActualCentavos = this.parseStringToInteger(
      raw.precioVentaActual
    );
    const precioAnteriorCentavos = raw.precioVentaAnterior
      ? this.parseStringToInteger(raw.precioVentaAnterior)
      : 0;

    // Convertir ENTEROS PUROS:
    const existenciaInt = this.parseStringToPureInteger(raw.existencia);
    const stockMaxInt = this.parseStringToPureInteger(raw.stockMaximo);
    const categoriaIdInt = this.parseStringToPureInteger(raw.categoriaId);

    // Generar ID “corto” (1..32767) si es nuevo; si es edición, conservar el id de ruta
    const finalId: number = this.isEdit
      ? +this.route.snapshot.paramMap.get('id')!
      : Math.floor(Math.random() * 32767) + 1;

    const newProduct: Product = {
      id: finalId,
      descripcion: raw.descripcion,
      costoCompra: costoCompraCentavos,
      estado: raw.estado,
      existencia: existenciaInt,
      fotoProducto: raw.fotoProducto || '',
      idCategoria: categoriaIdInt,
      precioVentaActual: precioActualCentavos,
      precioVentaAnterior: precioAnteriorCentavos,
      referencia: raw.referencia,
      stockMaximo: stockMaxInt,
      tieneIva: raw.tieneIva ? 1 : 0,
    };

    if (this.isEdit) {
      this.svc.update(newProduct);
    } else {
      this.svc.create(newProduct);
    }

    this.router.navigate(['/products']);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  // Getters para facilitar el acceso en la plantilla
  get descripcionCtrl()         { return this.form.get('descripcion'); }
  get costoCompraCtrl()         { return this.form.get('costoCompra'); }
  get existenciaCtrl()          { return this.form.get('existencia'); }
  get categoriaIdCtrl()         { return this.form.get('categoriaId'); }
  get precioVentaActualCtrl()   { return this.form.get('precioVentaActual'); }
  get precioVentaAnteriorCtrl() { return this.form.get('precioVentaAnterior'); }
  get referenciaCtrl()          { return this.form.get('referencia'); }
  get stockMaximoCtrl()         { return this.form.get('stockMaximo'); }
}
