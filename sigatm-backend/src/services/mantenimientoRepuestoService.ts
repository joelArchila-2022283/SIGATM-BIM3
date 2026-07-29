import { mantenimientoRepuestoRepository } from '../repositories/mantenimientoRepuestoMysqlRepository';

export const mantenimientoRepuestoService = {
    obtenerTodos: async () => await mantenimientoRepuestoRepository.findAll(),
    obtenerPorIds: async (mantenimientoId: number, repuestoId: number) => 
        await mantenimientoRepuestoRepository.findByIds(mantenimientoId, repuestoId),
    crear: async (datos: any) => await mantenimientoRepuestoRepository.create(datos),
    eliminar: async (mantenimientoId: number, repuestoId: number) => 
        await mantenimientoRepuestoRepository.delete(mantenimientoId, repuestoId)
};