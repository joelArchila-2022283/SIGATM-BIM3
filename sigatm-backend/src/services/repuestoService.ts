import { repuestoRepository } from '../repositories/repuestoMysqlRepository';

export const repuestoService = {
    obtenerTodos: async () => await repuestoRepository.findAll(),
    obtenerPorId: async (id: number) => await repuestoRepository.findById(id),
    crear: async (datos: any) => await repuestoRepository.create(datos),
    actualizar: async (id: number, datos: any) => await repuestoRepository.update(id, datos),
    eliminar: async (id: number) => await repuestoRepository.delete(id)
};