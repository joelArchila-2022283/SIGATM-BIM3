import { askQuestion, clearTerminal } from '../utils/readline';
import { equipoService } from '../services/equipoService';
import { EstadoEquipo } from '../models/enums';

export async function menuEquipos() {
    let continuar = true;
    while (continuar) {
        clearTerminal();
        console.log("=== GESTIÓN DE EQUIPOS TECNOLÓGICOS ===");
        console.log("1. Listar Equipos");
        console.log("2. Registrar Nuevo Equipo");
        console.log("3. Volver al Menú Principal");

        const opcion = await askQuestion("\nSeleccione una opción: ");

        switch (opcion.trim()) {
            case "1":
                clearTerminal();
                console.log("--- Lista de Equipos en Inventario ---");
                const equipos = await equipoService.obtenerTodos();
                if (equipos.length === 0) {
                    console.log("No hay equipos registrados aún.");
                } else {
                    console.table(equipos);
                }
                await askQuestion("\nPresione Enter para continuar...");
                break;
            case "2":
                clearTerminal();
                console.log("--- Registro de Nuevo Equipo ---");
                const nombre = await askQuestion("Nombre del equipo (Ej: Laptop HP): ");
                const descripcion = await askQuestion("Descripción: ");
                const numeroSerie = await askQuestion("Número de Serie: ");
                const tipoEquipoIdStr = await askQuestion("ID Tipo de Equipo (Ej: 1): ");
                const proveedorIdStr = await askQuestion("ID Proveedor (Ej: 1): ");
                const departamentoIdStr = await askQuestion("ID Departamento (Ej: 1): ");
                
                await equipoService.crear({
                    nombre,
                    descripcion,
                    numeroSerie,
                    fechaAdquisicion: new Date(),
                    tipoEquipoId: parseInt(tipoEquipoIdStr) || 1,
                    proveedorId: parseInt(proveedorIdStr) || 1,
                    departamentoId: parseInt(departamentoIdStr) || 1,
                    estado: EstadoEquipo.ACTIVO
                });
                
                console.log("\n¡Equipo tecnológico registrado exitosamente!");
                await askQuestion("\nPresione Enter para continuar...");
                break;
            case "3":
                continuar = false;
                break;
            default:
                console.log("\nOpción inválida.");
                await askQuestion("\nPresione Enter para intentar de nuevo...");
        }
    }
}