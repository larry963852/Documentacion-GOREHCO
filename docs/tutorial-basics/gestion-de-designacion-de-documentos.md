---
icon: file-lines
---

# Gestión de Designación de Documentos

## 🗂️ Gestión de Documentos de Designación

### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema gestiona documentos asociados a designaciones de personal
* Los documentos se identifican únicamente por su URL
* Utiliza soft deletes para mantener integridad referencial
* Los documentos eliminados pueden ser restaurados automáticamente al crear uno nuevo con la misma URL
* La eliminación está deshabilitada por seguridad para mantener integridad histórica
* Los filtros permiten búsquedas personalizadas por URL
* Ideal para gestión de archivos PDF, imágenes y otros documentos oficiales

***

### Listar Documentos de Designación

🟢 **GET** `https://tu-dominio.com/api/documentosdesignacion`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

| Name | Type   | Description     | Required |
| ---- | ------ | --------------- | -------- |
| url  | String | Filtrar por URL | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "url": "https://storage.tu-dominio.com/documentos/designacion_001_2024.pdf",
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        },
        {
            "id": 2,
            "url": "https://storage.tu-dominio.com/documentos/designacion_002_2024.pdf",
            "created_at": "2024-01-20T14:45:00.000000Z",
            "updated_at": "2024-01-20T14:45:00.000000Z"
        }
    ]
}
```

***

### Crear Documento de Designación

🟡 **POST** `https://tu-dominio.com/api/documentosdesignacion`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Body

| Name  | Type   | Description                             | Required |
| ----- | ------ | --------------------------------------- | -------- |
| url\* | String | URL del documento (máx. 255 caracteres) | Sí       |

#### 200

```json
{
    "data": {
        "id": 3,
        "url": "https://storage.tu-dominio.com/documentos/designacion_003_2024.pdf",
        "created_at": "2024-02-01T09:15:00.000000Z",
        "updated_at": "2024-02-01T09:15:00.000000Z"
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "url": ["El campo url es obligatorio."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al registrar el documentodesignacion.",
    "debug": "[mensaje de error detallado]"
}
```

***

### Obtener Documento de Designación

🟢 **GET** `https://tu-dominio.com/api/documentosdesignacion/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                | Required |
| ---- | ------- | -------------------------- | -------- |
| id\* | Integer | ID del documento a obtener | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "url": "https://storage.tu-dominio.com/documentos/designacion_001_2024.pdf",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z"
    }
}
```

***

### Actualizar Documento de Designación

🔵 **PUT** `https://tu-dominio.com/api/documentosdesignacion/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Content-Type  | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                   | Required |
| ---- | ------- | ----------------------------- | -------- |
| id\* | Integer | ID del documento a actualizar | Sí       |

#### Body

| Name  | Type   | Description                             | Required |
| ----- | ------ | --------------------------------------- | -------- |
| url\* | String | URL del documento (máx. 255 caracteres) | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "url": "https://storage.tu-dominio.com/documentos/designacion_001_2024_actualizado.pdf",
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-02-01T11:20:00.000000Z"
    }
}
```

#### 400

```json
{
    "status": "error",
    "errors": {
        "url": ["El campo url es obligatorio."]
    }
}
```

#### 500

```json
{
    "status": "error",
    "message": "Error al actualizar el documentodesignacion.",
    "debug": "[mensaje de error detallado]"
}
```

***

### Eliminar Documento de Designación

🔴 **DELETE** `https://tu-dominio.com/api/documentosdesignacion/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description                 | Required |
| ---- | ------- | --------------------------- | -------- |
| id\* | Integer | ID del documento a eliminar | Sí       |

#### 403

```json
{
    "status": "error",
    "message": "Operación no permitida."
}
```

_Nota: La eliminación de documentos de designación está deshabilitada por seguridad para mantener la integridad histórica y legal de los documentos._

***

### Ejemplos de uso

#### PHP - Listar Documentos de Designación

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion",
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

#### PHP - Crear Documento de Designación

```php
$params = json_encode([
    'url' => 'https://storage.tu-dominio.com/documentos/designacion_004_2024.pdf'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion",
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

#### PHP - Obtener Documento de Designación Específico

```php
$documento_id = 1; // ID del documento a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion/" . $documento_id,
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

#### PHP - Actualizar Documento de Designación

```php
$documento_id = 1; // ID del documento a actualizar
$params = json_encode([
    'url' => 'https://storage.tu-dominio.com/documentos/designacion_001_2024_version_final.pdf'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion/" . $documento_id,
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

#### PHP - Listar Documentos con Filtro por URL

```php
$filtros = http_build_query([
    'url' => 'designacion_2024'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion?" . $filtros,
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

#### PHP - Crear Documento con Validación de URL

```php
function crearDocumentoDesignacion($url) {
    // Validar que la URL sea válida
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return [
            'error' => true,
            'message' => 'URL no válida'
        ];
    }
    
    $params = json_encode(['url' => $url]);
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://tu-dominio.com/api/documentosdesignacion",
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
        return [
            'error' => true,
            'message' => "cURL Error: " . $err
        ];
    } else {
        return [
            'error' => false,
            'data' => json_decode($response, true)
        ];
    }
}

// Ejemplo de uso
$resultado = crearDocumentoDesignacion('https://storage.tu-dominio.com/documentos/designacion_005_2024.pdf');

if ($resultado['error']) {
    echo "Error: " . $resultado['message'];
} else {
    echo "Documento creado exitosamente: " . json_encode($resultado['data']);
}
```
