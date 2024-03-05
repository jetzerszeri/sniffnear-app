import { Route, Routes } from 'react-router-dom';
import { HomePage, PetsAddPage, PetsProfilePage } from '../sniffNear';
import { PublicRoutes } from './PublicRoutes';
import { AccountRoutes, AlertsRoutes, InboxRoutes, BlogRoutes, PetsRoutes } from '../sniffNear/routes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="account/*" element={ <AccountRoutes /> } />
            <Route path="pets/:id" element={ <PetsProfilePage /> } />
            <Route path="pets/add" element={ <PetsAddPage /> } />
            <Route path='pets/*' element={ <PetsRoutes /> } />
            <Route path='alerts/*' element={ <AlertsRoutes /> } />
            <Route path='inbox/*' element={ <InboxRoutes /> } />
            <Route path='blog/*' element={ <BlogRoutes /> } />

            <Route path="auth/*" element={
              <PublicRoutes>
                <AuthRoutes />
              </PublicRoutes>
            } />

        </Routes>
    </>
  )
}
