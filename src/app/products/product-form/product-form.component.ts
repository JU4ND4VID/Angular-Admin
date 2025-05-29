// src/app/products/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }    from '@angular/material/input';
import { MatButtonModule }   from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService }    from '../product.service';
import { Product }           from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
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

  ngOnInit() {
    // 1. Construimos el FormGroup con validaciones
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      costoCompra: [0,       [Validators.required, Validators.min(0)]],
      estado:      [1,       [Validators.required, Validators.pattern(/^[01]$/)]],
      existencia:  [0,       [Validators.required, Validators.min(0)]],
      precioVentaActual:   [0, [Validators.required, Validators.min(0)]],
      precioVentaAnterior: [0, [Validators.min(0)]],
      referencia:  ['',      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      stockMaximo: [0,       [Validators.required, Validators.min(0)]],
      tieneIva:    [false],
      fotoProducto:['']
    }, {
      validators: this.priceMatchValidator // validación a nivel de grupo
    });

    // 2. Si es edición, parcheamos valores
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      const p = this.svc.getById(id);
      if (p) {
        // Convertimos número a booleano para checkbox
        this.form.patchValue({
          ...p,
          tieneIva: p.tieneIva === 1
        });
      }
    }
  }

  // Validación personalizada: precio anterior ≤ precio actual
  priceMatchValidator(group: AbstractControl): ValidationErrors | null {
    const prev = group.get('precioVentaAnterior')?.value ?? 0;
    const curr = group.get('precioVentaActual')?.value ?? 0;
    return prev <= curr ? null : { priceMismatch: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.form.get('fotoProducto')!.setValue(reader.result as string);
    reader.readAsDataURL(file);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Product = {
      ...this.form.value,
      tieneIva: this.form.value.tieneIva ? 1 : 0,
      id: this.isEdit 
        ? Number(this.route.snapshot.paramMap.get('id')) 
        : Math.floor(Math.random() * 100000)
    };

    if (this.isEdit) this.svc.update(data);
    else this.svc.create(data);

    this.router.navigate(['/products']);
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
