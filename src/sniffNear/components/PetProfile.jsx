import { Link } from 'react-router-dom';

export const PetProfile = ( { pet }) => {

    const { name, breed, breedType, birthdate, type, size, color1, img, sex, } = pet


    return (
        <div className='petProfile'>

            <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `avatar ${ name }`} />

            <div className='data'>

                <div className={ type }>
                    <p className='h'>{ name }</p>
                    <p>{ (breed && breedType) && `${breed} - `}{ birthdate } años</p>
                </div>

                <ul className='petDataList'>
                    <li>Sexo <span>{ sex }</span></li>
                    <li>Color <span>{color1}</span></li>
                    { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                    <li>Tamaño <span>{ size }</span></li>
                </ul>

                <div className='actions'>
                    <button className='btn secundary'>Eliminar</button>
                    <Link className='btn'>Editar</Link>
                </div>

            </div>

        </div>
    )
}
