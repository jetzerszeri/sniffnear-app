import { ImgInput, Loader } from '../../ui';

export const PetFormPart3 = ( { bySteps = false, imageSelected, setImgFile, resetImg, uploadStatus, imgError } ) => {
    

    return (
        <div className={ bySteps ? 'step' : '' }>
            { bySteps && <h2>Foto de perfil de tu mascota</h2> }

            <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />
            {imgError && <p className='errorInput center'>*La imagen es obligatoria</p>}


            {
                uploadStatus 
                    && Loader({ label: '1/2: Subiendo imagen...' })
            }

        </div>
    )
}
