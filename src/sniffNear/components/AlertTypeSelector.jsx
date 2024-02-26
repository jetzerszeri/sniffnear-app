import { AlertIcon, FoundIcon } from '../../ui';
import { useNavigate } from 'react-router-dom';

export const AlertTypeSelector = () => {

    const navigate = useNavigate();

    return (
        <div className='alertSelector'>
            <h2>¿Qué tipo de alerta querés crear?</h2>
            <div>
                <div onClick={ () => navigate('?type=lost')}>
                    <AlertIcon />
                    <p>Se perdió mi mascota</p>
                </div>

                <div onClick={ () => navigate('?type=found')}>
                    <FoundIcon />
                    <p>Encontré una mascota</p>
                </div>
            </div>
        </div>
    )
}
