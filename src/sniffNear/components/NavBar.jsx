import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar';
import { SniffNearLogotipo } from '../../ui/customIcons';


export const NavBar = ( { sidebar = false, title = null}) => {

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
                <div className="logoTopBar">

                    {
                        title
                        ? <p className='label'>{ title }</p>
                        : <Link to='/'>
                            <SniffNearLogotipo />
                        </Link> 
                    }

                </div>
                <div>
                
                <Link to={"/account"}>
                <i className="bi bi-person-fill"></i>
                </Link>
                </div>
            </div>

            {
                sidebar && <SideBar displaySidebar={ displaySidebar } hideSidebar={ hideSidebar }/>
            }
            
        </>
    )
    
};
