---
icon: unlock-keyhole
---

# Control Acceso

## 📋 Gestión de Permisos

### Listar Permisos

🟢 **GET** `https://tu-dominio.com/api/permisos`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name             | Type    | Description                    | Required |
| ---------------- | ------- | ------------------------------ | -------- |
| name             | String  | Filtrar por nombre             | No       |
| descripcion      | String  | Filtrar por descripción        | No       |
| tipo\_permiso    | Integer | Filtrar por tipo de permiso    | No       |
| nombre\_servicio | String  | Filtrar por nombre de servicio | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "name": "usuarios.index",
            "guard_name": "api",
            "descripcion": "Ver listado de usuarios",
            "tipo_permiso": 1,
            "nombre_servicio": "GRH Auth Service",
            "ruta_servicio": "/api/usuarios",
            "ruta": "/usuarios",
            "es_activo": true,
            "permiso_padre_id": null,
            "creado_por": 1,
            "icon": "fas fa-users",
            "bg_color": "#007bff",
            "bg_image": null,
            "text_color": "#ffffff",
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        }
    ]
}
```

***

### Crear Permiso

🟡 **POST** `https://tu-dominio.com/api/permisos`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name               | Type    | Description                                    | Required |
| ------------------ | ------- | ---------------------------------------------- | -------- |
| name\*             | String  | Nombre único del permiso (máx. 255 caracteres) | Sí       |
| descripcion        | String  | Descripción del permiso (máx. 255 caracteres)  | No       |
| tipo\_permiso\*    | Integer | Tipo de permiso (1=menú, 2=acción, etc.)       | Sí       |
| nombre\_servicio   | String  | Nombre del servicio (máx. 255 caracteres)      | No       |
| ruta\_servicio     | String  | Ruta del servicio API (máx. 255 caracteres)    | No       |
| ruta               | String  | Ruta frontend (máx. 255 caracteres)            | No       |
| es\_activo         | Boolean | Estado del permiso (por defecto true)          | No       |
| permiso\_padre\_id | Integer | ID del permiso padre (jerarquía)               | No       |
| creado\_por        | Integer | ID del usuario creador                         | No       |
| icon               | String  | Icono CSS (máx. 50 caracteres)                 | No       |
| bg\_color          | String  | Color de fondo (máx. 20 caracteres)            | No       |
| bg\_image          | String  | Imagen de fondo (máx. 255 caracteres)          | No       |
| text\_color        | String  | Color de texto (máx. 20 caracteres)            | No       |

#### 200

```json
{
    "data": {
        "id": 2,
        "name": "usuarios.create",
        "guard_name": "api",
        "descripcion": "Crear nuevos usuarios",
        "tipo_permiso": 2,
        "nombre_servicio": "GRH Auth Service",
        "ruta_servicio": "/api/usuarios",
        "ruta": "/usuarios/crear",
        "es_activo": true,
        "permiso_padre_id": 1,
        "creado_por": 1,
        "icon": "fas fa-user-plus",
        "bg_color": "#28a745",
        "bg_image": null,
        "text_color": "#ffffff",
        "created_at": "2024-02-01T14:20:00.000000Z",
        "updated_at": "2024-02-01T14:20:00.000000Z"
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "name": ["El campo name es obligatorio."],
        "tipo_permiso": ["El campo tipo_permiso es obligatorio."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al crear el permiso: [mensaje de error]"
}
```

***

### Obtener Permiso

🟢 **GET** `https://tu-dominio.com/api/permisos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description              | Required |
| ---- | ------- | ------------------------ | -------- |
| id\* | Integer | ID del permiso a obtener | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "name": "usuarios.index",
        "guard_name": "api",
        "descripcion": "Ver listado de usuarios",
        "tipo_permiso": 1,
        "nombre_servicio": "GRH Auth Service",
        "ruta_servicio": "/api/usuarios",
        "ruta": "/usuarios",
        "es_activo": true,
        "permiso_padre_id": null,
        "creado_por": 1,
        "icon": "fas fa-users",
        "bg_color": "#007bff",
        "bg_image": null,
        "text_color": "#ffffff",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z"
    }
}
```

***

### Actualizar Permiso

