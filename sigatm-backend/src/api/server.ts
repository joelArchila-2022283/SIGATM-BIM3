import { handleRoutes } from './router';
import { createServer } from 'http';

const PORT = 3000;

const server = createServer(async (req, res) => {
    try {
        await handleRoutes(req, res);
    } catch (error: any) {
        console.error('Error no capturado:', error);
        
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                mensaje: 'Error interno del servidor', 
                error: error.message 
            }));
        }
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});