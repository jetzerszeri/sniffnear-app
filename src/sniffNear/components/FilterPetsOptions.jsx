import { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { Modal, SelectOptionInput } from '../../ui';
import { AuthContext } from '../../auth/context';

export const FilterPetsOptions = ( { setFilters, clearFilters, displayModal, prevFilters, isFiltered, order, setOrder, distance, setDistance } ) => {

    const { user } = useContext( AuthContext );
    const initialState = {
        alertType: '',
        sex: '',
        color1: '',
        size: '',
        creator: '',
    }
    const { formState, onInputChange, onResetForm, setCurrentValues } = useForm(initialState);
    const [ sortOrder, setSortOrder ] = useState(order);
    const [ radio, setRadio ] = useState(distance);


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
        [user?.id]: 'Mis alertas',
        others: 'Alertas de otros'
    }

    const onSetFilters = () => {
        setFilters(formState);

        if (sortOrder !== order) {
            setOrder(sortOrder);
        }

        if (radio !== distance){
            setDistance(radio);
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

    const onRadioChange = ( { target }) => {
        setRadio(target.value);
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

                <SelectOptionInput
                    label='Distancia a la redonda'
                    name='distance'
                    options={{'1': '1 km', '5': '5 km', '10': '10 km', '20': '20 km', '50': '50 km', '100': '100 km'}}
                    value={radio}
                    onChangeFunction={onRadioChange}
                />



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
