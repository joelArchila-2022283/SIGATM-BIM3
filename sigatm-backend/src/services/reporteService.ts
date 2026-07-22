import { Reporte } from '../models/reporte';
import { ReporteRepository } from '../repositories/reporteRepository';

const reporteRepo = new ReporteRepository();

export const reporteService = {
    obtenerTodos: (): Reporte[] => {
        return reporteRepo.obtenerTodos();
    },

    obtenerPorId: (id: number): Reporte | undefined => {
        return reporteRepo.obtenerPorId(id);
    },

    crear: (nuevoReporte: Omit<Reporte, 'id'>): Reporte => {
        const todos = reporteRepo.obtenerTodos();
        const nuevoId = todos.length > 0 ? Math.max(...todos.map(r => r.id)) + 1 : 1;
        
        const reporte: Reporte = {
            id: nuevoId,
            ...nuevoReporte
        };
        
        return reporteRepo.guardar(reporte);
    },

    actualizar: (id: number, datosActualizados: Partial<Omit<Reporte, 'id'>>): boolean => {
        return reporteRepo.actualizar(id, datosActualizados);
    },

    eliminar: (id: number): boolean => {
        return reporteRepo.eliminar(id);
    }
};