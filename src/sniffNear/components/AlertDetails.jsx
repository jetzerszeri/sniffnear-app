import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { getDistance } from '../helpers';
import { calculateAge, combineDateAndTime } from '../../helpers';
import { MapSniffNear } from './MapSniffNear';
import { UserCard } from './UserCard';
import { Modal } from '../../ui';
import { useNavigate } from 'react-router-dom';
import { useFetchSniffNearApi } from '../../hooks';
import { AuthFormModal } from './AuthFormModal';

export const AlertDetails = ( { alert, preview = false, imgSelected } ) => {

    const { coords, user, editAlert } = useContext( AuthContext );
    const { alertType, petName, breed, breedType, city, color1, country, created, creator, date,description, img, pet, latitude, longitude, sex, size, state, status, time, type, _id} = alert;
    const navigate = useNavigate();
    const [ chatExist,setChatExist ]=useState( false );
    const [ finalizeAlertModal, setFinalizeAlertModal ] = useState( false );
    const { data, isLoading, update } = useFetchSniffNearApi();
    const [ displayAuthModal, setDisplayAuthModal ] = useState( false );
    const [ redirectToChat, setRedirectToChat ] = useState( false );
    const [ myOwnAlertContact, setMyOwnAlertContact] = useState( false );

    

    const onEditAlert = () => {
        if (user.id !== creator._id) return;
        editAlert( alert );
        navigate(`/alerts/${_id}/edit`);
    }

    const handleContactClick = useCallback( async () => {

        if (!user) {
            setDisplayAuthModal(true);
            return;
        }

        const sender = user.id;
        const receptor = creator._id;

        if (user && (sender === receptor)) {
            setMyOwnAlertContact(true);
            return;
        }

        try {
            
            const existingChatRoomResponse = await fetch('https://sniffnear-api.onrender.com/api/chats/find', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sender, receptor })
            });
        
            if (existingChatRoomResponse.ok) {
                
                const existingData = await existingChatRoomResponse.json();
                const existingRoomId = existingData._id;
                setChatExist(true)
                navigate(`/inbox/chat/${existingRoomId}`);

            } else {
                    
                const createChatRoomResponse = await fetch('https://sniffnear-api.onrender.com/api/chats/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ participants: [sender, receptor] })
                });
        
                if (createChatRoomResponse.ok) {
                    const data = await createChatRoomResponse.json();
                    const newRoomId = data._id;
                    setChatExist(false)
                    navigate(`/inbox/chat/${newRoomId}`);
                } 
            }
        } catch ( error ) {
            console.error('Error al contactar al usuario:', error);
        }
    }, [user, creator, navigate]);

    useEffect(() => {
        if ( user && redirectToChat ) {
            handleContactClick();
            setRedirectToChat(false);
            setDisplayAuthModal(false);
        }
    }, [user, redirectToChat, handleContactClick ])
    

    const prevStep = () => {
        setDisplayAuthModal(false);
    }

    const onNext = () => {
        setRedirectToChat(true);
    }



    return (
        <div className='alertDetails'>

            {
                preview 
                ? <img src={imgSelected} alt={ `${type} color ${color1} ${ size }`} />
                : <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={ `${type} color ${color1} ${ size }`} />
                
            }
            <div className='data'>
                <div>
                    {
                        preview ? 
                        <p className='status'>Vista previa de la alerta</p>
                        : <p className={`status ${status}`}>Alerta {status === "active" ? "activa" : "finalizada"}</p>
                    }
                    <h2 className='cap'>{`${type} ${alertType}`}</h2>
                    
                    <p>
                        {
                            alertType === 'perdido'
                            ? `Visto por última vez a ${getDistance(coords.lat, coords.lng, latitude, longitude)}, hace ${calculateAge(combineDateAndTime(date, time))}`
                            : `Hace ${calculateAge(combineDateAndTime(date, time))}, a ${getDistance(coords.lat, coords.lng, latitude, longitude)} de tu ubicación`
                        }
                    </p>
                </div>

                {
                    !preview && creator &&
                    <UserCard user={ creator } createdAt={ created } >
                        {
                            (creator._id !== user?.id) &&
                            <button className='btn small' onClick={handleContactClick}>Contactar</button>
                        }
                    </UserCard>

                }

                <ul className='petDataList alert'>
                    { petName && <li>Nombre <span>{petName}</span></li>}
                    { sex && <li>Sexo <span>{sex}</span></li>}
                    <li>Color <span>{color1}</span></li>
                    { (breed && breedType) && <li>{ breedType } <span>{ breed }</span></li>}
                    <li>Tamaño <span>{size}</span></li>
                </ul>

                <p className='desc'>Descripción <span>{description}</span></p>

                <MapSniffNear position={{ lat: latitude, lng: longitude }} displayOnly={true} />



                {
                    !preview &&
                    <div className="actions">
                        {
                            (creator && creator._id === user?.id)
                            ? <>
                                <button className='btn secundary' onClick={onEditAlert}>Editar <i className="bi bi-pencil"></i></button>
                            </>
                            : <>
                                <button className='btn' onClick={handleContactClick}>Contactar</button>
                            </>
                        }
                    </div>
                }
            </div>

            {
                displayAuthModal &&
                <AuthFormModal
                    prevStep={ prevStep }
                    onNextFunction={ onNext }
                />
            }
            {
                myOwnAlertContact &&
                <Modal 
                    type='danger'
                    icon={true}
                    heading='Al parecer esta alerta es tuya'
                    text='No podés contactarte a ti mismo, pero sí podés editarla o eliminarla.'
                >
                    <button className='btn secundary' onClick={() => {setMyOwnAlertContact(false)}}>Cerrar ventana emergente</button>

                    <i className="bi bi-x-lg closeBtn" onClick={() => {setMyOwnAlertContact(false)}}></i>

                </Modal>
            }

        </div>
    )
}
