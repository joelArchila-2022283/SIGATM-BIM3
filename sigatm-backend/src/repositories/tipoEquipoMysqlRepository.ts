import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const tipoEquipoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tipo_equipo');
        return rows;
    },

    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tipo_equipo WHERE id_tipo_equipo = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: { nombre: string; descripcion?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO tipo_equipo (nombre, descripcion) VALUES (?, ?)',
            [datos.nombre, datos.descripcion || '']
        );
        return result.insertId;
    },

    async update(id: number, datos: { nombre?: string; descripcion?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE tipo_equipo SET nombre = COALESCE(?, nombre), descripcion = COALESCE(?, descripcion) WHERE id_tipo_equipo = ?',
            [datos.nombre, datos.descripcion, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM tipo_equipo WHERE id_tipo_equipo = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};