import { Usuario } from '../models/usuario';
import { usuariosSimulados } from '../data/usuariosData';

export const usuarioRepository = {
    obtenerTodos: (): Usuario[] => {
        return usuariosSimulados;
    },
    obtenerPorId: (id: number): Usuario | undefined => {
        return usuariosSimulados.find(u => u.id === id);
    },
    guardar: (usuario: Usuario): Usuario => {
        usuariosSimulados.push(usuario);
        return usuario;
    },
    actualizar: (id: number, datos: Partial<Usuario>): boolean => {
        const indice = usuariosSimulados.findIndex(u => u.id === id);
        if (indice === -1) return false;
        usuariosSimulados[indice] = { ...usuariosSimulados[indice], ...datos };
        return true;
    },
    eliminar: (id: number): boolean => {
        const indice = usuariosSimulados.findIndex(u => u.id === id);
        if (indice === -1) return false;
        usuariosSimulados.splice(indice, 1);
        return true;
    }
};