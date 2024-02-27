import React, { useEffect, useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from '@vis.gl/react-google-maps';

export const MapSniffNear = ( { position, alertForm = false } ) => {

    const googleMapId = process.env.REACT_APP_GOOGLE_MAP_SIFFNEAR_ID;
    const [ zoom, setZoom ] = useState(15);

    useEffect(() => {
        alertForm && setZoom(18)
    }, [alertForm])
    


    return (
        <div className={alertForm ? 'map alert' : 'map'}>
            <Map 
                defaultZoom={zoom} 
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
