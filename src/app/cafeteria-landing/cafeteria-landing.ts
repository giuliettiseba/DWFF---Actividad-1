/**
 * Componente Landing de Cafetería
 *
 * @description Página de presentación del servicio de cafetería
 * Muestra información sobre el espacio, productos y servicios
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cafeteria-landing',
  imports: [CommonModule, RouterModule],
  templateUrl: './cafeteria-landing.html',
  styleUrl: './cafeteria-landing.css'
})
export class CafeteriaLanding {
  /**
   * Características del servicio de cafetería
   */
  features = [
    {
      icon: '☕',
      titulo: 'Café de Calidad',
      descripcion: 'Granos seleccionados y baristas expertos para el mejor café'
    },
    {
      icon: '🥐',
      titulo: 'Repostería Fresca',
      descripcion: 'Productos horneados diariamente en nuestro obrador'
    },
    {
      icon: '💻',
      titulo: 'Zona Coworking',
      descripcion: 'Espacios diseñados para estudiar y trabajar cómodamente'
    },
    {
      icon: '📚',
      titulo: 'Ambiente Académico',
      descripcion: 'El lugar perfecto para estudiantes y profesores'
    }
  ];

  /**
   * Horarios de atención
   */
  horarios = [
    { dia: 'Lunes - Viernes', horario: '7:00 - 22:00' },
    { dia: 'Sábados', horario: '8:00 - 21:00' },
    { dia: 'Domingos', horario: '9:00 - 20:00' }
  ];
}
