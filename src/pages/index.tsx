import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Documentación`}
      description="Documentación completa para los servicios de autenticación y APIs del sistema GOREHCO">
      <div className="modern-landing">
        <main style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <HomepageFeatures />
          
          {/* Footer */}
          <footer className="landing-footer">
            <div className="footer-container">
              <footer className="footer-content">
                <div className="footer-links">
                  <a className="footer-link" href="/docs">Contacto</a>
                  <a className="footer-link" href="/docs">Soporte</a>
                  <a className="footer-link" href="/docs">Política de Privacidad</a>
                  <a className="footer-link" href="/docs">Términos de Servicio</a>
                </div>
                <p className="footer-copyright">© 2024 GOREHCO. Todos los derechos reservados.</p>
              </footer>
            </div>
          </footer>
        </main>
      </div>
    </Layout>
  );
}
