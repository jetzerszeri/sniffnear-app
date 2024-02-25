import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { NavBar } from '../components';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { EmailInput, Loader, TextInput } from '../../ui';
import { ImgInput } from '../../ui';
import { Link, useNavigate } from 'react-router-dom';


export const AccountEditPage = () => {

  const navigate = useNavigate();
  const { user, login } = useContext( AuthContext );
  const [ isEdited, setIsEdited ] = useState( false );
  const { name, email, errors, checkErrors, setErrors, setCheckErrors, onInputChange } = useForm({
    name: user.name,
    email: user.email,
    profileImg: user.profileImg,
  });
  const { imageSelected, uploadStatus, imgFile, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();
  const { data, isLoading, error, update } = useFetchSniffNearApi();
  const [ loaderLabel, setLoaderLabel ] = useState(null);


  useEffect(() => { 
    if ( user.name !== name || user.email !== email || user.profileImg !== imageSelected) {
      setIsEdited( true );
    } else {
      setIsEdited( false );
    }
  }, [ user.name, name, user.email, email, user.profileImg, imageSelected ]);

  
  useEffect(() => { if ( user.profileImg ) { setCurrentImg( user.profileImg );}}, [ setCurrentImg, user.profileImg ]);

  useEffect(() => {
    if ( data && data.user ) {
      login( data.user._id, data.user.name, data.user.email, data.user.profileImg );
      navigate(-1);
    }
  }, [ data, login, navigate ]);


  useEffect(() => {
    if (uploadStatus) {
      setLoaderLabel('Subiendo imagen...');
    } else if (isLoading) {
      setLoaderLabel('Guardando cambios...');
    }
  }, [isLoading, uploadStatus]);
  

  useEffect(() => {
    if (error) {
        setErrors({ credentials: `${error}*`});
    }
  }, [ error, setErrors ]);



  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    setCheckErrors( true );

    if ( email === '' || name === '' || Object.keys(errors).length > 0){
      setCheckErrors( false );
      return;
    }

    const dataToUpdate = {
      name,
      email,
    }

    if (user.profileImg !== imageSelected){

      if( imgFile ) {
        const link = await uploadImg( 'users/avatars/', user.id );
        dataToUpdate.profileImg = link;
      } else {
        dataToUpdate.deleteImg = true;
      }
    }

    await update('users', user.id, dataToUpdate);

    setCheckErrors( false );

  }







  return (
    <>
      <NavBar title='Editar perfil' />

      <main>
        <h1>Datos personales</h1>

        <form onSubmit={ onUpdateSubmit }>
          {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}

          <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

          <TextInput
            name="name"
            value={ name }
            placeholder="Ej. Jake Suarez"
            onChangeFunction={ onInputChange }
            label="Nombre"
            errors={ errors }
            setErrors={ setErrors }
            required={ true }
            checkErrors={ checkErrors }
          />

          <EmailInput
            value={ email }
            onChangeFunction={ onInputChange }
            errors={ errors }
            setErrors={ setErrors }
            required={ true }
            checkErrors={ checkErrors }
          />

            <div>
            {
              isEdited
                ? <button className="btn" >Guardar cambios</button>
                : <button className="btn secundary" onClick={ () => navigate(-1) }>Cancelar</button>
            }
            </div>

        </form>

        <Link to="/account/settings/changePassword" className='link'>Cambiar contraseña <i className="bi bi-box-arrow-up-right"></i></Link>
      </main>

      {
        ( uploadStatus || isLoading )
          && <Loader label={ loaderLabel } />
      }
    </>
  )
}
