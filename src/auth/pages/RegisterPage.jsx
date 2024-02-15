import { useState } from 'react';
import { AddProfilePicture, RegisterForm } from '../components';
import { AuthLayout } from '../layout/AuthLayout';


export const RegisterPage = () => {

  const [ account, setAccount ] = useState({
    created: false,
  });

  return (
    <AuthLayout title="Registrate">
        {
          !account.created 
          ? <RegisterForm accountStatus={ setAccount }/> 
          : <AddProfilePicture />
        }
    </AuthLayout>
  )
}
