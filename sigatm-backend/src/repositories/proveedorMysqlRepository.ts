import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const proveedorRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM proveedor');
        return rows;
    },

    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM proveedor WHERE id_proveedor = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: { nombre: string; contacto?: string; telefono?: string; correo?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO proveedor (nombre, contacto, telefono, correo) VALUES (?, ?, ?, ?)',
            [datos.nombre, datos.contacto || '', datos.telefono || '', datos.correo || '']
        );
        return result.insertId;
    },

    async update(id: number, datos: { nombre?: string; contacto?: string; telefono?: string; correo?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE proveedor SET nombre = COALESCE(?, nombre), contacto = COALESCE(?, contacto), telefono = COALESCE(?, telefono), correo = COALESCE(?, correo) WHERE id_proveedor = ?',
            [datos.nombre, datos.contacto, datos.telefono, datos.correo, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM proveedor WHERE id_proveedor = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};