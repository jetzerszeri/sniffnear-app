import { useContext } from "react"
import { NavBar } from "../components/NavBar"
import { WelcomeCard } from "../components/WelcomeCard"
import { WelcomeCardNoUserLogged } from "../components/WelcomeCardNoUserLogged"
import { AuthContext } from "../../auth/context"


export const HomePage = () => {

  const { user, isLogged } = useContext(AuthContext);

  const imgUrl = user.profileImg ? user.profileImg : '/img/avatarPorDefecto.webp';

  return (
    <>
      <NavBar />

      <main>
        {
          isLogged 
            ? <WelcomeCard name={user.name} imgUrl={ imgUrl } />
            : <WelcomeCardNoUserLogged />
        }
      </main>
    </>
  )
}
