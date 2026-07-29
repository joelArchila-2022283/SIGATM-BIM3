import { historialMantenimientoRepository } from '../repositories/historialMantenimientoMysqlRepository';

export const historialMantenimientoService = {
    obtenerTodos: async () => await historialMantenimientoRepository.findAll(),
    obtenerPorId: async (id: number) => await historialMantenimientoRepository.findById(id),
    crear: async (datos: any) => await historialMantenimientoRepository.create(datos)
};