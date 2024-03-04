import { NavBar } from '../components';
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
        creator: user.id,
    });
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, imgFile } = usePreviewAndUploadImg();
    const { data, error, isLoading, create } = useFetchSniffNearApi();

    const categoryOptions = {
        salud : 'Salud',
        educacion : 'Educación',
        entrenenimiento: 'Entretenimiento',
        alimentacion: 'Alimentación',
        diversion: 'Diversión',
        otros: 'Otros'
    }
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

            <form onSubmit={onSubmit}>

                <div>
                    <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } fullWidth={true} />
                    { (!imageSelected && checkErrors) && <p className='errorInput'>*La imagen es obligatoria</p>} 
                </div>

                <TextInput
                    label='Título'
                    name='title'
                    value={ title }
                    onChangeFunction={ onInputChange }
                    errors={ errors }
                    setErrors={ setErrors }
                    required={ true }
                    checkErrors={ checkErrors }
                />

                <TextAreaInput
                    label='Contenido'
                    name='content'
                    value={ content }
                    onChangeFunction={ onInputChange }
                    required={ true }
                    errors={ errors }
                    setErrors={ setErrors }
                    checkErrors={ checkErrors }
                />

                <SelectOptionInput
                    name='category'
                    value={ category }
                    label="Categoría"
                    options={ categoryOptions }
                    onChangeFunction={ onInputChange }
                    errors={ errors }
                    setErrors={ setErrors }
                    required={ true }
                    checkErrors={ checkErrors }
                />

                <div className="actions">
                    <button type='submit' className='btn'>Publicar</button>
                </div>
            


            </form>

            {
                (isLoading || uploadStatus) && <Loader label='Publicando post...' />
            }

            {
                data &&
                <Modal heading={`Publicación creada con éxito`} type='success' icon={ true }>
                    <button className="btn" onClick={ () => { navigate(`/blog/${ data.data._id }`, { replace: true }) } }>Ver alerta</button>
                </Modal>
            }




        </main>
    
    </>
    )
}
