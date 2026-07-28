import { pool } from '../config/database';
import { Reporte } from '../models/reporte'; 

export class ReporteMysqlRepository {

    async obtenerTodos(): Promise<Reporte[]> {
        const [rows] = await pool.query('SELECT * FROM Reporte');
        return rows as Reporte[];
    }

    async obtenerPorId(id: number): Promise<Reporte | null> {
        const [rows]: any = await pool.query('SELECT * FROM Reporte WHERE id_reporte = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0] as Reporte;
    }

    async crear(reporte: Omit<Reporte, 'id'>): Promise<Reporte> {
        const sql = `
            INSERT INTO Reporte (fecha_reporte, descripcion, id_equipo, id_usuario)
            VALUES (?, ?, ?, ?)
        `;
        const valores = [
            (reporte as any).fechaReporte ?? (reporte as any).fecha_reporte ?? new Date(),
            reporte.descripcion ?? '',
            (reporte as any).idEquipo ?? (reporte as any).id_equipo,
            (reporte as any).idUsuario ?? (reporte as any).id_usuario
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);

        return {
            id: result.insertId,
            ...reporte
        };
    }

    async actualizar(id: number, reporte: Partial<Omit<Reporte, 'id'>>): Promise<boolean> {
        const sql = `
            UPDATE Reporte 
            SET fecha_reporte = ?, descripcion = ?, id_equipo = ?, id_usuario = ?
            WHERE id_reporte = ?
        `;
        const valores = [
            (reporte as any).fechaReporte ?? (reporte as any).fecha_reporte ?? null,
            reporte.descripcion ?? null,
            (reporte as any).idEquipo ?? (reporte as any).id_equipo ?? null,
            (reporte as any).idUsuario ?? (reporte as any).id_usuario ?? null,
            id
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);
        return result.affectedRows > 0;
    }

    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Reporte WHERE id_reporte = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const reporteMysqlRepository = new ReporteMysqlRepository();