🔵 **PUT** `https://tu-dominio.com/api/permisos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                 | Required |
| ---- | ------- | --------------------------- | -------- |
| id\* | Integer | ID del permiso a actualizar | Sí       |

#### Body

| Name               | Type    | Description                                    | Required |
| ------------------ | ------- | ---------------------------------------------- | -------- |
| name\*             | String  | Nombre único del permiso (máx. 255 caracteres) | Sí       |
| descripcion        | String  | Descripción del permiso (máx. 255 caracteres)  | No       |
| tipo\_permiso\*    | Integer | Tipo de permiso (1=menú, 2=acción, etc.)       | Sí       |
| nombre\_servicio   | String  | Nombre del servicio (máx. 255 caracteres)      | No       |
| ruta\_servicio     | String  | Ruta del servicio API (máx. 255 caracteres)    | No       |
| ruta               | String  | Ruta frontend (máx. 255 caracteres)            | No       |
| es\_activo         | Boolean | Estado del permiso                             | No       |
| permiso\_padre\_id | Integer | ID del permiso padre (jerarquía)               | No       |
| creado\_por        | Integer | ID del usuario creador                         | No       |
| icon               | String  | Icono CSS (máx. 50 caracteres)                 | No       |
| bg\_color          | String  | Color de fondo (máx. 20 caracteres)            | No       |
| bg\_image          | String  | Imagen de fondo (máx. 255 caracteres)          | No       |
| text\_color        | String  | Color de texto (máx. 20 caracteres)            | No       |

#### 200

```json
{
    "data": {
        "id": 1,
        "name": "usuarios.index.updated",
        "guard_name": "api",
        "descripcion": "Ver listado completo de usuarios del sistema",
        "tipo_permiso": 1,
        "nombre_servicio": "GRH Auth Service",
        "ruta_servicio": "/api/usuarios",
        "ruta": "/usuarios",
        "es_activo": true,
        "permiso_padre_id": null,
        "creado_por": 1,
        "icon": "fas fa-users-cog",
        "bg_color": "#17a2b8",
        "bg_image": null,
        "text_color": "#ffffff",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-02-01T16:45:00.000000Z"
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "name": ["El campo name es obligatorio."],
        "tipo_permiso": ["El campo tipo_permiso es obligatorio."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al actualizar el permiso: [mensaje de error]"
}
```

***

### Eliminar Permiso

🔴 **DELETE** `https://tu-dominio.com/api/permisos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description               | Required |
| ---- | ------- | ------------------------- | -------- |
| id\* | Integer | ID del permiso a eliminar | Sí       |

#### 200

```json
{
    "status": "success",
    "message": "Permiso eliminado correctamente."
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al eliminar el permiso: [mensaje de error]"
}
```

***

## 👥 Gestión de Roles

### Listar Roles

🟢 **GET** `https://tu-dominio.com/api/roles`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "name": "Super Administrador",
            "guard_name": "api",
            "permissions": [
                {
                    "id": 1,
                    "name": "usuarios.index",
                    "descripcion": "Ver listado de usuarios"
                },
                {
                    "id": 2,
                    "name": "usuarios.create",
                    "descripcion": "Crear nuevos usuarios"
                }
            ]
        }
    ]
}
```

***

### Crear Rol

🟡 **POST** `https://tu-dominio.com/api/roles`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name          | Type   | Description                        | Required |
| ------------- | ------ | ---------------------------------- | -------- |
| name\*        | String | Nombre único del rol               | Sí       |
| guard\_name\* | String | Guard name (normalmente "api")     | Sí       |
| permissions   | Array  | Array de IDs de permisos a asignar | No       |

#### 200

```json
{
    "data": {
        "id": 2,
        "name": "Administrador de Usuarios",
        "guard_name": "api",
        "permissions": [
            {
                "id": 1,
                "name": "usuarios.index",
                "descripcion": "Ver listado de usuarios"
            },
            {
                "id": 2,
                "name": "usuarios.create",
                "descripcion": "Crear nuevos usuarios"
            }
        ]
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "name": ["El campo name es obligatorio."],
        "guard_name": ["El campo guard_name es obligatorio."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al crear el rol: [mensaje de error]"
}
```

***

### Obtener Rol

🟢 **GET** `https://tu-dominio.com/api/roles/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description          | Required |
| ---- | ------- | -------------------- | -------- |
| id\* | Integer | ID del rol a obtener | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "name": "Super Administrador",
        "guard_name": "api",
        "permissions": [
            {
                "id": 1,
                "name": "usuarios.index",
                "descripcion": "Ver listado de usuarios"
            },
            {
                "id": 2,
                "name": "usuarios.create",
                "descripcion": "Crear nuevos usuarios"
            }
        ]
    }
}
```

***

### Actualizar Rol

