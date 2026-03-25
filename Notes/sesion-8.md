# Martes. Marzo 24, 2026.

# Tecnologías.

## Node.js

- Node.js (JavaScript), es una utilería de la web.
- En C# utiliza un SDK, Node.js es su similitud, utilizado con Angular.

## Angular.

- Angular utiliza TypeScript.

## NVM.

- Node Version Managment.
- LTS es una versión estable, STS es una versión corta.
- NVM es un gestor de versiones de Node.js, para instalar varias versiones y cambiar entre ellas.

## Ionic.

- Framework para desarrollar aplicaciones móviles híbridas, utilizando tecnologías web como HTML, CSS y JavaScript.

![alt text](/Notes/Images/image-10.png)

# Instalaciones y creación de proyecto frontend.

### Consideraciones.

1. Se debe tener una carpeta Frontend, Backend y la información del volumen en el proyecto.

   ![alt text](/Notes/Images/image-11.png)

### Pasos.

1. Instalar NVM para Windows.

   [Repositorio en GitHub.](https://github.com/coreybutler/nvm-windows)

2. Instalar Node.js con NVM.

   ```bash
   nvm install 22.14.0
   ```

3. Usar la versión de Node.js instalada.

   ```bash
   nvm use 22.14.0
   ```

4. Instalar CLI de Angular.

   ```bash
    npm install -g @angular/cli
   ```

5. Instalar CLI de Ionic.

   ```bash
   npm install -g @ionic/cli
   ```

6. Crear proyecto de Ionic con Angular.
   - Crearse en la carpeta Frontend.

   ```bash
   ionic start appTramites tabs --type angular
   ```

7. Instalar node_modules.
   ```bash
    npm i
   ```
8. Ejecutar el proyecto.

   ```bash
   ionic serve --open
   ```

### Desarrollo del proyecto.

1.  Añadir en enviroments la ruta de endpoints.
    - **Archivo:** [environment.ts](/Frontend/appTramites/src/environments/environment.ts)
    - **Ruta:** src/environments/environment.ts

      ```typescript
      export const environment = {
        production: false,
        endpoint: "http://localhost:5183/api",
      };
      ```

2.  Crear carpeta de servicios y generar servicio de Carrera.
    - **Archivo:** [Carrera.service.ts](/Frontend/appTramites/src/app/services/carrera.service.ts)
    - **Ruta:** src/app/services/carrera.service.ts

      ![alt text](/Notes/Images/image-8.png)

3.  Borrar el archivo test del servicio Carrera.
4.  Abrir localhost el puerto asignado del proyecto.
5.  Abrir Herramientas de desarrollo y activar Modo responsivo.
    ![alt text](/Notes/Images/image-9.png)
