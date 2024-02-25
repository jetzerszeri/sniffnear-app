import { Route, Routes } from 'react-router-dom';
import { AlertsPage } from '../pages/AlertsPage';

export const AlertsRoutes = () => {
  return (
    // <PublicRoutes>
        <Routes>
            <Route path="/" element={ <AlertsPage /> } />
            <Route path="/*" element={ <AlertsPage /> } />
        </Routes>
    // </PublicRoutes>
  )
}
