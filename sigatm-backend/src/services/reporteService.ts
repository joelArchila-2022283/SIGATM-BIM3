import { reporteMysqlRepository } from '../repositories/reporteMysqlRepository';
import { Reporte } from '../models/reporte';

export class ReporteService {
    async obtenerTodos(): Promise<Reporte[]> {
        return await reporteMysqlRepository.obtenerTodos();
    }
    async obtenerPorId(id: number): Promise<Reporte | null> {
        return await reporteMysqlRepository.obtenerPorId(id);
    }
    async crear(reporte: Omit<Reporte, 'id'>): Promise<Reporte> {
        return await reporteMysqlRepository.crear(reporte);
    }
    async actualizar(id: number, reporte: Partial<Omit<Reporte, 'id'>>): Promise<boolean> {
        return await reporteMysqlRepository.actualizar(id, reporte);
    }
    async eliminar(id: number): Promise<boolean> {
        return await reporteMysqlRepository.eliminar(id);
    }
}

export const reporteService = new ReporteService();