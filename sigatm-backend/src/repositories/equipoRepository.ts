import { Equipo } from '../models/equipo';
import { equiposSimulados } from '../data/equiposData';
import { Repositorio } from './baseRepository';

export class EquipoRepository implements Repositorio<Equipo> {
    private datos: Equipo[];

    constructor() {
        this.datos = equiposSimulados;
    }

    public obtenerTodos(): Equipo[] {
        return this.datos;
    }

    public obtenerPorId(id: number): Equipo | undefined {
        return this.datos.find(e => e.id === id);
    }

    public guardar(equipo: Equipo): Equipo {
        this.datos.push(equipo);
        return equipo;
    }

    public actualizar(id: number, datos: Partial<Equipo>): boolean {
        const indice = this.datos.findIndex(e => e.id === id);
        if (indice === -1) return false;

        this.datos[indice] = { ...this.datos[indice], ...datos };
        return true;
    }

    public eliminar(id: number): boolean {
        const indice = this.datos.findIndex(e => e.id === id);
        if (indice === -1) return false;

        this.datos.splice(indice, 1);
        return true;
    }
}