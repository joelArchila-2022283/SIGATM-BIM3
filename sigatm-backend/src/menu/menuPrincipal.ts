import { askQuestion, clearTerminal } from '../utils/readline';
import { usuarioService } from '../services/usuarioService';
import { equipoService } from '../services/equipoService';

// Submenú para gestionar los Usuarios
async function menuUsuarios() {
    let continuar = true;
    while (continuar) {
        clearTerminal();
        console.log("=== GESTIÓN DE USUARIOS ===");
        console.log("1. Listar Usuarios");
        console.log("2. Registrar Nuevo Usuario");
        console.log("3. Volver al Menú Principal");

        const opcion = await askQuestion("\nSeleccione una opción: ");

        switch (opcion.trim()) {
            case "1":
                clearTerminal();
                console.log("--- Lista de Usuarios Registrados ---");
                const usuarios = usuarioService.obtenerTodos();
                if (usuarios.length === 0) {
                    console.log("No hay usuarios registrados aún.");
                } else {
                    console.table(usuarios);
                }
                await askQuestion("\nPresione Enter para continuar...");
                break;
            case "2":
                clearTerminal();
                console.log("--- Registro de Nuevo Usuario ---");
                const nombre = await askQuestion("Nombre: ");
                const apellido = await askQuestion("Apellido: ");
                const correo = await askQuestion("Correo Electrónico: ");
                const username = await askQuestion("Nombre de usuario (username): ");
                const password = await askQuestion("Contraseña: ");
                const rolIdStr = await askQuestion("ID del Rol (1: Admin, 2: Técnico, 3: Supervisor): ");
                
                usuarioService.crear({
                    nombre,
                    apellido,
                    correo,
                    username,
                    password,
                    rolId: parseInt(rolIdStr) || 3 // Si falla, asignamos rol 3 por defecto
                });
                
                console.log("\n¡Usuario registrado exitosamente!");
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

// Submenú para gestionar los Equipos 
async function menuEquipos() {
    let continuar = true;
    while (continuar) {
        clearTerminal();
        console.log("=== GESTIÓN DE EQUIPOS TÉCNOLÓGICOS ===");
        console.log("1. Listar Equipos");
        console.log("2. Registrar Nuevo Equipo");
        console.log("3. Volver al Menú Principal");

        const opcion = await askQuestion("\nSeleccione una opción: ");

        switch (opcion.trim()) {
            case "1":
                clearTerminal();
                console.log("--- Lista de Equipos en Inventario ---");
                const equipos = equipoService.obtenerTodos();
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
                
                equipoService.crear({
                    nombre,
                    descripcion,
                    numeroSerie,
                    fechaAdquisicion: new Date(), // Asigna la fecha actual automáticamente
                    tipoEquipoId: parseInt(tipoEquipoIdStr) || 1,
                    proveedorId: parseInt(proveedorIdStr) || 1,
                    departamentoId: parseInt(departamentoIdStr) || 1,
                    estado: 'activo'
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

// Menu inicial
export async function iniciarMenu() {
    let continuar = true;
    while (continuar) {
        clearTerminal();
        console.log("━━━━━━━━━━━━━━━━━━ ◦ ❖ ◦ ━━━━━━━━━━━━━━━━");
        console.log("│              SISTEMA SIGATM            │");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("│        1. Gestión de Usuarios          │");
        console.log("│        2. Gestión de Equipos           │");
        console.log("│        3. Salir del Sistema            │");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        const opcion = await askQuestion("\nSeleccione una opción: ");

        switch (opcion.trim()) {
            case "1":
                await menuUsuarios();
                break;
            case "2":
                await menuEquipos();
                break;
            case "3":
                clearTerminal();
                console.log("Saliendo de SIGATM. ¡Hasta pronto!");
                continuar = false;
                process.exit(0); // Cierra el proceso de Node de forma limpia
                break;
            default:
                console.log("\nOpción inválida. Intente de nuevo.");
                await askQuestion("\nPresione Enter para continuar...");
        }
    }
}