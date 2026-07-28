import { pool } from '../config/database';
import { Equipo } from '../models/equipo';

export class EquipoMysqlRepository {

    async obtenerTodos(): Promise<Equipo[]> {
        const [rows] = await pool.query('SELECT * FROM Equipo');
        return rows as Equipo[];
    }

    
    async obtenerPorId(id: number): Promise<Equipo | null> {
        const [rows]: any = await pool.query('SELECT * FROM Equipo WHERE id_equipo = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0] as Equipo;
    }

    async crear(equipo: Omit<Equipo, 'id'>): Promise<Equipo> {
        const sql = `
            INSERT INTO Equipo (
                nombre, descripcion, numero_serie, fecha_adquisicion, 
                id_tipo_equipo, id_proveedor, id_departamento, estado
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            equipo.nombre ?? '',
            equipo.descripcion ?? '',
            equipo.numeroSerie ?? '',
            equipo.fechaAdquisicion ?? new Date(),
            (equipo as any).idTipoEquipo ?? (equipo as any).tipoEquipoId ?? 1,
            (equipo as any).idProveedor ?? (equipo as any).proveedorId ?? 1,
            (equipo as any).idDepartamento ?? (equipo as any).departamentoId ?? 1,
            equipo.estado ?? 'activo'
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);

        return {
            id: result.insertId,
            ...equipo
        };
    }

    async actualizar(id: number, equipo: Partial<Omit<Equipo, 'id'>>): Promise<boolean> {
        const sql = `
            UPDATE Equipo 
            SET nombre = ?, descripcion = ?, numero_serie = ?, fecha_adquisicion = ?, 
                id_tipo_equipo = ?, id_proveedor = ?, id_departamento = ?, estado = ?
            WHERE id_equipo = ?
        `;
        const valores = [
            equipo.nombre ?? null,
            equipo.descripcion ?? null,
            equipo.numeroSerie ?? null,
            equipo.fechaAdquisicion ?? null,
            (equipo as any).idTipoEquipo ?? (equipo as any).tipoEquipoId ?? null,
            (equipo as any).idProveedor ?? (equipo as any).proveedorId ?? null,
            (equipo as any).idDepartamento ?? (equipo as any).departamentoId ?? null,
            equipo.estado ?? null,
            id
        ];

        const [result]: any = await pool.execute(sql, valores as any[]);
        return result.affectedRows > 0;
    }

    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Equipo WHERE id_equipo = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const equipoMysqlRepository = new EquipoMysqlRepository();