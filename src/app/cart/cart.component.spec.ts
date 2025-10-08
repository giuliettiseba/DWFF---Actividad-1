import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartStoreService } from './cart.store';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartStore: CartStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [CartStoreService]
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartStore = TestBed.inject(CartStoreService);
    (cartStore as any).cartItems$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close payment dialog', () => {
    component.openPaymentDialog();
    expect(component.showPaymentDialog).toBeTrue();
    component.closePaymentDialog();
    expect(component.showPaymentDialog).toBeFalse();
  });

  it('should clear cart after payment', fakeAsync(() => {
    spyOn(cartStore, 'clearCart');
    spyOn(window, 'alert'); // Mock the alert to avoid actual popup
    component.paymentForm = { name: 'Test', number: '1234567812345678', expiry: '12/25', cvv: '123' };
    component.showPaymentDialog = true;
    component.submitPayment();
    tick(1000); // Advance time by 1000ms to trigger setTimeout
    expect(cartStore.clearCart).toHaveBeenCalled();
    expect(component.showPaymentDialog).toBeFalse();
  }));

  it('should show error for invalid payment', () => {
    component.paymentForm = { name: '', number: '', expiry: '', cvv: '' };
    component.showPaymentDialog = true;
    component.submitPayment();
    expect(component.paymentError).toBe('Por favor complete todos los campos.');
  });
});
