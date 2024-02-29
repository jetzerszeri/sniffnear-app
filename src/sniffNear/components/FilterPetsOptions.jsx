import { useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { Modal, SelectOptionInput } from '../../ui';

export const FilterPetsOptions = ( { setFilters, clearFilters, displayModal, prevFilters, isFiltered } ) => {
    const initialState = {
        alertType: '',
        sex: '',
        color1: '',
        size: '',
    }
    const { formState, onInputChange, onResetForm, setCurrentValues } = useForm(initialState);

    useEffect(() => {
        if (prevFilters !== formState){
            setCurrentValues(prevFilters);
        }
    }, [])

    console.log(initialState === formState, 'initialState === formState')
    


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

    const onSetFilters = () => {
        console.log('le di a filtrar en modal')
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
                    
                />

                <SelectOptionInput
                    name='color1'
                    value={formState.color1}
                    label="Color"
                    onChangeFunction={onInputChange}
                    options={colorOptions}
                />

                <SelectOptionInput
                    name='size'
                    value={formState.size}
                    label="Tamaño"
                    onChangeFunction={onInputChange}
                    options={sizeOptions}
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
