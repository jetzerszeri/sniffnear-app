import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { AuthStepOnForms, NavBar, PetFormPart1, PetFormPart2, PetFormPart3 } from '../components';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';
import { useForm } from '../../hooks/useForm';
import { useFetchSniffNearApi, usePreviewAndUploadImg } from '../../hooks';
import { AuthContext } from '../../auth/context';
import { Loader, Modal } from '../../ui';
import { RegisterForm } from '../../auth/components/RegisterForm';
import { LoginForm } from '../../auth/components/LoginForm';
import { getCurrentDate } from '../helpers';

export const PetsAddPage = () => {

    const { user } = useContext( AuthContext );
    const navigate = useNavigate();
    const location = useLocation();
    const { forAlert } = queryString.parse( location.search );
    const [ addPetStepTotal, setAddPetStepTotal ] = useState(3);
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(addPetStepTotal);
    const { type, name, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue, onResetForm } = useForm({
        type: '',
        name: '',
        birthdate: getCurrentDate(),
        breed: '',
        breedType: '',
        sex: '',
        size: '',
        color1: '',
        color2: '',
    });
    const { data, isLoading, error, create, onResetFetchState } = useFetchSniffNearApi();
    const [ prevBtnLabel, setPrevBtnLabel ] = useState( 'Cancelar' );
    const [ displayModal, setDisplayModal ] = useState( false );
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, imgFile } = usePreviewAndUploadImg();
    const [ authForm, setAuthForm ] = useState('singup');
    const [ imgError, setImgError ] = useState(false);


    useEffect(() => {
        currentStep === 1 ? setPrevBtnLabel('Cancelar') : setPrevBtnLabel('Anterior');
    }, [ currentStep ]);

    useEffect(() => {
        if (!user?.id && totalSteps === 3) {
            setAddPetStepTotal(4);
        }
    }, [user?.id, totalSteps])

    const createPetProfile = useCallback((formState, userId) => {
        const petData = {
            ...formState,
            owner: userId
        }
        create('pets', petData);
    }, [create]);

    


    useEffect(() => {

        if (totalSteps === 3 && formState.img) {
            createPetProfile( formState, user.id );
        } 
        
        else if ( totalSteps === 4 && user?.id && formState.img) {
            createPetProfile( formState, user.id );
        }
    
    }, [ formState, user, totalSteps, createPetProfile ]);


    useEffect(() => {
        if (data){
            if ( forAlert === "missing"){
                navigate(`/alerts/new?type=missing&petId=${data.pet._id}`, { replace: true });
            } else{
                setDisplayModal(true);
            }
        }
    }, [data])

    useEffect(() => {
        if (error) {
        }
    }, [error])
    

    useEffect(() => {
        if (imageSelected) {
            setImgError(false);
        }
    }, [imageSelected])
    
    
    



    const onPrevius = () => {
        prevStep();
        if (currentStep === 1) {
            navigate(-1);
        }
    };



    const onNext = () => {
        if (currentStep === 1){
            nextStep();
            return;
        } else if (currentStep === 2) {
            if ( name === '' || birthdate === '' || breedType === '' || sex === '' || size === '' || Object.keys(errors).length > 0) {
                setCheckErrors( true );
                return;
            } else {
                nextStep();
            }
        } else if (currentStep === 3) {
            if ( totalSteps === 3 ) {
                if (imageSelected) {
                    uploadPetImgAndSetLink( user.id );
                } else {
                    createPetProfile( formState, user.id );
                }
            }

            if ( totalSteps === 4 ) {
                if ( imgFile === null ){
                    setImgError(true);
                    return;
                }
                nextStep();
            }
        } 
    }
    

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onAddOtherPet = () => {
        onResetForm();
        onResetSteps();
        onResetFetchState();
        setCheckErrors( false );
    }

    const redirectToPetProfile = () => {
        navigate(`/pets/${ data.pet._id }`, { replace: true });
    }


    const uploadPetImgAndSetLink = async ( idUsuario ) => {
        const link = await uploadImg( 'pets/avatars/', `${idUsuario}-${name}` );
        setManualValue( 'img', link );
    }


    const onOkayBtnModal = () => {
        navigate(-1, { replace: true });
    }



    return (
        <>
            <NavBar title='Agregar mascota' />
            <main className='fullHeight'>

                <MultiStepsIndicator total={totalSteps} current={currentStep} />

                
                <form className={ currentStep < 4 ? 'multiSteps' : ''} onSubmit={ onSubmit }>

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


                    { currentStep < 4 &&
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
                                >
                                    { currentStep === totalSteps ? 'Crear perfil' : 'Siguiente'}
                                </button>
                        }
                    </div>
                    }
                    
                </form>

                {
                    currentStep === 4 
                    && <AuthStepOnForms
                        authForm={ authForm }
                        setAuthForm={ setAuthForm }
                        formState={ formState }
                        onPrevius={ onPrevius }
                        onNextFunction={ uploadPetImgAndSetLink }
                    />
                }






                {
                    isLoading && <Loader label='Creando perfil' />
                }

                {
                    displayModal && <Modal heading={`Perfil de ${ data.pet.name } creado con éxito`} type='success' icon={ true }>
                        <button className="btn secundary"  onClick={ onAddOtherPet }>Agregar otra mascota</button>
                        <button className="btn" onClick={ redirectToPetProfile }>Ver perfil</button>
                    </Modal>
                }

            </main>

            {
                (error && !isLoading )
                && <Modal text={ error } type='error' icon={ true } >
                    <button className="btn secundary" onClick={ onOkayBtnModal }>Ok</button>
                </Modal>
            }
        </>
    )
}
