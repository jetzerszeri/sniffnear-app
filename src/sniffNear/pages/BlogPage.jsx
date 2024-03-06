import { useContext, useEffect, useState } from 'react';
import { BottomNav, FilterPostsModal, NavBar, PostCardsList } from '../components';
import { useFetchSniffNearApi } from '../../hooks';
import { useFilter } from '../hooks';
import { AuthContext } from '../../auth/context';
import { orderData } from '../helpers';

export const BlogPage = () => {

    const { user } = useContext( AuthContext );
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const { filteredData, filters, setFilters, filterCurrentData, clearFilters, addFilter, setinitialData } = useFilter( { category: '', creator: '' } );
    const [ showFilterOptions, setShowFilterOptions] = useState(false);
    const [ isFiltered, setIsFiltered ] = useState( false );
    const [ order, setOrder ] = useState('desc');

    useEffect(() => {
        getData('blog');
    }, [ getData ]);

    useEffect(() => {
        data && setinitialData(orderData(data, 'created', order));
    }, [data, order])

    // useEffect(() => {
    //     setinitialData(orderData(data, 'created', order))
    // }, [order])
    

    useEffect(() => {
        (filters.category !== '' || filters.creator !== '') ? setIsFiltered(true) : setIsFiltered(false);
    }, [ filters ])
    
    


    return (
    <>
        <NavBar title='Publicaciones' sidebar={true} >
            <i className={`bi filterIcon ${isFiltered ? 'bi-funnel-fill filtered' : 'bi-funnel'}`} onClick={()=> setShowFilterOptions(true)}></i>
        </NavBar>

        { filteredData && <PostCardsList data={ filteredData } /> }

        <BottomNav />

        {
            showFilterOptions &&
                <FilterPostsModal
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                    displayModal={setShowFilterOptions}
                    prevFilters={filters}
                    isFiltered={isFiltered}
                    order={order}
                    setOrder={setOrder}
                />
        }
    
    </>
    )
}
