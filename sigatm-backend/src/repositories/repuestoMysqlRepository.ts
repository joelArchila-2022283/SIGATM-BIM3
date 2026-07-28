import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const repuestoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM repuesto');
        return rows;
    },
    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM repuesto WHERE id_repuesto = ?', [id]);
        return rows[0] || null;
    },
    async create(datos: { nombre: string; descripcion?: string; cantidad: number; proveedorId: number }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO repuesto (nombre, descripcion, cantidad, id_proveedor) VALUES (?, ?, ?, ?)',
            [datos.nombre, datos.descripcion || '', datos.cantidad, datos.proveedorId]
        );
        return result.insertId;
    },
    async update(id: number, datos: { nombre?: string; descripcion?: string; cantidad?: number; proveedorId?: number }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE repuesto SET nombre = COALESCE(?, nombre), descripcion = COALESCE(?, descripcion), cantidad = COALESCE(?, cantidad), id_proveedor = COALESCE(?, id_proveedor) WHERE id_repuesto = ?',
            [datos.nombre, datos.descripcion, datos.cantidad, datos.proveedorId, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM repuesto WHERE id_repuesto = ?', [id]);
        return result.affectedRows > 0;
    }
};