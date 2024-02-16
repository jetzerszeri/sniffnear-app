import { useContext, useEffect, useState } from 'react';
import { ImgInput, Loader } from '../../ui';
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUpdateDocument } from '../../sniffNear/hooks';

export const AddProfilePicture = () => {
  
  const { user, login } = useContext( AuthContext );
  const [ loaderLabel, setLoaderLabel ] = useState(null);
  const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg } = usePreviewAndUploadImg();
  const { isLoading, error, update } = useUpdateDocument();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadStatus) {
      setLoaderLabel('Subiendo Imagen...');
    } else if (isLoading) {
      setLoaderLabel('Guardando cambios...');
    }
  }, [isLoading, uploadStatus])
  

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

        <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

        {
          imageSelected
            ? <button className="btn" onClick={ saveProfilePictureAndLoginUser }>Guardar cambios</button>
            : <button className="btn secundary" onClick={ loginUser }>Lo haré después</button>
        }

        {
          ( uploadStatus || isLoading )
            && <Loader label={ loaderLabel } />
        }

        {
          error && <p>error: { error }</p> // pendiente manejar el error
        }
    </>
  )
}
