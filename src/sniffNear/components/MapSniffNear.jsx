import React, { useEffect, useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from '@vis.gl/react-google-maps';
import { AlertIcon, BuleMarkerIcon, MissigMarker } from '../../ui';
import { Link } from 'react-router-dom';
import { AlertInfoWindow } from './AlertInfoWindow';

export const MapSniffNear = ( { position, alertForm = false, drag = false, updateCoords, data = null, displayOnly = false }  ) => {

    const googleMapId = process.env.REACT_APP_GOOGLE_MAP_SIFFNEAR_ID;
    const [ zoom, setZoom ] = useState(15);
    const [ activeMarker, setActiveMarker ] = useState(null);

    useEffect(() => {
        alertForm && setZoom(18);
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
    // console.log(data);

    const openInfoWindow = ( id ) => {
        setActiveMarker( id );
    }

    const closeInfoWindow = () => {
        setActiveMarker( null );
    }
    


    return (
        <div className={`${alertForm ? 'map alert' : 'map'} ${displayOnly ? 'alertDetail' : ''}`}>

            <Map 
                defaultZoom={zoom} 
                defaultCenter={position}
                mapId={googleMapId}
                disableDefaultUI={true}
                options={{ clickableIcons: false}}
            >
                {
                    drag
                    ? <AdvancedMarker
                        position={ position }
                        draggable={ drag }
                        onDragEnd={ onMarkerDragEnd }
                    >
                        <img src='/img/sniffnearmarkergreen.png' alt="marcador" className='marker' />
                    
                    </AdvancedMarker>

                    :  <AdvancedMarker
                        position={ position }
                    >
                        {/* <img src='/img/sniffnearmarkergreen.png' alt="marcador" className='marker' /> */}
                        <BuleMarkerIcon />
                    
                    </AdvancedMarker>
                }


                {
                     data && data.map( (alert, index) => (

                        ( alert.latitude && alert.longitude ) &&
                        <AdvancedMarker
                            key={ index }
                            position={ { "lat": alert.latitude, "lng": alert.longitude } }
                            onClick={ () => openInfoWindow( alert._id ) }
                        >
                            {
                                alert.alertType === 'perdido'
                                ? <img src='/img/MissingMarker.png' alt="marcador" className='marker' />
                                : <img src='/img/FoundMarker.png' alt="marcador" className='marker' />
                            }                            

                            {
                                activeMarker === alert._id &&
                                <InfoWindow 
                                    position={ { "lat": alert.latitude, "lng": alert.longitude } }
                                    onCloseClick={ closeInfoWindow }
                                >

                                    <AlertInfoWindow data={ alert } />
                                </InfoWindow>
                            }
                        </AdvancedMarker>
                    )) 
                }
            </Map>


        </div>
    )
}
