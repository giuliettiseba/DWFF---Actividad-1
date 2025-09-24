/**
 * Book
 */
export interface Book {
  autor: string;
  "año": number;
  categoria: string;
  id: number;
  imagen: string;
  sinopsis: string;
  titulo: string;

  [property: string]: any;
}

