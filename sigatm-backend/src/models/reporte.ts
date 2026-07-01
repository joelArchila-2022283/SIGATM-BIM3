export interface Reporte {
  id: number;
  equipoId: number; // Relacion con Equipo
  descripcion: string;
  fechaReporte: Date;
  usuarioId: number; // Relacion con Usuario
}
