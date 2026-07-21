import { TipoMantenimiento } from '../models/enums';
import { EstadoMantenimiento } from '../models/enums';


export interface Mantenimiento {
  id: number;
  equipoId: number; // Relacion con Equipo
  tecnicoId: number; // Relacion con Tecnico
  fechaInicio: Date;
  fechaFin?: Date; 
  tipo: TipoMantenimiento; 
  estado: EstadoMantenimiento; 
  descripcion: string;
}
