import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';


export const WelcomeCard = () => {

    const { user, address } = useContext( AuthContext );
    const { name, profileImg } = user;
    
    return (
        <section className="welcomeCard">
            <img src={ 
                ( !!profileImg ) 
                ? profileImg : 
                '/img/avatarPorDefecto.webp'    
        } alt="Avatar del usuario"/>
            <div>
                <h1>¡Hola, {name}!</h1>
                
                {
                    address &&
                    <p>
                        <i className="bi bi-geo-alt"></i> <span>{`${address.city}, ${address.state}`}</span>
                    </p>
                }
            </div>
        </section>
    )
}
