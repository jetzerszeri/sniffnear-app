import React from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from '@vis.gl/react-google-maps';

export const MapSniffNear = ( { position } ) => {

    const googleMapId = process.env.REACT_APP_GOOGLE_MAP_SIFFNEAR_ID;


    return (
        <div className='map'>
            <Map 
                defaultZoom={15} 
                defaultCenter={position}
                mapId={googleMapId}
                disableDefaultUI={true}
            >
                <AdvancedMarker
                    position={ position }
                    draggable={ true }
                >

                    <img src='/img/sniffnearmarkergreen.png' alt="marcador" className='marker' />
                    

                </AdvancedMarker>

            </Map>
        </div>
    )
}
