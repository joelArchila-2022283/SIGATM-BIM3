import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { handleRoutes } from './router';

const PORT = 3000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    try {
        await handleRoutes(req, res);
    } catch (error: any) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});