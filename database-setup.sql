-- Script para configurar GOREHCO Docs en el servicio de autenticación
-- Ejecutar en la base de datos del auth service

-- Insertar permiso para GOREHCO Docs
INSERT INTO permissions (name, guard_name, descripcion, nombre_servicio, ruta_servicio, bg_color, bg_image, icon, es_activo, es_menu, created_at, updated_at) 
VALUES (
    'access:gorehco-docs', 
    'web', 
    'Acceso a la documentación de GOREHCO APIs', 
    'GOREHCO Docs', 
    'http://localhost:3001/intro', 
    '#28a745', 
    'gorehco-docs.png', 
    'fa fa-book', 
    1, 
    1, 
    NOW(), 
    NOW()
);

-- Asignar el permiso al rol de administrador (ajustar el role_id según tu BD)
INSERT INTO role_has_permissions (permission_id, role_id) 
SELECT p.id, 1 
FROM permissions p 
WHERE p.name = 'access:gorehco-docs' 
AND NOT EXISTS (
    SELECT 1 FROM role_has_permissions rhp 
    WHERE rhp.permission_id = p.id AND rhp.role_id = 1
);

-- Verificar que se insertó correctamente
SELECT * FROM permissions WHERE name = 'access:gorehco-docs';