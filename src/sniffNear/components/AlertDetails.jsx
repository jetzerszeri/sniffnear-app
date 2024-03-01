import { useContext } from 'react';
import { AuthContext } from '../../auth/context';
import { getDistance } from '../helpers';
import { calculateAge, combineDateAndTime } from '../../helpers';

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

            </div>




        </div>
    )
}
