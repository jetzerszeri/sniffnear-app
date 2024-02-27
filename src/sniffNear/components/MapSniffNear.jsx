import React, { useEffect, useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from '@vis.gl/react-google-maps';

export const MapSniffNear = ( { position, alertForm = false, drag = false, updateCoords } ) => {

    const googleMapId = process.env.REACT_APP_GOOGLE_MAP_SIFFNEAR_ID;
    const [ zoom, setZoom ] = useState(15);

    useEffect(() => {
        alertForm && setZoom(18)
    }, [alertForm])


    const onMarkerDragEnd = ( coord ) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(`Coordenadas: ${lat}, ${lng}`);

        if ( updateCoords ) {
            console.log('actualizando coordenadas');
            updateCoords( lat, lng);
        }
    // setCurrentLocation( {lat, lng})
    }
    


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
                    draggable={ drag }
                    onDragEnd={ onMarkerDragEnd }
                >

                    <img src='/img/sniffnearmarkergreen.png' alt="marcador" className='marker' />
                    

                </AdvancedMarker>

            </Map>
        </div>
    )
}
