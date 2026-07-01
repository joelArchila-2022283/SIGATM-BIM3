export interface Equipo {
  id: number;
  nombre: string;
  descripcion?: string; 
  numeroSerie: string;
  fechaAdquisicion: Date;
  tipoEquipoId: number; // Relación con TipoEquipo
  proveedorId: number; // Relación con Proveedor
  departamentoId: number; // Relación con Departamento
  estado: 'activo' | 'inactivo' | 'en_mantenimiento'; 
}
