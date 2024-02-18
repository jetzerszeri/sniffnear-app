import { Route, Routes } from 'react-router-dom';
import { AuthHomePage, LoginPage, RegisterPage } from '../pages';


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<AuthHomePage />} />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/register" element={ <RegisterPage /> } />
        </Routes>
    )
}
