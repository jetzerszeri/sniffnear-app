import React, { useState, useEffect, useContext } from "react";
// import { NavBar, PetFormPart1, PetFormPart2 } from '../components';
// import { AuthContext } from '../../auth/context';
// import { convertDate } from '../helpers';
// import { ImgInput, Loader, Modal } from '../../ui';


export const AdoptionEditPage = () => {

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, adoption } = useContext( AuthContext );

//   const currentPetAdoption{
//     type: adoption?.type,
//     name: adoption?.name,
//     birthdate: convertDate( padoptionet?.birthdate ),
//     breed: adoption?.breed,
//     breedType: adoption?.breedType,
//     sex: adoption?.sex,
//     size: adoption?.size,
//     color1: adoption?.color1,
//     content: adoption?.content,
//     city: '',
//     // img: img,
//     // owner: user.id,
// }
// const { type, name, content, city, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm(currentPetAdoption);
// const { data, isLoading, error, update } = useFetchSniffNearApi();
// const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();



// useEffect(() => {
//     if ( !pet ){ navigate( `/adoptions/${id}`, { replace: true });}
// }, [ adoption, id, navigate ])

// useEffect(() => {( adoption?.img ) && setCurrentImg( adoption?.img )}, [ adoption?.img, setCurrentImg ]);


// const onUpdateSubmit = async (e) => {
//     e.preventDefault();
//     setCheckErrors( true );

//     if ( Object.keys(errors).length > 0  || !formState.type || !formState.name || !formState.birthdate || !formState.breedType ){
//         setCheckErrors( false );
//         return;
//     } 

//     const dataToUpdate = {
//         ...formState
//     }

//     if ( adoption.img !== imageSelected ) {
//         if ( imageSelected === null ){
//             dataToUpdate.deleteImg = true;
//         } else {
//             const link = await uploadImg( 'pets/avatars/', `${user.id}-${name}` );
//             dataToUpdate.img = link;
//         }
//     } 

//     await update( 'adoptions', id, dataToUpdate );
//     setCheckErrors( false );

// }


// useEffect(() => {
//     if (error){
//         console.log(error);
//     }
// }, [error ])










    return (
    <>

{/* <NavBar title={`Editar perfil de ${adoption?.name}`} /> */}

<main>
    <h1>llegué</h1>

        {/* <form onSubmit={ onUpdateSubmit }>

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
        } */}

</main>
    
    </>
    )
}
