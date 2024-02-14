import { Link } from "react-router-dom"

export const AuthHomePage = () => {
    return (
        <div className="authHome">

            <div>
                <h1>Bienvenido a<span> SniffNear</span></h1>
                <p>Juntos, hacemos que el regreso a casa sea realidad.</p>
            </div>
                <img src="/img/animals1.png" alt="" />

            <div>
                <p>Unite a la misión o ingresá</p>
                <Link to="./register" className="btn secundary">Crear cuenta</Link>
                <Link to="./login" className="btn secundary">Ingresar</Link>

                <p>¿Extraviaste a tu mascota o encontraste una?</p>
                <Link to="/alert" className="btn">Crear alerta rápida</Link>

                <Link to="/">Continuar como invitado</Link>
            </div>
        </div>
    )
}
