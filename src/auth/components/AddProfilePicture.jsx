import React from 'react'
import { ImgInput } from '../../ui'
import { usePreviewAndUploadImg } from '../../hooks/usePreviewAndUploadImg'

export const AddProfilePicture = () => {

  const { imageSelected, setImgFile, resetImg } = usePreviewAndUploadImg();

  return (
    <>
        <h2>Agregar foto de perfil</h2>
        <ImgInput imageSelected={ imageSelected } setImgFile={ setImgFile } resetImg={ resetImg } />

        <button 
          className={`btn  ${ imageSelected ? 'primary' : 'secundary'}`} 
        >
          { imageSelected ? 'Guardar cambios' : 'Lo haré después'}
        </button>
    
    </>
  )
}
