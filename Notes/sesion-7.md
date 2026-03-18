# Martes 17 de marzo de 2026.

## Dominio (Lenguaje).

1. Son todas las tablas que se utilizarán.
2. Mapea la base de datos y qué hará con ellas (insertar, leer, actualizar, etc).

## Creación del dominio Tramite.

1. Dominio de trámites (similar a carreras):
   1. [Entity.](/TramitesFacpya/SeguimientoTramites/Features/Tramites/Dominio/Entidad/Tramite.cs)
   2. [DTO.](/TramitesFacpya/SeguimientoTramites/Features/Tramites/Dominio/Dto/TramiteDTO.cs)
   3. [Validator.](/TramitesFacpya/SeguimientoTramites/Features/Tramites/TramiteValidator.cs)
   4. [Service.](/TramitesFacpya/SeguimientoTramites/Features/Tramites/TramiteService.cs)
   5. [Controller.](/TramitesFacpya/SeguimientoTramites/Controllers/TramitesController.cs)

2. Crear tabla TRAMITE.

   [createTramite.sql](/TramitesFacpya/SeguimientoTramites/Database/createTramite.sql)

   ```sql
   CREATE TABLE TRAMITE(
   IdTramite INT IDENTITY(1,1) PRIMARY KEY,
   Descrip VARCHAR(100) NOT NULL
   )
   ```
