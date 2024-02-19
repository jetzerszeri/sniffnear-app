import { NavLink } from "react-router-dom"


export const BottomNav = () => {
    return (
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
                <NavLink
                    className={ ({isActive}) => `${isActive ? 'active' : ''}`}
                    to="/new"
                >
                    <i className="bi bi-plus"></i>
                </NavLink>
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
    )
}
