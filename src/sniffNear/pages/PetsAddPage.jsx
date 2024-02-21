import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, PetFormPart1, PetFormPart2, PetFormPart3 } from '../components';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';
import { DateInput, PetBreedInput, PetColorInput, PetSexInput, PetSizeInput, PetTypeInput, TextInput } from '../../ui/customInputs';
import { useForm } from '../../hooks/useForm';
import { useFetchSniffNearApi } from '../../hooks';
import { AuthContext } from '../../auth/context';
import { Loader } from '../../ui';

export const PetsAddPage = () => {

    const { user } = useContext( AuthContext );
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep} = useMultiSteps(3);
    const { type, name, birthdate, breedType, breed, sex, size, color1, color2, errors, checkErrors, formState, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm({
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
    const { data, isLoading, error, create } = useFetchSniffNearApi();
    const [ prevBtnLabel, setPrevBtnLabel ] = useState( 'Cancelar' );
    const [ isImg, setIsImg ] = useState( false );
    const [ uploadImg, setUploadImg ] = useState( false )
    
    const navigate = useNavigate();

    useEffect(() => {
        currentStep === 1 ? setPrevBtnLabel('Cancelar') : setPrevBtnLabel('Anterior');
    }, [ currentStep ]);


    useEffect(() => {

        if (formState.img) {
        console.log('img:', formState.img);
        console.log('guardando imagen y creando perfil')
        createPetProfile();
        }
    
    }, [ formState.img ]);

    useEffect(() => {
        if (data){
            console.log(data)
            console.log('se creo el perfil de la mascota, hay que redireccionar usuario');
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

        if (currentStep === 1){
            nextStep();
        } else if (currentStep === 2) {
            setCheckErrors( true );

            if ( name === '' || birthdate === '' || breedType === '' || sex === '' || size === '' || Object.keys(errors).length > 0) {
                return;
            } else {
                nextStep();
            }
        } else if (currentStep === 3) {
            // console.log('hay que subir la imagen')
            if (isImg) {
                console.log('hay que subir la imagen');
                setUploadImg(true);
            } else {
                console.log('no hay imagen, solo hay que crear el perfil');
                createPetProfile();
            }

        }

    }
    

    const onSubmit = (e) => {
        e.preventDefault();
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


                </form>

                {
                    isLoading && <Loader label='Creando perfil' />
                }


            </main>
        </>
    )
}
