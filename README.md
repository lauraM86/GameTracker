# 🎮 GameTracker

**GameTracker** es una aplicación web desarrollada con **MERN Stack** (MongoDB, Express, React, Node.js) que permite registrar, visualizar y gestionar tus videojuegos favoritos, junto con estadísticas personalizadas y reseñas.

---

## 🚀 Características principales

- 📋 Registro e inicio de sesión con autenticación JWT  
- 🧠 Gestión de usuarios con MongoDB  
- 🎨 Interfaz moderna en modo oscuro  
- 💾 CRUD de juegos (agregar, ver, eliminar, buscar)  
- 📊 Pantalla de estadísticas personalizadas  
- ⚡ Pantalla de carga animada tras iniciar sesión  
- 🔒 Seguridad con contraseñas encriptadas (bcrypt)

---

### 🖥️ Frontend
- React.js (Vite)
- Axios
- Lucide Icons 🎮
- CSS (modo oscuro personalizado)

---

### ⚙️ Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcryptjs

---

### 📦 Instalación
- Clona el repositorio:
- git clone https://github.com/tuusuario/GameTracker.git cd GameTracker
- Backend
- cd gametracker-backend npm install
- Frontend
- cd gametracker-frontend npm install

---

### ⚙️ Configuración de variables de entorno

- Backend (.env)
- MONGO_URI=mongodb://localhost:27017/gametracker
- JWT_SECRET=tu_secreto_seguro PORT=4000
- Frontend (.env)
- VITE_API_URL=http://localhost:4000

### ▶️ Cómo ejecutar el proyecto
- Backend
- cd gametracker-backend npm run dev
- Frontend
- cd gametracker-frontend npm run dev

### 🧪 Documentación de la API

## 📂 Autenticación
- POST /auth/register
- POST /auth/login

## 🕹️ Juegos
- GET /games
- GET /games/:id
- POST /games/add
- DELETE /games/:id

## 🔍 Reseñas
- POST /reviews/:gameId

## 🧮 Estadísticas
- GET /stats/:userId
- PUT /stats/update/:gameId

---

### 🗂️ Estructura del proyecto
- gametracker-backend/ controllers/ models/ routes/ index.js
- gametracker-frontend/ components/ pages/ services/ context/ App.jsx

---

### 👤 Autor

- Nombre: Laura Benavides & keren Arrieta 
- GitHub: https://github.com/lauraM86/

---
