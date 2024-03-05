import React, { useEffect } from 'react';
import { BottomNav, NavBar, PostCardsList } from '../components';
import { useFetchSniffNearApi } from '../../hooks';
import { useFilter } from '../hooks';

export const BlogPage = () => {

    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const { filteredData, filters, setFilters, filterCurrentData, clearFilters, addFilter, setinitialData } = useFilter( { category: '' });

    useEffect(() => {
        getData('blog');
    }, [ getData ]);

    useEffect(() => {
        data && setinitialData(data);
    }, [data])
    


    return (
    <>
        <NavBar title='Publicaciones' sidebar={true} />

        { filteredData && <PostCardsList data={ filteredData } /> }

        <BottomNav />
    
    </>
    )
}
