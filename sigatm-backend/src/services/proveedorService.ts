import { proveedorRepository } from '../repositories/proveedorMysqlRepository';

export const proveedorService = {
    obtenerTodos: async () => await proveedorRepository.findAll(),
    obtenerPorId: async (id: number) => await proveedorRepository.findById(id),
    crear: async (datos: any) => await proveedorRepository.create(datos),
    actualizar: async (id: number, datos: any) => await proveedorRepository.update(id, datos),
    eliminar: async (id: number) => await proveedorRepository.delete(id)
};