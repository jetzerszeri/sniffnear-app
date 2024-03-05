import { useContext, useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { WelcomeCard } from '../components/WelcomeCard';
import { WelcomeCardNoUserLogged } from '../components/WelcomeCardNoUserLogged';
import { AuthContext } from '../../auth/context';
import { BottomNav, HomeFeed } from '../components';
import { useFetchSniffNearApi } from '../../hooks';


export const HomePage = () => {

  const { isLogged } = useContext(AuthContext);
  const rightIcon = {display: true, icon: "bi-chat-right-dots", link: "/inbox"};


  return (
    <>
      <NavBar sidebar={ true } rightIcon={ rightIcon }/>

      <main>
        {
          isLogged 
            ? <WelcomeCard />
            : <WelcomeCardNoUserLogged />
        }

       <HomeFeed />
      </main>

      <BottomNav />

      {/* <Loader label="Cargando..." /> */}
    </>
  )
}
