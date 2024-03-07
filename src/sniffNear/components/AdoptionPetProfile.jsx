import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateAge } from '../../helpers';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { Loader, Modal } from '../../ui';
import { useFetchSniffNearApi } from '../../hooks';

export const AdoptionPetProfile = ( { pet }) => {

    const navigate = useNavigate();

    const { user, editPet } = useContext( AuthContext );
    const { data, isLoading, error, deleteDocument } = useFetchSniffNearApi();
    const [ showModal, setShowModal ] = useState( false );
    const { name, content, city, breed, breedType, birthdate, type, size, color1, img, sex, _id } = pet;

    const displayModal = () => {
        setShowModal( !showModal );
    }

    const onDeletePetProfile = () => {
        if ( user.id === pet.owner ) {
            setShowModal( false );
            deleteDocument('adoptions', _id, { owner: user.id });
        }
    }

    const onOkayBtnModal = () => {
        navigate(-1, { replace: true });
    }

    const onEditPetProfile = () => {
        editPet( pet );
        navigate(`/adoptions/${_id}/edit`);
    }

    return (
        <div className='petProfile'>

        <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `avatar ${ name }`} />

        <div className='data'>

            <div className={ type }>
                <p className='h'>{ name }</p>
                <p>{ (breed && breedType) && `${breed} - `}{ `${calculateAge( birthdate ) } de edad` }</p>
                <p>{content}</p>
                <p>{city}</p>
            </div>

            <ul className='petDataList'>
                <li>Sexo <span>{ sex }</span></li>
                <li>Color <span>{color1}</span></li>
                { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                <li>Tamaño <span>{ size }</span></li>
            </ul>



            {
                user?.id === pet.owner &&
                <div className='actions'>
                    <button className='btn secundary' onClick={ displayModal }>Eliminar</button>
                    <button className='btn' onClick={ onEditPetProfile }>Editar</button>
                </div>
            }

        </div>

        {
            showModal &&
            <Modal text={`¿Estás seguro de querer eliminar el perfil de ${ name }?`} type='danger' icon={ true }>
                <button className="btn secundary" onClick={ displayModal }>Cancelar</button>
                <button className="btn" onClick={ onDeletePetProfile }>Si, Eliminar</button>
            </Modal>
        }

        {
            isLoading && <Loader label='Eliminando perfil...'/>
        }

        {
            error && <Modal text={ error } type='error' icon={ true } >
                <button className="btn secundary" onClick={ onOkayBtnModal }>Ok</button>
            </Modal>
        }

        {
            data && <Modal text={ data.message } type='success' icon={ true } >
                <button className="btn" onClick={ onOkayBtnModal }>Cerrar</button>
            </Modal>
        }

    </div>
    )
}
