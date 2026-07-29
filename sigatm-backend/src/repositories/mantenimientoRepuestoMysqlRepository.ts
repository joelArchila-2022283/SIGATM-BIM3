import { pool } from '../config/database';

export const mantenimientoRepuestoRepository = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM Mantenimiento_Repuesto');
        return rows;
    },

    async findByIds(mantenimientoId: number, repuestoId: number) {
        const [rows]: any = await pool.query(
            'SELECT * FROM Mantenimiento_Repuesto WHERE id_mantenimiento = ? AND id_repuesto = ?',
            [mantenimientoId, repuestoId]
        );
        return rows[0] || null;
    },

    async create(datos: any) {
        const mantenimientoId = datos.id_mantenimiento ?? datos.mantenimientoId;
        const repuestoId = datos.id_repuesto ?? datos.repuestoId;
        const cantidadUsada = datos.cantidad_usada ?? datos.cantidadUsada ?? 1;

        await pool.query(
            'INSERT INTO Mantenimiento_Repuesto (id_mantenimiento, id_repuesto, cantidad_usada) VALUES (?, ?, ?)',
            [mantenimientoId, repuestoId, cantidadUsada]
        );

        return {
            id_mantenimiento: mantenimientoId,
            id_repuesto: repuestoId,
            cantidad_usada: cantidadUsada
        };
    },

    async delete(mantenimientoId: number, repuestoId: number) {
        const [result]: any = await pool.query(
            'DELETE FROM Mantenimiento_Repuesto WHERE id_mantenimiento = ? AND id_repuesto = ?',
            [mantenimientoId, repuestoId]
        );
        return result.affectedRows > 0;
    }
};