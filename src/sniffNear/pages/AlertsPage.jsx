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
import { AlertIcon, FoundIcon, MissigMarker } from '../../ui';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addQuery, calculateDistance } from '../helpers';

export const AlertsPage = () => {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const navigate = useNavigate();
    const location = useLocation();
    const { view = 'list', alertType = "all" } = queryString.parse( location.search );
    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState({ "lat": 35.2713052, "lng": -80.9589791});
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ displayMap, setDisplayMap ] = useState( false );
    const [ filteredData, setFilteredData ] = useState([]);
    const [ distance, setDistance ] = useState(5);


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
        if (data){
            setFilteredData(data.filter( alert => (calculateDistance(position.lat, position.lng, alert.latitude, alert.longitude) <= distance)));
        }
    }, [data, distance, position]);

    const toggleMapIcon = () => {
        view !== 'map' ? navigate(addQuery('/alerts', { view: 'map' }), { replace: true }) : navigate(addQuery('/alerts', { view: 'list' }), { replace: true });
    }


    return (
    <>
        <NavBar title='Alertas' >
                <i 
                    className={`bi ${view === 'map' ? 'bi-list-task' : 'bi-map'}`}
                    onClick={ toggleMapIcon }
                ></i>
        </NavBar>

        <div className="tabs">
            <Link to={ addQuery('/alerts', { alertType: 'all' }) } className={ alertType === "all" ? "active" : "" } replace={true}>Todos</Link>
            <Link to={ addQuery('/alerts', { alertType: 'missing' }) } className={ alertType === "missing" ? "active" : "" } replace={true}> <img src="/img/MissingMarker.png" alt="" /> Perdidos</Link>
            <Link to={ addQuery('/alerts', { alertType: 'found' }) } className={ alertType === "found" ? "active" : "" } replace={true}> <img src="/img/FoundMarker.png" alt="" /> Encontrados</Link>
        </div>
        <div className='alertsPage'>


            {
                ( position && view === "map" && filteredData) &&
                <MapSniffNear position={position} data={filteredData} />
            }


            {
                (data && view === "list") && <AlertCardList list={filteredData} />
            }

        </div>
        <BottomNav />
    </>
    )
}
