import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, PetFormPart1, PetFormPart2, PetFormPart3 } from '../components';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';
import { useForm } from '../../hooks/useForm';
import { useFetchSniffNearApi } from '../../hooks';
import { AuthContext } from '../../auth/context';
import { Loader, Modal } from '../../ui';
import { RegisterForm } from '../../auth/components/RegisterForm';

export const PetsAddPage = () => {

    const { user } = useContext( AuthContext );
    const [ addPetStepTotal, setAddPetStepTotal ] = useState(3);
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(addPetStepTotal);
    const { type, name, birthdate, breedType, breed, sex, size, color1, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue, onResetForm } = useForm({
        type: '',
        name: '',
        birthdate: '',
        breed: '',
        breedType: '',
        sex: '',
        size: '',
        color1: '',
        color2: '',
    });
    const { data, isLoading, error, create, onResetFetchState } = useFetchSniffNearApi();
    const [ prevBtnLabel, setPrevBtnLabel ] = useState( 'Cancelar' );
    const [ isImg, setIsImg ] = useState( false );
    const [ uploadImg, setUploadImg ] = useState( false )
    
    const navigate = useNavigate();

    useEffect(() => {
        currentStep === 1 ? setPrevBtnLabel('Cancelar') : setPrevBtnLabel('Anterior');
    }, [ currentStep ]);


    useEffect(() => {
        
        if (formState.img) {
        // console.log('img:', formState.img);
        // console.log('guardando imagen y creando perfil')
        createPetProfile();
        }
    
    }, [ formState.img ]);

    useEffect(() => {
        if (data){
            // console.log(data)
            // console.log('se creo el perfil de la mascota, hay que redireccionar usuario');
        }
    }, [data])

    useEffect(() => {
        if (error) {
            console.log('ocurrió un error:', error);
        }
    }, [error])
    
    
    



    const onPrevius = () => {
        prevStep();
        if (currentStep === 1) {
            navigate(-1);
        }
    };

    const createPetProfile = () => {
        const petData = {
            ...formState,
            owner: user.id
        }
        create('pets', petData);
    }


    const onNext = () => {
        // console.log('currentStep:', currentStep);
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
            if (isImg) {
                setUploadImg(true);
            } else {
                createPetProfile();
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




    return (
        <>
            <NavBar title='Agregar mascota' />
            <main className='fullHeight'>

                <MultiStepsIndicator total={totalSteps} current={currentStep} />

                <form className='multiSteps' onSubmit={ onSubmit }>

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
                            setIsImg={ setIsImg }
                            uploadImgIndicator={ uploadImg }
                            petName={ name }
                            setImgLink={ setManualValue }
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
                    && <>
                        <h2>Por último, registrate o iniciá sesión para vincular el perfil de tu mascota con tu cuenta.</h2>
                        <RegisterForm authFlow={false} label={`Registrarme y crear perfil de ${name}`} onPrevFunction={ onPrevius }/>
                    </>
                }






                {
                    isLoading && <Loader label='Creando perfil' />
                }

                {
                    data && <Modal heading={`Perfil de ${ data.pet.name } creado con éxito`} type='success' icon={ true }>
                        <button className="btn secundary"  onClick={ onAddOtherPet }>Agregar otro</button>
                        <button className="btn" onClick={ redirectToPetProfile }>Ver perfil</button>
                    </Modal>
                }


            </main>
        </>
    )
}
