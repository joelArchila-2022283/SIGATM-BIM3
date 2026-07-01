export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string; // Opcional
  username: string;
  password: string;
  rolId: number; 
}
