-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sigatm_in5cm;
USE sigatm_in5cm;

-- 1. Rol
CREATE TABLE Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Departamento
CREATE TABLE Departamento (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    id_departamento INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol),
    FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento)
);

-- 4. TipoEquipo
CREATE TABLE TipoEquipo (
    id_tipo_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- 5. Proveedor
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    contacto VARCHAR(100),
    direccion VARCHAR(200)
);

-- 6. Equipo
CREATE TABLE Equipo (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    numero_serie VARCHAR(100) NOT NULL UNIQUE,
    fecha_adquisicion DATE NOT NULL,
    id_tipo_equipo INT NOT NULL,
    id_proveedor INT NOT NULL,
    id_departamento INT NOT NULL,
    estado ENUM('activo','inactivo','en_mantenimiento') NOT NULL DEFAULT 'activo',
    FOREIGN KEY (id_tipo_equipo) REFERENCES TipoEquipo(id_tipo_equipo),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor),
    FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento)
);

-- 7. Técnico
CREATE TABLE Tecnico (
    id_tecnico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- 8. Reporte
CREATE TABLE Reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reporte DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    id_equipo INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- 9. Diagnostico
CREATE TABLE Diagnostico (
    id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    fecha_diagnostico DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    id_reporte INT NOT NULL UNIQUE,
    id_tecnico INT NOT NULL,
    FOREIGN KEY (id_reporte) REFERENCES Reporte(id_reporte),
    FOREIGN KEY (id_tecnico) REFERENCES Tecnico(id_tecnico)
);

-- 10. Mantenimiento
CREATE TABLE Mantenimiento (
    id_mantenimiento INT AUTO_INCREMENT PRIMARY KEY,
    fecha_mantenimiento DATETIME NOT NULL,
    tipo ENUM('preventivo','correctivo') NOT NULL,
    descripcion TEXT NOT NULL,
    id_equipo INT NOT NULL,
    id_tecnico INT NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
    FOREIGN KEY (id_tecnico) REFERENCES Tecnico(id_tecnico)
);

-- 11. Repuesto
CREATE TABLE Repuesto (
    id_repuesto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL DEFAULT 0,
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

-- 12. HistorialMantenimiento
CREATE TABLE HistorialMantenimiento (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    id_mantenimiento INT NOT NULL,
    fecha DATETIME NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
    FOREIGN KEY (id_mantenimiento) REFERENCES Mantenimiento(id_mantenimiento)
);

-- 13. Mantenimiento_Repuesto 
CREATE TABLE Mantenimiento_Repuesto (
    id_mantenimiento INT NOT NULL,
    id_repuesto INT NOT NULL,
    cantidad_usada INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id_mantenimiento, id_repuesto),
    FOREIGN KEY (id_mantenimiento) REFERENCES Mantenimiento(id_mantenimiento),
    FOREIGN KEY (id_repuesto) REFERENCES Repuesto(id_repuesto)
);
