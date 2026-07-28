import { departamentoRepository } from '../repositories/departamentoMysqlRepository';

export const departamentoService = {
    async obtenerTodos() {
        return await departamentoRepository.findAll();
    },

    async obtenerPorId(id: number) {
        return await departamentoRepository.findById(id);
    },

    async crear(datos: { nombre: string; ubicacion?: string }) {
        const insertId = await departamentoRepository.create(datos);
        return { id_departamento: insertId, ...datos };
    },

    async actualizar(id: number, datos: { nombre?: string; ubicacion?: string }) {
        return await departamentoRepository.update(id, datos);
    },

    async eliminar(id: number) {
        return await departamentoRepository.delete(id);
    }
};