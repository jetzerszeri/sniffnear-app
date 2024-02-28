import { useContext, useEffect, useState } from 'react';
import { AlertCardList, BottomNav, MapSniffNear, NavBar } from '../components';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from "@vis.gl/react-google-maps";
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';
import { AlertIcon, FoundIcon } from '../../ui';
import { Link } from 'react-router-dom';

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
    const imglink = "https://firebasestorage.googleapis.com/v0/b/sniffnear.appspot.com/o/Willem_20231106_094408.jpeg?alt=media&token=edaa1025-9bc2-492a-8659-098846b3d8ca";


    return (
        <div className='alertsPage'>
            <NavBar title='Alertas' />


            {
                // position &&
                // <MapSniffNear position={position} />
            }

            {/* <div className="alertCard1">
                <img src={imglink}  alt="" />
                <div>
                    <div className='h'>
                        <AlertIcon />
                        <div>
                            <h2>Perro perdido</h2>
                            <p>Maltese | Color café, tamaño mediano.</p>
                        </div>
                    </div>

                    <div>
                        <p>Visto por última vez a 5km de distancia de aquí.</p>
                        <p>Es juguetón, anda con un collar rojo</p>
                        <Link to='/alerts/1' className='link'>Ver más</Link>
                    </div>
                </div>
            </div> */}

            <ul className='alertList'>

            
            <li className="alertCard perdido">
                <div className='h'>
                        <AlertIcon />
                        <div>
                            <h2>Perro perdido</h2>
                            <p><i className="bi bi-geo-alt"></i>Visto por última vez a 5km de distancia.</p>
                        </div>
                </div>


                <div>
                    <img src={imglink}  alt="" />

                    <div>
                        <p>Maltese | Color café, tamaño mediano.</p>
                        <p>Es juguetón, anda con un collar rojo.</p>
                        <div className='actions'>
                            <Link to='/alerts/1' className='btn small secundary'>Ver más</Link>
                        </div>
                    </div>
                </div>
            </li>



            <li className="alertCard encontrado">
                <div className='h'>
                        <FoundIcon />
                        <div>
                            <h2>Perro encontrado</h2>
                            <p><i className="bi bi-geo-alt"></i>A 5km de distancia.</p>
                        </div>
                </div>


                <div>
                    <img src={imglink}  alt="" />

                    <div>
                        <p>Maltese | Color café, tamaño mediano.</p>
                        <p>Es juguetón, anda con un collar rojo.</p>
                        <div className='actions'>
                            <Link to='/alerts/1' className='btn small secundary'>Ver más</Link>
                        </div>
                    </div>
                </div>
            </li>
            </ul>

            {
                data && <AlertCardList list={data} />
            }




            <BottomNav />
        </div>
    )
}
