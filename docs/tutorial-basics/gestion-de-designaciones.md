---
icon: pencil
---

# Gestión de Designaciones

## 📋 Gestión de Designaciones

#### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* Las designaciones representan asignaciones de usuarios a cargos específicos
* El sistema valida que no existan asignaciones activas duplicadas para el mismo usuario y cargo
* Las fechas de inicio y fin deben ser coherentes para evitar conflictos
* La eliminación de designaciones está deshabilitada por integridad de datos
* Se requiere comentario obligatorio al actualizar una designación

***

### Listar Designaciones

🟢 **GET** `https://tu-dominio.com/api/designaciones`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name          | Type    | Description                 | Required |
| ------------- | ------- | --------------------------- | -------- |
| usuario\_id   | Integer | Filtrar por ID de usuario   | No       |
| cargo\_id     | Integer | Filtrar por ID de cargo     | No       |
| fecha\_inicio | Date    | Filtrar por fecha de inicio | No       |
| estado        | String  | Filtrar por estado          | No       |

#### 🟢 200

```json
{
    "data": [
        {
            "id": 1,
            "usuario_id": 1,
            "cargo_id": 2,
            "fecha_inicio": "2024-01-15",
            "fecha_fin": "2024-12-31",
            "estado": "activo",
            "comentario": "Designación inicial",
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z",
            "usuario": {
                "id": 1,
                "nombre_completo": "Juan Pérez López",
                "numero_documento": "12345678"
            },
            "cargo": {
                "id": 2,
                "nombre": "Coordinador de Sistemas",
                "descripcion": "Encargado de coordinar sistemas"
            }
        }
    ]
}
```

***

### Crear Designación

🟡 **POST** `https://tu-dominio.com/api/designaciones`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name            | Type    | Description                     | Required |
| --------------- | ------- | ------------------------------- | -------- |
| usuario\_id\*   | Integer | ID del usuario a designar       | Sí       |
| cargo\_id\*     | Integer | ID del cargo a asignar          | Sí       |
| fecha\_inicio\* | Date    | Fecha de inicio (YYYY-MM-DD)    | Sí       |
| fecha\_fin      | Date    | Fecha de fin (YYYY-MM-DD)       | No       |
| estado          | String  | Estado de la designación        | No       |
| comentario      | String  | Comentario sobre la designación | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 2,
        "usuario_id": 3,
        "cargo_id": 1,
        "fecha_inicio": "2024-02-01",
        "fecha_fin": "2024-11-30",
        "estado": "activo",
        "comentario": "Nueva designación temporal",
        "created_at": "2024-01-17T09:15:00.000000Z",
        "updated_at": "2024-01-17T09:15:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "usuario_id": [
            "El campo usuario id es obligatorio."
        ],
        "fecha_inicio": [
            "El campo fecha inicio debe ser una fecha válida."
        ]
    }
}
```

#### 🔴 409

```json
{
    "status": "error",
    "message": "El usuario ya tiene una asignación activa para este cargo en el rango de fechas proporcionado."
}
```

***

### Obtener Designación

🟢 **GET** `https://tu-dominio.com/api/designaciones/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                    | Required |
| ---- | ------- | ------------------------------ | -------- |
| id\* | Integer | ID de la designación a obtener | Sí       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "usuario_id": 1,
        "cargo_id": 2,
        "fecha_inicio": "2024-01-15",
        "fecha_fin": "2024-12-31",
        "estado": "activo",
        "comentario": "Designación inicial",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z",
        "usuario": {
            "id": 1,
            "nombre_completo": "Juan Pérez López",
            "numero_documento": "12345678"
        },
        "cargo": {
            "id": 2,
            "nombre": "Coordinador de Sistemas",
            "descripcion": "Encargado de coordinar sistemas"
        }
    }
}
```

***

### Actualizar Designación

🔵 **PUT** `https://tu-dominio.com/api/designaciones/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                       | Required |
| ---- | ------- | --------------------------------- | -------- |
| id\* | Integer | ID de la designación a actualizar | Sí       |

#### Body

| Name            | Type    | Description                       | Required |
| --------------- | ------- | --------------------------------- | -------- |
| usuario\_id\*   | Integer | ID del usuario                    | Sí       |
| cargo\_id\*     | Integer | ID del cargo                      | Sí       |
| fecha\_inicio\* | Date    | Fecha de inicio (YYYY-MM-DD)      | Sí       |
| fecha\_fin      | Date    | Fecha de fin (YYYY-MM-DD)         | No       |
| estado          | String  | Estado de la designación          | No       |
| comentario\*    | String  | Comentario obligatorio (máx. 255) | Sí       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "usuario_id": 1,
        "cargo_id": 2,
        "fecha_inicio": "2024-01-15",
        "fecha_fin": "2024-12-31",
        "estado": "activo",
        "comentario": "Designación actualizada con nueva fecha de fin",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-17T16:45:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "comentario": [
            "El campo comentario es obligatorio."
        ]
    }
}
```

#### 🔴 409

```json
{
    "status": "error",
    "message": "El usuario ya tiene una asignación activa para este cargo en el rango de fechas proporcionado."
}
```

***

### Eliminar Designación

🔴 **DELETE** `https://tu-dominio.com/api/designaciones/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                     | Required |
| ---- | ------- | ------------------------------- | -------- |
| id\* | Integer | ID de la designación a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de designaciones está deshabilitada por seguridad para mantener la integridad histórica._

### Ejemplos de uso - Designaciones

#### PHP - Listar Designaciones

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/designaciones",
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

#### PHP - Crear Designación

```php
$params = json_encode([
    'usuario_id' => 3,
    'cargo_id' => 1,
    'fecha_inicio' => '2024-02-01',
    'fecha_fin' => '2024-11-30',
    'estado' => 'activo',
    'comentario' => 'Nueva designación temporal'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/designaciones",
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

#### PHP - Obtener Designación Específica

```php
$designacion_id = 1; // ID de la designación a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/designaciones/" . $designacion_id,
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

#### PHP - Actualizar Designación

```php
$designacion_id = 1; // ID de la designación a actualizar
$params = json_encode([
    'usuario_id' => 1,
    'cargo_id' => 2,
    'fecha_inicio' => '2024-01-15',
    'fecha_fin' => '2024-12-31',
    'estado' => 'activo',
    'comentario' => 'Designación actualizada con nueva fecha de fin'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/designaciones/" . $designacion_id,
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
