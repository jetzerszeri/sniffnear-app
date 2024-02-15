import React, { useContext } from 'react';
import { ImgInput } from '../../ui';
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AddProfilePicture = () => {
  
  const { user, login } = useContext( AuthContext );
  const { imageSelected, setImgFile, resetImg } = usePreviewAndUploadImg();
  
  const navigate = useNavigate();

  const loginUser = () =>{
    login( user.id, user.name, user.email );
    navigate('/', { replace: true })
  }

  const saveProfilePictureAndLoginUser = () => {
    // // Aquí deberíamos hacer el fetch para guardar la imagen en el servidor
    // loginUser();
    console.log('Guardando imagen en el servidor...');
  }


  return (
    <>
        <h2>Agregar foto de perfil</h2>
        <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

        {
          imageSelected
            ? <button className="btn" onClick={ saveProfilePictureAndLoginUser }>Guardar cambios</button>
            : <button className="btn secundary" onClick={ loginUser }>Lo haré después</button>
        }
    </>
  )
}
