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
                <li>
                    <NavLink
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/alerts"
                    >
                        <i className="bi bi-search"></i>
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
                        to="/blog"
                    >
                        <i className="bi bi-book"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/account"
                    >
                        <i className="bi bi-person-circle"></i>
                    </NavLink>
                </li>
            </ul>
        </nav>

        {
            options && <div className="plusOptionsContainer">
                <div className="plusOptions">
                    <h2>Agregar nueva...</h2>
                    <div>
                        <Link to="/pets/add">
                            <DogPawPrintIcon />
                            Mascota
                        </Link>
                        <Link to="/blog/new">
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
