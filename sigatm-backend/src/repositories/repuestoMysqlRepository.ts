import { pool } from '../config/database';

export const repuestoRepository = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM Repuesto');
        return rows;
    },

    async findById(id: number) {
        const [rows]: any = await pool.query('SELECT * FROM Repuesto WHERE id_repuesto = ?', [id]);
        return rows[0] || null;
    },

    async create(datos: any) {
        const proveedorId = datos.id_proveedor ?? datos.proveedorId;

        const [result]: any = await pool.query(
            'INSERT INTO Repuesto (nombre, descripcion, cantidad, id_proveedor) VALUES (?, ?, ?, ?)',
            [
                datos.nombre,
                datos.descripcion ?? null,
                datos.cantidad ?? 0,
                proveedorId
            ]
        );
        return { 
            id_repuesto: result.insertId, 
            nombre: datos.nombre, 
            descripcion: datos.descripcion, 
            cantidad: datos.cantidad ?? 0, 
            id_proveedor: proveedorId 
        };
    },

    async update(id: number, datos: any) {
        const proveedorId = datos.id_proveedor ?? datos.proveedorId;

        const [result]: any = await pool.query(
            'UPDATE Repuesto SET nombre = ?, descripcion = ?, cantidad = ?, id_proveedor = ? WHERE id_repuesto = ?',
            [
                datos.nombre,
                datos.descripcion ?? null,
                datos.cantidad ?? 0,
                proveedorId,
                id
            ]
        );
        return result.affectedRows > 0;
    },

    async delete(id: number) {
        const [result]: any = await pool.query('DELETE FROM Repuesto WHERE id_repuesto = ?', [id]);
        return result.affectedRows > 0;
    }
};