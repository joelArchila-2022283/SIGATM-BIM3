import { IncomingMessage, ServerResponse } from 'node:http';
import { usuarioService } from '../services/usuarioService';
import { equipoService } from '../services/equipoService';
import { reporteService } from '../services/reporteService';
import { mantenimientoService } from '../services/mantenimientoService';
import { EstadoEquipo } from '../models/enums';

export async function getBody<T>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk: Buffer | string) => data += chunk);
        req.on('end', () => {
            try {
                resolve(data ? JSON.parse(data) : {} as T);
            } catch {
                reject(new Error('JSON malformado en la petición'));
            }
        });
    });
}

export async function handleRoutes(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = req.url || '';
    const method = req.method;

    // 1. RUTAS DE USUARIOS (/usuarios)
    if (url === '/usuarios' && method === 'GET') {
        const usuarios = await usuarioService.obtenerTodos();
        res.writeHead(200);
        res.end(JSON.stringify(usuarios));
        return;
    }

    if (url === '/usuarios' && method === 'POST') {
        const body = await getBody<any>(req);
        const nuevoUsuario = await usuarioService.crear({
            nombre: body.nombre,
            apellido: body.apellido,
            correo: body.correo,
            username: body.username,
            password: body.password,
            rolId: Number(body.rolId) || 3
        });
        res.writeHead(201);
        res.end(JSON.stringify(nuevoUsuario));
        return;
    }

    if (url.startsWith('/usuarios/') && method === 'GET') {
        const id = Number(url.split('/')[2]);
        const usuario = await usuarioService.obtenerPorId(id);
        if (!usuario) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Usuario no encontrado' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(usuario));
        return;
    }

    if (url.startsWith('/usuarios/') && method === 'PUT') {
        const id = Number(url.split('/')[2]);
        const body = await getBody<any>(req);
        const actualizado = await usuarioService.actualizar(id, body);
        if (!actualizado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Usuario no encontrado para actualizar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Usuario actualizado con éxito' }));
        return;
    }

    if (url.startsWith('/usuarios/') && method === 'DELETE') {
        const id = Number(url.split('/')[2]);
        const eliminado = await usuarioService.eliminar(id);
        if (!eliminado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Usuario no encontrado para eliminar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Usuario eliminado con éxito' }));
        return;
    }

    // 2. RUTAS DE EQUIPOS (/equipos)
    if (url === '/equipos' && method === 'GET') {
        const equipos = await equipoService.obtenerTodos();
        res.writeHead(200);
        res.end(JSON.stringify(equipos));
        return;
    }

    if (url === '/equipos' && method === 'POST') {
        const body = await getBody<any>(req);
        const nuevoEquipo = await equipoService.crear({
            nombre: body.nombre,
            descripcion: body.descripcion || '',
            numeroSerie: body.numeroSerie,
            fechaAdquisicion: new Date(),
            tipoEquipoId: Number(body.tipoEquipoId) || 1,
            proveedorId: Number(body.proveedorId) || 1,
            departamentoId: Number(body.departamentoId) || 1,
            estado: body.estado || EstadoEquipo.ACTIVO
        });
        res.writeHead(201);
        res.end(JSON.stringify(nuevoEquipo));
        return;
    }

    if (url.startsWith('/equipos/') && method === 'GET') {
        const id = Number(url.split('/')[2]);
        const equipo = await equipoService.obtenerPorId(id);
        if (!equipo) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Equipo no encontrado' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(equipo));
        return;
    }

    if (url.startsWith('/equipos/') && method === 'PUT') {
        const id = Number(url.split('/')[2]);
        const body = await getBody<any>(req);
        const actualizado = await equipoService.actualizar(id, body);
        if (!actualizado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Equipo no encontrado para actualizar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Equipo actualizado con éxito' }));
        return;
    }

    if (url.startsWith('/equipos/') && method === 'DELETE') {
        const id = Number(url.split('/')[2]);
        const eliminado = await equipoService.eliminar(id);
        if (!eliminado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Equipo no encontrado para eliminar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Equipo eliminado con éxito' }));
        return;
    }

    // 3. RUTAS DE REPORTES (/reportes)
    if (url === '/reportes' && method === 'GET') {
        const reportes = await reporteService.obtenerTodos();
        res.writeHead(200);
        res.end(JSON.stringify(reportes));
        return;
    }

    if (url === '/reportes' && method === 'POST') {
        const body = await getBody<any>(req);
        const nuevoReporte = await reporteService.crear(body);
        res.writeHead(201);
        res.end(JSON.stringify(nuevoReporte));
        return;
    }

    if (url.startsWith('/reportes/') && method === 'GET') {
        const id = Number(url.split('/')[2]);
        const reporte = await reporteService.obtenerPorId(id);
        if (!reporte) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Reporte no encontrado' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(reporte));
        return;
    }

    if (url.startsWith('/reportes/') && method === 'PUT') {
        const id = Number(url.split('/')[2]);
        const body = await getBody<any>(req);
        const actualizado = await reporteService.actualizar(id, body);
        if (!actualizado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Reporte no encontrado para actualizar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Reporte actualizado con éxito' }));
        return;
    }

    if (url.startsWith('/reportes/') && method === 'DELETE') {
        const id = Number(url.split('/')[2]);
        const eliminado = await reporteService.eliminar(id);
        if (!eliminado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Reporte no encontrado para eliminar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Reporte eliminado con éxito' }));
        return;
    }

    // 4. RUTAS DE MANTENIMIENTOS (/mantenimientos)
    if (url === '/mantenimientos' && method === 'GET') {
        const mantenimientos = await mantenimientoService.obtenerTodos();
        res.writeHead(200);
        res.end(JSON.stringify(mantenimientos));
        return;
    }

    if (url === '/mantenimientos' && method === 'POST') {
        const body = await getBody<any>(req);
        const nuevoMantenimiento = await mantenimientoService.crear(body);
        res.writeHead(201);
        res.end(JSON.stringify(nuevoMantenimiento));
        return;
    }

    if (url.startsWith('/mantenimientos/') && method === 'GET') {
        const id = Number(url.split('/')[2]);
        const mantenimiento = await mantenimientoService.obtenerPorId(id);
        if (!mantenimiento) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Mantenimiento no encontrado' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(mantenimiento));
        return;
    }

    if (url.startsWith('/mantenimientos/') && method === 'PUT') {
        const id = Number(url.split('/')[2]);
        const body = await getBody<any>(req);
        const actualizado = await mantenimientoService.actualizar(id, body);
        if (!actualizado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Mantenimiento no encontrado para actualizar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Mantenimiento actualizado con éxito' }));
        return;
    }

    if (url.startsWith('/mantenimientos/') && method === 'DELETE') {
        const id = Number(url.split('/')[2]);
        const eliminado = await mantenimientoService.eliminar(id);
        if (!eliminado) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: 'Mantenimiento no encontrado para eliminar' }));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Mantenimiento eliminado con éxito' }));
        return;
    }

    // Ruta no encontrada
    res.writeHead(404);
    res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));
}