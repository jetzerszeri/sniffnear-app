import { Link } from 'react-router-dom';
import { NavBar } from '../components';
import { AdoptionsDetailPage } from './AdoptionsDetailPage';

export const AdoptionsPage = ({ adoptions, onAdoptionDelete, userId }) => {

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`https://sniffnear-api.onrender.com/api/adoption/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`La adopción con el id ${id} se ha eliminado correctamente.`);
        } catch (error) {
            console.error('Error al eliminar la adopción:', error);
        }
    };

    const handleEditClick = (adoptionToEdit) => {
        console.log('Editar adopción:', adoptionToEdit);
    };

    return (
    <>
        <NavBar title='Adopciones' />

        <main>
            <Link to='/adoptions/new' className="btn btn-primary">Agregar mascota para adopción</Link>

            <div className="listAlertas">
            <div className='topNavBar'>
                <h1>Listado de adopciones</h1>
            </div>
            <ul>
                
                {adoptions.map((adoption) => {
                    
                    const isOwner = adoption.owner === userId;
                    return <AdoptionsDetailPage
                        adoption={adoption}
                        key={adoption._id}
                        onDeleteClick={handleDeleteClick}
                        onEditClick={handleEditClick}
                        showButtons={isOwner}
                    />
                })}
            </ul>
        </div>

        </main>

    </>
    )
}
