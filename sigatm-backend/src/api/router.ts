import { IncomingMessage, ServerResponse } from 'node:http';
import { usuarioService } from '../services/usuarioService';
import { equipoService } from '../services/equipoService';
import { reporteService } from '../services/reporteService';
import { mantenimientoService } from '../services/mantenimientoService';
import { repuestoService } from '../services/repuestoService';
import { tecnicoService } from '../services/tecnicoService';
import { diagnosticoService } from '../services/diagnosticoService';
import { mantenimientoRepuestoService } from '../services/mantenimientoRepuestoService';
import { historialMantenimientoService } from '../services/historialMantenimientoService';
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

    // RUTAS DE USUARIOS (/usuarios)
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

    // RUTAS DE EQUIPOS (/equipos)
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

    // RUTAS DE REPORTES (/reportes)
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

    // RUTAS DE MANTENIMIENTOS (/mantenimientos)
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

    //  RUTAS DE REPUESTOS (/repuestos)
    if (url === '/repuestos' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await repuestoService.obtenerTodos()));
        return;
    }
    if (url === '/repuestos' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify(await repuestoService.crear(await getBody(req))));
        return;
    }
    if (url.startsWith('/repuestos/') && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await repuestoService.obtenerPorId(Number(url.split('/')[2]))));
        return;
    }
    if (url.startsWith('/repuestos/') && method === 'PUT') {
        res.writeHead(200);
        res.end(JSON.stringify(await repuestoService.actualizar(Number(url.split('/')[2]), await getBody(req))));
        return;
    }
    if (url.startsWith('/repuestos/') && method === 'DELETE') {
        res.writeHead(200);
        res.end(JSON.stringify(await repuestoService.eliminar(Number(url.split('/')[2]))));
        return;
    }

    // RUTAS DE TECNICOS (/tecnicos)
    if (url === '/tecnicos' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await tecnicoService.obtenerTodos()));
        return;
    }
    if (url === '/tecnicos' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify(await tecnicoService.crear(await getBody(req))));
        return;
    }
    if (url.startsWith('/tecnicos/') && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await tecnicoService.obtenerPorId(Number(url.split('/')[2]))));
        return;
    }
    if (url.startsWith('/tecnicos/') && method === 'PUT') {
        res.writeHead(200);
        res.end(JSON.stringify(await tecnicoService.actualizar(Number(url.split('/')[2]), await getBody(req))));
        return;
    }
    if (url.startsWith('/tecnicos/') && method === 'DELETE') {
        res.writeHead(200);
        res.end(JSON.stringify(await tecnicoService.eliminar(Number(url.split('/')[2]))));
        return;
    }

    // RUTAS DE DIAGNOSTICOS (/diagnosticos)
    if (url === '/diagnosticos' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await diagnosticoService.obtenerTodos()));
        return;
    }
    if (url === '/diagnosticos' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify(await diagnosticoService.crear(await getBody(req))));
        return;
    }
    if (url.startsWith('/diagnosticos/') && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await diagnosticoService.obtenerPorId(Number(url.split('/')[2]))));
        return;
    }
    if (url.startsWith('/diagnosticos/') && method === 'PUT') {
        res.writeHead(200);
        res.end(JSON.stringify(await diagnosticoService.actualizar(Number(url.split('/')[2]), await getBody(req))));
        return;
    }
    if (url.startsWith('/diagnosticos/') && method === 'DELETE') {
        res.writeHead(200);
        res.end(JSON.stringify(await diagnosticoService.eliminar(Number(url.split('/')[2]))));
        return;
    }

    //  RUTAS MANTENIMIENTO-REPUESTOS (/mantenimiento-repuestos)
    if (url === '/mantenimiento-repuestos' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await mantenimientoRepuestoService.obtenerTodos()));
        return;
    }
    if (url === '/mantenimiento-repuestos' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify(await mantenimientoRepuestoService.crear(await getBody(req))));
        return;
    }
    if (url.startsWith('/mantenimiento-repuestos/') && method === 'DELETE') {
        const partes = url.split('/');
        await mantenimientoRepuestoService.eliminar(Number(partes[2]), Number(partes[3]));
        res.writeHead(200);
        res.end(JSON.stringify({ mensaje: 'Eliminado con éxito' }));
        return;
    }

    // RUTAS HISTORIAL MANTENIMIENTO (/historial-mantenimiento)
    if (url === '/historial-mantenimiento' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(await historialMantenimientoService.obtenerTodos()));
        return;
    }
    if (url === '/historial-mantenimiento' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify(await historialMantenimientoService.crear(await getBody(req))));
        return;
    }
    if (url.startsWith('/historial-mantenimiento/mantenimiento/') && method === 'GET') {
        const id = Number(url.split('/')[3]);
        res.writeHead(200);
        res.end(JSON.stringify(await historialMantenimientoService.obtenerPorMantenimiento(id)));
        return;
    }

    // Ruta no encontrada
    res.writeHead(404);
    res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));
}