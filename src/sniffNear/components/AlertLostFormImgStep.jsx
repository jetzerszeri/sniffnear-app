import { ImgInput } from '../../ui';
import { useEffect, useState } from 'react';

export const AlertLostFormImgStep = ( { data, nextStep, prevStep, imageSelected, setImgFile, resetImg } ) => {

    const [imgError, setImgError] = useState( false )
    

    const onNextStep = () => {
        if ( !imageSelected ){
            setImgError(true);
            return;
        } else {
            nextStep();
        }
    }

    useEffect(() => {
        imageSelected && imgError && setImgError(false);
    }, [imageSelected, imgError])
    

    return (
        <div className='step'>
            <h2>Foto de {data.petName}</h2>
            <p>La foto de tu mascota es muy importante para facilitar el proceso de búsqueda.</p>
            

            <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />
            {imgError && <p className='errorInput center'>*La imagen es obligatoria</p>}

            <div className="actions">
                <button className='btn secundary' type="buttton" onClick={ prevStep }>Regresar</button>
                <button className='btn' type="buttton" onClick={ onNextStep }>Continuar</button>
            </div>
        </div>
    )
}
