import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AlertIcon, DogPawPrintIcon, NewPostIcon } from '../../ui/customIcons';


export const BottomNav = () => {

    const [ options, setOptions ] = useState( false );

    const toggleOptions = () => {
        setOptions( !options );
    }

    return (
    <>
        <nav className="bottomNavBar">
            <ul>
                <li>
                    <NavLink
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/"
                    >
                        <i className="bi bi-house-door"></i>
                    </NavLink>
                </li>
                <li className="plusBtn">
                    <button onClick={ toggleOptions }>
                        <i className="bi bi-plus"></i>
                    </button>
                </li>
                <li>
                    <NavLink
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/account"
                    >
                        <i className="bi bi-search"></i>
                    </NavLink>
                </li>
            </ul>
        </nav>

        {
            options && <div className="plusOptionsContainer">
                <div className="plusOptions">
                    <h2>Agregar nueva...</h2>
                    <div>
                        <Link to="/pets/new">
                            <DogPawPrintIcon />
                            Mascota
                        </Link>
                        <Link to="/posts/new">
                            <NewPostIcon />
                            Publicación
                        </Link>
                        <Link to="/alerts/new">
                            <AlertIcon />
                            Alerta
                        </Link>
                    </div>

                    <button className="secundary btn" onClick={ toggleOptions }>Cancelar</button>

                </div>
            </div>
        }            
        
    </>
    )
}
