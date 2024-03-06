import React, { useContext, useEffect } from 'react';
import { useForm } from '../../hooks';
import { Modal, SelectOptionInput } from '../../ui';
import { AuthContext } from '../../auth/context';

export const FilterPostsModal = ( { setFilters, clearFilters, displayModal, prevFilters, isFiltered, creatorId } ) => {
    const { user } = useContext( AuthContext );
    const { id = null } = user;
    const initialState = { category: '', creator: '', userId: id}
    const { formState, onInputChange, onResetForm, setCurrentValues } = useForm(initialState);

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
        displayModal(false);
    }

    const onClearFilters = () => {
        onResetForm();
        clearFilters();
        displayModal(false);
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
                    />

                }

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
