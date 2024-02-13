import { Link, NavLink } from 'react-router-dom';
import { SidebarBlogIcon, SidebarChatIcon, SidebarHomeIcon, SidebarLogoutIcon, SniffNearLogotipo } from '../../ui/customIcons';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context';


export const SideBar = ( { displaySidebar, hideSidebar } ) => {

    const sidebarBackgroundStyle = {
        transform: displaySidebar.backTranslateX ? 'translateX(0)' : 'translateX(-100%)'
    }

    const { isLogged } = useContext(AuthContext);

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
                            to="/chat"
                            onClick={ hideSidebar }
                        >
                            <SidebarChatIcon />
                        </NavLink>
                    </li>

                    {
                        isLogged && 
                            <li>
                            <Link to="/login">
                                <SidebarLogoutIcon />
                            </Link>
                        </li>
                    }
                    
                </ul>

                {
                    !isLogged &&
                    <div className='sidebarLogInBtn'>
                        <Link className='btn' to='/login'>Ingresar</Link>
                    </div>
                }



            </nav>
        </div>
    )
}