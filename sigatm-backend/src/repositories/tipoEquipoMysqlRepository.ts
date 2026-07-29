import { pool } from '../config/database'; 

export const tipoEquipoRepository = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM TipoEquipo');
        return rows;
    },

    async findById(id: number) {
        const [rows]: any = await pool.query('SELECT * FROM TipoEquipo WHERE id_tipo_equipo = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: any) {
        const [result]: any = await pool.query(
            'INSERT INTO TipoEquipo (nombre) VALUES (?)',
            [datos.nombre]
        );
        return { id_tipo_equipo: result.insertId, nombre: datos.nombre };
    },

    async update(id: number, datos: any) {
        const [result]: any = await pool.query(
            'UPDATE TipoEquipo SET nombre = ? WHERE id_tipo_equipo = ?',
            [datos.nombre, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result]: any = await pool.query(
            'DELETE FROM TipoEquipo WHERE id_tipo_equipo = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};