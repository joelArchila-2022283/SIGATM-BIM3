import { tecnicoRepository } from '../repositories/tecnicoMysqlRepository';

export const tecnicoService = {
    obtenerTodos: () => tecnicoRepository.findAll(),
    obtenerPorId: (id: number) => tecnicoRepository.findById(id),
    crear: async (datos: any) => ({ id: await tecnicoRepository.create(datos), ...datos }),
    actualizar: (id: number, datos: any) => tecnicoRepository.update(id, datos),
    eliminar: (id: number) => tecnicoRepository.delete(id)
};