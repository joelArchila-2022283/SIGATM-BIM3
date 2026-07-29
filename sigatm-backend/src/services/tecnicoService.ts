import { tecnicoRepository } from '../repositories/tecnicoMysqlRepository';

export const tecnicoService = {
    obtenerTodos: async () => await tecnicoRepository.obtenerTodos(),
    obtenerPorId: async (id: number) => await tecnicoRepository.obtenerPorId(id),
    crear: async (datos: any) => await tecnicoRepository.crear(datos),
    actualizar: async (id: number, datos: any) => await tecnicoRepository.actualizar(id, datos),
    eliminar: async (id: number) => await tecnicoRepository.eliminar(id)
};