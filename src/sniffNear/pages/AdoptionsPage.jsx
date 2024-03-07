import { Link, useNavigate } from 'react-router-dom';
import { AdoptionCard, NavBar } from '../components';
import { AdoptionsDetailPage } from './AdoptionsDetailPage';
import { useFetchSniffNearApi } from '../../hooks';
import { useContext, useEffect } from 'react';
import { Loader } from '../../ui';
import { AuthContext } from '../../auth/context';

export const AdoptionsPage = () => {

    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const { user } = useContext( AuthContext );
    const navigate = useNavigate();

    useEffect(() => {
        getData('adoption');
    }, [ getData ]);
    
    const onAddNewAdoption = () => {
        navigate('/adoptions/new');
    }

    const handleEditClick = (adoptionToEdit) => {
        console.log('Editar adopción:', adoptionToEdit);
    };

    return (
    <>
        <NavBar title='Adopciones' >
            <i className="bi bi-plus-lg" onClick={onAddNewAdoption}></i>
        </NavBar>
        <main>

                <ul className='alertList'>
                    
                    {
                    data &&
                    data.map((adoption) => {
                        
                        const isOwner = adoption.owner === user.id;
                        return <AdoptionCard
                            adoption={adoption}
                            key={adoption._id}
                            onDeleteClick={handleEditClick}
                            onEditClick={handleEditClick}
                            showButtons={isOwner}
                        />
                    })}
                </ul>

            {
                isLoading && <Loader label='cargando data'/>
            }

        </main>

    </>
    )
}
