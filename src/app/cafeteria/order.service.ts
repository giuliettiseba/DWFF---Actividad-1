/**
 * Servicio de Gestión de Pedidos
 *
 * @description Servicio que gestiona el carrito de pedidos de cafetería
 * Utiliza signals para gestión reactiva del estado
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { Injectable, signal, computed } from '@angular/core';
import { CafeteriaProduct } from './product.model';
import { Order, OrderItem, ModalidadEntrega } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  /**
   * Items del carrito (signal reactivo)
   */
  private itemsSignal = signal<OrderItem[]>([]);

  /**
   * Modalidad de entrega seleccionada
   */
  private modalidadSignal = signal<ModalidadEntrega>('mostrador');

  /**
   * Número de mesa (si aplica)
   */
  private numeroMesaSignal = signal<number | undefined>(undefined);

  /**
   * Items del carrito (solo lectura)
   */
  items = this.itemsSignal.asReadonly();

  /**
   * Modalidad de entrega (solo lectura)
   */
  modalidad = this.modalidadSignal.asReadonly();

  /**
   * Número de mesa (solo lectura)
   */
  numeroMesa = this.numeroMesaSignal.asReadonly();

  /**
   * Cantidad total de items en el carrito
   */
  totalItems = computed(() => {
    return this.itemsSignal().reduce((sum, item) => sum + item.cantidad, 0);
  });

  /**
   * Precio total del carrito
   */
  total = computed(() => {
    return this.itemsSignal().reduce(
      (sum, item) => sum + (item.producto.precio * item.cantidad),
      0
    );
  });

  constructor() { }

  /**
   * Agrega un producto al carrito
   * @param producto Producto a agregar
   * @param cantidad Cantidad a agregar (default: 1)
   */
  addItem(producto: CafeteriaProduct, cantidad: number = 1): void {
    const currentItems = this.itemsSignal();
    const existingItem = currentItems.find(item => item.producto.id === producto.id);

    if (existingItem) {
      // Si el producto ya existe, incrementar cantidad
      const updatedItems = currentItems.map(item =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      this.itemsSignal.set(updatedItems);
    } else {
      // Si es nuevo, agregarlo
      this.itemsSignal.set([...currentItems, { producto, cantidad }]);
    }
  }

  /**
   * Elimina un producto del carrito
   * @param productoId ID del producto a eliminar
   */
  removeItem(productoId: number): void {
    const updatedItems = this.itemsSignal().filter(
      item => item.producto.id !== productoId
    );
    this.itemsSignal.set(updatedItems);
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param productoId ID del producto
   * @param cantidad Nueva cantidad
   */
  updateQuantity(productoId: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeItem(productoId);
      return;
    }

    const updatedItems = this.itemsSignal().map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad }
        : item
    );
    this.itemsSignal.set(updatedItems);
  }

  /**
   * Vacía el carrito
   */
  clearCart(): void {
    this.itemsSignal.set([]);
    this.modalidadSignal.set('mostrador');
    this.numeroMesaSignal.set(undefined);
  }

  /**
   * Establece la modalidad de entrega
   * @param modalidad Modalidad seleccionada
   */
  setModalidad(modalidad: ModalidadEntrega): void {
    this.modalidadSignal.set(modalidad);
    if (modalidad === 'mostrador') {
      this.numeroMesaSignal.set(undefined);
    }
  }

  /**
   * Establece el número de mesa
   * @param numero Número de mesa
   */
  setNumeroMesa(numero: number | undefined): void {
    this.numeroMesaSignal.set(numero);
  }

  /**
   * Genera un pedido a partir del carrito actual
   * @param nombreCliente Nombre del cliente (opcional)
   * @returns Pedido generado
   */
  generarPedido(nombreCliente?: string): Order {
    return {
      id: Date.now(), // En producción, esto vendría del backend
      items: [...this.itemsSignal()],
      total: this.total(),
      modalidad: this.modalidadSignal(),
      numeroMesa: this.numeroMesaSignal(),
      nombreCliente,
      fecha: new Date(),
      estado: 'pendiente'
    };
  }
}

