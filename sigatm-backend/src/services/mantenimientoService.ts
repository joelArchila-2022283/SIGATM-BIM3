import { mantenimientoMysqlRepository } from '../repositories/mantenimientoMysqlRepository';
import { Mantenimiento } from '../models/mantenimiento';

export class MantenimientoService {
    async obtenerTodos(): Promise<Mantenimiento[]> {
        return await mantenimientoMysqlRepository.obtenerTodos();
    }
    async obtenerPorId(id: number): Promise<Mantenimiento | null> {
        return await mantenimientoMysqlRepository.obtenerPorId(id);
    }
    async crear(mantenimiento: Omit<Mantenimiento, 'id'>): Promise<Mantenimiento> {
        return await mantenimientoMysqlRepository.crear(mantenimiento);
    }
    async actualizar(id: number, mantenimiento: Partial<Omit<Mantenimiento, 'id'>>): Promise<boolean> {
        return await mantenimientoMysqlRepository.actualizar(id, mantenimiento);
    }
    async eliminar(id: number): Promise<boolean> {
        return await mantenimientoMysqlRepository.eliminar(id);
    }
}

export const mantenimientoService = new MantenimientoService();