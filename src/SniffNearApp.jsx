import { useState } from 'react';
import { AuthProvider } from './auth/context';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './ui';
import { APIProvider } from "@vis.gl/react-google-maps";


export const SniffNearApp = () => {

  const [ displaySC, setDisplaySC ] = useState( true );
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <AuthProvider>
      {/* { displaySC && <SplashScreen  toggle={setDisplaySC}/> } 
      
      <APIProvider apiKey={googleMapsApiKey}>
          <AppRouter />
        </APIProvider>
      */}

      { displaySC 
        ? <SplashScreen  toggle={setDisplaySC}/> 
        : <APIProvider apiKey={googleMapsApiKey}>
          <AppRouter />
        </APIProvider>
      }

    </AuthProvider>
  )
}
