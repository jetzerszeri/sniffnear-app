

export const WelcomeCard = ( { name, location='Ubicación no encontrada', imgUrl } ) => {
    return (
        <section className="welcomeCard">
            <img src={ imgUrl } alt="Avatar del usuario"/>
            <div>
                <h1>¡Hola, {name}!</h1>
                <p>
                    <i className="bi bi-geo-alt"></i> <span>{location}</span>
                </p>
            </div>
        </section>
    )
}
