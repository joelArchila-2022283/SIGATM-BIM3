import { mantenimientoRepuestoRepository } from '../repositories/mantenimientoRepuestoMysqlRepository';

export const mantenimientoRepuestoService = {
    obtenerTodos: () => mantenimientoRepuestoRepository.findAll(),
    crear: (datos: any) => mantenimientoRepuestoRepository.create(datos),
    eliminar: (idMantenimiento: number, idRepuesto: number) => mantenimientoRepuestoRepository.delete(idMantenimiento, idRepuesto)
};