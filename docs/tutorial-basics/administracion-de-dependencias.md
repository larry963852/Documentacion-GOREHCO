---
icon: castle
---

# Administración de Dependencias

## 🏢 Administración de Dependencias

#### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema maneja dependencias internas y externas por separado
* Utiliza soft deletes para mantener integridad referencial
* Las dependencias eliminadas pueden ser restauradas automáticamente al crear una nueva con el mismo nombre
* Se valida la unicidad del nombre de dependencia
* La eliminación está deshabilitada por seguridad para mantener integridad histórica
* Los filtros permiten búsquedas personalizadas en el listado

***

### Listar Dependencias Internas

🟢 **GET** `https://tu-dominio.com/api/dependencias`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name   | Type   | Description        | Required |
| ------ | ------ | ------------------ | -------- |
| nombre | String | Filtrar por nombre | No       |
| estado | String | Filtrar por estado | No       |

#### 🟢 200

```json
{
    "data": [
        {
            "id": 1,
            "nombre": "Dirección General",
            "descripcion": "Dependencia principal de la institución",
            "estado": "activo",
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        }
    ]
}
```

***

### Crear Dependencia Interna

🟡 **POST** `https://tu-dominio.com/api/dependencias`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name        | Type   | Description                      | Required |
| ----------- | ------ | -------------------------------- | -------- |
| nombre\*    | String | Nombre de la dependencia (único) | Sí       |
| descripcion | String | Descripción de la dependencia    | No       |
| estado      | String | Estado de la dependencia         | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 2,
        "nombre": "Oficina de Recursos Humanos",
        "descripcion": "Gestión del personal institucional",
        "estado": "activo",
        "created_at": "2024-02-01T14:20:00.000000Z",
        "updated_at": "2024-02-01T14:20:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "nombre": ["El campo nombre es obligatorio."]
    }
}
```

#### 🔴 500

```json
{
    "status": "error",
    "message": "Error al crear la dependencia: [mensaje de error]"
}
```

***

### Obtener Dependencia Interna

🟢 **GET** `https://tu-dominio.com/api/dependencias/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                    | Required |
| ---- | ------- | ------------------------------ | -------- |
| id\* | Integer | ID de la dependencia a obtener | Sí       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "nombre": "Dirección General",
        "descripcion": "Dependencia principal de la institución",
        "estado": "activo",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z"
    }
}
```

***

### Actualizar Dependencia Interna

🔵 **PUT** `https://tu-dominio.com/api/dependencias/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                       | Required |
| ---- | ------- | --------------------------------- | -------- |
| id\* | Integer | ID de la dependencia a actualizar | Sí       |

#### Body

| Name        | Type   | Description                      | Required |
| ----------- | ------ | -------------------------------- | -------- |
| nombre\*    | String | Nombre de la dependencia (único) | Sí       |
| descripcion | String | Descripción de la dependencia    | No       |
| estado      | String | Estado de la dependencia         | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "nombre": "Dirección General Actualizada",
        "descripcion": "Dependencia principal modificada",
        "estado": "activo",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-02-01T16:45:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "nombre": ["El campo nombre es obligatorio."]
    }
}
```

#### 🔴 500

```json
{
    "status": "error",
    "message": "Error al actualizar la dependencia: [mensaje de error]"
}
```

***

### Eliminar Dependencia Interna

🔴 **DELETE** `https://tu-dominio.com/api/dependencias/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                     | Required |
| ---- | ------- | ------------------------------- | -------- |
| id\* | Integer | ID de la dependencia a eliminar | Sí       |

#### 🔴 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de dependencias está deshabilitada por seguridad para mantener la integridad histórica._

***

### Listar Dependencias Externas

🟢 **GET** `https://tu-dominio.com/api/dependenciasexternas`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name   | Type   | Description        | Required |
| ------ | ------ | ------------------ | -------- |
| nombre | String | Filtrar por nombre | No       |
| estado | String | Filtrar por estado | No       |

#### 🟢 200

```json
{
    "data": [
        {
            "id": 1,
            "nombre": "Ministerio de Economía y Finanzas",
            "descripcion": "Entidad externa de coordinación financiera",
            "estado": "activo",
            "created_at": "2024-01-20T09:15:00.000000Z",
            "updated_at": "2024-01-20T09:15:00.000000Z"
        }
    ]
}
```

