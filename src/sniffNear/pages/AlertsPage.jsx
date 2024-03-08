import { useContext, useEffect, useState } from 'react';
import { AlertCardList, BottomNav, FilterPetsOptions, MapSniffNear, NavBar } from '../components';
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addQuery, calculateDistance, orderData } from '../helpers';
import { useFilter, useFilterAlerts } from '../hooks';

export const AlertsPage = () => {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const navigate = useNavigate();
    const location = useLocation();
    const { view = 'list', alertType = "all" } = queryString.parse( location.search );
    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState({});
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ distance, setDistance ] = useState(5);
    const { filteredData, filters, setFilters, filterCurrentData, clearFilters, addFilter, setinitialData } = useFilter( {
        alertType: '',
        sex: '',
        color1: '',
        size: '',
        creator: ''
    } );
    const [ showFilterOptions, setShowFilterOptions] = useState(false);
    const [ isFiltered, setIsFiltered ] = useState(false);
    const [ order, setOrder ] = useState('desc');



    useEffect(() => {
        if (coords?.lat && coords?.lng) {
            setPosition(coords)
        }
    }, [coords]);

    useEffect(() => {
        getData('alerts');
    }, [ getData ]);

    useEffect(() => {
        if (data){
            const localAlerts = data.filter( alert => (calculateDistance(position.lat, position.lng, alert.latitude, alert.longitude) <= distance));

            setinitialData(orderData(localAlerts, 'created', order));
        }
    }, [data, distance, position, setinitialData, order]);

    useEffect(() => {
        if (alertType !== "all"){
            if (alertType === "missing"){
                addFilter('alertType', 'perdido');
            } else if (alertType === "found"){
                addFilter('alertType', 'encontrado');
            }
        } else {
            addFilter('alertType', '');
        }
    }, [alertType]);
    




    const toggleMapIcon = () => {
        view !== 'map' ? navigate(addQuery('/alerts', { view: 'map' }), { replace: true }) : navigate(addQuery('/alerts', { view: 'list' }), { replace: true });
    }




    useEffect(() => {
        // if (filters.sex !== '' || filters.color1 !== '' || filters.size !== '', filters.creator !== ''){
        //     setIsFiltered(true);
        //     console.log('hay filtros')
        // } else {
        //     setIsFiltered(false);
        //     console.log('no hay filtros')
        // }

        (filters.sex !== '' || filters.color1 !== '' || filters.size !== '' || filters.creator !== '') ? setIsFiltered(true) : setIsFiltered(false);
    }, [ filters ])
    






    return (
    <>
        <NavBar title='Alertas' sidebar={true} >
                <i 
                    className={`bi ${view === 'map' ? 'bi-list-task' : 'bi-map'}`}
                    onClick={ toggleMapIcon }
                ></i>
        </NavBar>

        <div className="tabs">
            <Link to={ addQuery('/alerts', { alertType: 'all' }) } className={ alertType === "all" ? "active" : "" } replace={true}>Todos</Link>
            <Link to={ addQuery('/alerts', { alertType: 'missing' }) } className={ alertType === "missing" ? "active" : "" } replace={true}> <img src="/img/MissingMarker.png" alt="" /> Perdidos</Link>
            <Link to={ addQuery('/alerts', { alertType: 'found' }) } className={ alertType === "found" ? "active" : "" } replace={true}> <img src="/img/FoundMarker.png" alt="" /> Encontrados</Link>
            <div>
                <i 
                    className={`bi ${view === 'map' ? 'bi-list-task' : 'bi-map'} viewSwitcher`}
                    onClick={ toggleMapIcon }
                ></i>
                <i className={`bi ${isFiltered ? 'bi-funnel-fill filtered' : 'bi-funnel'}`} onClick={()=> setShowFilterOptions(true)}></i>
            </div>
        </div>
        <div className='alertsPage'>


            {
                ( position.lat && position.lng && view === "map" ) &&
                <MapSniffNear position={position} data={filteredData} blueMarker={true} />
            }


            {
                (data && view === "list") && <AlertCardList list={filteredData} />
            }

        </div>
        <BottomNav />

        {
            showFilterOptions &&
                <FilterPetsOptions
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                    displayModal={setShowFilterOptions}
                    prevFilters={filters}
                    isFiltered={isFiltered}
                    order={order}
                    setOrder={setOrder}
                    distance={distance}
                    setDistance={setDistance}
                />
        }

    </>
    )
}
