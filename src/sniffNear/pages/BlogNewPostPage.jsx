import { NavBar, PostForm } from '../components';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { ImgInput, Loader, Modal, SelectOptionInput, TextAreaInput, TextInput } from '../../ui';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context';
import { useNavigate } from 'react-router-dom';

export const BlogNewPostPage = () => {

    const { user, address } = useContext( AuthContext );
    const { title, content, category, img, errors, checkErrors, formState, onInputChange, setErrors, setCheckErrors, setManualValue } = useForm({
        title: '',
        content: '',
        category: '',
        img: '',
        creator: user?.id,
    });
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, imgFile } = usePreviewAndUploadImg();
    const { data, error, isLoading, create } = useFetchSniffNearApi();

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
        setCheckErrors(true);
        if ( errors.length > 0 || title === '' || content === '' || category === '' || imageSelected === null ) return;

        const link = await uploadImg( 'blog/posts/', `${user.id}-${title}` );
        const postData = { ...formState, img: link };

        await create('blog', postData);
    }


    
    return (
    <>
        <NavBar title='Nuevo post'/>

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
                onSubmit={ onSubmit }
            />

            {
                (isLoading || uploadStatus) && <Loader label='Publicando post...' />
            }

            {
                data &&
                <Modal heading={`Publicación creada con éxito`} type='success' icon={ true }>
                    <button className="btn" onClick={ () => { navigate(`/blog/${ data.data._id }`, { replace: true }) } }>Ver</button>
                </Modal>
            }

            {
                error && <Modal text={ error } type='error' icon={ true } >
                    <button className="btn secundary" onClick={ () => { navigate(-1, {replace: true})} }>Ok</button>
                </Modal>
            }


        </main>
    
    </>
    )
}
