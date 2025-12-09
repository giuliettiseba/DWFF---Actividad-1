/**
 * Servicio de Cafetería
 *
 * @description Servicio que gestiona los productos de la cafetería
 * Proporciona métodos para obtener y filtrar productos
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CafeteriaProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {
  /**
   * Lista de productos de cafetería
   * En una aplicación real, esto vendría de una API
   */
  private productos: CafeteriaProduct[] = [
    // Cafés
    {
      id: 1,
      nombre: 'Café Espresso',
      imagen: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
      precio: 1.50,
      categoria: 'cafe',
      descripcion: 'Café espresso intenso y aromático, preparado con granos seleccionados.',
      disponible: true
    },
    {
      id: 2,
      nombre: 'Café Americano',
      imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      precio: 2.00,
      categoria: 'cafe',
      descripcion: 'Café americano suave, perfecto para estudiar.',
      disponible: true
    },
    {
      id: 3,
      nombre: 'Cappuccino',
      imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      precio: 2.50,
      categoria: 'cafe',
      descripcion: 'Cappuccino cremoso con espuma de leche perfecta.',
      disponible: true
    },
    {
      id: 4,
      nombre: 'Café Latte',
      imagen: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400',
      precio: 2.80,
      categoria: 'cafe',
      descripcion: 'Latte suave con leche vaporizada y arte latte.',
      disponible: true
    },
    {
      id: 5,
      nombre: 'Café Mocha',
      imagen: 'https://images.unsplash.com/photo-1578374173705-88fce8e8b4fb?w=400',
      precio: 3.20,
      categoria: 'cafe',
      descripcion: 'Deliciosa mezcla de café, chocolate y leche.',
      disponible: true
    },

    // Bebidas
    {
      id: 6,
      nombre: 'Té Verde',
      imagen: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
      precio: 1.80,
      categoria: 'bebida',
      descripcion: 'Té verde natural, rico en antioxidantes.',
      disponible: true
    },
    {
      id: 7,
      nombre: 'Chocolate Caliente',
      imagen: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400',
      precio: 2.50,
      categoria: 'bebida',
      descripcion: 'Chocolate caliente cremoso con nata montada.',
      disponible: true
    },
    {
      id: 8,
      nombre: 'Zumo Natural',
      imagen: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      precio: 3.00,
      categoria: 'bebida',
      descripcion: 'Zumo natural recién exprimido de naranja.',
      disponible: true
    },
    {
      id: 9,
      nombre: 'Batido de Frutas',
      imagen: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
      precio: 3.50,
      categoria: 'bebida',
      descripcion: 'Batido natural de frutas frescas de temporada.',
      disponible: true
    },
    {
      id: 10,
      nombre: 'Agua Mineral',
      imagen: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
      precio: 1.20,
      categoria: 'bebida',
      descripcion: 'Agua mineral natural, fría y refrescante.',
      disponible: true
    },

    // Snacks
    {
      id: 11,
      nombre: 'Croissant',
      imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      precio: 1.80,
      categoria: 'snack',
      descripcion: 'Croissant francés recién horneado, crujiente y mantecoso.',
      disponible: true
    },
    {
      id: 12,
      nombre: 'Muffin de Chocolate',
      imagen: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
      precio: 2.20,
      categoria: 'snack',
      descripcion: 'Muffin casero con pepitas de chocolate.',
      disponible: true
    },
    {
      id: 13,
      nombre: 'Tostada Integral',
      imagen: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
      precio: 2.50,
      categoria: 'snack',
      descripcion: 'Tostada de pan integral con aceite de oliva y tomate.',
      disponible: true
    },
    {
      id: 14,
      nombre: 'Sandwich Vegetal',
      imagen: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      precio: 4.50,
      categoria: 'snack',
      descripcion: 'Sandwich fresco con verduras y queso.',
      disponible: true
    },
    {
      id: 15,
      nombre: 'Cookie de Avena',
      imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      precio: 1.50,
      categoria: 'snack',
      descripcion: 'Cookie artesanal de avena y pasas.',
      disponible: true
    },
    {
      id: 16,
      nombre: 'Brownie',
      imagen: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400',
      precio: 2.80,
      categoria: 'snack',
      descripcion: 'Brownie de chocolate intenso con nueces.',
      disponible: true
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los productos de cafetería
   * @returns Observable con la lista de productos
   */
  getProductos(): Observable<CafeteriaProduct[]> {
    return of(this.productos);
  }

  /**
   * Obtiene productos filtrados por categoría
   * @param categoria Categoría a filtrar
   * @returns Observable con productos filtrados
   */
  getProductosByCategoria(categoria: string): Observable<CafeteriaProduct[]> {
    if (categoria === 'todos') {
      return of(this.productos);
    }
    const filtered = this.productos.filter(p => p.categoria === categoria);
    return of(filtered);
  }

  /**
   * Obtiene un producto por su ID
   * @param id ID del producto
   * @returns Observable con el producto o undefined
   */
  getProductoById(id: number): Observable<CafeteriaProduct | undefined> {
    const producto = this.productos.find(p => p.id === id);
    return of(producto);
  }

  /**
   * Obtiene productos disponibles
   * @returns Observable con productos disponibles
   */
  getProductosDisponibles(): Observable<CafeteriaProduct[]> {
    const disponibles = this.productos.filter(p => p.disponible !== false);
    return of(disponibles);
  }
}

