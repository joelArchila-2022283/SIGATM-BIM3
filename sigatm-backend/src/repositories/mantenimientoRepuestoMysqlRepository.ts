import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const mantenimientoRepuestoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM mantenimiento_repuesto');
        return rows;
    },
    async create(datos: { mantenimientoId: number; repuestoId: number; cantidadUsada: number }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO mantenimiento_repuesto (id_mantenimiento, id_repuesto, cantidad_usada) VALUES (?, ?, ?)',
            [datos.mantenimientoId, datos.repuestoId, datos.cantidadUsada]
        );
        return result.affectedRows > 0;
    },
    async delete(mantenimientoId: number, repuestoId: number) {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM mantenimiento_repuesto WHERE id_mantenimiento = ? AND id_repuesto = ?',
            [mantenimientoId, repuestoId]
        );
        return result.affectedRows > 0;
    }
};