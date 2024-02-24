import { useNavigate, useParams } from 'react-router-dom';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { NavBar, PetFormPart1, PetFormPart2 } from '../components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/context';
import { convertDate } from '../helpers';
import { ImgInput, Loader, Modal } from '../../ui';

export const PetsEditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user, pet } = useContext( AuthContext );
    const currentPetInfo = {
        type: pet?.type,
        name: pet?.name,
        birthdate: convertDate( pet?.birthdate ),
        breed: pet?.breed,
        breedType: pet?.breedType,
        sex: pet?.sex,
        size: pet?.size,
        color1: pet?.color1,
    }
    const { type, name, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm(currentPetInfo);
    const { data, isLoading, error, update } = useFetchSniffNearApi();
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();


    
    useEffect(() => {
        if ( !pet ){ navigate( `/pets/${id}`, { replace: true });}
    }, [ pet, id, navigate ])

    useEffect(() => {( pet?.img ) && setCurrentImg( pet?.img )}, [ pet?.img, setCurrentImg ]);

    // useEffect(() => {
    //     if ( data ) {
    //         console.log(data);
    //     }
    // }, [ data ])
    

    
    
    const onUpdateSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if ( Object.keys(errors).length > 0  || !formState.type || !formState.name || !formState.birthdate || !formState.breedType ){
            setCheckErrors( false );
            return;
        } 

        const dataToUpdate = {
            ...formState
        }

        if ( pet.img !== imageSelected ) {
            if ( imageSelected === null ){
                dataToUpdate.deleteImg = true;
            } else {
                const link = await uploadImg( 'pets/avatars/', `${user.id}-${name}` );
                dataToUpdate.img = link;
            }
        } 

        await update( 'pets', id, dataToUpdate );
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