***

### Crear Dependencia Externa

🟡 **POST** `https://tu-dominio.com/api/dependenciasexternas`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name        | Type   | Description                              | Required |
| ----------- | ------ | ---------------------------------------- | -------- |
| nombre\*    | String | Nombre de la dependencia externa (único) | Sí       |
| descripcion | String | Descripción de la dependencia externa    | No       |
| estado      | String | Estado de la dependencia externa         | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 2,
        "nombre": "SUNAT",
        "descripcion": "Superintendencia Nacional de Aduanas y de Administración Tributaria",
        "estado": "activo",
        "created_at": "2024-02-05T11:30:00.000000Z",
        "updated_at": "2024-02-05T11:30:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "nombre": ["El campo nombre es obligatorio."]
    }
}
```

#### 🔴 500

```json
{
    "status": "error",
    "message": "Error al crear la dependencia externa: [mensaje de error]"
}
```

***

### Obtener Dependencia Externa

🟢 **GET** `https://tu-dominio.com/api/dependenciasexternas/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                            | Required |
| ---- | ------- | -------------------------------------- | -------- |
| id\* | Integer | ID de la dependencia externa a obtener | Sí       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "nombre": "Ministerio de Economía y Finanzas",
        "descripcion": "Entidad externa de coordinación financiera",
        "estado": "activo",
        "created_at": "2024-01-20T09:15:00.000000Z",
        "updated_at": "2024-01-20T09:15:00.000000Z"
    }
}
```

***

### Actualizar Dependencia Externa

🔵 **PUT** `https://tu-dominio.com/api/dependenciasexternas/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                               | Required |
| ---- | ------- | ----------------------------------------- | -------- |
| id\* | Integer | ID de la dependencia externa a actualizar | Sí       |

#### Body

| Name        | Type   | Description                              | Required |
| ----------- | ------ | ---------------------------------------- | -------- |
| nombre\*    | String | Nombre de la dependencia externa (único) | Sí       |
| descripcion | String | Descripción de la dependencia externa    | No       |
| estado      | String | Estado de la dependencia externa         | No       |

#### 🟢 200

```json
{
    "data": {
        "id": 1,
        "nombre": "MEF - Ministerio de Economía y Finanzas",
        "descripcion": "Entidad externa de coordinación financiera actualizada",
        "estado": "activo",
        "created_at": "2024-01-20T09:15:00.000000Z",
        "updated_at": "2024-02-05T14:20:00.000000Z"
    }
}
```

#### 🔴 400

```json
{
    "status": "error",
    "errors": {
        "nombre": ["El campo nombre es obligatorio."]
    }
}
```

#### 🔴 500

```json
{
    "status": "error",
    "message": "Error al actualizar la dependencia externa: [mensaje de error]"
}
```

***

### Eliminar Dependencia Externa

🔴 **DELETE** `https://tu-dominio.com/api/dependenciasexternas/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                             | Required |
| ---- | ------- | --------------------------------------- | -------- |
| id\* | Integer | ID de la dependencia externa a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de dependencias externas está deshabilitada por seguridad para mantener la integridad histórica._

### Ejemplos de uso - Dependencias

#### PHP - Listar Dependencias Internas

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependencias",
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

#### PHP - Crear Dependencia Interna

```php
$params = json_encode([
    'nombre' => 'Oficina de Tecnologías de la Información',
    'descripcion' => 'Gestión de sistemas y tecnología institucional',
    'estado' => 'activo'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependencias",
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

#### PHP - Listar Dependencias Externas

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependenciasexternas",
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

#### PHP - Crear Dependencia Externa

```php
$params = json_encode([
    'nombre' => 'Contraloría General de la República',
    'descripcion' => 'Órgano superior del Sistema Nacional de Control',
    'estado' => 'activo'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependenciasexternas",
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

#### PHP - Actualizar Dependencia Interna

```php
$dependencia_id = 1; // ID de la dependencia a actualizar
$params = json_encode([
    'nombre' => 'Dirección General de Administración',
    'descripcion' => 'Dependencia principal actualizada',
    'estado' => 'activo'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependencias/" . $dependencia_id,
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

#### PHP - Obtener Dependencia Externa Específica

```php
$dependencia_externa_id = 1; // ID de la dependencia externa a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/dependenciasexternas/" . $dependencia_externa_id,
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
