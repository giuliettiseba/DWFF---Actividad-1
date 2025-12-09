/**
 * Modelo de datos para pedidos de cafetería
 *
 * @description Define la estructura de un pedido de cafetería
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { CafeteriaProduct } from './product.model';

/**
 * Modalidad de entrega del pedido
 */
export type ModalidadEntrega = 'mesa' | 'mostrador';

/**
 * Item del pedido con cantidad
 */
export interface OrderItem {
  /**
   * Producto pedido
   */
  producto: CafeteriaProduct;

  /**
   * Cantidad del producto
   */
  cantidad: number;
}

/**
 * Pedido de cafetería
 */
export interface Order {
  /**
   * Identificador único del pedido
   */
  id: number;

  /**
   * Lista de productos con cantidades
   */
  items: OrderItem[];

  /**
   * Total del pedido en euros
   */
  total: number;

  /**
   * Modalidad de entrega (mesa de coworking o mostrador)
   */
  modalidad: ModalidadEntrega;

  /**
   * Número de mesa (solo si modalidad es 'mesa')
   */
  numeroMesa?: number;

  /**
   * Nombre del cliente
   */
  nombreCliente?: string;

  /**
   * Fecha y hora del pedido
   */
  fecha?: Date;

  /**
   * Estado del pedido
   */
  estado?: 'pendiente' | 'preparando' | 'listo' | 'entregado';
}

