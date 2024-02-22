import { Link } from 'react-router-dom';
import { calculateAge } from '../../helpers';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { Modal } from '../../ui';

export const PetProfile = ( { pet }) => {

    const { user } = useContext( AuthContext );
    const [ showModal, setShowModal] = useState( false );
    const { name, breed, breedType, birthdate, type, size, color1, img, sex, _id } = pet;

    const displayModal = () => {
        setShowModal( !showModal );
    }




    return (
        <div className='petProfile'>

            <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `avatar ${ name }`} />

            <div className='data'>

                <div className={ type }>
                    <p className='h'>{ name }</p>
                    <p>{ (breed && breedType) && `${breed} - `}{ `${calculateAge( birthdate ) } de edad` }</p>
                    {/* Mostrar perfil del usuario en caso que el user actual sea distinto del owner id */}
                </div>

                <ul className='petDataList'>
                    <li>Sexo <span>{ sex }</span></li>
                    <li>Color <span>{color1}</span></li>
                    { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                    <li>Tamaño <span>{ size }</span></li>
                </ul>



                {
                    user.id === pet.owner &&
                    <div className='actions'>
                        <button className='btn secundary' onClick={ displayModal }>Eliminar</button>
                        <Link className='btn' to={`/pets/${_id}/edit`}>Editar</Link>
                    </div>
                }

            </div>

            {
                showModal &&
                <Modal text={`¿Estás seguro de querer eliminar el perfil de ${ name }?`} type='danger' icon={ true }>
                    <button className="btn secundary" onClick={ displayModal }>Cancelar</button>
                    <button className="btn">Si, Eliminar</button>
                </Modal>
            }

        </div>
    )
}
