import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js';
import { app } from './config';

const storage = getStorage( app );

export const uploadImgToFirestore = async ( file, folderName, fileName ) => {
    const extension = file.name.split('.').pop();

    const name = folderName + '/' + fileName + '.' + extension;

    const storageRef = ref( storage, name );

    await uploadBytes( storageRef, file );

    return (
        await getDownloadURL( storageRef )
    );
};
