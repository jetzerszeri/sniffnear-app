import { useEffect, useState } from 'react';
import { uploadImgToFirestore } from '../helpers';

export const usePreviewAndUploadImg = () => {

    const [ imageSelected, setImageSelected ] = useState( null );
    const [ imgFile, setImgFile ] = useState( null );
    const [ imgLink, setImgLink ] = useState( null );
    const [ uploadStatus, setUploadStatus ] = useState( false )

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

    const uploadImg = async ( folder, name ) => {
        setUploadStatus(true);

        const link = await uploadImgToFirestore( imgFile, folder, name );
        setImgLink( link );
        setUploadStatus(false);
        
        return link;
    }

    const setCurrentImg = (link) => {
        setImageSelected( link );
        // setImgLink( link );
    }
    

    return {
        imageSelected,
        imgFile,
        imgLink,
        uploadStatus,
        setImageSelected,
        setImgFile,
        resetImg,
        uploadImg,
        setCurrentImg,
    }
}
