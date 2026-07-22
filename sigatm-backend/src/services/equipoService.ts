import { Equipo } from '../models/equipo';
import { EquipoRepository } from '../repositories/equipoRepository';

// 1. Instanciamos la clase (¡Importante!)
const equipoRepo = new EquipoRepository();

export const equipoService = {
    obtenerTodos: (): Equipo[] => {
        return equipoRepo.obtenerTodos();
    },

    obtenerPorId: (id: number): Equipo | undefined => {
        return equipoRepo.obtenerPorId(id);
    },

    crear: (nuevoEquipo: Omit<Equipo, 'id'>): Equipo => {
        const todos = equipoRepo.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(e => e.id)) + 1 : 1;
        
        const equipo: Equipo = {
            id: nuevoId,
            ...nuevoEquipo
        };
        
        return equipoRepo.guardar(equipo);
    },

    actualizar: (id: number, datosActualizados: Partial<Omit<Equipo, 'id'>>): boolean => {
        return equipoRepo.actualizar(id, datosActualizados);
    },

    eliminar: (id: number): boolean => {
        return equipoRepo.eliminar(id);
    }
};