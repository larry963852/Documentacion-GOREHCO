---
sidebar_position: 1
description: Bienvenido a la documentación general de los sistemas de la GOREHCO.
icon: hand-wave
---

# QUICK START

Este proyecto engloba un sistema construido sobre una arquitectura de microservicios, orientada a facilitar la gestión, integración, escalabilidad y mantenimiento de sus distintos módulos funcionales. Cada componente opera de forma independiente y se comunica mediante APIs estandarizadas.

La arquitectura también está diseñada para simplificar su implementación, aprovechando la contenerización y el encapsulamiento de servicios, lo que permite una mayor portabilidad, flexibilidad y despliegue eficiente en distintos entornos.

### ⚙️ Tecnologías usadas

* **Backend:** Laravel
* **Frontend:** Vue.js
* **Base de datos:** PostgreSQL 17
* **Contenedores:** Docker y Docker Compose

### 🚀 Requisitos previos

Tener instalado **Docker** y **Docker Compose**

### 📥 Instalación y puesta en marcha

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

Clona el repositorio usando **HTTPS** o **SSH**:

```bash
# Opción 1: Clonar con HTTPS
git clone https://github.com/ryuvp/grh-auth-service.git

# Opción 2: Clonar con SSH
git clone git@github.com:ryuvp/grh-auth-service.git

cd grh-auth-service
```

🐳 Levantar los servicios en docker

```bash
# Crear una red externa de Docker si no existe
docker network create grh_network

# Levantar todos los servicios
docker-compose up --build -d
```

🧱 Configurar el entorno de backend (Laravel)

```bash
# Entrar al contenedor del backend
docker exec -it auth_service_app bash

# Luego, dentro del contenedor:
./setup.sh
```

🎨 Configurar el entorno frontend (Vue js)

```bash
# Entrar al contenedor del frontend
docker exec -it auth_service_frontend sh

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
