export interface Repositorio<T> {
    obtenerTodos(): T[];
    obtenerPorId(id: number): T | undefined;
    guardar(entidad: T): T;
    actualizar(id: number, datos: Partial<T>): boolean;
    eliminar(id: number): boolean;
}