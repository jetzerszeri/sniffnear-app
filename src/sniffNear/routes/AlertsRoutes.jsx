import { Route, Routes } from 'react-router-dom';
import { AlertDetailPage, AlertsAddPage, AlertsPage } from '../pages';

export const AlertsRoutes = () => {
  return (
    // <PublicRoutes>
        <Routes>
            <Route path="/" element={ <AlertsPage /> } />
            <Route path="/new" element={ <AlertsAddPage /> } />
            <Route path="/*" element={ <AlertsPage /> } />
            <Route path="/:id" element={ <AlertDetailPage /> } />
        </Routes>
    // </PublicRoutes>
  )
}
