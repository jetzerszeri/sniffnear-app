import { useContext, useEffect, useState } from 'react';
import { BottomNav, MapSniffNear, NavBar } from '../components';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from "@vis.gl/react-google-maps";
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';

export const AlertsPage = () => {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState({ "lat": 35.2713052, "lng": -80.9589791});
    const { data, isLoading, error, getData } = useFetchSniffNearApi();



    useEffect(() => {
        if (coords?.lat && coords?.lng) {
            setPosition(coords)
        }
    }, [coords]);

    useEffect(() => {
        getData('alerts');
    }, [ getData ]);

    // const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    // const googleMapId = process.env.REACT_APP_GOOGLE_MAP_SIFFNEAR_ID;

    useEffect(() => {
        console.log(data);
    }, [data]);

    
    // console.log(coords);


    return (
        <>
            <NavBar title='Alertas' />


                {
                    position &&
                    <MapSniffNear position={position} />
                }






            <BottomNav />
        </>
    )
}
