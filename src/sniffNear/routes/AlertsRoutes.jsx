import { Route, Routes } from 'react-router-dom';
import { AlertDetailPage, AlertsAddPage, AlertsEditPage, AlertsPage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const AlertsRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <AlertsPage /> } />
            <Route path="/new" element={ <AlertsAddPage /> } />
            <Route path="/*" element={ <AlertsPage /> } />
            <Route path="/:id" element={ <AlertDetailPage /> } />
            <Route path="/:id/edit" element={
              <PrivateRoutes>
                <AlertsEditPage /> 
              </PrivateRoutes>
            } />
        </Routes>
    </>
  )
}
