import React, { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { Modal, SelectOptionInput } from '../../ui';
import { AuthContext } from '../../auth/context';

export const FilterPostsModal = ( { setFilters, clearFilters, displayModal, prevFilters, isFiltered, order, setOrder } ) => {
    const { user } = useContext( AuthContext );
    const { id = null } = user;
    const initialState = { category: '', creator: '' }
    const { formState, onInputChange, onResetForm, setCurrentValues } = useForm(initialState);
    const [sortOrder, setSortOrder] = useState(order);

    useEffect(() => {
        if (prevFilters !== formState){
            setCurrentValues(prevFilters);
        }
    }, [])

    const categoryOptions = {
        salud : 'Salud',
        educación : 'Educación',
        entrenenimiento: 'Entretenimiento',
        alimentación: 'Alimentación',
        diversión: 'Diversión',
        otros: 'Otros'
    }

    const authorOptions = {
        [id]: 'Mis publicaciones',
        others: 'Publicaciones de otros'
    }

    const onSetFilters = () => {
        setFilters(formState);

        if (sortOrder !== order) {
            setOrder(sortOrder);
        }
        displayModal(false);
    }

    const onClearFilters = () => {
        onResetForm();
        clearFilters();
        displayModal(false);
    }

    const onOrderChange = ({ target }) => {
        setSortOrder(target.value);
    }




    return (
        <Modal custom={true} >
            <div className='filterModal'>
                <h2><i className="bi bi-funnel"></i>Filtrar por:</h2>

                <SelectOptionInput
                    label='Categoría'
                    name='category'
                    options={categoryOptions}
                    value={formState.category}
                    onChangeFunction={onInputChange}
                />
                
                {

                    user &&
                    <SelectOptionInput
                        label='Autor'
                        name='creator'
                        options={authorOptions}
                        value={formState.creator}
                        onChangeFunction={onInputChange}
                        defaultOption='Todas las publicaciones'
                    />

                }

                <h2><i className="bi bi-sort-alpha-down-alt"></i> Ordenar por:</h2>
                <SelectOptionInput
                    label='Fecha de publicación'
                    name='order'
                    options={{'desc': 'Más recientes primero', 'asc': 'Más antiguas primero'}}
                    value={sortOrder}
                    onChangeFunction={onOrderChange}
                />

                <div className="actions">

                    {
                        isFiltered &&
                        <button className='btn secundary' onClick={onClearFilters}>
                            Limpiar filtros
                        </button>
                    }
                    <button className='btn' onClick={onSetFilters}>
                        Aplicar filtros
                    </button>
                </div>

                <i className="bi bi-x-lg closeBtn" onClick={() => displayModal(false)}></i>
            </div>
        </Modal>
    )
}
