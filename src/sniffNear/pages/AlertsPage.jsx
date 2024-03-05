import { useContext, useEffect, useState } from 'react';
import { AlertCardList, BottomNav, FilterPetsOptions, MapSniffNear, NavBar } from '../components';
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addQuery, calculateDistance } from '../helpers';
import { useFilterAlerts } from '../hooks';

export const AlertsPage = () => {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const navigate = useNavigate();
    const location = useLocation();
    const { view = 'list', alertType = "all" } = queryString.parse( location.search );
    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState({ "lat": 35.2713052, "lng": -80.9589791});
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ distance, setDistance ] = useState(5);
    const { filteredAlerts, filters, setFilters, clearFilters, addFilter, setFilteredAlerts, setInitialData } = useFilterAlerts();


    useEffect(() => {
        if (coords?.lat && coords?.lng) {
            setPosition(coords)
        }
    }, [coords]);

    useEffect(() => {
        getData('alerts');
    }, [ getData ]);

    useEffect(() => {
        // console.log(data);
        if (data){

            // setFilteredData(data.filter( alert => (calculateDistance(position.lat, position.lng, alert.latitude, alert.longitude) <= distance)));

            setInitialData(data.filter( alert => (calculateDistance(position.lat, position.lng, alert.latitude, alert.longitude) <= distance)));

        }
    }, [data, distance, position, setFilteredAlerts]);

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
        
        // alertType !== "all" && addFilter('alertType', alertType);
    }, [alertType])
    




    const toggleMapIcon = () => {
        view !== 'map' ? navigate(addQuery('/alerts', { view: 'map' }), { replace: true }) : navigate(addQuery('/alerts', { view: 'list' }), { replace: true });
    }


    const [ showFilterOptions, setShowFilterOptions] = useState(false);
    const [ isFiltered, setIsFiltered ] = useState(false);


    useEffect(() => {
        if (filters.sex !== '' || filters.color1 !== '' || filters.size !== ''){
            setIsFiltered(true);
            // console.log('hay filtros')
        } else {
            setIsFiltered(false);
            // console.log('no hay filtros')
        }
    }, [filters])
    




    // const colorOptions = {
    //     blanco: 'Blanco',
    //     negro: 'Negro',
    //     marrón: 'Marrón',
    //     gris: 'Gris',
    //     naranja: 'Naranja',
    //     otro: 'Otro'
    // }

    // const sexOptions = {
    //     macho: 'Macho', 
    //     hembra: 'Hembra'
    // }

    // const onSetFilters = () => {
    //     console.log('le di a filtrar en modal')
    //     setFilters(formState);
    //     setShowFilterOptions(false);
    // }

    // const onClearFilters = () => {
    //     onResetForm();
    //     clearFilters();
    //     setShowFilterOptions(false);
    // }


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
            <div>
                <i className={`bi ${isFiltered ? 'bi-funnel-fill filtered' : 'bi-funnel'}`} onClick={()=> setShowFilterOptions(true)}></i>
            </div>
        </div>
        <div className='alertsPage'>

            {
                ( position && view === "map" ) &&
                <MapSniffNear position={position} data={filteredAlerts} />
            }


            {
                (data && view === "list") && <AlertCardList list={filteredAlerts} />
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
                />
        }

    </>
    )
}
