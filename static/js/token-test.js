// ======================== UNIFIED TOKEN VERIFICATION SYSTEM ========================

console.log('🚀 [TOKEN-VERIFY] Iniciando sistema de verificación de token unificado');

// Configuración
const AUTH_ORIGIN = 'http://localhost:5174';
const AUTH_API = 'http://localhost:8082/api';
const TOKEN_KEY = 'authToken';

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

  // Buscar en diferentes ubicaciones de localStorage
  const token = localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem('token') ||
    localStorage.getItem('id_token') ||
    localStorage.getItem('auth_token');

  if (token) {
    console.log('✅ [TOKEN-CHECK] Token encontrado:', token.substring(0, 20) + '...');

    // Normalizar: guardar en la clave estándar
    if (!localStorage.getItem(TOKEN_KEY)) {
      localStorage.setItem(TOKEN_KEY, token);
      console.log('🔄 [TOKEN-NORMALIZE] Token normalizado en clave estándar');
    }

    showMessage(`Token encontrado: ${token.substring(0, 20)}...`, 'success');
    return true;
  } else {
    console.log('❌ [TOKEN-CHECK] No hay token en localStorage');
    showMessage('No hay token en localStorage', 'warning');
    return false;
  }
}

// Función para verificar si es recarga de página
function isPageRefresh() {
  const navigation = performance.getEntriesByType('navigation')[0];
  const isRefresh = navigation && navigation.type === 'reload';
  console.log('🔄 [PAGE-REFRESH] Es recarga de página:', isRefresh);
  return isRefresh;
}

// Función para manejar mensajes postMessage
function handleMessage(event) {
  console.log('📨 [POST-MESSAGE] Mensaje recibido:', {
    origin: event.origin,
    data: event.data,
    timestamp: new Date().toISOString(),
    expectedOrigin: AUTH_ORIGIN,
    currentOrigin: window.location.origin
  });

  // Verificar origen - permitir tanto el auth service como el origen actual para testing
  const allowedOrigins = [
    AUTH_ORIGIN,
    window.location.origin, // Permitir mensajes desde la misma página (para testing)
    'http://localhost:3000', // Docusaurus común
    'http://localhost:3001', // Docusaurus alternativo
    'http://localhost:8080'  // Otros puertos comunes
  ];
  
  if (!allowedOrigins.includes(event.origin)) {
    console.warn('⚠️ [SECURITY] Mensaje rechazado - Origen no confiable:', {
      received: event.origin,
      allowed: allowedOrigins
    });
    showMessage(`Mensaje rechazado de: ${event.origin}. Orígenes permitidos: ${allowedOrigins.join(', ')}`, 'error');
    return;
  }
  
  console.log('✅ [SECURITY] Origen verificado correctamente:', event.origin);

  // Verificar estructura del mensaje
  if (!event.data || event.data.type !== 'OPEN_SERVICE') {
    console.warn('⚠️ [MESSAGE] Estructura de mensaje inválida:', event.data);
    return;
  }

  // Verificar token
  if (!event.data.token) {
    console.error('❌ [TOKEN] No se recibió token en el mensaje');
    showMessage('No se recibió token en el mensaje', 'error');
    return;
  }

  console.log('✅ [TOKEN] Token recibido correctamente:', event.data.token.substring(0, 20) + '...');
  showMessage(`Token recibido: ${event.data.token.substring(0, 20)}...`, 'success');

  // Guardar token
  localStorage.setItem(TOKEN_KEY, event.data.token);
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
    localStorage.removeItem(TOKEN_KEY);
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
  if (event.key === TOKEN_KEY && !event.newValue && event.oldValue) {
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

  const isRefresh = isPageRefresh();
  const tokenExiste = checkExistingToken();
  const tieneOrigen = !!window.opener;

  console.log('🔍 [STATUS] Es recarga de página:', isRefresh);
  console.log('🔍 [STATUS] Token existe:', tokenExiste);
  console.log('🔍 [STATUS] Tiene ventana padre:', tieneOrigen);

  // Configurar listener para cambios en localStorage (logout remoto)
  window.addEventListener('storage', handleStorageChange);
  console.log('👂 [LISTENER] Listener de storage configurado para logout remoto');

  // Si es recarga de página y hay token, continuar normalmente
  if (isRefresh && tokenExiste) {
    console.log('✅ [REFRESH] Recarga de página con token válido - Continuando sesión');
    showMessage('Sesión restaurada tras recarga de página', 'success');
    setupTokenMonitoring();
    return;
  }

  // Si no hay token y no es ventana hija, requerir autenticación
  if (!tokenExiste && !tieneOrigen) {
    console.log('🚪 [REDIRECT] No hay token ni ventana padre');
    requireAuthentication();
    return;
  }

  // Si hay token existente
  if (tokenExiste) {
    console.log('✅ [SUCCESS] Usuario ya autenticado');
    showMessage('Usuario ya autenticado', 'success');
    setupTokenMonitoring();
    return;
  }

  // Si es ventana hija esperando token
  if (tieneOrigen) {
    console.log('👂 [LISTENER] Esperando token desde ventana padre...');
    showMessage('Esperando token desde ventana padre...', 'info');
    window.addEventListener('message', handleMessage);

    // Timeout para casos donde no llega el token
    setTimeout(() => {
      const tokenRecibido = localStorage.getItem(TOKEN_KEY);
      if (!tokenRecibido) {
        console.log('⏰ [TIMEOUT] No se recibió token en tiempo esperado');
        showMessage('Timeout: No se recibió token. Cerrando ventana...', 'error');
        window.close();
      }
    }, 10000); // 10 segundos de timeout
  }
}

// Función para configurar monitoreo de token
function setupTokenMonitoring() {
  console.log('🔄 [MONITOR] Configurando monitoreo de token...');

  // Verificar periódicamente que el token siga existiendo
  setInterval(() => {
    const tokenActual = localStorage.getItem(TOKEN_KEY);
    if (!tokenActual) {
      console.log('⚠️ [TOKEN-LOST] Token perdido durante la sesión');
      showMessage('Token perdido. Requiere nueva autenticación.', 'warning');
      requireAuthentication();
    }
  }, 5000); // Verificar cada 5 segundos

  // Listener para visibilidad de página (detectar cuando se enfoca)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('👀 [VISIBILITY] Página enfocada - Verificando token');
      const tokenExiste = localStorage.getItem(TOKEN_KEY);
      if (!tokenExiste) {
        console.log('❌ [FOCUS-CHECK] No hay token al enfocar página');
        showMessage('No hay token válido. Requiere autenticación.', 'error');
        requireAuthentication();
      } else {
        console.log('✅ [FOCUS-CHECK] Token presente al enfocar página');
      }
    }
  });
}

