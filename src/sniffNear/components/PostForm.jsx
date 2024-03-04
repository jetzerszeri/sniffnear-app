import { ImgInput, SelectOptionInput, TextAreaInput, TextInput } from '../../ui';

export const PostForm = ( { imageSelected, setImgFile, resetImg, checkErrors, formState, onInputChange, errors, setErrors, onSubmit, type="create" }) => {

    const categoryOptions = {
        salud : 'Salud',
        educacion : 'Educación',
        entrenenimiento: 'Entretenimiento',
        alimentacion: 'Alimentación',
        diversion: 'Diversión',
        otros: 'Otros'
    }

    return (
    <form onSubmit={onSubmit}>

        <div>
            <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } fullWidth={true} />
            { (!imageSelected && checkErrors) && <p className='errorInput'>*La imagen es obligatoria</p>} 
        </div>

        <TextInput
            label='Título'
            name='title'
            value={ formState.title }
            onChangeFunction={ onInputChange }
            errors={ errors }
            setErrors={ setErrors }
            required={ true }
            checkErrors={ checkErrors }
        />

        <TextAreaInput
            label='Contenido'
            name='content'
            value={ formState.content }
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
        />

        <SelectOptionInput
            name='category'
            value={ formState.category }
            label="Categoría"
            options={ categoryOptions }
            onChangeFunction={ onInputChange }
            errors={ errors }
            setErrors={ setErrors }
            required={ true }
            checkErrors={ checkErrors }
        />

        <div className="actions">
            <button type='submit' className='btn'>{type === 'create' ? "Publicar" : "Guardar cambios"}</button>
        </div>
    </form>
    )
}
