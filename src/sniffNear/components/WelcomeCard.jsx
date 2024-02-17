import { useContext, useEffect } from "react"
import { useFetchSniffNearApi } from "../../hooks"
import { AuthContext } from "../../auth/context/AuthContext"


export const WelcomeCard = ( { location='Ubicación no encontrada', imgUrl } ) => {

    const { user } = useContext( AuthContext );
    const { data, getData  } = useFetchSniffNearApi();

    
    useEffect(() => {
        getData(`users/${user.id}`);
        // console.log(data);
    }, [ ]);

    const { name, profileImg } = !!data && data.user;
    
    // getData(`users/${user.id}`);

    // useEffect(() => {
    //     console.log(data);
    // }, [ data ])
    

    return (
        <section className="welcomeCard">
            <img src={ 
                ( !!profileImg ) 
                ? profileImg : 
                '/img/avatarPorDefecto.webp'    
        } alt="Avatar del usuario"/>
            <div>
                <h1>¡Hola, {name}!</h1>
                <p>
                    <i className="bi bi-geo-alt"></i> <span>{location}</span>
                </p>
            </div>
        </section>
    )
}
