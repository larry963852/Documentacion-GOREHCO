# Gorehco Docs - Documentación API

Documentación Pauperrima.

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/larry963852/Documentacion-GOREHCO.git
cd gorehco-docs

# Desarrollo (hot reload)
./run-pro.sh dev
# ➜ http://localhost:3001

# Producción (Nginx optimizado)
./run-pro.sh nginx
# ➜ http://localhost
```

### Sin Docker

```bash
# Clonar repositorio
git clone https://github.com/larry963852/Documentacion-GOREHCO.git
cd gorehco-docs

# Instalar dependencias y ejecutar
npm install
npm start
# ➜ http://localhost:3000
```

## 🔧 Comandos Docker

```bash
./run-pro.sh dev      # Desarrollo con hot reload
./run-pro.sh nginx    # Producción con Nginx
./run-pro.sh down     # Detener servicios
./run-pro.sh logs     # Ver logs
```

## 🌐 Acceso Externo

Para acceso desde otras IPs, edita los archivos `*docker-compose.yml`:

```yaml
ports:
  - "0.0.0.0:80:80"    # Accesible desde cualquier IP
```

O usa tu IP específica:
```yaml
ports:
  - "192.168.1.100:80:80"    # Solo desde esta IP
```

## � Despliegue en Servidor

```bash
# En tu servidor
git clone https://github.com/larry963852/Documentacion-GOREHCO.git
cd gorehco-docs
chmod +x run-pro.sh
./run-pro.sh nginx

# Configurar firewall si es necesario
sudo ufw allow 80
```

## 💻 Desarrollo Local

```bash
npm install    # Instalar dependencias
npm start      # Servidor desarrollo
npm run build  # Construir para producción
npm run serve  # Servir build local
```

---

**� Con Docker: 2 comandos y listo**  
**� Sin Docker: 3 comandos y funciona**
