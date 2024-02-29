import { AlertIcon, FoundIcon } from '../../ui';
import { Link } from 'react-router-dom';

export const AlertInfoWindow = ( { data } ) => {
    const { _id, alertType, type, city, description, img, color1, breedType, breed, size, sex } = data;

    return (
        <div className={`alertInfWindow ${ alertType }`}>
            <div>
                { alertType === 'perdido' ? <AlertIcon /> : <FoundIcon /> }
                <div>
                    <h2>{ type } { alertType }</h2>
                    <p><i className="bi bi-geo-alt"> </i>
                        {
                            alertType === 'perdido'
                            ? `Visto por última vez en ${city}`
                            : `En ${city}`
                        }
                    </p>
                </div>
            </div>

            <div>
                <img src={img}  alt={`${ type } color ${ color1 }`} />

                <p>{ breed ? `${breedType} - ${breed}, ${sex}, ${color1}, ${size}` : `${sex}, ${color1}, ${size}`}</p>
                <p>{ description }</p>
                <div className="actions">
                    <Link to={`/alerts/${_id}`} className='btn'>Ver más</Link>
                </div>
            </div>

        </div>
    )
}
