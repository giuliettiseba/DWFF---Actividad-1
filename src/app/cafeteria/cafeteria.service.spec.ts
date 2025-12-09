/**
 * Tests del servicio CafeteriaService
 * @author Sistema Nexus
 * @date 2025-12-08
 */

import { TestBed } from '@angular/core/testing';
import { CafeteriaService } from './cafeteria.service';

describe('CafeteriaService', () => {
  let service: CafeteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CafeteriaService]
    });
    service = TestBed.inject(CafeteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', (done) => {
    service.getProductos().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should filter products by category cafe', (done) => {
    service.getProductosByCategoria('cafe').subscribe(products => {
      expect(products.every(p => p.categoria === 'cafe')).toBe(true);
      done();
    });
  });

  it('should filter products by category bebida', (done) => {
    service.getProductosByCategoria('bebida').subscribe(products => {
      expect(products.every(p => p.categoria === 'bebida')).toBe(true);
      done();
    });
  });

  it('should filter products by category snack', (done) => {
    service.getProductosByCategoria('snack').subscribe(products => {
      expect(products.every(p => p.categoria === 'snack')).toBe(true);
      done();
    });
  });

  it('should return all products when category is "todos"', (done) => {
    service.getProductos().subscribe(allProducts => {
      service.getProductosByCategoria('todos').subscribe(filteredProducts => {
        expect(filteredProducts.length).toBe(allProducts.length);
        done();
      });
    });
  });

  it('should get product by id', (done) => {
    service.getProductoById(1).subscribe(product => {
      expect(product).toBeDefined();
      expect(product?.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existent product id', (done) => {
    service.getProductoById(9999).subscribe(product => {
      expect(product).toBeUndefined();
      done();
    });
  });

  it('should return only available products', (done) => {
    service.getProductosDisponibles().subscribe(products => {
      expect(products.every(p => p.disponible !== false)).toBe(true);
      done();
    });
  });

  it('should have products with all required fields', (done) => {
    service.getProductos().subscribe(products => {
      products.forEach(product => {
        expect(product.id).toBeDefined();
        expect(product.nombre).toBeDefined();
        expect(product.imagen).toBeDefined();
        expect(product.precio).toBeDefined();
        expect(product.categoria).toBeDefined();
        expect(product.descripcion).toBeDefined();
      });
      done();
    });
  });
});

