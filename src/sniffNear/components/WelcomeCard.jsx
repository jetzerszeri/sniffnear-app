import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const WelcomeCard = () => {

    const { user, address } = useContext( AuthContext );
    const { name, profileImg } = user;
    const navigate = useNavigate();

    const onWelcomeCardClick = () => {
        navigate('/account');
    }
    
    return (
        <section className="welcomeCard" onClick={onWelcomeCardClick}>
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
