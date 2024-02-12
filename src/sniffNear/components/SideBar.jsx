import { Link, NavLink } from 'react-router-dom';
import { SidebarBlogIcon, SidebarChatIcon, SidebarHomeIcon, SidebarLogoutIcon, SniffNearLogotipo } from '../../ui/customIcons';


export const SideBar = () => {
  return (
    <div className="sidebar">
        <nav>
            <SniffNearLogotipo />
            <i className="bi bi-x-lg closebtn"></i>

            <ul>
                <li>
                    <NavLink 
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/"
                    >
                        <SidebarHomeIcon />
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/blog"
                    >
                        <SidebarBlogIcon />
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                        to="/chat"
                    >
                        <SidebarChatIcon />
                    </NavLink>
                </li>

                <li>
                    <Link to="/login">
                        <SidebarLogoutIcon />
                    </Link>
                </li>





            </ul>


        </nav>
    </div>
  )
}
