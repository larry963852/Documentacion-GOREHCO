# Administración de Cargos

## 📋 Administración de Cargos

### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema maneja cargos administrativos y docentes
* Utiliza soft deletes para mantener integridad referencial
* Los cargos eliminados pueden ser restaurados automáticamente al crear uno nuevo con el mismo nombre
* Se valida la relación con dependencias existentes
* Los cargos pueden estar asociados a roles específicos
* La eliminación está deshabilitada por seguridad para mantener integridad histórica
* Los filtros permiten búsquedas personalizadas en el listado

***

### Listar Cargos

🟢 **GET** `https://tu-dominio.com/api/cargos`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name            | Type    | Description                               | Required |
| --------------- | ------- | ----------------------------------------- | -------- |
| nombre          | String  | Filtrar por nombre                        | No       |
| descripcion     | String  | Filtrar por descripción                   | No       |
| dependencia\_id | Integer | Filtrar por ID de dependencia             | No       |
| tipo\_cargo     | String  | Filtrar por tipo (administrativo/docente) | No       |
| role\_id        | Integer | Filtrar por ID de rol                     | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "nombre": "Director General",
            "descripcion": "Cargo directivo principal de la institución",
            "dependencia_id": 1,
            "tipo_cargo": "administrativo",
            "role_id": 1,
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z",
            "dependencia": {
                "id": 1,
                "nombre": "Dirección General"
            }
        }
    ]
}
```

***

### Crear Cargo

🟡 **POST** `https://tu-dominio.com/api/cargos`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name              | Type    | Description                                 | Required |
| ----------------- | ------- | ------------------------------------------- | -------- |
| nombre\*          | String  | Nombre del cargo (máx. 255 caracteres)      | Sí       |
| descripcion       | String  | Descripción del cargo (máx. 500 caracteres) | No       |
| dependencia\_id\* | Integer | ID de la dependencia asociada               | Sí       |
| tipo\_cargo\*     | String  | Tipo de cargo (administrativo/docente)      | Sí       |
| role\_id          | Integer | ID del rol asociado                         | No       |

#### 200

```json
{
    "data": {
        "id": 2,
        "nombre": "Jefe de Recursos Humanos",
        "descripcion": "Responsable de la gestión del personal institucional",
        "dependencia_id": 2,
        "tipo_cargo": "administrativo",
        "role_id": 2,
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
        "nombre": ["El campo nombre es obligatorio."],
        "dependencia_id": ["El campo dependencia_id es obligatorio."],
        "tipo_cargo": ["El campo tipo_cargo debe ser administrativo o docente."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al crear el cargo: [mensaje de error]"
}
```

***

### Obtener Cargo

🟢 **GET** `https://tu-dominio.com/api/cargos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description            | Required |
| ---- | ------- | ---------------------- | -------- |
| id\* | Integer | ID del cargo a obtener | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "nombre": "Director General",
        "descripcion": "Cargo directivo principal de la institución",
        "dependencia_id": 1,
        "tipo_cargo": "administrativo",
        "role_id": 1,
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z",
        "dependencia": {
            "id": 1,
            "nombre": "Dirección General"
        }
    }
}
```

***

### Actualizar Cargo

🔵 **PUT** `https://tu-dominio.com/api/cargos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description               | Required |
| ---- | ------- | ------------------------- | -------- |
| id\* | Integer | ID del cargo a actualizar | Sí       |

#### Body

| Name              | Type    | Description                                 | Required |
| ----------------- | ------- | ------------------------------------------- | -------- |
| nombre\*          | String  | Nombre del cargo (máx. 255 caracteres)      | Sí       |
| descripcion       | String  | Descripción del cargo (máx. 500 caracteres) | No       |
| dependencia\_id\* | Integer | ID de la dependencia asociada               | Sí       |
| tipo\_cargo\*     | String  | Tipo de cargo (administrativo/docente)      | Sí       |
| role\_id          | Integer | ID del rol asociado                         | No       |

#### 200

```json
{
    "data": {
        "id": 1,
        "nombre": "Director General Actualizado",
        "descripcion": "Cargo directivo principal modificado",
        "dependencia_id": 1,
        "tipo_cargo": "administrativo",
        "role_id": 2,
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
        "nombre": ["El campo nombre es obligatorio."],
        "tipo_cargo": ["El campo tipo_cargo debe ser administrativo o docente."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al actualizar el cargo: [mensaje de error]"
}
```

***

### Eliminar Cargo

🔴 **DELETE** `https://tu-dominio.com/api/cargos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description             | Required |
| ---- | ------- | ----------------------- | -------- |
| id\* | Integer | ID del cargo a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de cargos está deshabilitada por seguridad para mantener la integridad histórica._

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
