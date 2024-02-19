import { Route, Routes } from 'react-router-dom';
import { AccountEditPage, AccountPage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';


export const AccountRoutes = () => {
    return (
        <PrivateRoutes>
            <Routes>
                <Route path="/" element={ <AccountPage /> } />
                <Route path="/edit" element={ <AccountEditPage /> } />



                <Route path="/*" element={ <AccountPage /> } />
            </Routes>
        </PrivateRoutes>
    )
}
