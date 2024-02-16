import { useState } from 'react';
import { AddProfilePicture, RegisterForm } from '../components';
import { AuthLayout } from '../layout/AuthLayout';


export const RegisterPage = () => {

  const [ account, setAccount ] = useState({
    created: false,
  });

  const step = account.created ? 2 : 1;

  return (
    <AuthLayout title="Registrate">
      <p className="steps">{ step }/2</p>
        {
          !account.created 
          ? <RegisterForm accountStatus={ setAccount } /> 
          : <AddProfilePicture />
        }
    </AuthLayout>
  )
}