// Función para mostrar información de debug
function showDebugInfo() {
  const debugInfo = {
    url: window.location.href,
    origin: window.location.origin,
    hasOpener: !!window.opener,
    token: localStorage.getItem(TOKEN_KEY) ? 'Presente' : 'Ausente',
    isRefresh: isPageRefresh(),
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
    Is Refresh: ${debugInfo.isRefresh}<br>
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
    localStorage.removeItem(TOKEN_KEY);
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
    // Simular la eliminación inmediata para testing
    setTimeout(() => {
      localStorage.removeItem('cerrar-hijas');
    }, 100);
  },
  // Función para simular logout completo como lo haría el auth service
  simulateRemoteLogout: () => {
    console.log('🧪 [TEST] Simulando logout remoto completo');
    showMessage('Simulando logout desde auth service...', 'warning');
    
    // Primero notificar via localStorage
    localStorage.setItem('cerrar-hijas', Date.now().toString());
    
    // Luego enviar postMessage si es ventana hija
    if (window.opener) {
      window.opener.postMessage({
        type: 'CHILD_LOGOUT',
        timestamp: Date.now()
      }, AUTH_ORIGIN);
    }
    
    // Limpiar después de un momento
    setTimeout(() => {
      localStorage.removeItem('cerrar-hijas');
    }, 500);
  },
  forceAuth: () => {
    console.log('🧪 [TEST] Forzando reautenticación');
    requireAuthentication();
  },
  simulateRefresh: () => {
    console.log('🧪 [TEST] Simulando recarga de página');
    window.location.reload();
  },
  // Función mejorada para testing que muestra información de origen
  testOrigins: () => {
    console.log('🔍 [ORIGINS] Información de orígenes:', {
      currentOrigin: window.location.origin,
      authOrigin: AUTH_ORIGIN,
      currentURL: window.location.href,
      hasOpener: !!window.opener,
      openerOrigin: window.opener ? 'Disponible' : 'No disponible'
    });
    
    showMessage(`Origen actual: ${window.location.origin}<br>Auth origen: ${AUTH_ORIGIN}`, 'info');
  }
};

console.log('✅ [SETUP] Sistema de autenticación unificado configurado');
console.log('🧪 [HELP] Funciones de testing disponibles en: window.testAuth');
console.log('🧪 [HELP] - testAuth.simulateRefresh() para simular recarga');
console.log('🧪 [HELP] - testAuth.checkToken() para verificar token manualmente');
console.log('🧪 [HELP] - testAuth.simulateLogout() para simular cierre de sesión');
console.log('🧪 [HELP] - testAuth.forceAuth() para forzar reautenticación');
console.log('🧪 [HELP] - testAuth.clearToken() para limpiar token');
console.log('🧪 [HELP] - testAuth.showDebug() para mostrar información de debug');
console.log('🧪 [HELP] - testAuth.simulateRemoteLogout() para simular logout completo');
console.log('🧪 [HELP] - testAuth.testOrigins() para verificar información de orígenes');
