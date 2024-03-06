import { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { Modal, SelectOptionInput } from '../../ui';
import { AuthContext } from '../../auth/context';

export const FilterPetsOptions = ( { setFilters, clearFilters, displayModal, prevFilters, isFiltered, order, setOrder } ) => {

    const { user } = useContext( AuthContext );
    const { id = null } = user;
    const initialState = {
        alertType: '',
        sex: '',
        color1: '',
        size: '',
        creator: '',
    }
    const { formState, onInputChange, onResetForm, setCurrentValues } = useForm(initialState);

    useEffect(() => {
        if (prevFilters !== formState){
            setCurrentValues(prevFilters);
        }
    }, [])



    const colorOptions = {
        blanco: 'Blanco',
        negro: 'Negro',
        marrón: 'Marrón',
        gris: 'Gris',
        naranja: 'Naranja',
        otro: 'Otro'
    }

    const sexOptions = {
        macho: 'Macho', 
        hembra: 'Hembra'
    }

    const sizeOptions = {
        pequeño: 'Pequeño',
        mediano: 'Mediano',
        grande: 'Grande'
    }

    const authorOptions = {
        [id]: 'Mis alertas',
        others: 'Alertas de otros'
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
                    name='sex'
                    value={formState.sex}
                    label="Sexo"
                    onChangeFunction={onInputChange}
                    options={sexOptions}
                    defaultOption='Ambos'
                />

                <SelectOptionInput
                    name='color1'
                    value={formState.color1}
                    label="Color"
                    onChangeFunction={onInputChange}
                    options={colorOptions}
                    defaultOption='Todos los colores'
                />

                <SelectOptionInput
                    name='size'
                    value={formState.size}
                    label="Tamaño"
                    onChangeFunction={onInputChange}
                    options={sizeOptions}
                    defaultOption='Todos los tamaños'
                />

                {

                    user &&
                    <SelectOptionInput
                        label='Creador'
                        name='creator'
                        options={authorOptions}
                        value={formState.creator}
                        onChangeFunction={onInputChange}
                        defaultOption='Todas las Alertas'
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
