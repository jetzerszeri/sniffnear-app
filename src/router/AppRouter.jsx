import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../sniffNear';
import { PublicRoutes } from './PublicRoutes';
import { AccountRoutes, AlertsRoutes, PetsRoutes } from '../sniffNear/routes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="account/*" element={ <AccountRoutes /> } />
            <Route path='pets/*' element={ <PetsRoutes /> } />
            <Route path='alerts/*' element={ <AlertsRoutes /> } />

            <Route path="auth/*" element={
              <PublicRoutes>
                <AuthRoutes />
              </PublicRoutes>
            } />

        </Routes>
    </>
  )
}
