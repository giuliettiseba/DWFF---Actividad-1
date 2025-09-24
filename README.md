# Actividad 1 (individual) — Aplicación con Angular

Esta actividad se encuadra dentro del proyecto transversal del máster: **Librería universitaria y espacio multifuncional** que combina venta de libros, zona de coworking y cafetería.

## Objetivos

El objetivo de esta actividad es crear una aplicación web con Angular que implemente la funcionalidad de venta de libros de la librería Nexus. El usuario podrá navegar por las distintas páginas de este sitio web.

## Pautas de elaboración

En esta actividad, deberás:

- Crear una aplicación con Angular.
- Crear al menos tres páginas dentro del proyecto:
  - Landing page
  - Página de búsqueda de libros (con filtros por título, autor, año o categoría)
  - Página de carrito (donde se ven los libros seleccionados)
- Incluir tres enlaces de navegación presentes en todas las páginas.
- Las páginas deben tener contenido, dando la sensación de ser un producto acabado. Cada una debe incluir:
  - Varios párrafos de texto
  - Imágenes
  - Filas y columnas de contenido
- Todo el contenido debe transmitir la sensación de estar en un e-commerce de libros, cuidadosamente maquetado, con una columna central de 1200px de ancho.

## Extensión y formato

- Extensión máxima: tres páginas de Angular.

## Rúbrica

| Criterio    | Descripción                                                                 | Puntos | Peso (%) |
|-------------|-----------------------------------------------------------------------------|--------|----------|
| 1           | Crear la aplicación utilizando la herramienta de generación vista en clase   | 1      | 10%      |
| 2           | Crear al menos tres páginas                                                 | 2      | 20%      |
| 3           | Crear los enlaces de navegación                                             | 1      | 10%      |
| 4           | Añadir contenido que transmita la sensación de e-commerce de libros         | 3      | 30%      |
| 5           | No adjuntar la carpeta node_modules y compartir el código en un fichero     | 1      | 10%      |
| 6           | Código de enrutamiento en un fichero independiente                          | 1      | 10%      |
| 7           | Respetar la nomenclatura correcta de los ficheros                          | 1      | 10%      |
| **Total**   |                                                                             | **10** | **100%** |

---

## Instrucciones técnicas

- Para iniciar el servidor de desarrollo:
  ```bash
  ng serve
  ```
- Accede a la aplicación en `http://localhost:4200/`.
- Para generar componentes:
  ```bash
  ng generate component nombre-componente
  ```
- Para construir el proyecto:
  ```bash
  ng build
  ```
- Para ejecutar tests unitarios:
  ```bash
  ng test
  ```
- Para pruebas end-to-end:
  ```bash
  ng e2e
  ```

---

**No adjuntar la carpeta `node_modules`. Compartir el código en un fichero a través de la plataforma de la universidad.**
