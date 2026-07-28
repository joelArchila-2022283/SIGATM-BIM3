export interface Repositorio<T> {
    obtenerTodos(): Promise<T[]>;
    obtenerPorId(id: number): Promise<T | null>;
    crear(entidad: Omit<T, 'id'>): Promise<T>;
    actualizar(id: number, datos: Partial<Omit<T, 'id'>>): Promise<boolean>;
    eliminar(id: number): Promise<boolean>;
}