import React from 'react';
import './style.css'; 
import { useBootstrap } from '../hooks';

export const LandingPage = () => {
    
    useBootstrap();

    return (
        <>
          <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                {/* Asegúrate de ajustar la ruta de la imagen */}
                <img src="img/sniffNear-logo.png" alt="Logo" width="150" className="me-2" />
              </a>
              <ul className="nav nav-pills">
                <li className="nav-item"><a href="#inicio" className="nav-link custom-secondary-text" aria-current="page">Inicio</a></li>
                <li className="nav-item"><a href="#servicios" className="nav-link custom-secondary-text">Servicios</a></li>
                <li className="nav-item"><a href="#aplicacion" className="nav-link custom-secondary-text">Aplicación</a></li>
                <li className="nav-item"><a href="#nosotros" className="nav-link custom-secondary-text">Nosotros</a></li>
              </ul>
            </header>
          </div>
    
          {/* Banner */}
          <div id="inicio">
            <a href="https://sniffnear.com/" target="_blank" rel="noopener noreferrer">
                <img className="banner container desktop-img" src={`${process.env.PUBLIC_URL}/img/sniffNear-banner.jpg`} alt="Descripción de la imagen" />
            </a>

            <a href="https://sniffnear.com/" target="_blank" rel="noopener noreferrer">
                <img className="banner container mobile-img" src={`${process.env.PUBLIC_URL}/img/banner-mobile-sniffNear.jpg`} alt="Descripción de la imagen" />
            </a>
        </div>

        <div className="container col-xxl-8">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-lg-6">
                    <img src={`${process.env.PUBLIC_URL}/img/img-vision-y-compromiso.png`} className="vision d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="420" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3"> Bienvenido a <strong style={{fontWeight: 300, color: '#006667'}}>Sniff</strong><strong style={{fontWeight: 700, color: '#363a59'}}>Near</strong></h1>
                    <p className="lead">Creamos esta aplicación con el propósito de crear una <strong>comunidad apasionada y comprometida con el bienestar y seguridad de las mascotas.</strong> <strong style={{fontWeight: 300, color: '#006667'}}>Sniff</strong><strong style={{fontWeight: 700, color: '#363a59'}}>Near</strong> resuelve esta problemática para facilitar la rápida creación de alertas y movilización de una comunidad para ayudar a encontrar a las mascotas perdidas. </p>
                </div>
            </div>
        </div>



    
        <div className="servicios container" id="servicios">
            <h2>Servicios que ofrecemos</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-megaphone custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Alertas</h3>
                    <p>Permite que los dueños de las mascotas y los amantes de los animales, puedan crear alertas sobre mascotas perdidas o encontradas, sean o no suyas.</p>
                </div>
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-card-list custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Perfiles</h3>
                    <p>Los perfiles los utilizaremos para tener un registro de nuestras mascotas, para las alertas e incluso las adopciones.</p>
                </div>
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-diagram-3 custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Adopciones</h3>
                    <p>Este sistema permite que los usuarios creen perfiles a mascotas que quieren dar en adopción así las personas que quieran adoptar puedan realizarlo con facilidad.</p>
                </div>
            </div>
            <div className="row g-4 row-cols-1 row-cols-lg-3">
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-book custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Blog</h3>
                    <p>Creamos un blog donde cada uno podrá contar experiencias propias y consejos relacionados con mascotas.</p>
                </div>
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-chat-right-dots custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Mensajería</h3>
                    <p>Se utiliza un chat para comunicarse por la aplicación, sea para alguien que encontró una mascota perdida o perdió su mascota y la vio publicada en la app o por una adopción.</p>
                </div>
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                        <i className="bi bi-map custom-secondary-text"></i>
                    </div>
                    <h3 className="fs-2">Mapa</h3>
                    <p>Contamos con un mapa donde se pueden visualizar todas las ubicaciones dentro del rango de 5km a la redonda de mascotas perdidas o encontradas, también se pueden visualizar las adopciones creadas por los usuarios.</p>
                </div>
            </div>
        </div>

        <div className="container">
            <div id="aplicacion" className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-lg-6">
                    <img src={`${process.env.PUBLIC_URL}/img/img-de-descarga.png`} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="420" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">Descargá nuestra app y unite a <strong style={{ fontWeight: 300, color: '#006667' }}>Sniff</strong><strong style={{ fontWeight: 700, color: '#363a59' }}>Near</strong></h1>
                    <p className="lead">Descarga <strong style={{ fontWeight: 300, color: '#006667' }}>Sniff</strong><strong style={{ fontWeight: 700, color: '#363a59' }}>Near</strong>, la app que conecta a amantes de animales para resolver el angustiante problema de perder una mascota. Recibe alertas, crea perfiles detallados, contacta para adopciones, y localiza en un mapa mascotas perdidas/encontradas y adopciones en un radio de 5km. <strong>Unite a nuestra comunidad comprometida con el bienestar animal.</strong></p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <a href="https://sniffnear.com/" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="btn btn-primary custom-secondary-bg btn-lg px-4 me-md-2">Descargar</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>



        <div className="row nosotros justify-content-center" id="nosotros">
            <h3 className="text-center">Equipo <strong style={{ fontWeight: 300, color: '#006667' }}>Sniff</strong><strong style={{ fontWeight: 700, color: '#363a59' }}>Near</strong></h3>
            <div className="col-lg-4 text-center mb-5">
                <img src={`${process.env.PUBLIC_URL}/img/ailen-alvarez-img.png`} className="photo" alt="Ailen Alvarez"/>
                <h4 className="fw-normal mt-3">Alvarez Ailen</h4>
                <p>Diseñadora y Programadora Web</p>
            </div>
            <div className="col-lg-4 text-center mb-5">
                <img src={`${process.env.PUBLIC_URL}/img/julieta-bariandaran-img.png`} className="photo" alt="Julieta Bariandaran"/>
                <h4 className="fw-normal mt-3">Bariandarán Julieta</h4>
                <p>Diseñadora y Programadora Web</p>
            </div>
            <div className="col-lg-4 text-center mb-5">
                <img src={`${process.env.PUBLIC_URL}/img/jetzer-ramirez-img.png`} className="photo" alt="Jetzer Ramirez"/>
                <h4 className="fw-normal mt-3">Ramírez Jetzer</h4>
                <p>Diseñador y Programador Web</p>
            </div>
        </div>






    
          {/* Footer */}
            <div className="footerImg">
                {/* Asegúrate de tener estas imágenes en tu carpeta public o importarlas */}
                <img src={`${process.env.PUBLIC_URL}/img/sniffNear-banner-footer.jpg`} alt="Imagen para escritorio" className="desktop-img" />
                <img src={`${process.env.PUBLIC_URL}/img/sniffNear-banner-footer-responsive.jpg`} alt="Imagen para móviles" className="mobile-img footerImg" />
            </div>

            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top footer">
                <p className="col-md-4 mb-0 text-muted">© 2024 SniffNear, Inc</p>

                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32">
                    {/* Asegúrate de incluir el icono correcto aquí o eliminar este SVG si no es necesario */}
                </svg>
                </a>

                <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="#inicio" className="nav-link px-2 text-muted">Inicio</a></li>
                <li className="nav-item"><a href="#servicios" className="nav-link px-2 text-muted">Servicios</a></li>
                <li className="nav-item"><a href="#aplicacion" className="nav-link px-2 text-muted">Aplicación</a></li>
                <li className="nav-item"><a href="#nosotros" className="nav-link px-2 text-muted">Nosotros</a></li>
                </ul>
            </footer>
        </>
      );
}
