import { Usuario } from '../models/usuario';
import { UsuarioRepository } from '../repositories/usuarioRepository';

const usuarioRepo = new UsuarioRepository();

export const usuarioService = {
    obtenerTodos: (): Usuario[] => {
        return usuarioRepo.obtenerTodos();
    },

    obtenerPorId: (id: number): Usuario | undefined => {
        return usuarioRepo.obtenerPorId(id);
    },

    crear: (nuevoUsuario: Omit<Usuario, 'id'>): Usuario => {
        const todos = usuarioRepo.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(u => u.id)) + 1 : 1;
        
        const usuario: Usuario = {
            id: nuevoId,
            ...nuevoUsuario
        };
        
        return usuarioRepo.guardar(usuario);
    },

    actualizar: (id: number, datosActualizados: Partial<Omit<Usuario, 'id'>>): boolean => {
        return usuarioRepo.actualizar(id, datosActualizados);
    },

    eliminar: (id: number): boolean => {
        return usuarioRepo.eliminar(id);
    }
};