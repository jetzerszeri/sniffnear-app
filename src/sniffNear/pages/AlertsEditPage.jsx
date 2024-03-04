import { useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/context';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { MapSniffNear, NavBar } from '../components';
import { DateInput, ImgInput, Loader, Modal, PetBreedInput, PetSexInput, PetSizeInput, SelectOptionInput, TextAreaInput, TimeInput } from '../../ui';
import { convertDate } from '../helpers';

export const AlertsEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, alert } = useContext( AuthContext );
  const initialAlertInfo = {
    type: alert?.type,
    size: alert?.size,
    breed: alert?.breed,
    breedType: alert?.breedType,
    img: alert?.img,
    sex: alert?.sex,
    description: alert?.description,
    latitude: alert?.latitude,
    longitude: alert?.longitude,
    date: convertDate( alert?.date ),
    time: alert?.time,
    alertType: alert?.alertType,
    creator: alert?.creator,
  }
  const { errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue, setFormState } = useForm(initialAlertInfo);
  const { data, isLoading, error, update } = useFetchSniffNearApi();
  const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();

  useEffect(() => {
    if ( !alert ){ navigate( `/alerts/${id}`, { replace: true });}
  }, [ alert, id, navigate ])

  useEffect(() => {( alert?.img ) && setCurrentImg( alert?.img )}, [ alert?.img, setCurrentImg ]);

  const updateCoords = useCallback(( lat, lng ) => {
      setFormState({
          ...formState,
          latitude: lat,
          longitude: lng
      });
  }, [ formState, setFormState ]);

  const typeOptions = {
    perro: 'Perro',
    gato: 'Gato',
  }

  const colorOptions = {
    blanco: 'Blanco',
    negro: 'Negro',
    marrón: 'Marrón',
    gris: 'Gris',
    naranja: 'Naranja',
    otro: 'Otro'
  }

  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    setCheckErrors( true );

    if (user.id !== formState.creator._id ){
      return;
    }

    if ( Object.keys(errors).length > 0  || !formState.type || !formState.description || !formState.latitude || !formState.longitude || !formState.date || !formState.time || imageSelected === null  ){
      // console.log(formState)
      setCheckErrors( false );
      return;
    } 

    const dataToUpdate = {
        ...formState
    }

    if ( alert.img  !== imageSelected ){
      if (imageSelected !== null){
        const link = await uploadImg( 'alerts/found/', `${formState.type}found${formState.date}at${formState.time}` );
        dataToUpdate.img = link;
      }
    }

    await update ('alerts', id, dataToUpdate);
    setCheckErrors( false );
  }

  return (
    <>
      <NavBar title='Editar alerta' />

      <main>
        <form className='editAlertForm' onSubmit={onUpdateSubmit}>
          <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />
          {imageSelected === null && <p className='errorInput center'>*La imagen es obligatoria</p>}

          <SelectOptionInput
            name="type"
            value={ formState.type }
            label="Tipo de mascota"
            options={ typeOptions }
            onChangeFunction={ onInputChange }
          />

          <SelectOptionInput
            name="color1"
            value={formState.color1}
            label="Color"
            onChangeFunction={onInputChange}
            options={colorOptions}
          />

          <PetSizeInput
            changeFunction={ setManualValue }
            sizeValue={ formState.size }
            required={ true }
            errors={ errors }
            checkErrors={ checkErrors }
            setErrors={ setErrors }
          />

          <PetBreedInput
            breedTypeValue={ formState.breedType }
            breedValue={ formState.breed }
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
            forAlert={ true }
            label='Raza'
          />

          <PetSexInput
            changeFunction={ setManualValue }
            sexValue={ formState.sex }
            errors={ errors }
            checkErrors={ checkErrors }
            setErrors={ setErrors }
            required={ formState.alertType === 'perdido' ? true : false}
          />

          <TextAreaInput
            name="description"
            value={ formState.description }
            label="Descripción de la mascota"
            placeholder={`Puedés compartir todos los datos que consideres necesarios.`}
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
          />

          <div className="inputContainer">
            <label>Lugar</label>
            <div>
              <MapSniffNear position={ { lat: formState.latitude, lng: formState.longitude } } alertForm={true} drag={true} formState={formState} updateCoords={updateCoords}/>

              {
                formState.alertType === 'encontrado' 
                ? <p>Por favor arrastrá el marcador a la ubicación donde encontraste a la mascota.</p>
                : <p>Por favor arrastrá el marcador a la ubicación donde viste a tu mascota por última vez.</p>
              }
            
            </div>

          </div>


          <DateInput
            name="date"
            value={ formState.date }
            label="Fecha"
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
            max={ true }
          />

          <TimeInput
            name="time"
            value={ formState.time }
            label="Hora"
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
          />


          <div className='actions'>
            <button className="btn secundary" type="button" onClick={ () => navigate(-1, { replace: true }) }>Cancelar</button>
            <button type='submit' className="btn" >Guardar cambios</button>
          </div>

        </form>


        {
          (isLoading || uploadStatus) && <Loader label='Guardando cambios...' />
        }

        {
          data && <Modal text={`Alerta actualizado correctamente`} type='success' icon={ true } >
              <button className="btn" onClick={ () => navigate(-1, { replace: true }) }>Aceptar</button>
          </Modal>
        }

      </main>
    </>
  )
}
