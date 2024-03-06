import { Link } from 'react-router-dom';
import { NavBar } from '../components';

export const AdoptionsPage = () => {
    return (
    <>
        <NavBar title='Adopciones' />

        <main>
            <Link to='/adoptions/new' className="btn btn-primary">Agregar mascota para adopción</Link>

        </main>

    </>
    )
}
