import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../sniffNear';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AccountRoutes } from '../sniffNear/routes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="account/*" element={ 
              <PrivateRoutes>
                  <AccountRoutes /> 
              </PrivateRoutes>
            } />


            <Route path="auth/*" element={
              <PublicRoutes>
                <AuthRoutes />
              </PublicRoutes>
            } />

        </Routes>
    </>
  )
}
