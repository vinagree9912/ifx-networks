# Proyecto FastAPI + React + MongoDB

Este proyecto es una aplicación web completa que utiliza **FastAPI** en el backend, **React** en el frontend y **MongoDB** como base de datos. El frontend está desplegado en **Netlify**, mientras que el backend está desplegado en **Render**.

## github proyect https://github.com/vinagree9912/ifx-networks.git 

## url netlify https://marvelous-llama-c16708.netlify.app/

## swagger https://ifx-networks-1.onrender.com/docs


## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Variables de Entorno](#variables-de-entorno)
---

## Características

- Autenticación de usuario (registro, inicio de sesión y verificación de correo electrónico)
- CRUD para gestionar empleados
- Conexión con MongoDB Atlas para persistencia de datos
- Despliegue automático en Render (backend) y Netlify (frontend)
- Configuración de CORS para permitir solicitudes entre frontend y backend
- Envío de correos electrónicos para verificación de cuenta

## Tecnologías Utilizadas

- **Backend**: FastAPI, Pydantic, Motor (MongoDB)
- **Frontend**: React, Vite
- **Base de Datos**: MongoDB Atlas
- **Despliegue**: Render (backend) y Netlify (frontend)


## Variables de Entorno
A continuación se listan todas las variables de entorno necesarias para el correcto funcionamiento del proyecto:

- MONGO_INITDB_ROOT_USERNAME: Usuario raíz para MongoDB.
- MONGO_INITDB_ROOT_PASSWORD: Contraseña para el usuario raíz de MongoDB.
- MONGO_INITDB_DATABASE: Nombre de la base de datos de MongoDB.
- DATABASE_URL: URL de conexión para MongoDB.
- ACCESS_TOKEN_EXPIRES_IN: Tiempo de expiración (en minutos) para el token de acceso.
- REFRESH_TOKEN_EXPIRES_IN: Tiempo de expiración (en minutos) para el token de refresco.
- JWT_ALGORITHM: Algoritmo utilizado para los tokens JWT.
- JWT_PRIVATE_KEY: Clave privada para firmar los tokens JWT.
- JWT_PUBLIC_KEY: Clave pública para verificar los tokens JWT.
- CLIENT_ORIGIN: URL del frontend, necesaria para configurar CORS (en este caso https://marvelous-llama-c16708.netlify.app/adminlogin).
- EMAIL_HOST: Host del servidor SMTP para el envío de correos.
- EMAIL_PORT: Puerto del servidor SMTP.
- EMAIL_USERNAME: Usuario del servidor SMTP.
- EMAIL_PASSWORD: Contraseña del servidor SMTP.
- EMAIL_FROM: Correo electrónico del remitente.


## Configuracion de entorno desarrollo 

- git clone https://github.com/vinagree9912/ifx-networks.git
- cd fastapi_mongodb
- cd app
- pip install -r requirements.txt
- cd "Front-End Folder"
- npm install
- cd app
- uvicorn main:app --reload
- cd "Front-End Folder"
- npm run dev



