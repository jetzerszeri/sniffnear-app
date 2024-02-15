import { useContext, useState } from 'react';
import { ImgInput } from '../../ui';
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUpdateDocument } from '../../sniffNear/hooks';

export const AddProfilePicture = () => {
  
  const { user, login } = useContext( AuthContext );
  const { imageSelected, imgFile, imgLink, uploadStatus, setImgFile, resetImg, uploadImg } = usePreviewAndUploadImg();
  const { data, isLoading, error, update } = useUpdateDocument();
  
  const navigate = useNavigate();

  const loginUser = () =>{
    login( user.id, user.name, user.email );
    navigate('/', { replace: true })
  }

  const saveProfilePictureAndLoginUser = async () => {
    const link = await uploadImg( 'users/avatars/', user.id );
    const updatedData = await update('users', user.id, { profileImg: link });

    if (updatedData.error) {
      // hay que manejar el error
      return;
    }
    loginUser( updatedData.user.id, updatedData.user.name, updatedData.user.email );
    navigate('/', { replace: true });
  }


  return (
    <>
        <h2>Agregar foto de perfil</h2>

        { uploadStatus ? <p>Subiendo imagen...</p> : <p>false {imgLink}</p> }

        <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

        {
          imageSelected
            ? <button className="btn" onClick={ saveProfilePictureAndLoginUser }>Guardar cambios</button>
            : <button className="btn secundary" onClick={ loginUser }>Lo haré después</button>
        }

        {
          isLoading && <p>Actualizando data...</p>
        }

        {
          error && <p>error: { error }</p>
        }
    </>
  )
}
