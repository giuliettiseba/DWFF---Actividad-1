/**
 * Tests del servicio OrderService
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { CafeteriaProduct } from './product.model';

describe('OrderService', () => {
  let service: OrderService;
  let testProduct: CafeteriaProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);

    testProduct = {
      id: 1,
      nombre: 'Test Café',
      imagen: 'test.jpg',
      precio: 2.50,
      categoria: 'cafe',
      descripcion: 'Test description',
      disponible: true
    };
  });

  afterEach(() => {
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.totalItems()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should add item to cart', () => {
    service.addItem(testProduct, 1);
    expect(service.totalItems()).toBe(1);
    expect(service.items().length).toBe(1);
  });

  it('should increment quantity when adding same product', () => {
    service.addItem(testProduct, 1);
    service.addItem(testProduct, 1);

    expect(service.totalItems()).toBe(2);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].cantidad).toBe(2);
  });

  it('should calculate total correctly', () => {
    service.addItem(testProduct, 2);
    expect(service.total()).toBe(5.00);
  });

  it('should remove item from cart', () => {
    service.addItem(testProduct, 1);
    service.removeItem(testProduct.id);

    expect(service.totalItems()).toBe(0);
    expect(service.items().length).toBe(0);
  });

  it('should update item quantity', () => {
    service.addItem(testProduct, 1);
    service.updateQuantity(testProduct.id, 3);

    expect(service.totalItems()).toBe(3);
    expect(service.items()[0].cantidad).toBe(3);
  });

  it('should remove item when updating quantity to 0', () => {
    service.addItem(testProduct, 1);
    service.updateQuantity(testProduct.id, 0);

    expect(service.items().length).toBe(0);
  });

  it('should clear entire cart', () => {
    service.addItem(testProduct, 2);
    service.clearCart();

    expect(service.totalItems()).toBe(0);
    expect(service.items().length).toBe(0);
    expect(service.modalidad()).toBe('mostrador');
  });

  it('should set modalidad', () => {
    service.setModalidad('mesa');
    expect(service.modalidad()).toBe('mesa');
  });

  it('should set numero de mesa', () => {
    service.setNumeroMesa(15);
    expect(service.numeroMesa()).toBe(15);
  });

  it('should clear numero de mesa when changing to mostrador', () => {
    service.setModalidad('mesa');
    service.setNumeroMesa(15);
    service.setModalidad('mostrador');

    expect(service.numeroMesa()).toBeUndefined();
  });

  it('should generate order with correct data', () => {
    service.addItem(testProduct, 2);
    service.setModalidad('mesa');
    service.setNumeroMesa(10);

    const order = service.generarPedido('Test User');

    expect(order.items.length).toBe(1);
    expect(order.total).toBe(5.00);
    expect(order.modalidad).toBe('mesa');
    expect(order.numeroMesa).toBe(10);
    expect(order.nombreCliente).toBe('Test User');
    expect(order.estado).toBe('pendiente');
  });

  it('should handle multiple different products', () => {
    const product2: CafeteriaProduct = {
      id: 2,
      nombre: 'Test Snack',
      imagen: 'test2.jpg',
      precio: 3.00,
      categoria: 'snack',
      descripcion: 'Test description 2',
      disponible: true
    };

    service.addItem(testProduct, 1);
    service.addItem(product2, 2);

    expect(service.items().length).toBe(2);
    expect(service.totalItems()).toBe(3);
    expect(service.total()).toBe(8.50);
  });
});

