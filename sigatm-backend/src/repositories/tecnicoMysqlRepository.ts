import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const tecnicoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tecnico');
        return rows;
    },
    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tecnico WHERE id_tecnico = ?', [id]);
        return rows[0] || null;
    },
    async create(datos: { usuarioId: number; especialidad: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO tecnico (id_usuario, especialidad) VALUES (?, ?)',
            [datos.usuarioId, datos.especialidad]
        );
        return result.insertId;
    },
    async update(id: number, datos: { especialidad?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE tecnico SET especialidad = COALESCE(?, especialidad) WHERE id_tecnico = ?',
            [datos.especialidad, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM tecnico WHERE id_tecnico = ?', [id]);
        return result.affectedRows > 0;
    }
};