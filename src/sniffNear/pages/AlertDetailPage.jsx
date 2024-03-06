import { useContext, useEffect, useState } from 'react';
import { useFetchSniffNearApi } from '../../hooks';
import { AlertDetails, NavBar } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Modal } from '../../ui';
import { AuthContext } from '../../auth/context';

export const AlertDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext( AuthContext );

    const { data, isLoading, error, getData, deleteDocument } = useFetchSniffNearApi();
    const [ alert, setAlert ] = useState({});
    const [ displayDeleteModal, setDisplayDeleteModal ] = useState(false);



    useEffect(() => {
        getData(`alerts/${id}`);
    }, [ getData, id ]);

    useEffect(() => {
        if ( data?.alertType ) {
            
            setAlert(data);
    
        }
        if ( error ) {
            navigate('/alerts', { replace: true });
        }
    }, [ data, error, navigate ]);

    const ondisplayModal = () => {
        setDisplayDeleteModal( !displayDeleteModal );
    }

    const onDeleteAlert = () => {
        if ( user.id === alert?.creator._id ) {
            deleteDocument('alerts', id, { owner: user.id });
            ondisplayModal();
        }
    }

    const onOkayBtnModal = () => {
        navigate(-1, { replace: true });
    }



    return (
    <>
        <NavBar title="Detalle de alerta" >
            {
                user?.id === alert.creator?._id &&
                <i className="bi bi-trash3" onClick={ondisplayModal}></i>
            }
        </NavBar>

        {
            alert.alertType
            && <AlertDetails alert={ alert } />
        }



        {
            isLoading && <Loader />
        }

        {
            displayDeleteModal &&
            <Modal text={`¿Estás seguro de dar de baja la alerta?`} type='danger' icon={ true }>
                <button className="btn secundary" onClick={ ondisplayModal }>Cancelar</button>
                <button className="btn" onClick={ onDeleteAlert }>Si, Eliminar</button>
            </Modal>
        }

        {
            data?.msg && <Modal text={ data.msg } type='success' icon={ true } >
                <button className="btn" onClick={ onOkayBtnModal }>Cerrar</button>
            </Modal>
        }
    </>
    )
}
