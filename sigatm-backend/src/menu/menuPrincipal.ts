import { askQuestion, clearTerminal } from '../utils/readline';
import { menuUsuarios } from './menuUsuarios';
import { menuEquipos } from './menuEquipos';

export async function iniciarMenu() {
    let continuar = true;
    while (continuar) {
        clearTerminal();
        console.log("━━━━━━━━━━━━━━━━━━ ◦ ❖ ◦ ━━━━━━━━━━━━━━━━");
        console.log("│               SISTEMA SIGATM            │");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("│        1. Gestión de Usuarios           │");
        console.log("│        2. Gestión de Equipos            │");
        console.log("│        3. Salir del Sistema             │");
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
                process.exit(0);
                break;
            default:
                console.log("\nOpción inválida. Intente de nuevo.");
                await askQuestion("\nPresione Enter para continuar...");
        }
    }
}