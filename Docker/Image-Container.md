# **Descargar Imagen:**

```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

# **Iniciar contenedor:**

## En Linux o MacOS:

```bash
=EXPRESS=
docker run -e "ACCEPT_EULA=Y" \
 -e "MSSQL_SA_PASSWORD=Sql2019$" \
 --env MSSQL_AGENT_ENABLED=True \
 -e "MSSQL_PID=Express" \
 -e "TZ=America/Mexico_City" \
 -p 5001:1433 \
 --name sqlserver2019_DEV \
 --hostname sqlserver2019_DEV \
 -v /Users/ivannunezfrayre/Desktop/Windows/D/Docker/SqlServer/data:/var/opt/mssql/data \
 -v /Users/ivannunezfrayre/Desktop/Windows/D/Docker/SqlServer/log:/var/opt/mssql/log \
 -v /Users/ivannunezfrayre/Desktop/Windows/D/Docker/SqlServer/secrets:/var/opt/mssql/secrets \
 -d mcr.microsoft.com/mssql/server:2019-latest
```

## En Windows:

Considerar la ruta correspondiente.

- Mi ruta:

```
  C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker
```

### Versión con saltos de línea:

```bash
docker run -e "ACCEPT_EULA=Y" `
-e "MSSQL_SA_PASSWORD=Sql2019$" `
--env MSSQL_AGENT_ENABLED=True `
-e "MSSQL_PID=Express" `
-e "TZ=America/Mexico_City" `
-p 5001:1433 `
--name sqlserver2019_DEV `
--hostname sqlserver2019_DEV `
-v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\data:/var/opt/mssql/data" `
-v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\log:/var/opt/mssql/log" `
-v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\secrets:/var/opt/mssql/secrets" `
-d mcr.microsoft.com/mssql/server:2019-latest
```

### Versión sin saltos de línea:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Sql2019$" --env MSSQL_AGENT_ENABLED=True -e "MSSQL_PID=Express" -e "TZ=America/Mexico_City" -p 5001:1433 --name sqlserver2019_DEV --hostname sqlserver2019_DEV -v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\data:/var/opt/mssql/data" -v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\log:/var/opt/mssql/log" -v "C:\Users\angel\Local\Proyectos\U_S8_programacion-moviles\Docker\SqlServer\secrets:/var/opt/mssql/secrets" -d mcr.microsoft.com/mssql/server:2019-latest
```

**Comentarios.**

- Añadí **.gitignore** para evitar subir archivos de configuración, logs, etc. generados del volumen a GitHub; ajustar ruta.
