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
import { rolService } from '../services/rolService';
import { departamentoService } from '../services/departamentoService';
import { tipoEquipoService } from '../services/tipoEquipoService';
import { proveedorService } from '../services/proveedorService';

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
    
    res.setHeader('Content-Type', 'application/json');

    try {
        const url = req.url || '';
        const method = req.method;

        // 1. RUTAS DE ROLES (/roles)
        if (url === '/roles' && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(await rolService.obtenerTodos()));
            return;
        }
        if (url === '/roles' && method === 'POST') {
            const body = await getBody<any>(req);
            res.writeHead(201);
            res.end(JSON.stringify(await rolService.crear(body)));
            return;
        }

        // 2. RUTAS DE DEPARTAMENTOS (/departamentos)
        if (url === '/departamentos' && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(await departamentoService.obtenerTodos()));
            return;
        }
        if (url === '/departamentos' && method === 'POST') {
            const body = await getBody<any>(req);
            res.writeHead(201);
            res.end(JSON.stringify(await departamentoService.crear(body)));
            return;
        }

        
        // 3. RUTAS DE TIPO EQUIPO (/tipos-equipos)
        if (url === '/tipos-equipos' && method === 'GET') {
            try {
                const tipos = await tipoEquipoService.obtenerTodos();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(tipos));
                return; 
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al obtener tipos de equipo', error: error.message }));
                }
                return;
            }
        }

        if (url === '/tipos-equipos' && method === 'POST') {
            const body = await getBody<any>(req);
            res.writeHead(201);
            res.end(JSON.stringify(await tipoEquipoService.crear(body)));
            return;
        }

        // PUT /tipos-equipos/:id
        if (url?.startsWith('/tipos-equipos/') && method === 'PUT') {
            try {
                const id = Number(url.split('/')[2]);
                const body = await getBody<any>(req);

                const actualizado = await tipoEquipoService.actualizar(id, body);

                if (!actualizado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Tipo de equipo no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Tipo de equipo actualizado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al actualizar tipo de equipo', error: error.message }));
                }
                return;
            }
        }

        // DELETE /tipos-equipos/:id
        if (url?.startsWith('/tipos-equipos/') && method === 'DELETE') {
            try {
                const id = Number(url.split('/')[2]);
                const eliminado = await tipoEquipoService.eliminar(id);

                if (!eliminado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Tipo de equipo no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Tipo de equipo eliminado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al eliminar tipo de equipo', error: error.message }));
                }
                return;
            }
        }

        // 4. RUTAS DE PROVEEDORES (/proveedores)
        // GET /proveedores
        if ((url === '/proveedores' || url === '/proveedor') && method === 'GET') {
            try {
                const proveedores = await proveedorService.obtenerTodos();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(proveedores));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al obtener proveedores', error: error.message }));
                }
                return;
            }
        }

        // POST /proveedores
        if ((url === '/proveedores' || url === '/proveedor') && method === 'POST') {
            try {
                const body = await getBody<any>(req);
                const nuevo = await proveedorService.crear(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevo));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al crear proveedor', error: error.message }));
                }
                return;
            }
        }

        // PUT /proveedores/:id
        if ((url?.startsWith('/proveedores/') || url?.startsWith('/proveedor/')) && method === 'PUT') {
            try {
                const id = Number(url.split('/')[2]);
                const body = await getBody<any>(req);
                const actualizado = await proveedorService.actualizar(id, body);

                if (!actualizado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Proveedor no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Proveedor actualizado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al actualizar proveedor', error: error.message }));
                }
                return;
            }
        }

        // DELETE /proveedores/:id
        if ((url?.startsWith('/proveedores/') || url?.startsWith('/proveedor/')) && method === 'DELETE') {
            try {
                const id = Number(url.split('/')[2]);
                const eliminado = await proveedorService.eliminar(id);

                if (!eliminado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Proveedor no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Proveedor eliminado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al eliminar proveedor', error: error.message }));
                }
                return;
            }
        }

        // 5. RUTAS DE USUARIOS (/usuarios)
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
                telefono: body.telefono,
                username: body.username,
                password: body.password,
                rolId: Number(body.rolId || body.id_rol),
                departamentoId: Number(body.departamentoId || body.id_departamento)
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

        // 6. RUTAS DE EQUIPOS (/equipos)
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
                numeroSerie: body.numeroSerie || body.numero_serie,
                fechaAdquisicion: body.fechaAdquisicion ? new Date(body.fechaAdquisicion) : new Date(),
                tipoEquipoId: Number(body.tipoEquipoId || body.id_tipo_equipo),
                proveedorId: Number(body.proveedorId || body.id_proveedor),
                departamentoId: Number(body.departamentoId || body.id_departamento),
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

        // 7. RUTAS DE REPORTES (/reportes)
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

        // 8. RUTAS DE MANTENIMIENTOS (/mantenimientos)
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

        // 9. RUTAS DE REPUESTOS (/repuestos)
        // GET /repuestos
        if ((url === '/repuestos' || url === '/repuesto') && method === 'GET') {
            try {
                const repuestos = await repuestoService.obtenerTodos();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(repuestos));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al obtener repuestos', error: error.message }));
                }
                return;
            }
        }

        // POST /repuestos
        if ((url === '/repuestos' || url === '/repuesto') && method === 'POST') {
            try {
                const body = await getBody<any>(req);
                const nuevo = await repuestoService.crear(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevo));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al crear repuesto', error: error.message }));
                }
                return;
            }
        }

        // PUT /repuestos/:id
        if ((url?.startsWith('/repuestos/') || url?.startsWith('/repuesto/')) && method === 'PUT') {
            try {
                const id = Number(url.split('/')[2]);
                const body = await getBody<any>(req);
                const actualizado = await repuestoService.actualizar(id, body);

                if (!actualizado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Repuesto no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Repuesto actualizado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al actualizar repuesto', error: error.message }));
                }
                return;
            }
        }

        // DELETE /repuestos/:id
        if ((url?.startsWith('/repuestos/') || url?.startsWith('/repuesto/')) && method === 'DELETE') {
            try {
                const id = Number(url.split('/')[2]);
                const eliminado = await repuestoService.eliminar(id);

                if (!eliminado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Repuesto no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Repuesto eliminado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al eliminar repuesto', error: error.message }));
                }
                return;
            }
        }

        // 10. RUTAS DE TECNICOS (/tecnicos)
        if (url === '/tecnicos' && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(await tecnicoService.obtenerTodos()));
            return;
        }
        if (url === '/tecnicos' && method === 'POST') {
            try {
                const body = await getBody<any>(req);
                const nuevo = await tecnicoService.crear(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevo));
                return; // <--- MUY IMPORTANTE EL RETURN PARA DETENER LA EJECUCIÓN
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al crear técnico', error: error.message }));
                }
                return;
            }
        }
        
        if (url.startsWith('/tecnicos/') && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(await tecnicoService.obtenerPorId(Number(url.split('/')[2]))));
            return;
        }
        // PUT /tecnicos/:id
        if (url?.startsWith('/tecnicos/') && method === 'PUT') {
            try {
                const id = Number(url.split('/')[2]);
                const body = await getBody<any>(req);
                
                const actualizado = await tecnicoService.actualizar(id, body);

                if (!actualizado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Técnico no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Técnico actualizado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al actualizar técnico', error: error.message }));
                }
                return;
            }
        }

        // DELETE /tecnicos/:id
        if (url?.startsWith('/tecnicos/') && method === 'DELETE') {
            try {
                const id = Number(url.split('/')[2]);
                const eliminado = await tecnicoService.eliminar(id);

                if (!eliminado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Técnico no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Técnico eliminado exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al eliminar técnico', error: error.message }));
                }
                return;
            }
        }

        // 11. RUTAS DE DIAGNOSTICOS (/diagnosticos)
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

        // 12. RUTAS MANTENIMIENTO-REPUESTOS (/mantenimiento-repuestos)
        // GET 
        if ((url === '/mantenimiento-repuestos' || url === '/mantenimientoRepuesto') && method === 'GET') {
            try {
                const registros = await mantenimientoRepuestoService.obtenerTodos();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(registros));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al obtener mantenimiento-repuestos', error: error.message }));
                }
                return;
            }
        }

        // POST /mantenimiento-repuestos
        if ((url === '/mantenimiento-repuestos' || url === '/mantenimientoRepuesto') && method === 'POST') {
            try {
                const body = await getBody<any>(req);
                const nuevo = await mantenimientoRepuestoService.crear(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevo));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al relacionar mantenimiento con repuesto', error: error.message }));
                }
                return;
            }
        }

        // DELETE /mantenimiento-repuestos/:mantenimientoId/:repuestoId
        if ((url?.startsWith('/mantenimiento-repuestos/') || url?.startsWith('/mantenimientoRepuesto/')) && method === 'DELETE') {
            try {
                const partes = url.split('/');
                const mantenimientoId = Number(partes[2]);
                const repuestoId = Number(partes[3]);

                const eliminado = await mantenimientoRepuestoService.eliminar(mantenimientoId, repuestoId);

                if (!eliminado) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Registro no encontrado' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Relación mantenimiento-repuesto eliminada exitosamente' }));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al eliminar relación mantenimiento-repuesto', error: error.message }));
                }
                return;
            }
        }

        // 13. RUTAS HISTORIAL MANTENIMIENTO (/historial-mantenimiento)
        // GET /historial-mantenimiento
        if ((url === '/historial-mantenimiento' || url === '/historialMantenimiento') && method === 'GET') {
            try {
                const historiales = await historialMantenimientoService.obtenerTodos();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(historiales));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al obtener historial de mantenimientos', error: error.message }));
                }
                return;
            }
        }

        // POST /historial-mantenimiento
        if ((url === '/historial-mantenimiento' || url === '/historialMantenimiento') && method === 'POST') {
            try {
                const body = await getBody<any>(req);
                const nuevo = await historialMantenimientoService.crear(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevo));
                return;
            } catch (error: any) {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Error al crear entrada en historial de mantenimiento', error: error.message }));
                }
                return;
            }
        }   

        
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));

    } catch (error: any) {
        // Bloque de captura de errores
        console.error("Error capturado en handleRoutes:", error);
        res.writeHead(500);
        res.end(JSON.stringify({
            mensaje: 'Error interno del servidor',
            error: error.message || String(error)
        }));
    }
}