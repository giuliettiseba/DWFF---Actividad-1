/**
 * @fileoverview Pruebas unitarias para el componente de pie de página
 * @description Este archivo contiene las pruebas unitarias para FooterComponent,
 * incluyendo renderizado, navegación, enlaces y funcionalidad del año dinámico.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { FooterComponent } from './footer.component';

/**
 * Componente mock para pruebas de navegación
 * Simula páginas de destino para validar el enrutamiento
 */
@Component({
  template: '<div>Mock Component</div>'
})
class MockComponent { }

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: MockComponent },
          { path: 'buscar', component: MockComponent },
          { path: 'carrito', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba básica de creación del componente
   * Verifica que el componente se instancie correctamente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba del año dinámico
   * Verifica que el año se calcule automáticamente y sea el año actual
   */
  it('should display current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.year).toBe(currentYear);
  });

  /**
   * Prueba del renderizado del año en el template
   * Verifica que el año se muestre correctamente en la interfaz
   */
  it('should render current year in template', () => {
    const currentYear = new Date().getFullYear().toString();
    const compiled = fixture.nativeElement as HTMLElement;
    const yearElements = compiled.querySelectorAll('*');

    let yearFound = false;
    yearElements.forEach(element => {
      if (element.textContent?.includes(currentYear)) {
        yearFound = true;
      }
    });

    expect(yearFound).toBeTruthy();
  });

  /**
   * Prueba de la marca BookStore
   * Verifica que el nombre de la marca se muestre correctamente
   */
  it('should display BookStore brand', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandElement = compiled.querySelector('.brand');
    expect(brandElement?.textContent?.trim()).toBe('BookStore');
  });

  /**
   * Prueba del tagline descriptivo
   * Verifica que la descripción de la plataforma esté presente
   */
  it('should display platform tagline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taglineElement = compiled.querySelector('.tagline');
    expect(taglineElement?.textContent?.trim()).toBe('Tu plataforma para explorar y disfrutar libros de todos los géneros.');
  });

  /**
   * Prueba de enlaces de navegación
   * Verifica que todos los enlaces principales estén presentes y correctos
   */
  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.footer-links a[routerLink]');

    expect(navLinks.length).toBe(3);

    const linkTexts = Array.from(navLinks).map(link => link.textContent?.trim());
    expect(linkTexts).toContain('Inicio');
    expect(linkTexts).toContain('Buscar');
    expect(linkTexts).toContain('Carrito');
  });

  /**
   * Prueba de rutas de navegación
   * Verifica que las rutas estén configuradas correctamente
   */
  it('should have correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const homeLink = compiled.querySelector('a[routerLink="/"]');
    const searchLink = compiled.querySelector('a[routerLink="/buscar"]');
    const cartLink = compiled.querySelector('a[routerLink="/carrito"]');

    expect(homeLink).toBeTruthy();
    expect(searchLink).toBeTruthy();
    expect(cartLink).toBeTruthy();
  });


  /**
   * Prueba de estructura responsive
   * Verifica que las clases de Bootstrap para responsive estén presentes
   */
  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar clases de columnas responsive
    const responsiveColumns = compiled.querySelectorAll('.col-md-4, .col-md-2, .col-md-3, .col-6');
    expect(responsiveColumns.length).toBeGreaterThan(0);

    // Verificar clase flexible del sub-footer
    const subFooter = compiled.querySelector('.sub-footer');
    expect(subFooter?.classList.contains('d-flex')).toBeTruthy();
    expect(subFooter?.classList.contains('flex-column')).toBeTruthy();
    expect(subFooter?.classList.contains('flex-md-row')).toBeTruthy();
  });

  /**
   * Prueba de la línea divisoria
   * Verifica que el divisor horizontal esté presente
   */
  it('should have divider line', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divider = compiled.querySelector('.divider');

    expect(divider).toBeTruthy();
    expect(divider?.tagName.toLowerCase()).toBe('hr');
  });
});
