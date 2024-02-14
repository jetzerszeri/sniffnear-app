import { Link } from "react-router-dom"


export const WelcomeCardNoUserLogged = () => {
    return (
        <section className="welcomeCard2">
            <div>
                <h1>¡Hola!</h1>
                <p>¡Sumate ahora y conectá con otros dueños para ayudar a reencontrar mascotas con sus familias! 🐾</p>
                <Link to="/auth" className="btn">Ingresar</Link>
            </div>
        </section>
    )
}
