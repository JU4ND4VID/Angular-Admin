import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }    from '@angular/material/input';
import { MatButtonModule }   from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { ClienteService } from '../cliente.service';
import { Cliente }        from '../cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private svc: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      correoCliente: ['', [Validators.required, Validators.email]],
      direccionCliente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      estado: [1, [Validators.required, Validators.pattern(/^[01]$/)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      const c = this.svc.getById(id);
      if (c) {
        this.form.patchValue({
          nombreCliente: c.nombreCliente,
          correoCliente: c.correoCliente,
          direccionCliente: c.direccionCliente,
          telefono: c.telefono,
          estado: c.estado
        });
      }
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.value;
    const cliente: Cliente = {
      id: this.isEdit
          ? Number(this.route.snapshot.paramMap.get('id'))
          : Math.floor(Math.random() * 100000),
      nombreCliente: values.nombreCliente,
      correoCliente: values.correoCliente,
      direccionCliente: values.direccionCliente,
      telefono: values.telefono,
      estado: Number(values.estado)
    };

    if (this.isEdit) {
      this.svc.update(cliente);
    } else {
      this.svc.create(cliente);
    }
    this.router.navigate(['/users']);
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  /** Helpers para template */
  get nombre() { return this.form.get('nombreCliente')!; }
  get correo() { return this.form.get('correoCliente')!; }
  get direccion() { return this.form.get('direccionCliente')!; }
  get telefono() { return this.form.get('telefono')!; }
  get estadoCtrl() { return this.form.get('estado')!; }
}
