import { NavBar } from "../components/NavBar"
import { WelcomeCard } from "../components/WelcomeCard"


export const HomePage = () => {
  return (
    <>
      <NavBar />
      
      <main>
        <WelcomeCard name="Usuario" imgUrl='/img/avatarPorDefecto.webp'/>
      </main>
    </>
  )
}
