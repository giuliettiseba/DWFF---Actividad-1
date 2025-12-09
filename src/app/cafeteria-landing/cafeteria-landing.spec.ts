/**
 * Tests del componente CafeteriaLanding
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafeteriaLanding } from './cafeteria-landing';
import { provideRouter } from '@angular/router';

describe('CafeteriaLanding', () => {
  let component: CafeteriaLanding;
  let fixture: ComponentFixture<CafeteriaLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaLanding],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeteriaLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have features array with 4 items', () => {
    expect(component.features.length).toBe(4);
  });

  it('should have horarios array with 3 items', () => {
    expect(component.horarios.length).toBe(3);
  });

  it('should display title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Cafetería Nexus');
  });
});
