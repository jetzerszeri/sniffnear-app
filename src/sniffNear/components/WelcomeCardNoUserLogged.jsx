import { Link } from "react-router-dom"


export const WelcomeCardNoUserLogged = () => {
    return (
        <section className="welcomeCard2">
            <div>
                <h1>¡Hola!</h1>
                <p>¡Sumate ahora y conectá con otros dueños para ayudar a reencontrar familias con sus mascotas! 🐾</p>
                <Link to="/login" className="btn">Ingresar</Link>
            </div>
        </section>
    )
}
