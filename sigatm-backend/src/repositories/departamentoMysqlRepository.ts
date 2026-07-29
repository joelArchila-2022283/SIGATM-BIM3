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

   
    async create(departamento: any) {
        const [result] = await pool.query(
            'INSERT INTO departamento (nombre) VALUES (?)', 
            [departamento.nombre]
        );
        
        return result; 
    },       

    async actualizar(id: number, usuario: any) {
        const [result]: any = await pool.query(
            `UPDATE usuario SET 
                nombre = ?, 
                apellido = ?, 
                correo = ?, 
                username = ?, 
                id_rol = ?, 
                id_departamento = ? 
            WHERE id = ?`,
            [
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.username,
                usuario.rolId || usuario.id_rol,             // Toma el que venga
                usuario.departamentoId || usuario.id_departamento, // Toma el que venga para que no sea null
                id
            ]
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