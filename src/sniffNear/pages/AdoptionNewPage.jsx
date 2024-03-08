import React, { useEffect, useState, useContext } from 'react';
import { AuthFormModal, NavBar, PetFormPart1, PetFormPart2, PetFormPart3 } from '../components'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context';
import { useMultiSteps } from '../hooks';
import { Loader, Modal, MultiStepsIndicator } from '../../ui';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { getCurrentDate, getCurrentTime } from '../helpers';
// import {getCurrentUserId, createLoader, removeLoader} from '../../js/functions';

export const AdoptionNewPage = () => {

    const { user, address } = useContext( AuthContext );
    const navigate = useNavigate();
    const [ prevBtnLabel, setPrevBtnLabel ] = useState( 'Cancelar' );
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(3);
    const { type, name, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, content,  formState, setErrors, setCheckErrors, onInputChange, setManualValue, onResetForm } = useForm({
        type: '',
        name: '',
        birthdate: getCurrentDate(),
        breed: '',
        breedType: '',
        sex: '',
        size: '',
        color1: '',
        color2: '',
        content: '',
        city: address.city,
        img: '',
    });
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, imgFile } = usePreviewAndUploadImg();
    const [ imgError, setImgError ] = useState(false);
    const { data, isLoading, error, create, onResetFetchState } = useFetchSniffNearApi();
    const [ displayAuthModal, setDisplayAuthModal ] = useState( false );
    
    const onNext = async () => {
        if (currentStep === 1){
            nextStep();
            return;
        } else if ( currentStep === 2) {
            if ( birthdate === '' || breedType === '' || sex === '' || size === '' || color1 === '' || content === '') {
                setCheckErrors( true );
                return;
            } else {
                nextStep();
            }
        } else if (currentStep === 3) {
            if ( imageSelected ) {
                const link = await uploadImg( 'adoptions/avatars/', `${user.id}-${breedType}-${content}-${getCurrentTime()}` );
                // console.log('link:', link);
                const data = {
                    ...formState,
                    img: link,
                    owner: user.id,
                }
                // console.log('data:', data);
                await create('adoption', data);

                // createAdoptionProfile( formState, user.id );
            } else {
                setImgError(true);
            }
        }
    }

    useEffect(() => {
        if (imageSelected) {
            setImgError(false);
        }
    }, [imageSelected])

    useEffect(() => {
        currentStep === 1 ? setPrevBtnLabel('Cancelar') : setPrevBtnLabel('Anterior');
    }, [ currentStep ]);

    const onPrevius = () => {
        prevStep();
        if (currentStep === 1) {
            navigate(-1);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    // const uploadPetImgAndSetLink = async ( idUsuario ) => {
    //     console.log('subiendo imagen...');
    //     const link = await uploadImg( 'pets/avatars/', `${idUsuario}-${name}` );
    //     setManualValue( 'img', link );
    //     console.log('se subio la imagen - link:', link);
    // }

    const redirectToPetProfile = () => {
        navigate(`/adoptions`);
    }

    useEffect(() => {
        user ? setDisplayAuthModal(false) : setDisplayAuthModal(true);   
    }, [ user ])

    return (
    <>
        <NavBar title='Nueva adopción' />

        <main className='fullHeight' onSubmit={onSubmit}>
            <MultiStepsIndicator total={totalSteps} current={currentStep} />

            <form className='multiSteps'>

            {
                currentStep === 1 
                    && <PetFormPart1
                        setManualValue={ setManualValue }
                        type={ type }
                        onNext={ onNext }
                        bySteps={ true }
                    />
            }

            {
                currentStep === 2
                && <PetFormPart2
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
                    bySteps={ true }
                    content={ content }
                    displayContentInput= {true}
                />
            }


            {
                currentStep === 3 
                && <PetFormPart3
                    bySteps={ true }
                    imageSelected={ imageSelected } 
                    setImgFile={ setImgFile } 
                    resetImg={ resetImg }
                    uploadStatus={ uploadStatus }
                    imgError={ imgError }
                />
            }

            <div className='actions'>
                <button 
                    className='btn secundary'
                    onClick={ onPrevius }
                >
                    { prevBtnLabel}
                </button>

                {
                    (currentStep > 1 || maxStepReached > 1) 
                        && <button 
                            className='btn'
                            onClick={ onNext }
                            type='button'
                        >
                            { currentStep === totalSteps ? 'Crear perfil' : 'Siguiente'}
                        </button>
                }
            </div>

            </form>

            {
                isLoading && <Loader label='Creando perfil' />
            }

            {
                data && <Modal heading={`Mascota para dar en adopción creada con éxito`} type='success' icon={ true }>
                    <button className="btn" onClick={ redirectToPetProfile }>Ver adopciones</button>
                </Modal>
            }

            {
                displayAuthModal &&
                <AuthFormModal
                    prevStep={ () => { navigate(-1)} }
                    onNextFunction={ () => { setDisplayAuthModal(false) } }
                />
            }

        </main>
    </>
    )
}
