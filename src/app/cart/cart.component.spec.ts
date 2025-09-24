import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should clear cart after payment', () => {
    spyOn(cartStore, 'clearCart');
    component.paymentForm = { name: 'Test', number: '1234567812345678', expiry: '12/25', cvv: '123' };
    component.showPaymentDialog = true;
    component.submitPayment();
    expect(cartStore.clearCart).toHaveBeenCalled();
    expect(component.showPaymentDialog).toBeFalse();
  });

  it('should show error for invalid payment', () => {
    component.paymentForm = { name: '', number: '', expiry: '', cvv: '' };
    component.showPaymentDialog = true;
    component.submitPayment();
    expect(component.paymentError).toBe('Todos los campos son obligatorios.');
  });
});
