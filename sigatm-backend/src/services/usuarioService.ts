import { usuarioMysqlRepository } from '../repositories/usuarioMysqlRepository';
import { Usuario } from '../models/usuario';

export class UsuarioService {
    async obtenerTodos(): Promise<Usuario[]> {
        return await usuarioMysqlRepository.obtenerTodos();
    }

    async obtenerPorId(id: number): Promise<Usuario | null> {
        return await usuarioMysqlRepository.obtenerPorId(id);
    }

    async crear(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
        return await usuarioMysqlRepository.crear(usuario);
    }

    async actualizar(id: number, usuario: Partial<Omit<Usuario, 'id'>>): Promise<boolean> {
        return await usuarioMysqlRepository.actualizar(id, usuario);
    }

    async eliminar(id: number): Promise<boolean> {
        return await usuarioMysqlRepository.eliminar(id);
    }
}

export const usuarioService = new UsuarioService();