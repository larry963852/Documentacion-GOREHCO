---
icon: tree-city
---

# Gestión Ubigeos

## 📍 Gestión de Ubigeos

### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema gestiona códigos de ubicación geográfica (departamentos, provincias, distritos)
* Los ubigeos siguen estándares INEI para códigos de ubicación en Perú
* Solo permite operaciones de lectura y creación/actualización para administradores
* La eliminación está deshabilitada por seguridad para mantener integridad referencial
* Utiliza transacciones de base de datos para garantizar consistencia
* Los filtros permiten búsquedas por código, nombre o nivel geográfico

***

### Listar Ubigeos

🟢 **GET** `https://tu-dominio.com/api/ubigeos`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

Los filtros disponibles dependen de la implementación del método `filter()` en el modelo Ubigeo. Parámetros comunes incluyen:

| Name      | Type    | Description            | Required |
| --------- | ------- | ---------------------- | -------- |
| codigo    | String  | Código de ubigeo       | No       |
| nombre    | String  | Nombre de la ubicación | No       |
| nivel     | String  | Nivel geográfico       | No       |
| padre\_id | Integer | ID del ubigeo padre    | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "codigo": "150101",
            "nombre": "Lima",
            "nivel": "distrito",
            "padre_id": 1501,
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ]
}
```

***

### Obtener Ubigeo Específico

🟢 **GET** `https://tu-dominio.com/api/ubigeos/\{id\}`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Path Parameters

| Name | Type    | Description             | Required |
| ---- | ------- | ----------------------- | -------- |
| id\* | Integer | ID del ubigeo a obtener | Sí       |

#### 200

```json
{
    "data": {
        "id": 1,
        "codigo": "150101",
        "nombre": "Lima",
        "nivel": "distrito",
        "padre_id": 1501,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
    }
}
```

***

### Ejemplos de uso

#### PHP - Listar Ubigeos

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/ubigeos",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
        "Accept: application/json",
        "Authorization: Bearer " . $token
    ),
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

#### PHP - Obtener Ubigeo Específico

```php
$ubigeo_id = 1; // ID del ubigeo a obtener

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/ubigeos/" . $ubigeo_id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
        "Accept: application/json",
        "Authorization: Bearer " . $token
    ),
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
