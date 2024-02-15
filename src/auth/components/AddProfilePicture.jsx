import { useContext, useState } from 'react';
import { ImgInput } from '../../ui';
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AddProfilePicture = () => {
  
  const { user, login } = useContext( AuthContext );
  const { imageSelected, imgFile, imgLink, uploadStatus, setImgFile, resetImg, uploadImg } = usePreviewAndUploadImg();
  
  const navigate = useNavigate();

  const loginUser = () =>{
    login( user.id, user.name, user.email );
    navigate('/', { replace: true })
  }

  const saveProfilePictureAndLoginUser = async () => {
    // // Aquí deberíamos hacer el fetch para guardar la imagen en el servidor
    // loginUser();
    // await uploadImg( imgFile, 'users/avatars/', user.id );
    uploadImg( 'users/avatars/', user.id );
    if ( imgLink ){
      console.log('se guardó ');
    }
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
    </>
  )
}
