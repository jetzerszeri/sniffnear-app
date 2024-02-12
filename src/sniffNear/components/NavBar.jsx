import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import { SniffNearLogotipo } from '../../ui/customIcons';


export const NavBar = () => {

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
                    <i 
                        className="bi bi-list menubtn"
                        onClick={ showSidebar }
                    ></i>
                </div>
                <div className="logoTopBar">
                <Link to='/'>
                    <SniffNearLogotipo />
                </Link> 
                </div>
                <div>
                
                {/* <Link to={"/user-profile?id=${userIdTest}"}> */}
                <i className="bi bi-person-fill"></i>
                {/* </Link> */}
                </div>
            </div>
            <SideBar displaySidebar={displaySidebar} hideSidebar={hideSidebar}/>
        </>
    )
    
};
