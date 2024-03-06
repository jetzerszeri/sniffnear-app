import { Link, NavLink } from 'react-router-dom';
import { SidebarAdoptionIcon, SidebarBlogIcon, SidebarChatIcon, SidebarHomeIcon, SidebarLogoutIcon, SniffNearLogotipo } from '../../ui/customIcons';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context';


export const SideBar = ( { displaySidebar, hideSidebar } ) => {

    const sidebarBackgroundStyle = {
        transform: displaySidebar.backTranslateX ? 'translateX(0)' : 'translateX(-100%)'
    }

    const { isLogged, logout } = useContext(AuthContext);

    return (
        <div 
            className={`sidebar ${displaySidebar.background ? 'show' : ''}`}
            style={ sidebarBackgroundStyle }
            onClick={ hideSidebar }
        >
            <nav
                className={`${displaySidebar.nav ? 'show' : ''}`} 
                onClick={ (e) => e.stopPropagation() }           
            >
                <SniffNearLogotipo />
                <i 
                    className="bi bi-x-lg closebtn"
                    onClick={ hideSidebar }
                ></i>

                <ul>
                    <li>
                        <NavLink 
                            className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                            to="/"
                            onClick={ hideSidebar }
                        >
                            <SidebarHomeIcon />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                            to="/blog"
                            onClick={ hideSidebar }
                        >
                            <SidebarBlogIcon />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                            to="/inbox"
                            onClick={ hideSidebar }
                        >
                            <SidebarChatIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                            to="/adoptions"
                            onClick={ hideSidebar }
                        >
                            <SidebarAdoptionIcon />
                        </NavLink>
                    </li>

                    {
                        isLogged && 
                        <li onClick={ logout }>
                            <Link to="/auth">
                                <SidebarLogoutIcon />
                            </Link>
                        </li>
                    }
                    
                </ul>

                {
                    !isLogged &&
                    <div className='sidebarLogInBtn'>
                        <Link className='btn' to='/auth'>Ingresar</Link>
                    </div>
                }



            </nav>
        </div>
    )
}
