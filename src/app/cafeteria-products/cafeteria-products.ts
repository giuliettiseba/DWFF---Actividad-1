/**
 * Componente de Productos de Cafetería
 *
 * @description Muestra el catálogo de productos de cafetería
 * Permite filtrar por categoría y agregar productos al carrito
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CafeteriaService } from '../cafeteria/cafeteria.service';
import { OrderService } from '../cafeteria/order.service';
import { CafeteriaProduct } from '../cafeteria/product.model';

@Component({
  selector: 'app-cafeteria-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './cafeteria-products.html',
  styleUrl: './cafeteria-products.css'
})
export class CafeteriaProducts implements OnInit {
  /**
   * Lista de productos a mostrar
   */
  productos: CafeteriaProduct[] = [];

  /**
   * Categoría seleccionada para filtrar
   */
  categoriaSeleccionada: string = 'todos';

  /**
   * Mensaje de feedback al agregar productos
   */
  mensajeAgregado: string | null = null;

  constructor(
    private cafeteriaService: CafeteriaService,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * Carga los productos desde el servicio
   */
  cargarProductos(): void {
    this.cafeteriaService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  /**
   * Filtra productos por categoría
   * @param categoria Categoría a filtrar
   */
  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.cafeteriaService.getProductosByCategoria(categoria).subscribe(productos => {
      this.productos = productos;
    });
  }

  /**
   * Agrega un producto al carrito
   * @param producto Producto a agregar
   */
  agregarAlCarrito(producto: CafeteriaProduct): void {
    this.orderService.addItem(producto, 1);
    this.mostrarMensaje(`✓ ${producto.nombre} agregado al carrito`);
  }

  /**
   * Muestra un mensaje temporal de feedback
   * @param mensaje Mensaje a mostrar
   */
  private mostrarMensaje(mensaje: string): void {
    this.mensajeAgregado = mensaje;
    setTimeout(() => {
      this.mensajeAgregado = null;
    }, 3000);
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

