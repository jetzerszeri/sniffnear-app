import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar';
import { SniffNearLogotipo } from '../../ui/customIcons';
import {  SidebarChatIcon, SidebarLogoutIcon } from '../../ui/customIcons';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context';
import { SidebarBlogIcon  } from '../../ui/customIcons';
import { DogPawPrintIcon, AlertIcon, NewPostIcon } from '../../ui/customIcons';
export const NavBar = ( { sidebar = false, title = null, rightIcon={display: false, link: "/", icon: ""}, img= false, children } ) => {

    const navigate = useNavigate();
 
    const [displaySidebar, setDisplaySidebar] = useState({
        background: false,
        nav: false,
        backTranslateX: false
    });

    const showSidebar = () => {
        setDisplaySidebar({
            background: true,
            nav: true,
            backTranslateX: true
        })
    };

    const hideSidebar = () => {
        setDisplaySidebar({
            ...displaySidebar,
            background: false,
            nav: false

        })

        setTimeout(() => {
            setDisplaySidebar({
                backTranslateX: false,
                background: false,
                nav: false,
            })
        }, 500);
    };
    const { isLogged, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="topNavBar">
                <div>
                    {
                        sidebar
                        ? <i className="bi bi-list menubtn" onClick={ showSidebar }></i>
                        : <i className="bi bi-chevron-left" onClick={ () => navigate(-1) }></i>
                    }

                </div>
                <div className={`logoLabelTopBar ${ (rightIcon.display || children) ? '' : 'noRightIcon' } `}>

                    {
                        img && <img src={ img } alt={`avatar de ${title}`}  className='avatar'/>
                    }

                    {
                        (title)
                        ? <h1 className='label cap'>{ title }</h1>
                        : <Link to='/'>
                            <SniffNearLogotipo />
                        </Link> 
                    }

                </div>
              
                {
                    rightIcon.display 
                    && <div>
                        <Link to={ rightIcon.link }>
                            <i className={ rightIcon.icon }></i>
                        </Link>
                    </div>
                }

                {
                    children &&
                    <div>
                        { children }
                    </div>
                }
                
            </div>

            {
                sidebar && <SideBar displaySidebar={ displaySidebar } hideSidebar={ hideSidebar }/>
            }
           
            <div className='navbarDesktop'>
                <div className={`logoLabelTopBar ${ (rightIcon.display || children) ? '' : 'noRightIcon' } `}>
                    {
                        img && <img src={ img } alt={`avatar de ${title}`}  className='avatar'/>
                    }
                    {
                        (title)
                        ? <h1 className='label cap'>{ title }</h1>
                        : <Link to='/'>
                            <SniffNearLogotipo />
                        </Link> 
                    }
                </div>
                <div className='sideDesktop'>
                    <ul>
                            <Link to='/'>
                            Home 
                            </Link>
                            <Link to='/blog'>
                            Blog
                            </Link>
                            <Link to='/inbox'>
                            Chat
                            </Link>
                            <Link to='/adoptions'>
                            Adopciones
                            </Link>
                        
                            <div className="dropdown-menu">
                                <button className="dropdown-btn" onClick={toggleDropdown}>
                                    Crear <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
                                </button>
                                {isOpen && (
                                    <div className="dropdown-content">
                                        <Link to="/alerts/new">
                                            <AlertIcon/>
                                            Alerta
                                        </Link>
                                        <Link to="/pets/add">
                                            <DogPawPrintIcon/>
                                            Mascota
                                        </Link>
                                        <Link to="/blog/new">
                                            <NewPostIcon/>
                                            Publicación
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {
                                isLogged && 
                                <div className='desktopLogOutBtn'>
                                    <Link to='/account'className="logout-link">
                                            <i className="bi bi-person " ></i>
                                            <span>Perfil</span>
                                    </Link>
                                    <li onClick={ logout }  className="logout-link" >  
                                        <Link to="/auth" >
                                            <SidebarLogoutIcon />
                                            <span>Cerrar sesión</span>
                                        </Link>
                                    </li>
                                </div>
                            
                            }
                            
                        {
                            !isLogged &&
                            <div className='desktopLogInBtn'>
                            <Link to='/auth' className="login-link">
                                <i className="bi bi-box-arrow-in-right"></i> 
                                Ingresar
                            </Link>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
    
};
