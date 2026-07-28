import { pool } from '../config/database';
import { Mantenimiento } from '../models/mantenimiento'; 

export class MantenimientoMysqlRepository {

    async obtenerTodos(): Promise<Mantenimiento[]> {
        const [rows] = await pool.query('SELECT * FROM Mantenimiento');
        return rows as Mantenimiento[];
    }

    async obtenerPorId(id: number): Promise<Mantenimiento | null> {
        const [rows]: any = await pool.query('SELECT * FROM Mantenimiento WHERE id_mantenimiento = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0] as Mantenimiento;
    }

    async crear(mantenimiento: Omit<Mantenimiento, 'id'>): Promise<Mantenimiento> {
        const sql = `
            INSERT INTO Mantenimiento (fecha_mantenimiento, tipo, descripcion, id_equipo, id_tecnico)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [
            (mantenimiento as any).fechaMantenimiento ?? (mantenimiento as any).fecha_mantenimiento ?? new Date(),
            mantenimiento.tipo ?? 'preventivo',
            mantenimiento.descripcion ?? '',
            (mantenimiento as any).idEquipo ?? (mantenimiento as any).id_equipo,
            (mantenimiento as any).idTecnico ?? (mantenimiento as any).id_tecnico
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);

        return {
            id: result.insertId,
            ...mantenimiento
        };
    }

    async actualizar(id: number, mantenimiento: Partial<Omit<Mantenimiento, 'id'>>): Promise<boolean> {
        const sql = `
            UPDATE Mantenimiento 
            SET fecha_mantenimiento = ?, tipo = ?, descripcion = ?, id_equipo = ?, id_tecnico = ?
            WHERE id_mantenimiento = ?
        `;
        const valores = [
            (mantenimiento as any).fechaMantenimiento ?? (mantenimiento as any).fecha_mantenimiento ?? null,
            mantenimiento.tipo ?? null,
            mantenimiento.descripcion ?? null,
            (mantenimiento as any).idEquipo ?? (mantenimiento as any).id_equipo ?? null,
            (mantenimiento as any).idTecnico ?? (mantenimiento as any).id_tecnico ?? null,
            id
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);
        return result.affectedRows > 0;
    }

    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Mantenimiento WHERE id_mantenimiento = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const mantenimientoMysqlRepository = new MantenimientoMysqlRepository();