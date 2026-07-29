import { pool } from '../config/database'; 

export const tecnicoRepository = {
    async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM tecnico');
        return rows;
    },

    async obtenerPorId(id: number) {
        const [rows]: any = await pool.query('SELECT * FROM tecnico WHERE id_tecnico = ?', [id]);
        return rows[0] || null;
    },

    async crear(datos: any) {
        const usuarioId = datos.usuarioId ?? datos.id_usuario;
        const [result]: any = await pool.query(
            'INSERT INTO tecnico (id_usuario) VALUES (?)',
            [usuarioId]
        );
        return { id_tecnico: result.insertId, usuarioId };
    },

    async actualizar(id: number, datos: any) {
        const usuarioId = datos.usuarioId ?? datos.id_usuario;
        const [result]: any = await pool.query(
            'UPDATE tecnico SET id_usuario = ? WHERE id_tecnico = ?',
            [usuarioId, id]
        );
        return result.affectedRows > 0;
    },

    async eliminar(id: number) {
        const [result]: any = await pool.query(
            'DELETE FROM tecnico WHERE id_tecnico = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};