// Script simple para verificar la recepción del token
console.log('🔍 Iniciando verificación de token...');

// 1. Verificar si hay token en localStorage
const tokenEnStorage = localStorage.getItem('token') || localStorage.getItem('id_token') || localStorage.getItem('auth_token');
if (tokenEnStorage) {
    console.log('✅ Token encontrado en localStorage:', tokenEnStorage.substring(0, 20) + '...');
} else {
    console.log('❌ No hay token en localStorage');
}

// 2. Listener para recibir token via postMessage
window.addEventListener('message', function(event) {
    console.log('📨 PostMessage recibido:', {
        origen: event.origin,
        datos: event.data,
        timestamp: new Date().toISOString()
    });
    
    // Verificar si es un mensaje de autenticación
    if (event.data && event.data.type === 'OPEN_SERVICE' && event.data.token) {
        console.log('🎯 Token recibido via postMessage!');
        console.log('Token (primeros 50 caracteres):', event.data.token.substring(0, 50) + '...');
        
        // Guardar en localStorage
        localStorage.setItem('auth_token', event.data.token);
        console.log('💾 Token guardado en localStorage');
        
        // Mostrar notificación visual
        mostrarNotificacion('Token recibido correctamente!');
    }
});

// 3. Función para mostrar notificación visual
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (notif.parentNode) {
            notif.parentNode.removeChild(notif);
        }
    }, 5000);
}

// 4. Verificar cada 2 segundos si hay cambios en localStorage
setInterval(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !window.tokenDetectado) {
        console.log('🔄 Token detectado en verificación periódica');
        window.tokenDetectado = true;
        mostrarNotificacion('Token detectado en localStorage!');
    }
}, 2000);

// 5. Información sobre la ventana
console.log('🪟 Información de la ventana:', {
    tieneOrigen: !!window.opener,
    URL: window.location.href,
    origen: window.location.origin
});

console.log('🎯 Verificación de token configurada. Abre la consola para ver los logs.');

// ======================== NUEVO CÓDIGO ========================

console.log('🚀 [TOKEN-TEST] Script cargado - Iniciando sistema de autenticación simple');
console.log('🚀 [TOKEN-TEST] URL actual:', window.location.href);
console.log('🚀 [TOKEN-TEST] Origen actual:', window.location.origin);

// Configuración
const AUTH_ORIGIN = 'http://localhost:5174';
const AUTH_API = 'http://localhost:8082/api';

console.log('🔧 [CONFIG] AUTH_ORIGIN:', AUTH_ORIGIN);
console.log('🔧 [CONFIG] AUTH_API:', AUTH_API);

// Función para mostrar mensajes en pantalla
function showMessage(message, type = 'info') {
  const colors = {
    info: '#007bff',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545'
  };
  
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 9999;
    max-width: 400px;
    font-family: monospace;
    font-size: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  messageDiv.innerHTML = `
    <strong>[${type.toUpperCase()}]</strong><br>
    ${message}
    <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
  `;
  document.body.appendChild(messageDiv);
  
  // Auto remove after 10 seconds
  setTimeout(() => {
    if (messageDiv.parentElement) {
      messageDiv.remove();
    }
  }, 10000);
}

// Función para verificar si hay token
function checkExistingToken() {
  console.log('🔍 [TOKEN-CHECK] Verificando token existente...');
  const token = localStorage.getItem('authToken');
  
  if (token) {
    console.log('✅ [TOKEN-CHECK] Token encontrado:', token.substring(0, 20) + '...');
    showMessage(`Token encontrado: ${token.substring(0, 20)}...`, 'success');
    return true;
  } else {
    console.log('❌ [TOKEN-CHECK] No hay token en localStorage');
    showMessage('No hay token en localStorage', 'warning');
    return false;
  }
}

