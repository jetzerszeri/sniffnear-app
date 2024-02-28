import { useContext, useEffect, useState } from 'react';
import { AlertCardList, BottomNav, MapSniffNear, NavBar } from '../components';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from "@vis.gl/react-google-maps";
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';
import { AlertIcon, FoundIcon } from '../../ui';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

export const AlertsPage = () => {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const navigate = useNavigate();
    const location = useLocation();
    const { view = 'list' } = queryString.parse( location.search );
    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState({ "lat": 35.2713052, "lng": -80.9589791});
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ displayMap, setDisplayMap ] = useState( false );


    useEffect(() => {
        if (coords?.lat && coords?.lng) {
            setPosition(coords)
        }
    }, [coords]);

    useEffect(() => {
        getData('alerts');
    }, [ getData ]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const toggleMapIcon = () => {
        view !== 'map' ? navigate('/alerts?view=map') : navigate('/alerts?view=list');
    }


    return (
        <div className='alertsPage'>
            <NavBar title='Alertas' >
                <i 
                    className={`bi ${view === 'map' ? 'bi-list-task' : 'bi-map'}`}
                    onClick={ toggleMapIcon }
                ></i>
            </NavBar>


            {
                ( position && view === "map" && data) &&
                <MapSniffNear position={position} data={data} />
            }


            {
                (data && view === "list") && <AlertCardList list={data} />
            }




            <BottomNav />
        </div>
    )
}
