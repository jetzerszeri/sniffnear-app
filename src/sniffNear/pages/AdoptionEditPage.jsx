import { NavBar } from '../components';
import { useParams } from 'react-router-dom';

export const AdoptionEditPage = () => {

    const { id } = useParams();

    return (
    <>
        <NavBar title='Editar mascota para adopción' />

        <main>

        </main>
    
    </>
    )
}
