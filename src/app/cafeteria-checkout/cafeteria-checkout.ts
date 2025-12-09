/**
 * Componente de Checkout de Cafetería
 *
 * @description Página de finalización de pedido
 * Permite seleccionar modalidad de entrega y confirmar el pedido
 * Utiliza formularios reactivos para la validación
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../cafeteria/order.service';
import { ModalidadEntrega } from '../cafeteria/order.model';

@Component({
  selector: 'app-cafeteria-checkout',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cafeteria-checkout.html',
  styleUrl: './cafeteria-checkout.css'
})
export class CafeteriaCheckout implements OnInit {
  /**
   * Formulario reactivo del checkout
   */
  checkoutForm!: FormGroup;

  /**
   * Indica si el pedido fue procesado
   */
  pedidoProcesado = false;

  /**
   * Número de pedido generado
   */
  numeroPedido: number | null = null;

  constructor(
    public orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirigir si el carrito está vacío
    if (this.orderService.totalItems() === 0) {
      this.router.navigate(['/cafeteria/productos']);
      return;
    }

    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con validaciones
   */
  private inicializarFormulario(): void {
    this.checkoutForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      modalidad: ['mostrador', Validators.required],
      numeroMesa: ['']
    });

    // Listener para cambios en modalidad
    this.checkoutForm.get('modalidad')?.valueChanges.subscribe(modalidad => {
      const numeroMesaControl = this.checkoutForm.get('numeroMesa');

      if (modalidad === 'mesa') {
        numeroMesaControl?.setValidators([Validators.required, Validators.min(1), Validators.max(50)]);
      } else {
        numeroMesaControl?.clearValidators();
        numeroMesaControl?.setValue('');
      }
      numeroMesaControl?.updateValueAndValidity();
    });
  }

  /**
   * Actualiza la cantidad de un producto
   * @param productoId ID del producto
   * @param cantidad Nueva cantidad
   */
  actualizarCantidad(productoId: number, cantidad: number): void {
    this.orderService.updateQuantity(productoId, cantidad);
  }

  /**
   * Elimina un producto del carrito
   * @param productoId ID del producto
   */
  eliminarProducto(productoId: number): void {
    this.orderService.removeItem(productoId);

    // Si el carrito queda vacío, redirigir
    if (this.orderService.totalItems() === 0) {
      this.router.navigate(['/cafeteria/productos']);
    }
  }

  /**
   * Procesa el pedido
   */
  confirmarPedido(): void {
    if (this.checkoutForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    const formValue = this.checkoutForm.value;

    // Actualizar servicio con los datos del formulario
    this.orderService.setModalidad(formValue.modalidad as ModalidadEntrega);
    if (formValue.modalidad === 'mesa') {
      this.orderService.setNumeroMesa(parseInt(formValue.numeroMesa));
    }

    // Generar el pedido
    const pedido = this.orderService.generarPedido(formValue.nombreCliente);
    this.numeroPedido = pedido.id;

    // Marcar como procesado
    this.pedidoProcesado = true;

    // En una aplicación real, aquí se enviaría el pedido al backend
    console.log('Pedido generado:', pedido);

    // Limpiar el carrito después de 3 segundos
    setTimeout(() => {
      this.orderService.clearCart();
      this.router.navigate(['/cafeteria']);
    }, 5000);
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private marcarCamposComoTocados(): void {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      this.checkoutForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   * @param campo Nombre del campo
   * @returns true si tiene errores y fue tocado
   */
  tienError(campo: string): boolean {
    const control = this.checkoutForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Obtiene el mensaje de error para un campo
   * @param campo Nombre del campo
   * @returns Mensaje de error
   */
  obtenerMensajeError(campo: string): string {
    const control = this.checkoutForm.get(campo);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    if (control?.hasError('min')) {
      return 'Número de mesa inválido';
    }
    if (control?.hasError('max')) {
      return 'Número de mesa inválido (máximo 50)';
    }

    return '';
  }

  /**
   * Formatea el precio con 2 decimales
   * @param precio Precio a formatear
   * @returns Precio formateado
   */
  formatearPrecio(precio: number): string {
    return precio.toFixed(2);
  }
}

