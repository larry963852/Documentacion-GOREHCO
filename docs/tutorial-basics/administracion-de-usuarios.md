---
icon: users-rectangle
---

# Administración de Usuarios

## 👥 Administración de Usuarios

#### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema utiliza soft deletes para mantener integridad referencial
* Los usuarios eliminados pueden ser restaurados
* Las contraseñas se encriptan automáticamente con bcrypt
* Se valida la unicidad de número de documento y email
* Los filtros permiten búsquedas personalizadas en el listado

***

### Listar Usuarios

🟢 **GET** `https://tu-dominio.com/api/usuarios`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name              | Type   | Description                     | Required |
| ----------------- | ------ | ------------------------------- | -------- |
| numero\_documento | String | Filtrar por número de documento | No       |
| email             | String | Filtrar por email               | No       |
| estado            | String | Filtrar por estado              | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "tipo_documento": 1,
            "numero_documento": "12345678",
            "nombre_completo": "Juan Pérez López",
            "email": "juan.perez@example.com",
            "estado": "activo",
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        },
        {
            "id": 2,
            "tipo_documento": 1,
            "numero_documento": "87654321",
            "nombre_completo": "María García Ruiz",
            "email": "maria.garcia@example.com",
            "estado": "activo",
            "created_at": "2024-01-16T14:20:00.000000Z",
            "updated_at": "2024-01-16T14:20:00.000000Z"
        }
    ]
}
```

***

### Crear Usuario

🟡 **POST** `https://tu-dominio.com/api/usuarios`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name                | Type    | Description                    | Required |
| ------------------- | ------- | ------------------------------ | -------- |
| tipo\_documento\*   | Integer | Tipo de documento              | Sí       |
| numero\_documento\* | String  | Número de documento (único)    | Sí       |
| nombre\_completo\*  | String  | Nombre completo del usuario    | Sí       |
| email\*             | String  | Email del usuario (único)      | Sí       |
| password\*          | String  | Contraseña (mín. 6 caracteres) | Sí       |
| estado              | String  | Estado del usuario             | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 3,
        "tipo_documento": 1,
        "numero_documento": "11223344",
        "nombre_completo": "Carlos Mendoza Silva",
        "email": "carlos.mendoza@example.com",
        "estado": "activo",
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
        "email": [
            "El campo email ya ha sido registrado."
        ],
        "numero_documento": [
            "El campo numero documento ya ha sido registrado."
        ]
    }
}
```

***

### Obtener Usuario

🟢 **GET** `https://tu-dominio.com/api/usuarios/{id}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description              | Required |
| ---- | ------- | ------------------------ | -------- |
| id\* | Integer | ID del usuario a obtener | Sí       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "tipo_documento": 1,
        "numero_documento": "12345678",
        "nombre_completo": "Juan Pérez López",
        "email": "juan.perez@example.com",
        "estado": "activo",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z"
    }
}
```

***

### Actualizar Usuario

🔵 **PUT** `https://tu-dominio.com/api/usuarios/{id}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                 | Required |
| ---- | ------- | --------------------------- | -------- |
| id\* | Integer | ID del usuario a actualizar | Sí       |

#### Body

| Name                | Type    | Description                 | Required |
| ------------------- | ------- | --------------------------- | -------- |
| tipo\_documento\*   | Integer | Tipo de documento           | Sí       |
| numero\_documento\* | String  | Número de documento (único) | Sí       |
| nombre\_completo\*  | String  | Nombre completo del usuario | Sí       |
| email\*             | String  | Email del usuario (único)   | Sí       |
| password            | String  | Nueva contraseña (opcional) | No       |
| estado              | String  | Estado del usuario          | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "tipo_documento": 1,
        "numero_documento": "12345678",
        "nombre_completo": "Juan Pérez López Actualizado",
        "email": "juan.perez.nuevo@example.com",
        "estado": "activo",
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
        "email": [
            "El campo email ya ha sido registrado."
        ]
    }
}
```

***

### Eliminar Usuario

🔴 **DELETE** `https://tu-dominio.com/api/usuarios/{id}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description               | Required |
| ---- | ------- | ------------------------- | -------- |
| id\* | Integer | ID del usuario a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de usuarios está deshabilitada por seguridad en el sistema actual._

### Ejemplos de uso

#### PHP - Listar Usuarios

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/usuarios",
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

#### PHP - Crear Usuario

```php
$params = json_encode([
    'tipo_documento' => 1,
    'numero_documento' => '11223344',
    'nombre_completo' => 'Carlos Mendoza Silva',
    'email' => 'carlos.mendoza@example.com',
    'password' => 'contraseña_segura123',
    'estado' => 'activo'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/usuarios",
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

#### PHP - Obtener Usuario Específico

```php
$usuario_id = 1; // ID del usuario a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/usuarios/" . $usuario_id,
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

#### PHP - Actualizar Usuario

```php
$usuario_id = 1; // ID del usuario a actualizar
$params = json_encode([
    'tipo_documento' => 1,
    'numero_documento' => '12345678',
    'nombre_completo' => 'Juan Pérez López Actualizado',
    'email' => 'juan.perez.nuevo@example.com',
    'estado' => 'activo'
    // 'password' => 'nueva_contraseña123' // Opcional
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/usuarios/" . $usuario_id,
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
