import { EstadoEquipo } from '../models/enums';

export interface Equipo {
    id: number;
    nombre: string;
    descripcion?: string; 
    numeroSerie: string;
    fechaAdquisicion: Date;
    tipoEquipoId: number;
    proveedorId: number;
    departamentoId: number;
    estado: EstadoEquipo; 
}