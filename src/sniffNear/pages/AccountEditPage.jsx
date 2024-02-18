import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { NavBar } from '../components';
import { useForm, usePreviewAndUploadImg } from '../../hooks';
import { EmailInput, TextInput } from '../../ui';
import { ImgInput } from '../../ui';
import { Link } from 'react-router-dom';


export const AccountEditPage = () => {

  const { user } = useContext( AuthContext );
  const [ isEdited, setIsEdited ] = useState( false );
  const { name, email, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange } = useForm({
    name: user.name,
    email: user.email
  });
  const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();

  useEffect(() => { 
    if ( user.name !== name || user.email !== email || user.profileImg !== imageSelected) {
      setIsEdited( true );
    } else {
      setIsEdited( false );
    }
  }, [ formState, imageSelected ])

  
  useEffect(() => {
    if ( user.profileImg ) {
      setCurrentImg( user.profileImg );
      console.log('user.profileImg', user.profileImg);
    }
  }, [])





  return (
    <>
      <NavBar title='Editar perfil' />

      <main>
        <h1>Datos personales</h1>
        <form>
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
                : <button className="btn secundary">Cancelar</button>
            }
            </div>

        </form>

        <Link to="/account/settings/changePassword" className='link'>Cambiar contraseña <i className="bi bi-box-arrow-up-right"></i></Link>
      </main>
    </>
  )
}
