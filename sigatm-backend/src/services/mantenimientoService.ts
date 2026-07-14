import { Mantenimiento } from '../models/mantenimiento';
import { mantenimientosSimulados } from '../data/mantenimientosData';

export const mantenimientoService = {
    obtenerTodos: (): Mantenimiento[] => mantenimientosSimulados,
    
    crear: (nuevoMantenimiento: Omit<Mantenimiento, 'id'>): Mantenimiento => {
        const nuevoId = mantenimientosSimulados.length > 0 
            ? Math.max(...mantenimientosSimulados.map(m => m.id)) + 1 
            : 1;
            
        const mantenimiento: Mantenimiento = { id: nuevoId, ...nuevoMantenimiento };
        mantenimientosSimulados.push(mantenimiento);
        return mantenimiento;
    },

    actualizarEstado: (id: number, estado: 'pendiente' | 'en_progreso' | 'finalizado'): boolean => {
        const index = mantenimientosSimulados.findIndex(m => m.id === id);
        if (index === -1) return false;
        mantenimientosSimulados[index].estado = estado;
        return true;
    }
};