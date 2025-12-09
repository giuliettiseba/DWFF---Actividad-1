/**
 * Tests del componente CafeteriaCheckout
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafeteriaCheckout } from './cafeteria-checkout';
import { OrderService } from '../cafeteria/order.service';
import { provideRouter, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('CafeteriaCheckout', () => {
  let component: CafeteriaCheckout;
  let fixture: ComponentFixture<CafeteriaCheckout>;
  let orderService: OrderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaCheckout, ReactiveFormsModule],
      providers: [
        OrderService,
        provideRouter([])
      ]
    })
    .compileComponents();

    orderService = TestBed.inject(OrderService);
    router = TestBed.inject(Router);

    // Agregar un producto al carrito para poder probar el checkout
    orderService.addItem({
      id: 1,
      nombre: 'Test Product',
      imagen: 'test.jpg',
      precio: 2.50,
      categoria: 'cafe',
      descripcion: 'Test',
      disponible: true
    }, 1);

    fixture = TestBed.createComponent(CafeteriaCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    orderService.clearCart();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.checkoutForm).toBeDefined();
    expect(component.checkoutForm.get('modalidad')?.value).toBe('mostrador');
  });

  it('should validate nombre field as required', () => {
    const nombreControl = component.checkoutForm.get('nombreCliente');
    nombreControl?.setValue('');
    expect(nombreControl?.hasError('required')).toBe(true);
  });

  it('should validate nombre field minimum length', () => {
    const nombreControl = component.checkoutForm.get('nombreCliente');
    nombreControl?.setValue('ab');
    expect(nombreControl?.hasError('minlength')).toBe(true);
  });

  it('should require mesa number when modalidad is mesa', () => {
    component.checkoutForm.get('modalidad')?.setValue('mesa');
    const mesaControl = component.checkoutForm.get('numeroMesa');
    expect(mesaControl?.hasError('required')).toBe(true);
  });

  it('should not require mesa number when modalidad is mostrador', () => {
    component.checkoutForm.get('modalidad')?.setValue('mostrador');
    const mesaControl = component.checkoutForm.get('numeroMesa');
    expect(mesaControl?.hasError('required')).toBeFalsy();
  });

  it('should format price correctly', () => {
    const formatted = component.formatearPrecio(3.5);
    expect(formatted).toBe('3.50');
  });

  it('should show error message for invalid field', () => {
    component.checkoutForm.get('nombreCliente')?.markAsTouched();
    expect(component.tienError('nombreCliente')).toBe(true);
  });
});
