import { pool } from '../config/database'; // Ajusta la ruta a tu conexión DB

export const proveedorRepository = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM Proveedor');
        return rows;
    },

    async findById(id: number) {
        const [rows]: any = await pool.query('SELECT * FROM Proveedor WHERE id_proveedor = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: any) {
        const [result]: any = await pool.query(
            'INSERT INTO Proveedor (nombre, contacto, direccion) VALUES (?, ?, ?)',
            [datos.nombre, datos.contacto ?? null, datos.direccion ?? null]
        );
        return { 
            id_proveedor: result.insertId, 
            nombre: datos.nombre, 
            contacto: datos.contacto, 
            direccion: datos.direccion 
        };
    },

    async update(id: number, datos: any) {
        const [result]: any = await pool.query(
            'UPDATE Proveedor SET nombre = ?, contacto = ?, direccion = ? WHERE id_proveedor = ?',
            [datos.nombre, datos.contacto ?? null, datos.direccion ?? null, id]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result]: any = await pool.query(
            'DELETE FROM Proveedor WHERE id_proveedor = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};