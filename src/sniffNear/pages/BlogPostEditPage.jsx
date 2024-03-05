import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/context';
import { NavBar, PostForm } from '../components';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { Loader, Modal } from '../../ui';

export const BlogPostEditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user, post } = useContext( AuthContext );
    const currentPostInfo = {
        title: post?.title,
        content: post?.content,
        category: post?.category,
        img: post?.img,
    }
    const { title, content, category, errors, checkErrors, formState, onInputChange, setErrors, setCheckErrors } = useForm(currentPostInfo);
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();
    const { data, isLoading, error, update } = useFetchSniffNearApi();

    useEffect(() => {
        if ( !post ){ navigate( `/blog/${id}`, { replace: true });}
    }, [ post, id, navigate ])

    useEffect(() => {( post?.img ) && setCurrentImg( post?.img )}, [ post?.img, setCurrentImg ]);

    const onUpdateSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if ( errors.length > 0 || title === '' || content === '' || category === '' || imageSelected === null ) return;

        let dataToUpdate = { ...formState };

        if ( post.img !== imageSelected ) {
            const link = await uploadImg( 'blog/posts/', `${user.id}-${title}` );
            dataToUpdate = { ...dataToUpdate, img: link };
        }

        await update('blog', id, dataToUpdate);
        setCheckErrors( false );
    };
    
    const onOkayBtnModal = () => {
        navigate(-1, { replace: true });
    }



    return (
    <>
        <NavBar title="Editar publicación" />

        <main className="fullHeight newPost" >
            <PostForm
                imageSelected={ imageSelected }
                setImgFile={ setImgFile }
                resetImg={ resetImg }
                checkErrors={ checkErrors }
                formState={ formState }
                onInputChange={ onInputChange }
                errors={ errors }
                setErrors={ setErrors }
                onSubmit={ onUpdateSubmit }
                type='edit'
            />

            {
                (isLoading || uploadStatus) && <Loader label='Guardando cambios...' />
            }

            {
                data && <Modal text={`Post actualizado correctamente`} type='success' icon={ true } >
                    <button className="btn" onClick={ onOkayBtnModal }>Aceptar</button>
                </Modal>
            }
            
            {
                error && <Modal text={ error } type='error' icon={ true } >
                    <button className="btn secundary" onClick={ onOkayBtnModal }>Ok</button>
                </Modal>
            }
        </main>
    </>
    )
}
