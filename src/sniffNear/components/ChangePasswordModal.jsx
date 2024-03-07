import { Loader, Modal, PasswordInput } from '../../ui';
import { useFetchSniffNearApi, useForm } from '../../hooks';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/context';

export const ChangePasswordModal = ( { setDisplayModal }) => {

    const { user } = useContext( AuthContext );

    const { onInputChange, currentPassword, password, validatePassword, errors, setErrors, checkErrors, setCheckErrors } = useForm({
        currentPassword: '',
        password: '',
        validatePassword: '',
    });
    const { data, isLoading, error, update } = useFetchSniffNearApi();


    const onUpdatePassword = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if ( currentPassword === '' || password === '' || password !== validatePassword ){
            return
        };

        update('users', user.id, { currentPassword, password });
    }

    useEffect(() => {
        if (error) {
            setErrors({ credentials: `${error}*`});
        }
    }, [ error, setErrors ]);



    return (
    <>

        { !data 
            ? <Modal custom={true}>


                <div className='changePasswordModal'>
                    <h2>Cambiar contraseña</h2>
                    <form>
                        {errors.credentials && <p className='errorInput credential'>{errors.credentials}</p>}
                        <PasswordInput
                            name='currentPassword'
                            value={ currentPassword }
                            onChangeFunction={ onInputChange }
                            errors={ errors }
                            setErrors={ setErrors }
                            required={ true }
                            checkErrors={ checkErrors }
                            label='Contraseña actual'
                            placeholder='Ingresá tu contraseña actual'
                        />

                        <PasswordInput
                            value={ password }
                            confirm={ true }
                            confirmName="validatePassword"
                            confirmValue={ validatePassword }
                            onChangeFunction={ onInputChange }
                            errors={ errors }
                            setErrors={ setErrors }
                            required={ true }
                            checkErrors={ checkErrors }
                            label='Nueva contraseña'
                            placeholder='Ingresá tu nueva contraseña'
                            newPassword={ true }
                        />


                        <div className="actions">
                            <button className="btn secundary" type='button' onClick={() => {setDisplayModal(false)}}>Cancelar</button>
                            <button className="btn" type='button' onClick={onUpdatePassword}>Guardar cambios</button>
                        </div>
                    </form>
                    <i className="bi bi-x-lg closeBtn" onClick={() => {setDisplayModal(false)}}></i>
                </div>
            </Modal>

            : <Modal text={`Contraseña actualizada exitosamente`} type='success' icon={ true } >
                    <button className="btn" onClick={() => {setDisplayModal(false)}}>Aceptar</button>
                </Modal>    
        }

        { isLoading && <Loader  />}

    </>
    )
}