import { useContext } from 'react';
import { NavBar } from '../components/NavBar';
import { WelcomeCard } from '../components/WelcomeCard';
import { WelcomeCardNoUserLogged } from '../components/WelcomeCardNoUserLogged';
import { AuthContext } from '../../auth/context';
import { BottomNav } from '../components';


export const HomePage = () => {

  const { isLogged } = useContext(AuthContext);
  const rightIcon = {display: true, icon: "bi-chat-right-dots", link: "/chat"};

  return (
    <>
      <NavBar sidebar={ true } rightIcon={ rightIcon }/>

      <main>
        {
          isLogged 
            ? <WelcomeCard />
            : <WelcomeCardNoUserLogged />
        }
      </main>

      <BottomNav />

      {/* <Loader label="Cargando..." /> */}
    </>
  )
}
