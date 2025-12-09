/**
 * Tests del componente ContactForm
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('nombre')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('asunto')?.value).toBe('');
    expect(component.contactForm.get('mensaje')?.value).toBe('');
  });

  it('should validate nombre as required', () => {
    const nombreControl = component.contactForm.get('nombre');
    nombreControl?.setValue('');
    expect(nombreControl?.hasError('required')).toBe(true);
  });

  it('should validate nombre minimum length', () => {
    const nombreControl = component.contactForm.get('nombre');
    nombreControl?.setValue('ab');
    expect(nombreControl?.hasError('minlength')).toBe(true);
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
  });

  it('should accept valid email', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should validate asunto minimum length', () => {
    const asuntoControl = component.contactForm.get('asunto');
    asuntoControl?.setValue('abc');
    expect(asuntoControl?.hasError('minlength')).toBe(true);
  });

  it('should validate mensaje minimum length', () => {
    const mensajeControl = component.contactForm.get('mensaje');
    mensajeControl?.setValue('short');
    expect(mensajeControl?.hasError('minlength')).toBe(true);
  });

  it('should validate mensaje maximum length', () => {
    const mensajeControl = component.contactForm.get('mensaje');
    const longMessage = 'a'.repeat(501);
    mensajeControl?.setValue(longMessage);
    expect(mensajeControl?.hasError('maxlength')).toBe(true);
  });

  it('should show error when field is invalid and touched', () => {
    const nombreControl = component.contactForm.get('nombre');
    nombreControl?.setValue('');
    nombreControl?.markAsTouched();
    expect(component.tienError('nombre')).toBe(true);
  });

  it('should return correct error message for required field', () => {
    const nombreControl = component.contactForm.get('nombre');
    nombreControl?.setValue('');
    nombreControl?.markAsTouched();
    expect(component.obtenerMensajeError('nombre')).toBe('Este campo es obligatorio');
  });

  it('should return correct error message for email field', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid');
    emailControl?.markAsTouched();
    expect(component.obtenerMensajeError('email')).toBe('Email inválido');
  });

  it('should return message length', () => {
    component.contactForm.get('mensaje')?.setValue('test message');
    expect(component.longitudMensaje).toBe(12);
  });

  it('should submit form when valid', () => {
    component.contactForm.patchValue({
      nombre: 'Test User',
      email: 'test@example.com',
      asunto: 'Test Subject',
      mensaje: 'This is a test message'
    });

    expect(component.contactForm.valid).toBe(true);
    component.enviarSolicitud();
    expect(component.formularioEnviado).toBe(true);
  });

  it('should not submit form when invalid', () => {
    component.contactForm.patchValue({
      nombre: '',
      email: 'invalid',
      asunto: '',
      mensaje: ''
    });

    component.enviarSolicitud();
    expect(component.formularioEnviado).toBe(false);
  });
});
