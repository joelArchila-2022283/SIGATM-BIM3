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

    async crear(mantenimiento: any) {
        const [result]: any = await pool.query(
            `INSERT INTO Mantenimiento (fecha_mantenimiento, tipo, descripcion, id_equipo, id_tecnico) 
            VALUES (?, ?, ?, ?, ?)`,
            [
                mantenimiento.fechaInicio ?? mantenimiento.fecha_mantenimiento ?? new Date(),
                (mantenimiento.tipo ?? 'preventivo').toLowerCase(), // MySQL espera 'preventivo' o 'correctivo' en minúsculas
                mantenimiento.descripcion ?? '',
                mantenimiento.equipoId ?? mantenimiento.id_equipo,
                mantenimiento.tecnicoId ?? mantenimiento.id_tecnico
            ]
        );
        return { id_mantenimiento: result.insertId, ...mantenimiento };
    }

    async actualizar(id: number, mantenimiento: any) {
        const [result]: any = await pool.query(
            `UPDATE Mantenimiento 
            SET fecha_mantenimiento = ?, tipo = ?, descripcion = ?, id_equipo = ?, id_tecnico = ?
            WHERE id_mantenimiento = ?`,
            [
                mantenimiento.fechaInicio ?? mantenimiento.fecha_mantenimiento ?? new Date(),
                (mantenimiento.tipo ?? 'preventivo').toLowerCase(),
                mantenimiento.descripcion ?? '',
                mantenimiento.equipoId ?? mantenimiento.id_equipo,
                mantenimiento.tecnicoId ?? mantenimiento.id_tecnico,
                id
            ]
        );
        return result.affectedRows > 0;
    }

    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Mantenimiento WHERE id_mantenimiento = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const mantenimientoMysqlRepository = new MantenimientoMysqlRepository();