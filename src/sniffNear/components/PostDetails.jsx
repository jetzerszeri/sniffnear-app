import { useContext, useState } from 'react';
import { UserCard } from './UserCard';
import { AuthContext } from '../../auth/context';
import { useNavigate } from 'react-router-dom';
import { Loader, Modal } from '../../ui';
import { useFetchSniffNearApi } from '../../hooks';

export const PostDetails = ( {post}) => {
    const { title, content, creator, category, created, img, _id } = post;
    const { user, editPost } = useContext( AuthContext );
    const [ showModal, setShowModal ] = useState( false );
    const navigate = useNavigate();
    const { data, isLoading, error, deleteDocument } = useFetchSniffNearApi();

    const displayModal = () => {
        setShowModal( !showModal );
    }

    const onDeletePost = () => {
        if ( user.id === creator._id ) {
            setShowModal( false );
            deleteDocument('blog', _id, { creator: user.id });
        }
    }

    const onOkayBtnModal = () => {
        navigate(-1, { replace: true });
    }

    const onEditPost = () => {
        editPost( post );
        navigate(`/blog/${_id}/edit`);
    }

    return (
    <div className='postDetails'>
        <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={title} />

        <div className="data">
            <h2>{title}</h2>
            {creator && <UserCard user={creator} createdAt={created} />}
            <p>{content}</p>

            {
                user.id === creator?._id &&
                <div className='actions'>
                    <button className='btn secundary' onClick={ displayModal }>Eliminar</button>
                    <button className='btn' onClick={ onEditPost }>Editar</button>
                </div>
            }
        </div>

        {
            showModal &&
            <Modal text={`¿Estás seguro de querer eliminar el post sobre "${ title }?"`} type='danger' icon={ true }>
                <button className="btn secundary" onClick={ displayModal }>Cancelar</button>
                <button className="btn" onClick={ onDeletePost }>Si, Eliminar</button>
            </Modal>
        }

        {
            isLoading && <Loader label='Eliminando perfil...'/>
        }

        {
            error && <Modal text={ error } type='error' icon={ true } >
                <button className="btn secundary" onClick={ onOkayBtnModal }>Ok</button>
            </Modal>
        }

        {
            data && <Modal text='Post eliminado exitosamente' type='success' icon={ true } >
                <button className="btn" onClick={ onOkayBtnModal }>Cerrar</button>
            </Modal>
        }

    </div>
    )
}
