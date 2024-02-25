
import { useContext, useEffect } from 'react';
import { useFetchSniffNearApi, useUserLocation } from '../hooks';
import { SniffNearMainLogo } from './customIcons';
import { AuthContext } from '../auth/context';

export const SplashScreen = ( { toggle } ) => {
  
  const { coords, address } = useContext( AuthContext );
  const { connectServer } = useFetchSniffNearApi();
  useUserLocation( true );

  useEffect(() => {
    const connected = connectServer();
    if(connected && coords && address){
      toggle(false);
    }
  }, [ connectServer, coords, toggle, address ]);




  return (
    <div className="splashScreen">
      <SniffNearMainLogo />
      <div className="bouncer">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    </div>
  )
}
