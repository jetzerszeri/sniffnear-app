import { LoginForm } from '../../auth/components/LoginForm';
import { RegisterForm } from '../../auth/components/RegisterForm';

export const AuthStepOnForms = ( { formState, onPrevius, onNextFunction, authForm,  setAuthForm, alertType = "missing", contactH2 = "¡Gracias por usar SniffNear!", contactLabel = "Por favor iniciá sesión o registrate para continuar."} ) => {
    return (
        <div className={`multiSteps ${alertType}AuthForm`}>

            {
                alertType === 'missing' 
                && <h2>Por último, registrate o iniciá sesión para vincular el perfil de tu mascota con tu cuenta.</h2>
            }
            {
                alertType === 'found'
                && <div>
                    <h2>Datos de contacto</h2>
                    <p>Gracias por ayudar a una mascota perdida. Por favor registrate o iniciá sesión para poder contactarte.</p>
                </div> 
            }
            {
                alertType === 'contact' && 
                <div className='contactHeadingModal'>
                    { contactH2 && <h2>{contactH2 }</h2>}
                    { contactLabel && <p>{contactLabel}</p>}
                </div>
            }
            

            {
                authForm === 'singup' 
                    ?<RegisterForm 
                        authFlow={false} 
                        label={ alertType === 'contact' ? 'Registrarme y continuar' : (alertType === 'missing' ? `Registrarme y crear perfil de ${formState.name}` : 'Registrarme y publicar alerta')} 
                        onPrevFunction={ onPrevius }
                        onNextFunction={ onNextFunction }

                    >
                        <div className='loginSignupSwitch'>
                            <p>¿Ya tenés una cuenta? <span className='link' onClick={() => setAuthForm('login')}>Inicá sesión</span></p>
                        </div>
                    </RegisterForm>
                    : <LoginForm 
                        authFlow={false} 
                        label={ alertType === 'contact' ? 'Iniciar sesión y continuar' : (alertType === 'missing' ?`Iniciar sesión y crear perfil de ${formState.name}` : 'Iniciar sesión y publicar alerta')} 
                        onPrevFunction={ onPrevius }
                        onNextFunction={ onNextFunction }
                    >
                        <div className='loginSignupSwitch'>
                            <p>¿No tenés una cuenta? <span className='link' onClick={() => setAuthForm('singup')}>Registrate</span></p>
                        </div>

                    </LoginForm>
            }

        </div>
    )
}
