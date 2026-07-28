import { equipoMysqlRepository } from '../repositories/equipoMysqlRepository';
import { Equipo } from '../models/equipo';

export class EquipoService {
    async obtenerTodos(): Promise<Equipo[]> {
        return await equipoMysqlRepository.obtenerTodos();
    }

    async obtenerPorId(id: number): Promise<Equipo | null> {
        return await equipoMysqlRepository.obtenerPorId(id);
    }

    async crear(equipo: Omit<Equipo, 'id'>): Promise<Equipo> {
        return await equipoMysqlRepository.crear(equipo);
    }

    async actualizar(id: number, equipo: Partial<Omit<Equipo, 'id'>>): Promise<boolean> {
        return await equipoMysqlRepository.actualizar(id, equipo);
    }

    async eliminar(id: number): Promise<boolean> {
        return await equipoMysqlRepository.eliminar(id);
    }
}

export const equipoService = new EquipoService();