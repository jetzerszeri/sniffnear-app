import { Link } from "react-router-dom"
import { SideBar } from "./SideBar"
import { SniffNearLogotipo } from "../../ui/customIcons"


export const NavBar = () => {
  return (
    <>
        <div className="topNavBar">
            <div>
                <i className="bi bi-list menubtn"></i>
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
        <SideBar />
    </>
  )
}
