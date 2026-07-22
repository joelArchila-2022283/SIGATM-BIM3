import { Mantenimiento } from '../models/mantenimiento';
import { mantenimientosSimulados } from '../data/mantenimientosData';
import { Repositorio } from './baseRepository';

export class MantenimientoRepository implements Repositorio<Mantenimiento> {
    private datos: Mantenimiento[];

    constructor() {
        this.datos = mantenimientosSimulados;
    }

    public obtenerTodos(): Mantenimiento[] {
        return this.datos;
    }

    public obtenerPorId(id: number): Mantenimiento | undefined {
        return this.datos.find(m => m.id === id);
    }

    public guardar(mantenimiento: Mantenimiento): Mantenimiento {
        this.datos.push(mantenimiento);
        return mantenimiento;
    }

    public actualizar(id: number, datos: Partial<Mantenimiento>): boolean {
        const indice = this.datos.findIndex(m => m.id === id);
        if (indice === -1) return false;

        this.datos[indice] = { ...this.datos[indice], ...datos };
        return true;
    }

    public eliminar(id: number): boolean {
        const indice = this.datos.findIndex(m => m.id === id);
        if (indice === -1) return false;

        this.datos.splice(indice, 1);
        return true;
    }
}