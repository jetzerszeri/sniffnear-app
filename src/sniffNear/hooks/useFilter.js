import { useEffect, useState } from 'react'
import { filterData } from '../helpers';

export const useFilter = ( initialFilters ) => {

    const [ initialData, setinitialData ] = useState( [] );
    const [ filteredData, setFilteredData ] = useState( [] );
    const [ filters, setFilters ] = useState( initialFilters );

    const filterCurrentData = () => {
        const filterResult = filterData( initialData, filters)
        setFilteredData(filterResult);
    };

    const clearFilters = () => {
        setFilters(initialFilters);
        setFilteredData(initialData);
    };

    const addFilter = (filter, value) => {
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                [filter]: value
            }
        });
    };

    useEffect(() => {
        setFilteredData(filterData(initialData, filters));
    }, [filters, initialData])


    return {
        filteredData,
        filters,
        setFilters,
        filterCurrentData,
        clearFilters,
        addFilter,
        setinitialData,
    }
    


}
