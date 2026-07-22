import { Reporte } from '../models/reporte';
import { reportesSimulados } from '../data/reportesData';
import { Repositorio } from './baseRepository';

export class ReporteRepository implements Repositorio<Reporte> {
    private datos: Reporte[];

    constructor() {
        this.datos = reportesSimulados;
    }

    public obtenerTodos(): Reporte[] {
        return this.datos;
    }

    public obtenerPorId(id: number): Reporte | undefined {
        return this.datos.find(r => r.id === id);
    }

    public guardar(reporte: Reporte): Reporte {
        this.datos.push(reporte);
        return reporte;
    }

    public actualizar(id: number, datos: Partial<Reporte>): boolean {
        const indice = this.datos.findIndex(r => r.id === id);
        if (indice === -1) return false;

        this.datos[indice] = { ...this.datos[indice], ...datos };
        return true;
    }

    public eliminar(id: number): boolean {
        const indice = this.datos.findIndex(r => r.id === id);
        if (indice === -1) return false;

        this.datos.splice(indice, 1);
        return true;
    }
}