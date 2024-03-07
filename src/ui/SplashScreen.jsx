
import { useContext, useEffect, useState } from 'react';
import { useFetchSniffNearApi, useUserLocation } from '../hooks';
import { SniffNearMainLogo } from './customIcons';
import { AuthContext } from '../auth/context';
import { Modal } from './Modal';

export const SplashScreen = ( { toggle } ) => {
  
  const { coords, address } = useContext( AuthContext );
  const { connectServer } = useFetchSniffNearApi();
  const { error } = useUserLocation( true );

  const [isConnected, setisConnected] = useState('')

  useEffect(() => {
    const connected = connectServer();
    // setisConnected(connected);
    if(connected && coords && address){
      toggle(false);
    }
  }, [ connectServer, coords, toggle, address ]);




  return (
    <div className="splashScreen">
      <SniffNearMainLogo />
      {error && <p className='inputError'>{error}</p>}
      {/* <p>coordenadas: {JSON.stringify(coords, null, 2)}, conected: {isConnected}, direccion: {JSON.stringify(address, null, 2)}</p> */}
      <div className="bouncer">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>

      {
        error &&
        <Modal
          heading={error}
          text={'Es necesario que permitas el acceso a tu ubicación para continuar.'}
          type='warning'
        >
            <div className="bouncer">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
        </Modal>
      }

      
    </div>
  )
}
