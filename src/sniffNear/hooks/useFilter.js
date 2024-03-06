import { useContext, useEffect, useState } from 'react'
import { filterData } from '../helpers';
import { AuthContext } from '../../auth/context';

export const useFilter = ( initialFilters ) => {

    const { user } = useContext( AuthContext );

    const [ initialData, setinitialData ] = useState( [] );
    const [ filteredData, setFilteredData ] = useState( [] );
    const [ filters, setFilters ] = useState( initialFilters );

    const filterCurrentData = () => {
        let filterResult = initialData;

        // Verificar si el filtro por creator._id es necesario
        const creatorIdFilterNeeded = 'creator' in filters && filters.creator !== null && filters.creator !== '' && filters.creator !== 'all';
        // console.log(creatorIdFilterNeeded);

        // Si es necesario el filtro por creator._id
        if (creatorIdFilterNeeded) {
            // Si creatorId es 'others', filtrar los elementos que no coincidan con el creatorId
            if (filters.creator === 'others') {
                // console.log('debo filtrar por others');
                filterResult = filterData(initialData, filters, 'creator', user?.id, true);
            } else {
                // console.log('debo filtrar por creator._id');
                // Si creatorId no es 'others', aplicar el filtrado por ese creatorId
                filterResult = filterData(initialData, filters, 'creator', filters.creator);
            }
        } else {
            // Si no es necesario el filtro por creator._id, aplicar los filtros normales
            filterResult = filterData(initialData, filters);
        }
        
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
        filterCurrentData();
    }, [filters, initialData]);

    // useEffect(() => {
    //     console.log(filteredData)
    // }, [filteredData]);

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
