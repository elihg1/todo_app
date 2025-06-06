# Todo App: Gestión de Objetivos y Tareas

Este proyecto es un aplicativo de seguimiento de tareas (Todo App) desarrollado con un stack moderno, que permite a los usuarios gestionar objetivos y las tareas asociadas a ellos. Cada objetivo puede contener múltiples tareas, y estas tareas están diseñadas para contribuir al cumplimiento del objetivo principal.

## Características Principales

* **Gestión de Objetivos**:
    * [cite_start]**Crear**: Añade nuevos objetivos con un nombre, fecha de inicio y una fecha planeada de finalización. 
    * **Leer**: Visualiza una lista de todos los objetivos existentes.
    * **Detalle**: Accede a una vista detallada de cada objetivo para ver y gestionar sus tareas asociadas.
    * **Actualizar**: Modifica la información de los objetivos existentes.
    * [cite_start]**Eliminar**: Elimina objetivos, lo que también eliminará automáticamente todas las tareas asociadas a ellos. 

* [cite_start]**Gestión de Tareas**: 
    * [cite_start]**Crear**: Añade nuevas tareas a un objetivo específico, incluyendo un título y una descripción. 
    * **Leer**: Visualiza la lista de tareas pertenecientes a un objetivo en su vista de detalle.
    * **Actualizar**: Modifica el título y la descripción de las tareas existentes.
    * **Eliminar**: Borra tareas específicas de un objetivo.

## Tecnologías Utilizadas

Este proyecto está construido con una arquitectura de tres capas:

* **Frontend**: Desarrollado con **React** y **Vite**. Ofrece una interfaz de usuario intuitiva y reactiva para interactuar con la aplicación.
    * `react-router-dom` para la navegación entre páginas.
    * [cite_start]`axios` para la comunicación eficiente con la API del backend. 

* **Backend**: Implementado con **Node.js** y el framework **Express**. [cite_start]Proporciona una API RESTful para manejar la lógica del negocio y las operaciones de la base de datos. 
    * `cors` para permitir la comunicación segura entre el frontend y el backend.
    * `dotenv` para la gestión de variables de entorno (credenciales de la base de datos).

* [cite_start]**Base de Datos**: Se utiliza **PostgreSQL** como sistema de gestión de bases de datos relacionales, garantizando el almacenamiento persistente y estructurado de los objetivos y tareas. 

## Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

* `backend/`: Contiene todo el código del servidor (Node.js/Express) y la configuración de la base de datos.
* `frontend/`: Contiene el código de la interfaz de usuario (React/Vite).

## Cómo Ejecutar el Proyecto (Paso a Paso)

Sigue estos pasos para poner en marcha la aplicación en tu entorno local:

### 1. Configuración de la Base de Datos (PostgreSQL)

1.  **Descargar e Instalar PostgreSQL**:
    * Visita [https://www.postgresql.org/download/](https://www.postgresql.org/download/) y descarga el instalador para tu sistema operativo.
    * Ejecuta el instalador y sigue las instrucciones. **Recuerda la contraseña** que establezcas para el superusuario `postgres`.
2.  **Crear la Base de Datos**:
    * Abre `pgAdmin 4` (incluido en la instalación de PostgreSQL).
    * Conéctate a tu servidor PostgreSQL (usando la contraseña del superusuario).
    * Haz clic derecho en "Databases" > "Create" > "Database..." y nómbrala `todoapp_db`.
3.  **Crear Tablas**:
    * En `pgAdmin 4`, haz clic derecho en `todoapp_db` > "Query Tool".
    * Ejecuta las siguientes sentencias SQL para crear las tablas `objetivos` y `tareas`:
        ```sql
        CREATE TABLE objetivos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            fecha_inicio DATE,
            fecha_planeada_final DATE
        );

        CREATE TABLE tareas (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            descripcion TEXT,
            objetivo_id INTEGER REFERENCES objetivos(id) ON DELETE CASCADE
        );
        ```

### 2. Configuración y Ejecución del Backend

1.  **Navega al directorio del backend**:
    ```bash
    cd todo-app/backend
    ```
2.  **Instala las dependencias**:
    ```bash
    npm install
    ```
3.  **Crea el archivo de configuración de entorno**:
    * Crea un archivo llamado `.env` en la raíz de la carpeta `backend`.
    * Añade tus credenciales de PostgreSQL:
        ```
        DB_USER=postgres
        DB_HOST=localhost
        DB_DATABASE=todoapp_db
        DB_PASSWORD=tu_contraseña_de_postgres
        DB_PORT=5432
        ```
        *Asegúrate de reemplazar `tu_contraseña_de_postgres` con la contraseña real que configuraste.*
4.  **Inicia el servidor backend**:
    ```bash
    node server.js
    ```
    El servidor debería iniciarse en `http://localhost:5000`. Mantén esta terminal abierta.

### 3. Configuración y Ejecución del Frontend

1.  **Navega al directorio del frontend**:
    * Abre una **nueva terminal**.
    * ```bash
        cd todo-app/frontend
        ```
2.  **Instala las dependencias**:
    ```bash
    npm install
    ```
3.  **Inicia la aplicación React**:
    ```bash
    npm run dev
    ```
    La aplicación debería abrirse en tu navegador, generalmente en `http://localhost:5173/`.

### Uso de la Aplicación

1.  En la página principal, podrás **crear y ver tus objetivos**.
2.  Haz clic en el **nombre de cualquier objetivo** para navegar a su página de detalles.
3.  En la página de detalles del objetivo, podrás **agregar, editar y eliminar tareas** asociadas a ese objetivo específico.

¡y LISTOOO Disfruta organizando tus objetivos y tareas!
