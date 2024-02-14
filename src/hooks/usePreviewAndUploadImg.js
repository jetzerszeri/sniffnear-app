import { useEffect, useState } from 'react';

export const usePreviewAndUploadImg = () => {

    const [ imageSelected, setImageSelected ] = useState( null );
    const [ imgFile, setImgFile ] = useState( null );

    useEffect(() => {
        if (imgFile && imgFile.type.match('image/*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSelected( e.target.result );
            }
            reader.readAsDataURL(imgFile);
        };
    }, [ imgFile ]);

    const resetImg = () => {
        setImageSelected( null );
        setImgFile( null );
    }
    

    return {
        imageSelected,
        imgFile,
        setImageSelected,
        setImgFile,
        resetImg,
    }
}
