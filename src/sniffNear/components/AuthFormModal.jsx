import { useState } from 'react';
import { Modal } from '../../ui';
import { AuthStepOnForms } from './AuthStepOnForms';

export const AuthFormModal = ( { prevStep, onNextFunction } ) => {

    const [ authForm, setAuthForm ] = useState('login');
    const formState = { name: 'Mascota' }


    return (
    <Modal custom={true} >

        <div>
            <AuthStepOnForms 
                authForm={ authForm }
                setAuthForm={ setAuthForm }
                formState={ formState }
                onPrevius={ prevStep }
                onNextFunction={ onNextFunction }
                alertType='contact'
            />
        </div>

        <i className="bi bi-x-lg closeBtn" onClick={ prevStep }></i>
        

    </Modal>
    )
}
