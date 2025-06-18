# WebMascota 🐾

WebMascota es una aplicación web diseñada para gestionar información sobre mascotas, permitiendo a los usuarios interactuar con diferentes funcionalidades como registro, inicio de sesión y visualización de datos relacionados con sus mascotas.

## 🚀 Características

- **Inicio de sesión seguro:** Autenticación de usuarios con contraseñas encriptadas.
- **Gestión de usuarios:** Registro y manejo de información de los usuarios.
- **Diseño intuitivo y adaptable:** Implementado con Tailwind CSS para garantizar una experiencia visual coherente y funcional en distintos dispositivos.
- **Conexión a API:** Integración con una API para manejar datos de usuarios y mascotas.

## 🛠️ Tecnologías utilizadas

- **Frontend:**
  - React
  - React Router DOM
  - Tailwind CSS
- **Backend:**
  - Python (Flask)
  - MySQL
  - bcrypt (para encriptación de contraseñas)
- **Herramientas adicionales:**
  - Vite (como bundler)
  - Axios (para llamadas a la API)

## 📂 Estructura del proyecto

```plaintext
webmascota/
├── public/
├── src/
│   ├── assets/ 
│   │   ├── logomascota.png
│   │   ├── logomascota.svg
│   │   └── react.svg
│   ├── components/
│   │   └── navbar.jsx
│   ├── hooks/
│   │   └── useUserProfile.jsx
│   ├── pages/
│   │   ├── attention/
│   │   ├── home/
│   │   ├── login/
│   │   ├── pet/
│   │   └── user_profile/
│   ├── services/
│   │   ├── attention_service.jsx
│   │   ├── auth_service.jsx
│   │   ├── pet_service.jsx
│   │   └── user_service.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## ⚙️ Configuración del proyecto

1.- Clonar el repositorio

```bash
git clone https://github.com/Nafery/webmascota
cd webmascota
```

2.- Instalar dependencias

```bash
npm install
```

3.- Configurar variables de entorno

Configura la URL con el puerto en el que se encuentra tu API en el archivo api.js.

4.- Iniciar el servidor de desarrollo

```bash
npm run dev
```

## 🧪 Pruebas

Asegúrate de que tu API esté corriendo y accesible antes de probar la aplicación. Puedes iniciar
sesión con un usuario registrado o crear uno nuevo.

### Endpoint de login

 * URL: /login
 * Método: POST
 * Cuerpo de la solicitud:

```json
{
    "correo": "usuario@ejemplo.com",
    "password": "contraseña123"
}
```

 * Respuesta exitosa:

```json
{
    "id": 1,
    "nombre": "Usuario Ejemplo",
    "correo": "usuario@ejemplo.com",
    "comuna": "Comuna Ejemplo"
}
```

 * Error:

```json
{
    "error": "Usuario no encontrado"
}
```