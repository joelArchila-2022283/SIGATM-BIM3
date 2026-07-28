# 🖥️ SIGATM Backend - Sistema de Gestión de Equipos y Mantenimiento

## 📝 Breve descripción
SIGATM Backend es una API REST nativa desarrollada en Node.js con TypeScript para la gestión integral de activos tecnológicos, control de mantenimientos, reportes de incidencias y administración de usuarios dentro de una organización. El proyecto implementa una arquitectura por capas (Router, Services y Repositories) utilizando exclusivamente los módulos nativos de Node.js sin depender de frameworks de enrutado externos como Express.

---

## 🎯 Objetivo
Proveer un backend robusto, mantenible y de alto rendimiento que permita realizar operaciones CRUD sobre todas las entidades del sistema, garantizando la separación de responsabilidades, la integridad referencial en la base de datos y un manejo estructurado de peticiones HTTP.

---

## 🛠️ Tecnologías usadas
* **Lenguaje:** TypeScript
* **Entorno de ejecución:** Node.js (Servidor HTTP nativo con `node:http`)
* **Gestor de paquetes:** pnpm
* **Base de datos:** MySQL / MariaDB
* **Controlador de Base de Datos:** `mysql2` (con soporte para promesas y pool de conexiones)
* **Herramientas de desarrollo:** `ts-node` / `nodemon`

---

## 💻 Guía de instalación del proyecto en la computadora

### 📋 Prerrequisitos
1. Tener instalado **Node.js** (versión 18 o superior).
2. Tener instalado **pnpm** globalmente (`npm install -g pnpm` o vía Corepack).
3. Tener instalado y corriendo un servidor de base de datos **MySQL** (ej. Workbench o servicio local).

### ⚙️ Pasos de instalación
1. **Clonar o descargar el repositorio** en tu equipo local.
2. **Crear e importar la base de datos:**
   * Abre tu gestor de base de datos (MySQL Workbench, phpMyAdmin, DBeaver, etc.).
   * Crea una base de datos llamada `sigatm_in5cm`.
   * Ejecuta el script SQL del proyecto para estructurar las tablas (`rol`, `usuario`, `tipo_equipo`, `proveedor`, `departamento`, `equipo`, `reporte`, `mantenimiento`).
3. **Configurar las credenciales de conexión:**
   * Abre el archivo `src/config/database.ts` y verifica que las credenciales (host, usuario, contraseña, puerto y nombre de base de datos) coincidan con las de tu entorno local.

---

## 🚀 Comandos en orden para ejecutar y levantar el servidor

Abre una terminal en la carpeta raíz del proyecto y ejecuta los siguientes comandos en orden:

1. **Instalar las dependencias del proyecto:**
   ```bash
   pnpm install

2. **Iniciar el servidor en modo desarrollo:**
    ```bash
    pnpm run dev

3. **Verificación:**
   * Si todo se configuró correctamente, verás en la consola el siguiente mensaje:
   *🌐 Servidor corriendo en http://localhost:3000

---

## ⚙️ Operaciones que se pueden realizar
El sistema permite realizar operaciones CRUD completas (Create, Read, Update, Delete) para las 8 entidades principales del sistema:

* Usuarios: Registro, consulta, edición y eliminación de usuarios del sistema.

* Equipos: Registro de activos informáticos con especificaciones y asignaciones.

* Reportes: Creación y seguimiento de reportes de fallas o incidencias.

* Mantenimientos: Programación y registro de mantenimientos preventivos/correctivos.

* Roles: Gestión de roles de usuario (ej. Administrador, Técnico, Usuario).

* Tipos de Equipo: Clasificación de los activos (ej. Laptop, Impresora, Servidor).

* Departamentos: Asignación geográfica o de áreas dentro de la empresa.

* Proveedores: Registro de contactos y proveedores de equipos o servicios.

### 📬 Rutas que puede utilizar en POSTMAN
**Servidor base: http://localhost:3000**

👤 1. Usuarios (/usuarios)
* GET /usuarios - Obtener todos los usuarios.

* GET /usuarios/:id - Obtener usuario por ID.

* POST /usuarios - Crear un usuario.

* PUT /usuarios/:id - Actualizar usuario por ID.

* DELETE /usuarios/:id - Eliminar usuario por ID.

💻 2. Equipos (/equipos)
* GET /equipos - Obtener todos los equipos.

* GET /equipos/:id - Obtener equipo por ID.

* POST /equipos - Registrar un nuevo equipo.

* PUT /equipos/:id - Actualizar un equipo por ID.

* DELETE /equipos/:id - Eliminar equipo por ID.

📋 3. Reportes (/reportes)
GET /reportes | GET /reportes/:id | POST /reportes | PUT /reportes/:id | DELETE /reportes/:id

🔧 4. Mantenimientos (/mantenimientos)
GET /mantenimientos | GET /mantenimientos/:id | POST /mantenimientos | PUT /mantenimientos/:id | DELETE /mantenimientos/:id

🗂️ 5. Catálogos Base
Roles: /roles (GET, POST, PUT, DELETE)

* Tipos de Equipo: /tipos-equipo (GET, POST, PUT, DELETE)

* Departamentos: /departamentos (GET, POST, PUT, DELETE)

* Proveedores: /proveedores (GET, POST, PUT, DELETE)

---

## ⚠️ Posibles errores y cómo solucionarlos
1. Error de Clave Foránea (Cannot add or update a child row: a foreign key constraint fails)
Causa: Ocurre al intentar crear un registro (ej. un usuario o equipo) asociándolo a un ID que no existe en la tabla padre (ej. un rolId o departamentoId inexistente).

Solución: Asegúrate de poblar primero las tablas de catálogo (rol, tipo_equipo, departamento, proveedor) o de enviar IDs que ya existan en la base de datos.

2. Error de Entrada Duplicada (Error Code: 1062. Duplicate entry 'X' for key 'PRIMARY')
Causa: Intentar insertar manualmente un registro especificando un ID primario que ya se encuentra registrado.

Solución: Deja que la base de datos asigne el ID automáticamente mediante AUTO_INCREMENT, o en consultas SQL directas usa INSERT IGNORE INTO.

3. Error de JSON Malformado (JSON malformado en la petición)
Causa: Se envió una petición POST o PUT desde Postman sin configurar adecuadamente el formato del cuerpo de la petición.

Solución: En Postman, dentro de la pestaña Body, selecciona la opción raw y cambia la pestaña desplegable de Text a JSON.

--- 

## 📌 Conclusión
El desarrollo del proyecto SIGATM Backend demuestra cómo construir una arquitectura web profesional y escalable sin necesidad de depender de frameworks externos. La correcta división en capas de servicios, repositorios y enrutado nativo garantiza la fácil mantenibilidad del código, respetando los estándares de diseño de software y asegurando una interacción eficiente con la base de datos relacional.

---

### ✍️ Autor
Joel Francisco Archila Dávila




