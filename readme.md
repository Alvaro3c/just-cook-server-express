# Just Cook server 

## Descripción general
Este backend está desarrollado en **Node.js** y proporciona la lógica de servidor y la API necesaria para el funcionamiento de la aplicación. Se encarga de la gestión de usuarios, datos persistentes y la comunicación con la base de datos.

---

## Inicialización del proyecto

### Requisitos previos
- Node.js 
- npm

### Pasos para iniciar el servidor

1. Clonar el repositorio:
   ```
   git clone https://github.com/Alvaro3c/just-cook-server-express
   ```


2. Acceder al directorio del backend:

   ```
   cd nombre-del-backend
   ```

3. Instalar las dependencias:

   ```
   npm install
   ```

4. Crear el archivo de variables de entorno:

   ```
   cp .env
   ```

   (o crear manualmente el archivo `.env`)

5. Iniciar el servidor en modo desarrollo:

   ```
   node index.js
   ```

6. El servidor quedará disponible por defecto en:

   ```
   http://localhost:3000
   ```

---

## Variables de entorno

```env
HOST=
PORT=
EXTERNAL_DB_URL=
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=
```
---

## testing
- comando para testing: npx jest tests/ingredients.test.cjs