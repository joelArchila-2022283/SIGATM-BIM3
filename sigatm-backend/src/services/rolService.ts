import { rolRepository } from '../repositories/rolMysqlRepository';

export const rolService = {
    async obtenerTodos() {
        return await rolRepository.findAll();
    },

    async obtenerPorId(id: number) {
        return await rolRepository.findById(id);
    },

    async crear(datos: { nombre: string }) {
        const insertId = await rolRepository.create(datos.nombre);
        return { id_rol: insertId, ...datos };
    },

    async actualizar(id: number, datos: { nombre?: string }) {
        return await rolRepository.update(id, datos.nombre);
    },

    async eliminar(id: number) {
        return await rolRepository.delete(id);
    }
};