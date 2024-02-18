import { UploadImgIcon } from '../customIcons';

export const ImgInput = ( {imageSelected, setImgFile,  resetImg}) => {


    const imgLabelBackground = {
        backgroundImage: imageSelected ? `url(${imageSelected})` : 'none'
    }

    const onChangeImg = (e) => {
        setImgFile( e.target.files[0] );
    };

    



    return (
        <>
            <label htmlFor="imgUrl" className="labelImgInput" style={ imgLabelBackground }>
                {
                    (imageSelected) 
                        ? <p className='editIcon'><i className="bi bi-pencil"></i> <span>Editar</span></p>
                        :  <>
                            <UploadImgIcon /> 
                            <p className='loadLabel'>Cargar foto</p>
                        </>
                        
                }
            </label>

            {
                imageSelected 
                    && <p onClick={ () => resetImg() }><i className="bi bi-trash3-fill"></i> Eliminar imagen</p>
            }

            

            <input type="file" id="imgUrl" accept="image/*" name="img" onChange={ onChangeImg } />
        </>
    )
}
