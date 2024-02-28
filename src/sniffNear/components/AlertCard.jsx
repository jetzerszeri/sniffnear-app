import { AlertIcon, FoundIcon } from '../../ui';
import { Link } from 'react-router-dom';

export const AlertCard = ( { data } ) => {
    const { _id, alertType, type, city, description, img, color1, breedType, breed, size } = data;



    return (
        <li className={`alertCard ${ alertType }`}>
            <div className='h'>
                { alertType === 'perdido' ? <AlertIcon /> : <FoundIcon /> }
                    <div>
                        <h2>{ type } { alertType }</h2>
                        <p><i className="bi bi-geo-alt"> </i>
                            {
                                alertType === 'perdido'
                                ? `Visto por última vez en ${city}`
                                : `En ${city}`
                            }
                            {/* Visto por última vez a 5km de distancia. */}
                        </p>
                    </div>
            </div>


            <div>
                <img src={img}  alt={`${ type } color ${ color1 }`} />

                <div>
                    {/* <p>Maltese | Color café, tamaño mediano.</p> */}
                    <div>
                        <p>{ breed ? `${breedType} ${breed} | Color ${color1}, tamaño ${size}` : `color ${color1}, tamaño ${size}` }</p>
                        <p>{ description }</p>
                    </div>
                    <div className='actions'>
                        <Link to={`/alerts/${_id}`} className='btn small secundary'>Ver más</Link>
                    </div>
                </div>
            </div>
        </li>
    )
}
