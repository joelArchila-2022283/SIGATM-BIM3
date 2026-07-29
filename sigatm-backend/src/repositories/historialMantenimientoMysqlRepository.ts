import { pool } from '../config/database';

export const historialMantenimientoRepository = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM HistorialMantenimiento');
        return rows;
    },

    async findById(id: number) {
        const [rows]: any = await pool.query(
            'SELECT * FROM HistorialMantenimiento WHERE id_historial = ?', 
            [id]
        );
        return rows[0] || null;
    },

    async create(datos: any) {
        const equipoId = datos.id_equipo ?? datos.equipoId;
        const mantenimientoId = datos.id_mantenimiento ?? datos.mantenimientoId;
        const fecha = datos.fecha ?? new Date();
        const observaciones = datos.observaciones ?? null;

        const [result]: any = await pool.query(
            'INSERT INTO HistorialMantenimiento (id_equipo, id_mantenimiento, fecha, observaciones) VALUES (?, ?, ?, ?)',
            [equipoId, mantenimientoId, fecha, observaciones]
        );

        return {
            id_historial: result.insertId,
            id_equipo: equipoId,
            id_mantenimiento: mantenimientoId,
            fecha,
            observaciones
        };
    }
};