import { Reporte } from '../models/reporte';
import { reportesSimulados } from '../data/reportesData';

export const reporteService = {
    obtenerTodos: (): Reporte[] => reportesSimulados,
    
    crear: (nuevoReporte: Omit<Reporte, 'id'>): Reporte => {
        const nuevoId = reportesSimulados.length > 0 
            ? Math.max(...reportesSimulados.map(r => r.id)) + 1 
            : 1;
            
        const reporte: Reporte = { id: nuevoId, ...nuevoReporte };
        reportesSimulados.push(reporte);
        return reporte;
    }
};