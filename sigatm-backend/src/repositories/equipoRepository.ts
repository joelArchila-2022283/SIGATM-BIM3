import { Equipo } from '../models/equipo';
import { equiposSimulados } from '../data/equiposData';

export const equipoRepository = {
    obtenerTodos: (): Equipo[] => {
        return equiposSimulados;
    },
    obtenerPorId: (id: number): Equipo | undefined => {
        return equiposSimulados.find(e => e.id === id);
    },
    guardar: (equipo: Equipo): Equipo => {
        equiposSimulados.push(equipo);
        return equipo;
    },
    actualizar: (id: number, datos: Partial<Equipo>): boolean => {
        const indice = equiposSimulados.findIndex(e => e.id === id);
        if (indice === -1) return false;
        equiposSimulados[indice] = { ...equiposSimulados[indice], ...datos };
        return true;
    },
    eliminar: (id: number): boolean => {
        const indice = equiposSimulados.findIndex(e => e.id === id);
        if (indice === -1) return false;
        equiposSimulados.splice(indice, 1);
        return true;
    }
};