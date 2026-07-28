import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { usuarioService } from '../services/usuarioService';
import { equipoService } from '../services/equipoService';
import { EstadoEquipo } from '../models/enums';

const PORT = 3000;

async function getBody<T>(req: IncomingMessage): Promise<T> {
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

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url;
    const method = req.method;

    try {
        if (url === '/usuarios') {
            if (method === 'GET') {
                const usuarios = await usuarioService.obtenerTodos();
                res.writeHead(200);
                return res.end(JSON.stringify(usuarios));
            }

            if (method === 'POST') {
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
                return res.end(JSON.stringify(nuevoUsuario));
            }
        }

        if (url === '/equipos') {
            if (method === 'GET') {
                const equipos = await equipoService.obtenerTodos();
                res.writeHead(200);
                return res.end(JSON.stringify(equipos));
            }

            if (method === 'POST') {
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
                return res.end(JSON.stringify(nuevoEquipo));
            }
        }

        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));

    } catch (error: any) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});
