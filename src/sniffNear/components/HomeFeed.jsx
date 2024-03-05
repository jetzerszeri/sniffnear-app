import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi } from '../../hooks';
import { useFilterAlerts } from '../hooks';
import { calculateDistance, orderData } from '../helpers';

export const HomeFeed = ( { postsData }) => {

    const { coords } = useContext( AuthContext );
    const { data, isLoading, error, get2Datas, state, state2 } = useFetchSniffNearApi();
    const [ posts, setPosts ] = useState(postsData);
    const { filteredAlerts, filters, setFilters, clearFilters, addFilter, setFilteredAlerts, setInitialData } = useFilterAlerts();
    const [ distance, setDistance ] = useState(5);
    const [ feedData, setFeedData ] = useState(null)

    useEffect(() => {
        get2Datas('alerts', 'blog');
    }, [ get2Datas]);

    useEffect(() => {
        if ( state.data ) {
            setInitialData(state.data.filter( alert => (calculateDistance(coords.lat, coords.lng, alert.latitude, alert.longitude) <= distance)));
        }
        if ( state2.data ) {
            setPosts(state2.data);
        }
    }, [ state, state2 ]);

    useEffect(() => {
        if (filteredAlerts && posts && !feedData) {
            const allData = [...filteredAlerts, ...posts];

            setFeedData(orderData(allData, 'created', 'desc'));
        }
    }, [filteredAlerts, posts, feedData])
    


    
      

    return (
    <div>HomeFeed</div>
    )
}
