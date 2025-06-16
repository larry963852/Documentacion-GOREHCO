---
icon: key
---

# Autenticación

### 🔐 Autenticación

#### Consideraciones

* El sistema utiliza autenticación basada en tokens OAuth2 con Laravel Passport
* Los tokens se generan mediante `createToken()` y se almacenan en la base de datos
* La autenticación se realiza por tipo y número de documento (no por email)
* Todas las rutas protegidas requieren el token de autenticación en el header `Authorization`
* El sistema carga automáticamente los roles y permisos del usuario autenticado
* Los tokens pueden ser revocados individualmente al cerrar sesión

***

### Iniciar Sesión

🟡 **POST** `https://tu-dominio.com/api/login`

#### Headers

| Name         | Type   | Description      |
| ------------ | ------ | ---------------- |
| Accept       | String | application/json |
| Content-Type | String | application/json |

#### Body

| Name                | Type    | Description                          | Required |
| ------------------- | ------- | ------------------------------------ | -------- |
| tipo\_documento\*   | Integer | Tipo de documento (1=DNI, 2=CE, etc) | Sí       |
| numero\_documento\* | String  | Número de documento (máx. 20 chars)  | Sí       |
| password\*          | String  | Contraseña del usuario               | Sí       |

#### 200

```json
{
    "user": {
        "id": 1,
        "tipo_documento": 1,
        "numero_documento": "12345678",
        "nombre_completo": "Juan Pérez López",
        "email": "juan.perez@example.com",
        "estado": "activo",
        "roles": [
            {
                "id": 1,
                "name": "admin",
                "permissions": [
                    {
                        "id": 1,
                        "name": "crear_usuario"
                    }
                ]
            }
        ]
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWJjZGVmZ2hpams..."
}
```

***

### Obtener Usuario Actual

🟢 **GET** `https://tu-dominio.com/api/usuario`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### 🟢 200

```json
{
    "id": 1,
    "tipo_documento": 1,
    "numero_documento": "12345678",
    "nombre_completo": "Juan Pérez López",
    "email": "juan.perez@example.com",
    "estado": "activo",
    "roles": [
        {
            "id": 1,
            "name": "admin",
            "permissions": [
                {
                    "id": 1,
                    "name": "crear_usuario"
                },
                {
                    "id": 2,
                    "name": "editar_usuario"
                }
            ]
        }
    ]
}
```

***

### Validar Token

🟢 **GET** `https://tu-dominio.com/api/validar-token`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### 🟢 200

```json
{
    "valid": true
}
```

#### 🔴 401

```json
{
    "valid": false
}
```

***

### Cerrar Sesión

🟡 **POST** `https://tu-dominio.com/api/logout`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### 🟢 200

```json
{
    "message": "Sesión cerrada correctamente"
}
```

### Ejemplos de uso

#### PHP - Iniciar Sesión

```php
$params = json_encode([
    'tipo_documento' => 1,
    'numero_documento' => '00000000',
    'password' => 'admin123'
]);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/login",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => $params,        
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json'
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

#### PHP - Obtener Usuario Actual

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/usuario",
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

#### PHP - Validar Token

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/validar-token",
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

#### PHP - Cerrar Sesión

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/logout",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
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
