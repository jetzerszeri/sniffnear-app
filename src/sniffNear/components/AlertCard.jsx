import { useContext } from 'react';
import { AlertIcon, FoundIcon } from '../../ui';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context';
import { getDistance } from '../helpers';

export const AlertCard = ( { data } ) => {

    const { coords } = useContext( AuthContext );
    const { _id, alertType, type, city, description, img, color1, breedType, breed, size, sex, latitude, longitude } = data;



    return (
        <li className={`alertCard ${ alertType }`}>
            <div className='h'>
                { alertType === 'perdido' ? <AlertIcon /> : <FoundIcon /> }
                    <div>
                        <h2>{ type } { alertType }</h2>
                        <p><i className="bi bi-geo-alt"> </i>
                            {
                                alertType === 'perdido'
                                ? `Visto por última vez a ${getDistance(coords.lat, coords.lng, latitude, longitude)}`
                                : `A ${getDistance(coords.lat, coords.lng, latitude, longitude)} de tu ubicación`
                            }
                            {/* Visto por última vez a 5km de distancia. */}
                        </p>
                    </div>
            </div>


            <div>
                <img src={img}  alt={`${ type } color ${ color1 }`} />

                <div>
                    <div>
                        <p>{ breed ? `${breedType} ${breed} ${sex} | Color ${color1}, tamaño ${size}` : `${sex}, color ${color1}, tamaño ${size}` }</p>
                        <p>{ description }</p>
                        <p></p>
                    </div>
                    <div className='actions'>
                        <Link to={`/alerts/${_id}`} className='btn small secundary'>Ver más</Link>
                    </div>
                </div>
            </div>
        </li>
    )
}
