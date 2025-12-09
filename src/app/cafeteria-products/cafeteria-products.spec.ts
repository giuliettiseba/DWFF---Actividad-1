/**
 * Tests del componente CafeteriaProducts
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafeteriaProducts } from './cafeteria-products';
import { CafeteriaService } from '../cafeteria/cafeteria.service';
import { OrderService } from '../cafeteria/order.service';
import { provideRouter } from '@angular/router';

describe('CafeteriaProducts', () => {
  let component: CafeteriaProducts;
  let fixture: ComponentFixture<CafeteriaProducts>;
  let cafeteriaService: CafeteriaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaProducts],
      providers: [
        CafeteriaService,
        OrderService,
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeteriaProducts);
    component = fixture.componentInstance;
    cafeteriaService = TestBed.inject(CafeteriaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.productos.length).toBeGreaterThan(0);
  });

  it('should have default category as "todos"', () => {
    expect(component.categoriaSeleccionada).toBe('todos');
  });

  it('should filter products by category', () => {
    component.filtrarPorCategoria('cafe');
    fixture.detectChanges();
    expect(component.categoriaSeleccionada).toBe('cafe');
  });

  it('should add product to cart', () => {
    const orderService = TestBed.inject(OrderService);
    const initialCount = orderService.totalItems();

    component.agregarAlCarrito(component.productos[0]);

    expect(orderService.totalItems()).toBe(initialCount + 1);
  });

  it('should format price correctly', () => {
    const formatted = component.formatearPrecio(2.5);
    expect(formatted).toBe('2.50');
  });
});
