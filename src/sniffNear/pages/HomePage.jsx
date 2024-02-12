import { NavBar } from "../components/NavBar"
import { WelcomeCard } from "../components/WelcomeCard"
import { WelcomeCardNoUserLogged } from "../components/WelcomeCardNoUserLogged"


export const HomePage = () => {
  return (
    <>
      <NavBar />

      <main>
        {/* <WelcomeCard name="Usuario" imgUrl='/img/avatarPorDefecto.webp'/> */}
        <WelcomeCardNoUserLogged />
      </main>
    </>
  )
}
