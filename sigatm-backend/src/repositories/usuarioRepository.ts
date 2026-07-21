import { Usuario } from '../models/usuario';
import { usuariosSimulados } from '../data/usuariosData';
import { Repositorio } from './baseRepository';

export class UsuarioRepository implements Repositorio<Usuario> {
    private datos: Usuario[];

    constructor() {
        this.datos = usuariosSimulados;
    }

    public obtenerTodos(): Usuario[] {
        return this.datos;
    }

    public obtenerPorId(id: number): Usuario | undefined {
        return this.datos.find(u => u.id === id);
    }

    public guardar(usuario: Usuario): Usuario {
        this.datos.push(usuario);
        return usuario;
    }

    public actualizar(id: number, datos: Partial<Usuario>): boolean {
        const indice = this.datos.findIndex(u => u.id === id);
        if (indice === -1) return false;
        
        this.datos[indice] = { ...this.datos[indice], ...datos };
        return true;
    }

    public eliminar(id: number): boolean {
        const indice = this.datos.findIndex(u => u.id === id);
        if (indice === -1) return false;
        
        this.datos.splice(indice, 1);
        return true;
    }
}