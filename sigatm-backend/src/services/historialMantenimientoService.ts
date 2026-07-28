import { historialMantenimientoRepository } from '../repositories/historialMantenimientoMysqlRepository';

export const historialMantenimientoService = {
    obtenerTodos: () => historialMantenimientoRepository.findAll(),
    obtenerPorMantenimiento: (id: number) => historialMantenimientoRepository.findByMantenimientoId(id),
    crear: async (datos: any) => {
        datos.fecha = new Date();
        return { id: await historialMantenimientoRepository.create(datos), ...datos };
    }
};