🔵 **PUT** `https://tu-dominio.com/api/roles/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description             | Required |
| ---- | ------- | ----------------------- | -------- |
| id\* | Integer | ID del rol a actualizar | Sí       |

#### Body

| Name          | Type   | Description                        | Required |
| ------------- | ------ | ---------------------------------- | -------- |
| name\*        | String | Nombre único del rol               | Sí       |
| guard\_name\* | String | Guard name (normalmente "api")     | Sí       |
| permissions   | Array  | Array de IDs de permisos a asignar | No       |

#### 200

```json
{
    "data": {
        "id": 1,
        "name": "Super Administrador Actualizado",
        "guard_name": "api",
        "permissions": [
            {
                "id": 1,
                "name": "usuarios.index",
                "descripcion": "Ver listado de usuarios"
            },
            {
                "id": 3,
                "name": "usuarios.update",
                "descripcion": "Actualizar usuarios"
            }
        ]
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "name": ["El campo name es obligatorio."],
        "guard_name": ["El campo guard_name es obligatorio."]
    }
}
```

***

### Eliminar Rol

🔴 **DELETE** `https://tu-dominio.com/api/roles/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description           | Required |
| ---- | ------- | --------------------- | -------- |
| id\* | Integer | ID del rol a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de roles está deshabilitada por seguridad para mantener la integridad del sistema._

***

### Sincronizar Permisos de Rol

🟡 **POST** `https://tu-dominio.com/api/roles/\{id\}/sync-permissions`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                            | Required |
| ---- | ------- | -------------------------------------- | -------- |
| id\* | Integer | ID del rol al que sincronizar permisos | Sí       |

#### Body

| Name          | Type  | Description                            | Required |
| ------------- | ----- | -------------------------------------- | -------- |
| permissions\* | Array | Array de IDs de permisos a sincronizar | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "name": "Super Administrador",
        "guard_name": "api",
        "permissions": [
            {
                "id": 1,
                "name": "usuarios.index",
                "descripcion": "Ver listado de usuarios"
            },
            {
                "id": 2,
                "name": "usuarios.create",
                "descripcion": "Crear nuevos usuarios"
            },
            {
                "id": 3,
                "name": "usuarios.update",
                "descripcion": "Actualizar usuarios"
            }
        ]
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "permissions": ["El campo permissions es obligatorio."],
        "permissions.0": ["El permiso seleccionado no existe."]
    }
}
```

***

### Ejemplos de uso

#### PHP - Listar Cargos

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/cargos",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Crear Cargo

```php
$params = json_encode([
    'nombre' => 'Coordinador de Tecnologías',
    'descripcion' => 'Responsable de la coordinación tecnológica institucional',
    'dependencia_id' => 3,
    'tipo_cargo' => 'administrativo',
    'role_id' => 5
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/cargos",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Obtener Cargo Específico

```php
$cargo_id = 1; // ID del cargo a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/cargos/" . $cargo_id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Actualizar Cargo

```php
$cargo_id = 1; // ID del cargo a actualizar
$params = json_encode([
    'nombre' => 'Director General de Administración',
    'descripcion' => 'Cargo directivo principal actualizado',
    'dependencia_id' => 1,
    'tipo_cargo' => 'administrativo',
    'role_id' => 2
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/cargos/" . $cargo_id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Listar Cargos con Filtros

```php
$filtros = http_build_query([
    'tipo_cargo' => 'administrativo',
    'dependencia_id' => 1
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/cargos?" . $filtros,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

***

#### PHP - Listar Permisos

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/permisos",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Crear Permiso

```php
$params = json_encode([
    'name' => 'cargos.create',
    'descripcion' => 'Crear nuevos cargos',
    'tipo_permiso' => 2,
    'nombre_servicio' => 'GRH Auth Service',
    'ruta_servicio' => '/api/cargos',
    'ruta' => '/cargos/crear',
    'es_activo' => true,
    'icon' => 'fas fa-briefcase-plus',
    'bg_color' => '#28a745',
    'text_color' => '#ffffff'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/permisos",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Listar Roles

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/roles",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Crear Rol con Permisos

```php
$params = json_encode([
    'name' => 'Gestor de Recursos Humanos',
    'guard_name' => 'api',
    'permissions' => [1, 2, 3, 4, 5] // IDs de permisos a asignar
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/roles",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Sincronizar Permisos de Rol

```php
$rol_id = 1; // ID del rol
$params = json_encode([
    'permissions' => [1, 2, 3, 5, 8] // Nuevos IDs de permisos
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/roles/" . $rol_id . "/sync-permissions",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```

#### PHP - Actualizar Permiso

```php
$permiso_id = 1; // ID del permiso a actualizar
$params = json_encode([
    'name' => 'usuarios.index.all',
    'descripcion' => 'Ver todos los usuarios del sistema con detalles completos',
    'tipo_permiso' => 1,
    'es_activo' => true,
    'icon' => 'fas fa-users-cog',
    'bg_color' => '#6f42c1'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/permisos/" . $permiso_id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer INGRESAR_TOKEN_AQUI'
    ],        
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
```
