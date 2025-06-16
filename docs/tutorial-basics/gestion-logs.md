---
icon: burst
---

# Gestión Logs

## 🐛 Logs de Auditoría

### Consideraciones

* Todos los endpoints requieren autenticación mediante Bearer Token
* El sistema registra automáticamente todas las acciones realizadas en el sistema
* Los logs incluyen información detallada sobre operaciones CRUD en todos los modelos
* Utiliza filtros personalizables para búsquedas específicas
* Los logs son de solo lectura para mantener la integridad de la auditoría
* Ideal para seguimiento de cambios, debugging y cumplimiento de normativas

***

### Listar Logs de Auditoría

🟢 **GET** `https://tu-dominio.com/api/logs`

#### Headers

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| Accept        | String | application/json |
| Authorization | String | Bearer \{token\}   |

#### Query Parameters (Filtros)

Los filtros disponibles dependen de la implementación del método `filter()` en el modelo Log. Parámetros comunes incluyen:

| Name        | Type    | Description                | Required |
| ----------- | ------- | -------------------------- | -------- |
| model\_type | String  | Tipo de modelo auditado    | No       |
| model\_id   | Integer | ID del modelo auditado     | No       |
| action      | String  | Acción realizada           | No       |
| user\_id    | Integer | ID del usuario que realizó | No       |
| created\_at | Date    | Fecha de creación          | No       |

#### 200

```json
{
    "data": [
        {
            "id": 1,
            "model_type": "App\\Models\\Administracion\\Usuario",
            "model_id": 15,
            "action": "created",
            "user_id": 1,
            "old_values": null,
            "new_values": {
                "nombre": "Juan Pérez",
                "email": "juan.perez@institucion.gob.pe"
            },
            "created_at": "2024-01-15T10:30:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        }
    ]
}
```

***

### Ejemplos de uso

#### PHP - Listar Logs de Auditoría

```php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/logs",
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

#### PHP - Filtrar Logs por Usuario

```php
$user_id = 5; // ID del usuario a auditar

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tu-dominio.com/api/logs?user_id=" . $user_id,
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
