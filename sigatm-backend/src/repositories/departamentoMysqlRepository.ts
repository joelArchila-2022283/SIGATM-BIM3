import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const departamentoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM departamento');
        return rows;
    },

    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM departamento WHERE id_departamento = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: { nombre: string; ubicacion?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO departamento (nombre, ubicacion) VALUES (?, ?)',
            [datos.nombre, datos.ubicacion || '']
        );
        return result.insertId;
    },

    async update(id: number, datos: { nombre?: string; ubicacion?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE departamento SET nombre = COALESCE(?, nombre), ubicacion = COALESCE(?, ubicacion) WHERE id_departamento = ?',
            [datos.nombre, datos.ubicacion, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM departamento WHERE id_departamento = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};