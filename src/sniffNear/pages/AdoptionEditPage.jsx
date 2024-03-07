import React, { useState, useEffect, useContext } from "react";
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, PetFormPart1, PetFormPart2 } from '../components';
import { AuthContext } from '../../auth/context';
import { convertDate } from '../helpers';
import { ImgInput, Loader, Modal } from '../../ui';


export const AdoptionEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, pet } = useContext( AuthContext );

  const currentPetAdoption = {
    type: pet?.type,
    name: pet?.name,
    birthdate: convertDate( pet?.birthdate ),
    breed: pet?.breed,
    breedType: pet?.breedType,
    sex: pet?.sex,
    size: pet?.size,
    color1: pet?.color1,
    content: pet?.content,
    city: pet?.city,
    img: pet?.img,
    owner: user.id,
}
const { type, name, content, city, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm(currentPetAdoption);
const { data, isLoading, error, update } = useFetchSniffNearApi();
const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();



useEffect(() => {
    if ( !pet ){ navigate( `/adoptions/${id}`, { replace: true });}
    pet && console.log(pet)
}, [ pet, id, navigate ])

useEffect(() => {( pet?.img ) && setCurrentImg( pet?.img )}, [ pet?.img, setCurrentImg ]);


const onUpdateSubmit = async (e) => {
    e.preventDefault();
    setCheckErrors( true );

    if ( !formState.type || !formState.birthdate || !formState.breedType ){
        setCheckErrors( false );
        console.log('hay errores')
        console.log(formState)
        return;
    } 

    const dataToUpdate = {
        ...formState
    }
    console.log('estoy dentro 2')
    if ( pet.img !== imageSelected ) {
        if ( imageSelected === null ){
            console.log('imageSelected === null ')
            dataToUpdate.deleteImg = true;
        } else {
            const link = await uploadImg( 'pets/avatars/', `${user.id}-${name}` );
            dataToUpdate.img = link;
        }
    } 

    await update( 'adoption', id, dataToUpdate );
    setCheckErrors( false );

}


useEffect(() => {
    if (error){
        console.log(error);
    }
}, [error ])


    return (
    <>

<NavBar title={`Editar perfil de ${pet?.name}`} />

<main>

        <form onSubmit={ onUpdateSubmit }>

            <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

            <PetFormPart1
                setManualValue={ setManualValue }
                type={ type }
                bySteps={ false }
            />

            <PetFormPart2
                name={ name }
                birthdate={ birthdate }
                breedType={ breedType }
                breed={ breed }
                sex={ sex }
                size={ size }
                color1={ color1 }
                city={ city }
                content={ content }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
                onInputChange={ onInputChange }
                setManualValue={ setManualValue }
            />

            <div>
                <button className="btn secundary" type="button" onClick={ () => navigate(-1) }>Cancelar</button>
                <button type='submit' className="btn" >Guardar cambios</button>
            </div>

        </form>

        {
            (isLoading || uploadStatus) && <Loader label='Guardando cambios...' />
        }

        {
            data && <Modal text={`Perfil de "${name}" actualizado correctamente`} type='success' icon={ true } >
                <button className="btn" onClick={ () => navigate(-1, { replace: true }) }>Aceptar</button>
            </Modal>
        }

</main>
    
    </>
    )
}
