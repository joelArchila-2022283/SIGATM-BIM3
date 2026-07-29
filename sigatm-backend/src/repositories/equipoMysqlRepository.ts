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

    async actualizar(id: number, equipo: any) {
        const [result]: any = await pool.query(
            `UPDATE Equipo 
            SET nombre = ?, descripcion = ?, numero_serie = ?, fecha_adquisicion = ?, 
                id_tipo_equipo = ?, id_proveedor = ?, id_departamento = ?, estado = ?
            WHERE id_equipo = ?`,
            [
                equipo.nombre,
                equipo.descripcion || '',
                equipo.numero_serie ?? equipo.numeroSerie ?? '',
                equipo.fecha_adquisicion ?? equipo.fechaAdquisicion ?? new Date(),
                equipo.id_tipo_equipo ?? equipo.tipoEquipoId ?? equipo.tipoId,
                equipo.id_proveedor ?? equipo.proveedorId,
                equipo.id_departamento ?? equipo.departamentoId,
                equipo.estado || 'Activo',
                id
            ]
        );
        return result.affectedRows > 0;
    }

    async eliminar(id: number): Promise<boolean> {
        const [result]: any = await pool.execute('DELETE FROM Equipo WHERE id_equipo = ?', [id]);
        return result.affectedRows > 0;
    }
}

export const equipoMysqlRepository = new EquipoMysqlRepository();