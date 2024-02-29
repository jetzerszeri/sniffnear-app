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
import { addQuery } from '../helpers';

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

        <div class="tabs">
            <Link to={ addQuery('/alerts', { filter: 'none' }) } className='active' replace={true}>Todos</Link>
            <Link to={ addQuery('/alerts', { filter: 'missing' }) } replace={true}> <img src="/img/MissingMarker.png" alt="" /> Perdidos</Link>
            <Link to={ addQuery('/alerts', { filter: 'found' }) } replace={true}> <img src="/img/FoundMarker.png" alt="" /> Encontrados</Link>
        </div>
        {/* <div className='alertsPage'> */}
        <div className='alertsPage'>


            {/* <div className='alertInfWindow perdido'>
                <div>
                    <AlertIcon />
                    <div>
                        <h2>Perro perdido</h2>
                        <p><i className="bi bi-geo-alt"> </i>
                            Visto por última vez en Charlotte
                        </p>
                    </div>
                </div>

                <div>
                    <img src='https://firebasestorage.googleapis.com/v0/b/sniffnear.appspot.com/o/Willem_20231106_094408.jpeg?alt=media&token=edaa1025-9bc2-492a-8659-098846b3d8ca' alt='' />

                    <p>Maltese, Blanco, Pequeño</p>
                    <p>Es un perro muy amigable, se llama Willem y tiene un collar azul</p>
                    <div className="actions">
                        <Link to={`/alerts/id`} className='btn small secundary'>Ver más</Link>
                    </div>
                </div>

            </div> */}


            {
                ( position && view === "map" && data) &&
                <MapSniffNear position={position} data={data} />
            }


            {
                (data && view === "list") && <AlertCardList list={data} />
            }




        </div>
            <BottomNav />
        </>
    )
}
