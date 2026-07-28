import { proveedorRepository } from '../repositories/proveedorMysqlRepository';

export const proveedorService = {
    async obtenerTodos() {
        return await proveedorRepository.findAll();
    },

    async obtenerPorId(id: number) {
        return await proveedorRepository.findById(id);
    },

    async crear(datos: { nombre: string; contacto?: string; telefono?: string; correo?: string }) {
        const insertId = await proveedorRepository.create(datos);
        return { id_proveedor: insertId, ...datos };
    },

    async actualizar(id: number, datos: { nombre?: string; contacto?: string; telefono?: string; correo?: string }) {
        return await proveedorRepository.update(id, datos);
    },

    async eliminar(id: number) {
        return await proveedorRepository.delete(id);
    }
};