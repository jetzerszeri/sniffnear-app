import { useCallback, useContext, useEffect, useState } from 'react';
import { ImgInput, Loader } from '../../ui';
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetchSniffNearApi } from '../../hooks';

export const AddProfilePicture = () => {
  
  const { user, login } = useContext( AuthContext );
  const [ loaderLabel, setLoaderLabel ] = useState(null);
  const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg } = usePreviewAndUploadImg();
  const { data, isLoading, error, update } = useFetchSniffNearApi();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadStatus) {
      setLoaderLabel('Subiendo Imagen...');
    } else if (isLoading) {
      setLoaderLabel('Guardando cambios...');
    }
  }, [isLoading, uploadStatus]);


  const loginUser =  useCallback((user) => {
    login( user.id, user.name, user.email );
    navigate('/', { replace: true })
  }, [ login, navigate ]);


  useEffect(() => {
      if ( data && data.user ) {
        loginUser( data.user );
      }
  }, [ data, loginUser ]);
  

  const uploadAndSaveImg = async () => {
    const link = await uploadImg( 'users/avatars/', user.id );
    await update('users', user.id, { profileImg: link });
  };


  return (
    <>
        <h2>Agregar foto de perfil</h2>

        <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

        {
          imageSelected
            ? <button className="btn" onClick={ uploadAndSaveImg }>Guardar cambios</button>
            : <button className="btn secundary" onClick={ () => {loginUser( user )} }>Lo haré después</button>
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
