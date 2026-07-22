import { askQuestion, clearTerminal } from '../utils/readline';
import { usuarioService } from '../services/usuarioService';

export async function menuUsuarios() {
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
                const usuarios = await usuarioService.obtenerTodos();
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
                
                await usuarioService.crear({
                    nombre,
                    apellido,
                    correo,
                    username,
                    password,
                    rolId: parseInt(rolIdStr) || 3
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