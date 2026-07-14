import { Usuario } from '../models/usuario';
import { usuarioRepository } from '../repositories/usuarioRepository';

export const usuarioService = {
    obtenerTodos: (): Usuario[] => {
        return usuarioRepository.obtenerTodos();
    },

    obtenerPorId: (id: number): Usuario | undefined => {
        return usuarioRepository.obtenerPorId(id);
    },

    crear: (nuevoUsuario: Omit<Usuario, 'id'>): Usuario => {
        const todos = usuarioRepository.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(u => u.id)) + 1 : 1;
        
        const usuario: Usuario = {
            id: nuevoId,
            ...nuevoUsuario
        };
        
        return usuarioRepository.guardar(usuario);
    },

    actualizar: (id: number, datosActualizados: Partial<Omit<Usuario, 'id'>>): boolean => {
        return usuarioRepository.actualizar(id, datosActualizados);
    },

    eliminar: (id: number): boolean => {
        return usuarioRepository.eliminar(id);
    }
};