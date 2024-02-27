import { DogPawPrintIcon } from '../../ui';
import { PetsList } from './PetsList';
import { Link } from 'react-router-dom';

export const AlertLostFormPart1 = ( ) => {
    return (
        <div className="AlertLostPart1">
            <h2>Seleccioná la mascota</h2>
            
            <PetsList forAlert={ true } />

            <div>
                <p>Si la mascota que se te perdió todavía no tiene perfil, por favor creale uno para continuar con la alerta.</p>

                <Link to="/pets/add?for=alert" className='plusOption'>
                        <DogPawPrintIcon />
                        Agregar mascota
                </Link>

            </div>
        </div>
    )
}
