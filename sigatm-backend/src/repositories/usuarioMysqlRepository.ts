import { pool } from '../config/database';
import { Usuario } from '../models/usuario';

export class UsuarioMysqlRepository {

    // READ (Obtener todos)
    async obtenerTodos(): Promise<Usuario[]> {
        const [rows] = await pool.query('SELECT * FROM Usuario');
        return rows as Usuario[];
    }

    // READ BY ID
    async obtenerPorId(id: number): Promise<Usuario | null> {
        const [rows]: any = await pool.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0] as Usuario;
    }

    // CREATE
    async crear(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
        const sql = `
            INSERT INTO Usuario (nombre, apellido, correo, telefono, username, password, id_rol, id_departamento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            usuario.nombre ?? '',
            usuario.apellido ?? '',
            usuario.correo ?? '',
            (usuario as any).telefono ?? null,
            usuario.username ?? '',
            usuario.password ?? '',
            (usuario as any).idRol ?? (usuario as any).rolId ?? 1,
            (usuario as any).idDepartamento ?? 1
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);
        
        return {
            id: result.insertId,
            ...usuario
        };
    }

    // UPDATE
    async actualizar(id: number, usuario: Partial<Omit<Usuario, 'id'>>): Promise<boolean> {
        const sql = `
            UPDATE Usuario 
            SET nombre = ?, apellido = ?, correo = ?, telefono = ?, username = ?, password = ?, id_rol = ?, id_departamento = ?
            WHERE id_usuario = ?
        `;
        const valores = [
            usuario.nombre ?? null,
            usuario.apellido ?? null,
            usuario.correo ?? null,
            (usuario as any).telefono ?? null,
            usuario.username ?? null,
            usuario.password ?? null,
            (usuario as any).idRol ?? (usuario as any).rolId ?? null,
            (usuario as any).idDepartamento ?? null,
            id
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);
        return result.affectedRows > 0;
    }

    // DELETE
    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Usuario WHERE id_usuario = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const usuarioMysqlRepository = new UsuarioMysqlRepository();