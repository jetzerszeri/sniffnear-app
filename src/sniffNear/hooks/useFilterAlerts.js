import { useEffect, useState } from 'react'
import { filterData } from '../helpers';

export const useFilterAlerts = ( data = [] ) => {

    const [ initialData, setInitialData ] = useState(data);
    const [ filteredAlerts, setFilteredAlerts ] = useState(data);
    const [ filters, setFilters ] = useState({
        alertType: '',
        sex: '',
        color1: '',
        size: '',
    })

    const filterAlerts = () => {
        const filteredAlerts = filterData(data, filters);
        setFilteredAlerts(filteredAlerts);
    };

    const clearFilters = () => {
        setFilters({
            alertType: '',
            sex: '',
            color1: '',
            size: '',
        });
        setFilteredAlerts(initialData);
    };

    useEffect(() => {
        // console.log('se aplicaron filtros')
        setFilteredAlerts(filterData(initialData, filters));
    }, [initialData, filters]);

    const addFilter = (filter, value) => {
        // setFilters((prevFilters) =>{
        //     ...prevFilters,
        //     ...filter
        // });
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                [filter]: value
            }
        });
    }


    return {
        filteredAlerts,
        filters,
        setFilters,
        filterAlerts,
        clearFilters,
        setFilteredAlerts,
        setInitialData,
        addFilter,
    }
}
