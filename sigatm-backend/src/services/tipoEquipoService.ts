import { tipoEquipoRepository } from '../repositories/tipoEquipoMysqlRepository';

export const tipoEquipoService = {
    obtenerTodos: async () => await tipoEquipoRepository.findAll(),
    obtenerPorId: async (id: number) => await tipoEquipoRepository.findById(id),
    crear: async (datos: any) => await tipoEquipoRepository.create(datos),
    actualizar: async (id: number, datos: any) => await tipoEquipoRepository.update(id, datos),
    eliminar: async (id: number) => await tipoEquipoRepository.delete(id)
};