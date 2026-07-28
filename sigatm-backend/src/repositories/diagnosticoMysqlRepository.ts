import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const diagnosticoRepository = {
    async findAll() {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM diagnostico');
        return rows;
    },
    async findById(id: number) {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM diagnostico WHERE id_diagnostico = ?', [id]);
        return rows[0] || null;
    },
    async create(datos: { reporteId: number; tecnicoId: number; descripcion: string; fechaDiagnostico: Date }) {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO diagnostico (id_reporte, id_tecnico, descripcion, fecha_diagnostico) VALUES (?, ?, ?, ?)',
            [datos.reporteId, datos.tecnicoId, datos.descripcion, datos.fechaDiagnostico]
        );
        return result.insertId;
    },
    async update(id: number, datos: { descripcion?: string }) {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE diagnostico SET descripcion = COALESCE(?, descripcion) WHERE id_diagnostico = ?',
            [datos.descripcion, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id: number) {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM diagnostico WHERE id_diagnostico = ?', [id]);
        return result.affectedRows > 0;
    }
};