// Función para manejar mensajes postMessage
function handleMessage(event) {
  console.log('📨 [POST-MESSAGE] Mensaje recibido:', {
    origin: event.origin,
    data: event.data,
    timestamp: new Date().toISOString()
  });
  
  // Verificar origen
  if (event.origin !== AUTH_ORIGIN) {
    console.warn('⚠️ [SECURITY] Mensaje rechazado - Origen no confiable:', event.origin);
    showMessage(`Mensaje rechazado de: ${event.origin}`, 'error');
    return;
  }
  
  // Verificar estructura del mensaje
  if (!event.data || event.data.type !== 'OPEN_SERVICE') {
    console.warn('⚠️ [MESSAGE] Estructura de mensaje inválida:', event.data);
    showMessage('Estructura de mensaje inválida', 'warning');
    return;
  }
  
  // Verificar token
  if (!event.data.token) {
    console.error('❌ [TOKEN] No se recibió token en el mensaje');
    showMessage('No se recibió token en el mensaje', 'error');
    window.close();
    return;
  }
  
  console.log('✅ [TOKEN] Token recibido correctamente:', event.data.token.substring(0, 20) + '...');
  showMessage(`Token recibido: ${event.data.token.substring(0, 20)}...`, 'success');
  
  // Guardar token
  localStorage.setItem('authToken', event.data.token);
  console.log('💾 [STORAGE] Token guardado en localStorage');
  
  // Remover listener para evitar múltiples procesamientos
  window.removeEventListener('message', handleMessage);
  console.log('🗑️ [CLEANUP] Listener de mensajes removido');
  
  showMessage('Autenticación completada exitosamente', 'success');
}

// Función para manejar cierre de sesión desde otras ventanas
function handleStorageChange(event) {
  console.log('📦 [STORAGE-EVENT] Cambio en localStorage detectado:', {
    key: event.key,
    oldValue: event.oldValue,
    newValue: event.newValue,
    timestamp: new Date().toISOString()
  });
  
  // Detectar evento de cierre de sesión
  if (event.key === 'cerrar-hijas') {
    console.log('🚪 [LOGOUT] Evento de cierre de sesión detectado desde auth service');
    showMessage('Sesión cerrada desde otro servicio. Cerrando ventana...', 'warning');
    
    // Limpiar token local
    localStorage.removeItem('authToken');
    console.log('🗑️ [CLEANUP] Token eliminado del localStorage');
    
    // Intentar cerrar la ventana
    if (window.opener) {
      console.log('🪟 [WINDOW] Cerrando ventana hija...');
      window.close();
    } else {
      console.log('🚪 [REDIRECT] No es ventana hija - Redirigiendo a auth service');
      setTimeout(() => {
        window.location.href = AUTH_ORIGIN + '/login';
      }, 2000);
    }
  }
  
  // Detectar si se eliminó el token directamente
  if (event.key === 'authToken' && !event.newValue && event.oldValue) {
    console.log('❌ [TOKEN-REMOVED] Token eliminado del localStorage');
    showMessage('Token eliminado. Se requiere nueva autenticación.', 'error');
    
    setTimeout(() => {
      requireAuthentication();
    }, 2000);
  }
}

// Función para requerir autenticación
function requireAuthentication() {
  console.log('🔐 [AUTH-REQUIRED] Se requiere autenticación');
  showMessage('🔐 AUTENTICACIÓN REQUERIDA: No se encontró token válido', 'error');
  
  if (window.opener) {
    console.log('🪟 [WINDOW] Es ventana hija - Cerrando...');
    window.close();
  } else {
    console.log('🚪 [REDIRECT] Redirigiendo al servicio de autenticación...');
    setTimeout(() => {
      window.location.href = AUTH_ORIGIN + '/login';
    }, 3000);
  }
}

