import { Equipo } from '../models/equipo';
import { equipoRepository } from '../repositories/equipoRepository';

export const equipoService = {
    obtenerTodos: (): Equipo[] => {
        return equipoRepository.obtenerTodos();
    },

    obtenerPorId: (id: number): Equipo | undefined => {
        return equipoRepository.obtenerPorId(id);
    },

    crear: (nuevoEquipo: Omit<Equipo, 'id'>): Equipo => {
        const todos = equipoRepository.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(e => e.id)) + 1 : 1;
        
        const equipo: Equipo = {
            id: nuevoId,
            ...nuevoEquipo
        };
        
        return equipoRepository.guardar(equipo);
    },

    actualizar: (id: number, datosActualizados: Partial<Omit<Equipo, 'id'>>): boolean => {
        return equipoRepository.actualizar(id, datosActualizados);
    },

    eliminar: (id: number): boolean => {
        return equipoRepository.eliminar(id);
    }
};