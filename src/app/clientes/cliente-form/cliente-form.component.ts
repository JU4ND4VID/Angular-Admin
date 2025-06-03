import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatOptionModule,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null], // lo incluyes por si estás editando
      nombreCliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      correoCliente: ['', [Validators.required, Validators.email]],
      direccionCliente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      estado: [1, [Validators.required]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.clienteId = +idParam;
      this.svc.obtenerPorId(this.clienteId).subscribe((cliente) => {
        this.form.patchValue(cliente);
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.form.value;

    const op = this.isEdit
      ? this.svc.actualizar(cliente)
      : this.svc.crear(cliente);

    op.subscribe(() => {
      this.router.navigate(['/admin/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/clientes']);
  }

  // Getters para validación en el HTML
  get nombre()    { return this.form.get('nombreCliente'); }
  get correo()    { return this.form.get('correoCliente'); }
  get direccion() { return this.form.get('direccionCliente'); }
  get telefono()  { return this.form.get('telefono'); }
  get estadoCtrl(){ return this.form.get('estado'); }
}
