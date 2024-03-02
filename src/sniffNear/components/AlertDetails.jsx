import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { getDistance } from '../helpers';
import { calculateAge, combineDateAndTime } from '../../helpers';
import { MapSniffNear } from './MapSniffNear';
import { UserCard } from './UserCard';
import { Modal } from '../../ui';

export const AlertDetails = ( { data } ) => {

    const { coords, user } = useContext( AuthContext );
    const { alertType, breed, breedType, city, color1, country, created, creator, date,description, img, pet, latitude, longitude, sex, size, state, status, time, type, _id} = data;
    const [ displayHelpOptions, setDisplayHelpOptions ] = useState(false);

    return (
        <div className='alertDetails'>
            <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `${type} color ${color1} ${ size }`} />

            <div className='data'>
                <div>
                    <p className={`status ${status}`}>Alerta {status === "active" ? "activa" : "finalizada"}</p>

                    <h2 className='cap'>{`${type} ${alertType}`}</h2>
                    
                    <p>
                        {
                            alertType === 'perdido'
                            ? `Visto por última vez a ${getDistance(coords.lat, coords.lng, latitude, longitude)}, hace ${calculateAge(combineDateAndTime(date, time))}`
                            : `Hace ${calculateAge(combineDateAndTime(date, time))}, a ${getDistance(coords.lat, coords.lng, latitude, longitude)} de tu ubicación`
                        }
                    </p>
                </div>

                <UserCard user={ creator } createdAt={ created } >
                    {
                        (creator._id !== user.id) &&
                        <button className='btn small'>Contactar</button>
                    }
                </UserCard>

                <ul className='petDataList alert'>
                    <li>Sexo <span>{sex}</span></li>
                    <li>Color <span>{color1}</span></li>
                    { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                    <li>Tamaño <span>{size}</span></li>
                </ul>

                <p className='desc'>Descripción <span>{description}</span></p>

                <MapSniffNear position={{ lat: latitude, lng: longitude }} displayOnly={true} />


                <div className="actions">
                    {
                        (creator._id === user.id)
                        ? <>
                            <button className='btn secundary'>Editar <i className="bi bi-pencil"></i></button>
                            <button className='btn'>Finalizar alerta <i className="bi bi-check2-square"></i></button>
                        </>
                        : <>
                            <button className='btn' onClick={()=> setDisplayHelpOptions(true)}>Tengo info que puede ayudar</button>
                        </>
                    }
                </div>
            </div>

            {
                displayHelpOptions &&
                <Modal heading='¿Viste o sabés donde está esta mascota?' >

                    <button className='btn secundary'>La vi</button>
                    <button className='btn secundary'>Sé donde está</button>
                    <button className='btn'>Yo la tengo</button>

                    <i className="bi bi-x-lg closeBtn" onClick={() => setDisplayHelpOptions(false)}></i>
                </Modal>
            }
        </div>
    )
}
