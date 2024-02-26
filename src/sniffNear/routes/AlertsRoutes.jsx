import { Route, Routes } from 'react-router-dom';
import { AlertsAddPage, AlertsPage } from '../pages';

export const AlertsRoutes = () => {
  return (
    // <PublicRoutes>
        <Routes>
            <Route path="/" element={ <AlertsPage /> } />
            <Route path="/new" element={ <AlertsAddPage /> } />
            <Route path="/*" element={ <AlertsPage /> } />
        </Routes>
    // </PublicRoutes>
  )
}
