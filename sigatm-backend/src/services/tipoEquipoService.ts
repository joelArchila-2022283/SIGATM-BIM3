import { tipoEquipoRepository } from '../repositories/tipoEquipoMysqlRepository';

export const tipoEquipoService = {
    async obtenerTodos() {
        return await tipoEquipoRepository.findAll();
    },

    async obtenerPorId(id: number) {
        return await tipoEquipoRepository.findById(id);
    },

    async crear(datos: { nombre: string; descripcion?: string }) {
        const insertId = await tipoEquipoRepository.create(datos);
        return { id_tipo_equipo: insertId, ...datos };
    },

    async actualizar(id: number, datos: { nombre?: string; descripcion?: string }) {
        return await tipoEquipoRepository.update(id, datos);
    },

    async eliminar(id: number) {
        return await tipoEquipoRepository.delete(id);
    }
};