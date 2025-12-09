/**
 * Componente de Formulario de Contacto
 *
 * @description Formulario reactivo de contacto para la aplicación
 * Implementa validaciones y muestra mensajes de confirmación
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm implements OnInit {
  /**
   * Formulario reactivo de contacto
   */
  contactForm!: FormGroup;

  /**
   * Indica si el formulario fue enviado exitosamente
   */
  formularioEnviado = false;

  /**
   * Mensaje de éxito para mostrar al usuario
   */
  mensajeExito = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con validaciones
   */
  private inicializarFormulario(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  /**
   * Envía el formulario de contacto
   */
  enviarSolicitud(): void {
    if (this.contactForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    // Obtener valores del formulario
    const formValue = this.contactForm.value;

    // En una aplicación real, aquí se enviaría a un backend
    console.log('Formulario de contacto enviado:', formValue);

    // Mostrar mensaje de éxito
    this.mensajeExito = `¡Gracias ${formValue.nombre}! Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo a través de ${formValue.email} lo antes posible.`;
    this.formularioEnviado = true;

    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
      this.formularioEnviado = false;
      this.contactForm.reset();
    }, 5000);
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private marcarCamposComoTocados(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   * @param campo Nombre del campo
   * @returns true si tiene errores y fue tocado
   */
  tienError(campo: string): boolean {
    const control = this.contactForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param campo Nombre del campo
   * @returns Mensaje de error correspondiente
   */
  obtenerMensajeError(campo: string): string {
    const control = this.contactForm.get(campo);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }

    return '';
  }

  /**
   * Obtiene la longitud del texto en el campo mensaje
   * @returns Longitud actual del mensaje
   */
  get longitudMensaje(): number {
    return this.contactForm.get('mensaje')?.value?.length || 0;
  }
}
