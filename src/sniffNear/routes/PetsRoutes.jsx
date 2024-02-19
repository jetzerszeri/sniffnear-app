import { Route, Routes } from 'react-router-dom';
import { PetsPage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const PetsRoutes = () => {
  return (
    <PrivateRoutes>
        <Routes>
            <Route path="/" element={ <PetsPage /> } />
            {/* <Route path="/edit" element={ } /> */}
            <Route path="/*" element={ <PetsPage /> } />
        </Routes>
    </PrivateRoutes>
  )
}
