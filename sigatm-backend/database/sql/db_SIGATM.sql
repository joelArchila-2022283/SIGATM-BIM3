CREATE DATABASE IF NOT EXISTS sigatm_in5cm;
USE sigatm_in5cm;

CREATE TABLE Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Departamento (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

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

CREATE TABLE TipoEquipo (
    id_tipo_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    contacto VARCHAR(100),
    direccion VARCHAR(200)
);

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

CREATE TABLE Tecnico (
    id_tecnico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reporte DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    id_equipo INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Diagnostico (
    id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    fecha_diagnostico DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    id_reporte INT NOT NULL UNIQUE,
    id_tecnico INT NOT NULL,
    FOREIGN KEY (id_reporte) REFERENCES Reporte(id_reporte),
    FOREIGN KEY (id_tecnico) REFERENCES Tecnico(id_tecnico)
);

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

CREATE TABLE Repuesto (
    id_repuesto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL DEFAULT 0,
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE HistorialMantenimiento (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    id_mantenimiento INT NOT NULL,
    fecha DATETIME NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
    FOREIGN KEY (id_mantenimiento) REFERENCES Mantenimiento(id_mantenimiento)
);

CREATE TABLE Mantenimiento_Repuesto (
    id_mantenimiento INT NOT NULL,
    id_repuesto INT NOT NULL,
    cantidad_usada INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id_mantenimiento, id_repuesto),
    FOREIGN KEY (id_mantenimiento) REFERENCES Mantenimiento(id_mantenimiento),
    FOREIGN KEY (id_repuesto) REFERENCES Repuesto(id_repuesto)
);

USE sigatm_in5cm;

-- Insertar un Rol por defecto
INSERT INTO Rol (nombre) VALUES ('ADMINISTRADOR') ON DUPLICATE KEY UPDATE id_rol=id_rol;

-- Insertar un Departamento por defecto
INSERT INTO Departamento (nombre) VALUES ('Sistemas') ON DUPLICATE KEY UPDATE id_departamento=id_departamento;

-- Insertar un Tipo de Equipo por defecto
INSERT INTO TipoEquipo (nombre) VALUES ('Computadora de Escritorio') ON DUPLICATE KEY UPDATE id_tipo_equipo=id_tipo_equipo;

-- Insertar un Proveedor por defecto
INSERT INTO Proveedor (nombre, contacto, direccion) VALUES ('Tech Supplier', '555-1234', 'Ciudad de Guatemala') ON DUPLICATE KEY UPDATE id_proveedor=id_proveedor;

INSERT INTO rol (id_rol, nombre) VALUES 
(2, 'TECNICO'),
(3, 'USUARIO');

