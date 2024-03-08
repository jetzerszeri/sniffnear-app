import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMultiSteps } from '../hooks/useMultiSteps';
import { Loader, Modal, MultiStepsIndicator, PetTypeInput } from '../../ui';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { convertDate, getCurrentDate, getCurrentTime } from '../helpers';
import { AlertFoundFormPart1 } from './AlertFoundFormPart1';
import { AlertFoundFormPart2 } from './AlertFoundFormPart2';
import { AlertFoundFormPart3 } from './AlertFoundFormPart3';
import { AlertFormVerification } from './AlertFormVerification';
import { AlertLostFormImgStep } from './AlertLostFormImgStep';
import { AuthContext } from '../../auth/context';
import { AuthStepOnForms } from './AuthStepOnForms';
import { useNavigate } from 'react-router-dom';

export const AlertFoundForm = () => {

    const navigate = useNavigate();
    const { user, coords } = useContext(AuthContext);
    const [ addAlertTotalSteps, setAddAlertTotalSteps] = useState(5)
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(addAlertTotalSteps);
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();
    const [ authForm, setAuthForm ] = useState('singup');
    const { data, isLoading, error, create, onResetFetchState } = useFetchSniffNearApi();
    const { formState,  errors, checkErrors,  onInputChange, setFormState, setErrors, setCheckErrors, setManualValue} = useForm({
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
        petName: '',
    });
    const [ loaderLabel, setLoaderLabel ] = useState('Cargando...');
    const [ isCreated, setIsCreated ] = useState(false);

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

        if (user){
            setFormState({
                ...formState,
                personName: user.name,
                email: user.email,
                creator: user.id
            })
        }
    }, [user, totalSteps])



    useEffect(() => {
        if ( data?.alert){
            // console.log(data)
            setIsCreated(true);
        }
    }, [ data ]);

    useEffect(() => {
        if ( user?.id){
            setFormState({
                ...formState,
                personName: user.name,
                email: user.email,
                creator: user.id
            })
        }
    }, [user])

    useEffect(() => {

        if ( totalSteps === 6 && currentStep === 6 && (formState.creator !== '')) {
            // console.log('estoy en el effect y tengo que subir la imagen y publucar la alerta')
            uploadImgandCreateAlert( formState );
        }


    }, [ user, totalSteps, formState, currentStep])
    
    

    // const createAlert = useCallback( async (formState, userId) => {
    //     const petData = {
    //         ...formState,
    //         owner: userId
    //     }
    //     create('pets', petData);
    // }, []);


    const onCreateAlert = async() => {
        // console.log('onCreateAlert');

        if (totalSteps === 5 && currentStep === 5) {
            uploadImgandCreateAlert( formState );
        } else {
            nextStep();
        } 
    }

    const uploadImgandCreateAlert = useCallback(async ( formState ) => {
        setLoaderLabel('Subiendo imagen...');
        const link = await uploadImg( 'alerts/found/', `${formState.type}found${formState.date}at${formState.time}` );
        const alertData = {
            ...formState,
            img: link
        }
        setLoaderLabel('Publicando alerta...');
        await create('alerts', alertData);
        // console.log('alerta creada');

        // setManualValue( 'img', link );
    }, [ uploadImg ]);

    

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
                    onCreateAlert={onCreateAlert}
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

        {
            (isLoading || uploadStatus) && <Loader label={ loaderLabel } />
        }

        {
            isCreated &&
            <Modal heading={`Alerta creada con éxito`} type='success' icon={ true }>
                <button className="btn" onClick={ () => { navigate(`/alerts/${ data.alert._id }`, { replace: true }) } }>Ver alerta</button>
            </Modal>
        }

    
    </>
    )
}
