import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar';
import { SniffNearLogotipo } from '../../ui/customIcons';


export const NavBar = ( { sidebar = false, title = null, rightIcon={display: false, link: "/", icon: ""}, img= false, children, forChat = false } ) => {

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
                <div className={`logoLabelTopBar ${ (rightIcon.display || children) ? '' : 'noRightIcon' } `}>


                {
                forChat ? (
                        <>
                        <img src={img} alt={`avatar de ${title}`} className="avatar" />
                        <h1 className="label cap">{title}</h1>
                        </>
                    ) : title ? (
                        <h1 className="label cap">{title}</h1>
                    ) : (
                        <Link to="/">
                        <SniffNearLogotipo />
                        </Link>
                    )
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
            
        </>
    )
    
};
