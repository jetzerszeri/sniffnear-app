import { useState } from 'react';
import { Modal } from '../../ui';
import { AuthStepOnForms } from './AuthStepOnForms';

export const AuthFormModal = () => {

    const [ authForm, setAuthForm ] = useState('login');
    const formState = { name: 'Mascota' }

    const prevStep = () => {
        console.log('prevStep');
    }

    const onCreateAlert = () => {
        console.log('onCreateAlert');
    }

    return (
    <Modal custom={true} >

        <div>
            <AuthStepOnForms 
                authForm={ authForm }
                setAuthForm={ setAuthForm }
                formState={ formState }
                onPrevius={ prevStep }
                onNextFunction={ onCreateAlert }
                alertType='contact'
            />

        </div>

        <i className="bi bi-x-lg closeBtn" ></i>
        

    </Modal>
    )
}
