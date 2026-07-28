import { repuestoRepository } from '../repositories/repuestoMysqlRepository';

export const repuestoService = {
    obtenerTodos: () => repuestoRepository.findAll(),
    obtenerPorId: (id: number) => repuestoRepository.findById(id),
    crear: async (datos: any) => ({ id: await repuestoRepository.create(datos), ...datos }),
    actualizar: (id: number, datos: any) => repuestoRepository.update(id, datos),
    eliminar: (id: number) => repuestoRepository.delete(id)
};

