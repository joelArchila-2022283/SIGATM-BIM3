export interface HistorialMantenimiento {
  id: number;
  mantenimientoId: number; // Relacion con Mantenimiento
  fecha: Date;
  observaciones?: string; 
}
