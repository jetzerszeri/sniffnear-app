import { useState } from 'react';
import { AuthProvider } from './auth/context';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './ui';


export const SniffNearApp = () => {

  const [ displaySC, setDisplaySC ] = useState( true );

  return (
    <AuthProvider>
        { displaySC && <SplashScreen  toggle={setDisplaySC}/> }
        <AppRouter />
    </AuthProvider>
  )
}
