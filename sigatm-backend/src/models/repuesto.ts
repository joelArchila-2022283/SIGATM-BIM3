export interface Repuesto {
  id: number;
  nombre: string;
  descripcion?: string; 
  cantidad: number;
  proveedorId: number; // Relacion con Proveedor
}
