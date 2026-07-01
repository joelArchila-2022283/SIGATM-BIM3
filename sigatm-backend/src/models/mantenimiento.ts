export interface Mantenimiento {
  id: number;
  equipoId: number; // Relacion con Equipo
  tecnicoId: number; // Relacion con Tecnico
  fechaInicio: Date;
  fechaFin?: Date; 
  tipo: 'preventivo' | 'correctivo'; 
  estado: 'pendiente' | 'en_progreso' | 'finalizado'; 
  descripcion: string;
}
