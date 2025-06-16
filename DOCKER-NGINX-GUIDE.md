# 🚀 Docusaurus con Docker y Nginx - Guía Completa

Configuración profesional siguiendo las mejores prácticas oficiales de Docusaurus.

## 🎯 Modos disponibles:

### 1. **Desarrollo** (Recomendado para desarrollo)
```bash
./run-pro.sh dev
```
- ✅ Hot reload automático
- ✅ Cambios en tiempo real
- ✅ Puerto 3001
- ✅ Montaje de volúmenes (cambios externos → contenedor)

### 2. **Nginx** (Recomendado para producción)
```bash
./run-pro.sh nginx
```
- ✅ Nginx optimizado con compresión gzip
- ✅ Headers de seguridad
- ✅ Cache agresivo para assets
- ✅ Puerto 80
- ✅ Sitio estático super rápido

### 3. **Serve** (Para testing de producción)
```bash
./run-pro.sh serve
```
- ✅ Comando `docusaurus serve`
- ✅ Simula producción
- ✅ Puerto 3001

## 🌐 Acceso:

- **Local**: http://localhost:3001 (dev/serve) o http://localhost:80 (nginx)
- **Externo**: http://130.150.47.203:3001 (dev/serve) o http://130.150.47.203:80 (nginx)

## 📋 Comandos disponibles:

```bash
# Iniciar servicios
./run-pro.sh dev           # Desarrollo
./run-pro.sh nginx         # Producción con Nginx
./run-pro.sh serve         # Testing de producción

# Debugging
./run-pro.sh shell-dev     # Shell del contenedor dev
./run-pro.sh shell-nginx   # Shell del contenedor nginx
./run-pro.sh logs          # Logs del último servicio
./run-pro.sh logs nginx    # Logs específicos de nginx
./run-pro.sh logs serve    # Logs específicos de serve

# Gestión
./run-pro.sh down          # Parar todos los servicios
./run-pro.sh clean         # Limpiar todo (contenedores + imágenes)
./run-pro.sh build         # Solo construir imágenes
```

## 🔄 Flujo de trabajo recomendado:

### Para desarrollo:
```bash
# 1. Iniciar desarrollo
./run-pro.sh dev

# 2. Editar archivos externamente (VS Code)
# Los cambios se verán automáticamente en http://localhost:3001

# 3. Si necesitas debugging
./run-pro.sh shell-dev
```

### Para producción:
```bash
# 1. Construir y servir con Nginx
./run-pro.sh nginx

# 2. Acceder a http://130.150.47.203 o http://localhost

# 3. Para verificar logs
./run-pro.sh logs nginx
```

## ⚡ Ventajas de esta configuración:

### Desarrollo (`dev`):
- 🔥 **Hot reload**: Cambios instantáneos
- 📁 **Volúmenes**: Editas fuera, se refleja dentro
- 🐛 **Debug fácil**: Acceso a shell cuando necesites

### Nginx (`nginx`):
- 🚀 **Super rápido**: Nginx optimizado
- 📦 **Compresión**: Gzip automático
- 🔒 **Seguridad**: Headers configurados
- 💾 **Cache**: Assets cacheados por 1 año
- 🌐 **Producción**: Listo para despliegue

### Arquitectura:
```
📂 Código fuente (externo)
     ↕️ (volúmenes Docker)
🐳 Contenedor Docker
     ↕️ (multi-stage build)
🏗️ Build optimizado
     ↕️ (nginx serve)
🌐 Nginx (puerto 80)
```

## 🛠️ Troubleshooting:

```bash
# Si algo falla, limpiar y reiniciar
./run-pro.sh down
./run-pro.sh clean
./run-pro.sh nginx

# Ver qué está pasando
./run-pro.sh logs nginx

# Verificar que el contenedor esté corriendo
docker ps

# Acceder al shell para debugging
./run-pro.sh shell-nginx
```

## 📁 Estructura de archivos:

```
gorehco-docs/
├── Dockerfile                 # Multi-stage build
├── nginx.conf                 # Configuración optimizada
├── dev.docker-compose.yml     # Para desarrollo
├── nginx.docker-compose.yml   # Para producción
├── serve.docker-compose.yml   # Para testing
├── run-pro.sh                 # Script de gestión
└── docs/                      # Tu documentación
```

¡Esta configuración está lista para desarrollo y producción! 🎉
