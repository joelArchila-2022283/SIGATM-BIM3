import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const rolRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM rol');
        return rows;
    },

    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM rol WHERE id_rol = ?', [id]);
        return rows[0] || null;
    },

    async create(nombre: string) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO rol (nombre) VALUES (?)',
            [nombre]
        );
        return result.insertId;
    },

    async update(id: number, nombre?: string) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE rol SET nombre = COALESCE(?, nombre) WHERE id_rol = ?',
            [nombre, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM rol WHERE id_rol = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};