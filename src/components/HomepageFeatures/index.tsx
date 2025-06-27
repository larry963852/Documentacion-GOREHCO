import type { ReactNode } from 'react';

export default function HomepageFeatures(): ReactNode {
  return (
    <div className="main-content">
      <div className="content-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-banner">
            <img 
              src="/img/CapturaSGD.png" 
              alt="GOREHCO Background" 
              className="hero-background-image"
            />
            <div className="hero-background-overlay"></div>
            <div className="hero-text">
              <h1 className="hero-main-title">GOREHCO Docs</h1>
              <h2 className="hero-subtitle">
                Documentación completa para los servicios de autenticación y APIs del sistema GOREHCO.
                Una plataforma moderna para gestión gubernamental eficiente.
              </h2>
            </div>
            <a 
              href="http://localhost:5174/login" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button className="cta-button">
                <span>Ir al sistema GOREHCO</span>
              </button>
            </a>
          </div>
        </div>

        {/* Tech Stack Section */}
        <h2 className="section-title">Stack Tecnológico</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
              </svg>
            </div>
            <div className="tech-content">
              <h2 className="tech-title">TypeScript</h2>
              <p className="tech-description">JavaScript tipado con un compilador potente para mayor seguridad en el desarrollo.</p>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" />
              </svg>
            </div>
            <div className="tech-content">
              <h2 className="tech-title">PostgreSQL</h2>
              <p className="tech-description">Sistema de base de datos relacional robusto y de código abierto para datos críticos.</p>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" />
              </svg>
            </div>
            <div className="tech-content">
              <h2 className="tech-title">Node.js</h2>
              <p className="tech-description">Runtime de JavaScript construido sobre el motor V8 de Chrome para APIs escalables.</p>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <h2 className="section-title">Contribuciones</h2>
        <div className="center-button">
          <a 
            href="https://github.com/larry963852/Documentacion-GOREHCO" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="secondary-button">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                style={{ marginRight: '8px' }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Contribuir en GitHub</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