// Función principal de inicialización
function initAuth() {
  console.log('🏁 [INIT] Iniciando proceso de autenticación...');
  
  const tokenExiste = checkExistingToken();
  const tieneOrigen = !!window.opener;
  
  console.log('🔍 [STATUS] Token existe:', tokenExiste);
  console.log('🔍 [STATUS] Tiene ventana padre:', tieneOrigen);
  
  // Configurar listener para cambios en localStorage (logout remoto)
  window.addEventListener('storage', handleStorageChange);
  console.log('👂 [LISTENER] Listener de storage configurado para logout remoto');
  
  if (!tokenExiste && !tieneOrigen) {
    console.log('🚪 [REDIRECT] No hay token ni ventana padre');
    requireAuthentication();
    return;
  }
  
  if (tokenExiste) {
    console.log('✅ [SUCCESS] Usuario ya autenticado');
    showMessage('Usuario ya autenticado', 'success');
    
    // Verificar periódicamente que el token siga existiendo
    setInterval(() => {
      const tokenActual = localStorage.getItem('authToken');
      if (!tokenActual) {
        console.log('⚠️ [TOKEN-LOST] Token perdido durante la sesión');
        showMessage('Token perdido. Requiere nueva autenticación.', 'warning');
        requireAuthentication();
      }
    }, 5000); // Verificar cada 5 segundos
    
    return;
  }
  
  if (tieneOrigen) {
    console.log('👂 [LISTENER] Esperando token desde ventana padre...');
    showMessage('Esperando token desde ventana padre...', 'info');
    window.addEventListener('message', handleMessage);
    
    // Timeout para casos donde no llega el token
    setTimeout(() => {
      const tokenRecibido = localStorage.getItem('authToken');
      if (!tokenRecibido) {
        console.log('⏰ [TIMEOUT] No se recibió token en tiempo esperado');
        showMessage('Timeout: No se recibió token. Cerrando ventana...', 'error');
        window.close();
      }
    }, 10000); // 10 segundos de timeout
  }
}

// Función para mostrar información de debug
function showDebugInfo() {
  const debugInfo = {
    url: window.location.href,
    origin: window.location.origin,
    hasOpener: !!window.opener,
    token: localStorage.getItem('authToken') ? 'Presente' : 'Ausente',
    timestamp: new Date().toISOString()
  };
  
  console.table(debugInfo);
  
  const debugDiv = document.createElement('div');
  debugDiv.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #333;
    color: #00ff00;
    padding: 15px;
    border-radius: 5px;
    z-index: 9999;
    font-family: monospace;
    font-size: 11px;
    max-width: 300px;
  `;
  debugDiv.innerHTML = `
    <strong>🐛 DEBUG INFO</strong><br>
    URL: ${debugInfo.url}<br>
    Origin: ${debugInfo.origin}<br>
    Has Opener: ${debugInfo.hasOpener}<br>
    Token: ${debugInfo.token}<br>
    Time: ${debugInfo.timestamp}
    <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: #00ff00; cursor: pointer;">×</button>
  `;
  document.body.appendChild(debugDiv);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 [DOM] DOM cargado - Iniciando autenticación');
    initAuth();
    showDebugInfo();
  });
} else {
  console.log('📄 [DOM] DOM ya estaba listo - Iniciando autenticación');
  initAuth();
  showDebugInfo();
}

// Agregar función global para testing manual
window.testAuth = {
  checkToken: checkExistingToken,
  clearToken: () => {
    localStorage.removeItem('authToken');
    console.log('🗑️ [TEST] Token eliminado');
    showMessage('Token eliminado', 'info');
  },
  showDebug: showDebugInfo,
  simulateMessage: (token) => {
    console.log('🧪 [TEST] Simulando mensaje con token:', token);
    const event = {
      origin: AUTH_ORIGIN,
      data: { type: 'OPEN_SERVICE', token: token }
    };
    handleMessage(event);
  },
  simulateLogout: () => {
    console.log('🧪 [TEST] Simulando logout desde auth service');
    localStorage.setItem('cerrar-hijas', Date.now().toString());
    localStorage.removeItem('cerrar-hijas');
  },
  forceAuth: () => {
    console.log('🧪 [TEST] Forzando reautenticación');
    requireAuthentication();
  }
};

console.log('✅ [SETUP] Sistema de autenticación configurado');
console.log('🧪 [HELP] Funciones de testing disponibles en: window.testAuth');
console.log('🧪 [HELP] - testAuth.simulateLogout() para simular cierre de sesión');
console.log('🧪 [HELP] - testAuth.forceAuth() para forzar reautenticación');

// Agregar listener para visibilidad de página (detectar cuando se enfoca)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    console.log('👀 [VISIBILITY] Página enfocada - Verificando token');
    const tokenExiste = localStorage.getItem('authToken');
    if (!tokenExiste) {
      console.log('❌ [FOCUS-CHECK] No hay token al enfocar página');
      showMessage('No hay token válido. Requiere autenticación.', 'error');
      requireAuthentication();
    } else {
      console.log('✅ [FOCUS-CHECK] Token presente al enfocar página');
    }
  }
});
