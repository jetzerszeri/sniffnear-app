import { useContext, useEffect } from 'react';
import { usePreviewAndUploadImg } from '../../hooks';
import { ImgInput, Loader } from '../../ui';
import { AuthContext } from '../../auth/context';

export const PetFormPart3 = ( { bySteps = false, setIsImg, uploadImgIndicator, petName, setImgLink } ) => {

    const { user } = useContext( AuthContext );
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg } = usePreviewAndUploadImg();

    useEffect(() => {
        if (imageSelected) {
            setIsImg(true);
        } else {
            setIsImg(false);
        }
    }, [ imageSelected, setIsImg ]);

    useEffect(() => {
        if (uploadImgIndicator) {
            // uploadImg( 'pets/avatars/' );
            uploadPetImgAndSetLink();
        }
    }, [ uploadImgIndicator ])
    
    const uploadPetImgAndSetLink = async () => {
        // console.log('subiendo imagen...');
        const link = await uploadImg( 'pets/avatars/', `${user.id}-${petName}` );
        setImgLink( 'img', link );
        // console.log('se subio la imagen - link:', link);
    }
    

    return (
        <div className={ bySteps ? 'step' : '' }>
            { bySteps && <h2>Foto de perfil de tu mascota</h2> }

            <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

            {
                uploadStatus 
                    && Loader({ label: '1/2: Subiendo imagen...' })
            }


        </div>
    )
}
