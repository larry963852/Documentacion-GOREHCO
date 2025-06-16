#!/bin/bash

case "$1" in
    "dev")
        echo "🚀 Iniciando modo desarrollo..."
        docker compose -f dev.docker-compose.yml up -d --build
        echo "✅ Desarrollo activo en: http://localhost:3001"
        echo "🔄 Hot reload habilitado - los cambios se verán automáticamente"
        ;;
    "nginx")
        echo "🏭 Iniciando con Nginx (producción)..."
        docker compose -f nginx.docker-compose.yml up -d --build
        echo "✅ Nginx activo en: http://localhost:80 y http://130.150.47.203:80"
        echo "⚡ Sitio estático optimizado servido por Nginx"
        ;;
    "serve")
        echo "🔧 Iniciando con Docusaurus serve..."
        docker compose -f serve.docker-compose.yml up -d --build
        echo "✅ Serve activo en: http://localhost:3001 y http://130.150.47.203:3001"
        ;;
    "shell-dev")
        echo "🐚 Entrando al contenedor de desarrollo..."
        docker compose -f dev.docker-compose.yml exec docusaurus-dev bash
        ;;
    "shell-nginx")
        echo "🐚 Entrando al contenedor Nginx..."
        docker compose -f nginx.docker-compose.yml exec docusaurus-nginx sh
        ;;
    "logs")
        echo "📋 Mostrando logs..."
        if [ "$2" = "nginx" ]; then
            docker compose -f nginx.docker-compose.yml logs -f
        elif [ "$2" = "serve" ]; then
            docker compose -f serve.docker-compose.yml logs -f
        else
            docker compose -f dev.docker-compose.yml logs -f
        fi
        ;;
    "down")
        echo "🛑 Deteniendo todos los servicios..."
        docker compose -f dev.docker-compose.yml down
        docker compose -f nginx.docker-compose.yml down
        docker compose -f serve.docker-compose.yml down
        ;;
    "clean")
        echo "🧹 Limpiando contenedores e imágenes..."
        docker compose -f dev.docker-compose.yml down -v --rmi all
        docker compose -f nginx.docker-compose.yml down -v --rmi all
        docker compose -f serve.docker-compose.yml down -v --rmi all
        ;;
    "build")
        echo "🔨 Solo construyendo imagen..."
        docker build --target nginx -t gorehco-docs:nginx .
        docker build --target serve -t gorehco-docs:serve .
        docker build --target dev -t gorehco-docs:dev .
        ;;
    *)
        echo "Uso: $0 {dev|nginx|serve|shell-dev|shell-nginx|logs|down|clean|build}"
        echo ""
        echo "Modos disponibles:"
        echo "  dev        - Desarrollo con hot reload (puerto 3001)"
        echo "  nginx      - Producción con Nginx (puerto 80)"
        echo "  serve      - Producción con Docusaurus serve (puerto 3001)"
        echo ""
        echo "Comandos útiles:"
        echo "  shell-dev  - Acceso al shell del contenedor dev"
        echo "  shell-nginx- Acceso al shell del contenedor nginx"
        echo "  logs       - Ver logs (agrega: dev, nginx, serve)"
        echo "  down       - Detener todos los servicios"
        echo "  clean      - Limpiar completamente"
        echo "  build      - Solo construir imágenes"
        echo ""
        echo "Acceso externo configurado para: 130.150.47.203"
        echo ""
        echo "Ejemplos:"
        echo "  ./run.sh dev           # Desarrollo"
        echo "  ./run.sh nginx         # Producción con Nginx"
        echo "  ./run.sh logs nginx    # Ver logs de Nginx"
        exit 1
        ;;
esac
