import { useContext } from 'react';
import { AuthContext } from '../../auth/context';
import { getDistance } from '../helpers';
import { calculateAge, combineDateAndTime } from '../../helpers';
import { MapSniffNear } from './MapSniffNear';

export const AlertDetails = ( { data } ) => {

    const { coords } = useContext( AuthContext );
    const { alertType, breed, breedType, city, color1, country, created, creator, date,description, img, pet, latitude, longitude, sex, size, state, status, time, type, _id} = data;

    return (
        <div className='alertDetails'>
            <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `${type} color ${color1} ${ size }`} />

            <div className='data'>
                <div>
                    <h2 className='cap'>{`${type} ${alertType}`}</h2>
                    <p>
                        {
                            alertType === 'perdido'
                            ? `Visto por última vez a ${getDistance(coords.lat, coords.lng, latitude, longitude)}, hace ${calculateAge(combineDateAndTime(date, time))}`
                            : `Hace ${calculateAge(combineDateAndTime(date, time))}, a ${getDistance(coords.lat, coords.lng, latitude, longitude)} de tu ubicación`
                        }
                    </p>
                </div>

                <ul className='petDataList alert'>
                    <li>Sexo <span>{sex}</span></li>
                    <li>Color <span>{color1}</span></li>
                    { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                    <li>Tamaño <span>{size}</span></li>
                </ul>

                <p className='desc'>Descripción <span>{description}</span></p>

                <MapSniffNear position={{ lat: latitude, lng: longitude }} displayOnly={true} />
            </div>
        </div>
    )
}
