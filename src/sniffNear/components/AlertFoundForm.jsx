import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMultiSteps } from '../hooks/useMultiSteps';
import { MultiStepsIndicator, PetTypeInput } from '../../ui';
import { useForm, usePreviewAndUploadImg } from '../../hooks';
import { getCurrentDate, getCurrentTime } from '../helpers';
import { AlertFoundFormPart1 } from './AlertFoundFormPart1';
import { AlertFoundFormPart2 } from './AlertFoundFormPart2';
import { AlertFoundFormPart3 } from './AlertFoundFormPart3';
import { AlertFormVerification } from './AlertFormVerification';
import { AlertLostFormImgStep } from './AlertLostFormImgStep';
import { AuthContext } from '../../auth/context';
import { AuthStepOnForms } from './AuthStepOnForms';

export const AlertFoundForm = () => {

    const { user, coords } = useContext(AuthContext);
    const [ addAlertTotalSteps, setAddAlertTotalSteps] = useState(5)
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(addAlertTotalSteps);
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();
    const [ authForm, setAuthForm ] = useState('singup');
    const { formState,  errors, checkErrors,  onInputChange, setFormState, setErrors, setCheckErrors, setManualValue} = useForm({
        petName: '',
        type: '',
        size: '',
        color1: '',
        breed: '',
        breedType: '',
        description: '',
        latitude: coords?.lat,
        longitude: coords?.lng,
        date: getCurrentDate(),
        time: getCurrentTime(),
        img: '',
        personName: '',
        email: '',
        alertType: 'encontrado',
        sex: '',
        creator: '',
        state:'',
        city:'',
        country:'',
        pet: '',
    })

    const updateCoords = useCallback(( lat, lng ) => {
        setFormState({
            ...formState,
            latitude: lat,
            longitude: lng
        });
    }, [ formState, setFormState ]);


    const onPreventSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if (!user?.id && totalSteps === 5) {
            setAddAlertTotalSteps(6);
        }
    }, [user?.id, totalSteps])


    const onCreateAlert = async() => {
        console.log('onCreateAlert');

        // if ( imageSelected !== formState.img ) {
        //     setLoaderLabel('Subiendo la imagen...');
        //     console.log('hay que subir la imagen');
        //     const link = await uploadImg('alerts/lost/', formState.pet);
        //     console.log(link);
        //     const alertData = {
        //         ...formState,
        //         img: link
        //     }
        //     setLoaderLabel('Publicando la alerta...');
        //     await create('alerts', alertData);
            
        // } else {
        //     setLoaderLabel('Publicando la alerta...');
        //     await create('alerts', formState);
        //     // console.log('se publicó la alerta');
        //     // console.log(data)

        // }

    }

    return (
    <>
        <MultiStepsIndicator current={ currentStep } total={ totalSteps } />

        <form className={ `${currentStep !== 6 ? 'multiSteps' : ''} alertFoundForm`} onSubmit={ onPreventSubmit }>

            {
                currentStep === 1 &&
                <AlertFoundFormPart1
                    setManualValue={ setManualValue }
                    formState={ formState }
                    nextStep={ nextStep }
                    errors={errors} 
                    setErrors={setErrors} 
                    checkErrors={checkErrors} 
                />
            }

            {
                currentStep === 2 &&
                <AlertFoundFormPart2 
                    onInputChange={ onInputChange }
                    errors={ errors }
                    setErrors={ setErrors }
                    checkErrors={ checkErrors }
                    formState={ formState }
                    setCheckErrors={ setCheckErrors }
                    nextStep={ nextStep }
                    prevStep={ prevStep }
                    setManualValue={ setManualValue }
                />
            }

            {
                currentStep === 3 &&
                <AlertFoundFormPart3
                    onInputChange={ onInputChange }
                    errors={ errors }
                    setErrors={ setErrors }
                    checkErrors={ checkErrors }
                    formState={ formState }
                    setCheckErrors={ setCheckErrors }
                    nextStep={ nextStep }
                    prevStep={ prevStep }
                    updateCoords={ updateCoords }
                />
            }
            {
                currentStep === 4 &&
                <AlertLostFormImgStep
                    data={formState}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    imageSelected={ imageSelected } 
                    setImgFile={ setImgFile } 
                    resetImg={ resetImg }
                    alertType='found'
                />
            }

            {
                currentStep === 5 &&
                <AlertFormVerification  
                    data={formState}
                    img={imageSelected}
                    onCreateAlert={nextStep}
                    prevStep={prevStep}
                    alertType='found'
                    user={user}
                />
            }

        </form>
        {
            currentStep === 6 &&
            <AuthStepOnForms
                authForm={ authForm }
                setAuthForm={ setAuthForm }
                formState={ formState }
                onPrevius={ prevStep }
                onNextFunction={ onCreateAlert }
                setCurrentImg={ setCurrentImg }
                alertType='found'
            />
        }


    
    </>
    )
}
