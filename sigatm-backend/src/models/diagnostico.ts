export interface Diagnostico {
  id: number;
  reporteId: number; // Relación con Reporte
  tecnicoId: number; // Relación con Técnico
  descripcion: string;
  fechaDiagnostico: Date;
}
