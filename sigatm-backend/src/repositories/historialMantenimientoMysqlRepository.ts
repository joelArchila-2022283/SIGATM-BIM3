import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const historialMantenimientoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM historial_mantenimiento');
        return rows;
    },
    async findByMantenimientoId(mantenimientoId: number) {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM historial_mantenimiento WHERE id_mantenimiento = ?', 
            [mantenimientoId]
        );
        return rows;
    },
    async create(datos: { mantenimientoId: number; fecha: Date; observaciones?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO historial_mantenimiento (id_mantenimiento, fecha, observaciones) VALUES (?, ?, ?)',
            [datos.mantenimientoId, datos.fecha, datos.observaciones || '']
        );
        return result.insertId;
    }
};