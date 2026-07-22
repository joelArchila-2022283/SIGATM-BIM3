import { Mantenimiento } from '../models/mantenimiento';
import { EstadoMantenimiento } from '../models/enums';
import { MantenimientoRepository } from '../repositories/mantenimientoRepository';

const mantenimientoRepo = new MantenimientoRepository();

export const mantenimientoService = {
    obtenerTodos: (): Mantenimiento[] => {
        return mantenimientoRepo.obtenerTodos();
    },

    obtenerPorId: (id: number): Mantenimiento | undefined => {
        return mantenimientoRepo.obtenerPorId(id);
    },

    crear: (nuevoMantenimiento: Omit<Mantenimiento, 'id'>): Mantenimiento => {
        const todos = mantenimientoRepo.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(m => m.id)) + 1 : 1;
        
        const mantenimiento: Mantenimiento = {
            id: nuevoId,
            ...nuevoMantenimiento
        };
        
        return mantenimientoRepo.guardar(mantenimiento);
    },

    actualizarEstado: (id: number, nuevoEstado: EstadoMantenimiento): boolean => {
        return mantenimientoRepo.actualizar(id, { estado: nuevoEstado });
    },

    finalizarMantenimiento: (id: number, fechaFin: Date): boolean => {
        return mantenimientoRepo.actualizar(id, { 
            estado: EstadoMantenimiento.FINALIZADO,
            fechaFin 
        });
    }
};