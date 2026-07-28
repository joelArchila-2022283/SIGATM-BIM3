import { diagnosticoRepository } from '../repositories/diagnosticoMysqlRepository';

export const diagnosticoService = {
    obtenerTodos: () => diagnosticoRepository.findAll(),
    obtenerPorId: (id: number) => diagnosticoRepository.findById(id),
    crear: async (datos: any) => {
        datos.fechaDiagnostico = new Date(); // Asigna fecha actual
        return { id: await diagnosticoRepository.create(datos), ...datos };
    },
    actualizar: (id: number, datos: any) => diagnosticoRepository.update(id, datos),
    eliminar: (id: number) => diagnosticoRepository.delete(id)
};