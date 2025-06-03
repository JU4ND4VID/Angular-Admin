import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionService } from '../../transacciones/transaccion.service';
import { Transaccion } from '../../transacciones/transaccion.model';
import { VentaService } from '../../ventas/venta.service';
import { Venta } from '../../ventas/venta.model';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  transaccion: Partial<Transaccion> = {
    estado: 1,
    fechaHora: '',
    identificacion: '',
    idCompra: 0,
    idMetodoPago: 0,
    idBanco: '',
    idFranquicia: '',
    numTarjeta: '',
    valorTx: 0
  };

  total = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transSvc: TransaccionService,
    private ventaSvc: VentaService
  ) {}

  ngOnInit(): void {
    const total = Number(this.route.snapshot.queryParamMap.get('total'));
    if (total) {
      this.total = total;
      this.transaccion.valorTx = total;
      this.transaccion.fechaHora = new Date().toISOString();
    } else {
      alert('Falta el total. Redirigiendo...');
      this.router.navigate(['/store']);
    }
  }

  pagar(): void {
    if (
      !this.transaccion.identificacion ||
      !this.transaccion.numTarjeta ||
      !this.transaccion.idMetodoPago
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    const venta: Venta = {
      id: 0,
      idCliente: 1, // cliente fijo por ahora
      fechaVenta: new Date().toISOString().slice(0, 10),
      valorVenta: this.total,
      valorIva: 0,
      valorDscto: 0,
      estado: 1
    };

    this.ventaSvc.guardarVenta(venta).subscribe({
      next: (resVenta) => {
        const idVenta = resVenta.id ?? 0;
        if (idVenta > 0) {
          this.transaccion.idCompra = idVenta;
          this.transSvc.guardarTransaccion(this.transaccion as Transaccion).subscribe({
            next: () => {
              alert('Transacción registrada correctamente');
              this.router.navigate(['/store']);
            },
            error: () => {
              alert('Error al registrar transacción');
            }
          });
        } else {
          alert('Error: no se recibió el ID de la venta.');
        }
      },
      error: () => {
        alert('Error al registrar la venta.');
      }
    });
  }
}
