import { useParams } from 'react-router-dom';
import { NavBar } from '../components';

export const AdoptionsDetailPage = () => {

    const { id } = useParams();

    return (
    <>
        <NavBar title='Detalle de mascota' />

        <main>
            
        </main>

    
    </>
    )
}
