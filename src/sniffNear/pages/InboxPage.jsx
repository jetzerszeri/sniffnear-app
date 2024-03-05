import React, {useContext, useState, useEffect} from 'react';
import { BottomNav, NavBar } from '../components';
import { AuthContext } from '../../auth/context';
import { Link } from 'react-router-dom';
export const InboxPage = () => {
  //logica del inbox
  const { user } = useContext( AuthContext );
  const [chats, setChats] = useState([]);
  const [senders, setsenders] = useState({});
  const userId= user.id;

  useEffect(()=>{
    const getUserChatsRooms = async () => {
      try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/chats/user/${userId}`);

          if (response.ok) {

            const data = await response.json();
            setChats(data);

          } else {

            console.error('Error al obtener los chats');
          }

          } catch (error) {

            console.error('Error al obtener los chats:', error);

          }
      };

    getUserChatsRooms();

  }, [userId]);
  
  const updatesendersInfo = async (chats, userId) => {
    const newsenders = {};

    for (const chat of chats) {

        const sendersId = chat.participants.find(participant => participant !== userId);

        if (sendersId) {
          try {

            const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${sendersId}`);

            if (response.ok) {

              const userData = await response.json();
             
              newsenders[chat._id] = {
                name: userData.user.name,
                profileImg: userData.user.profileImg || '/img/defaultAvatar.png',
              };
            } else {
              console.error(`Error al obtener el usuario senders: ${response.status}`);
              newsenders[chat._id] = {
                name: 'Nombre no disponible',
                profileImg: '/default-avatar.png'
              };
            }
          } catch (error) {

            console.error('Error al traer el usuario senders:', error);

          }
        }
    }

    return newsenders;

  };

  useEffect(() => {
    const fetchsendersInfo = async () => {
      try {

        const updatedsendersInfo = await updatesendersInfo(chats, userId);
        setsenders(updatedsendersInfo);

      } catch (error) {

        console.error('Error al actualizar los nombres de los remitentes:', error);
      }
    };

    fetchsendersInfo();

  }, [chats, userId]);


return (
  <>
    <NavBar title='Bandeja de entrada'/>
    <main>
      <div>
      <ul className='message-list'>
          {chats.map(chat => (
            <Link to={`/inbox/chat/${chat._id}`} key={chat._id} className="message-link" >
              <li className='inbox-card'>
                <div className='inbox-content'>
                    <div className='img-container-chat'>
                      {senders[chat._id] && senders[chat._id].profileImg && (
                                        <img
                                          src={senders[chat._id].profileImg}
                                          alt="Profile"
                                          className="profile-image"
                                        />
                    )}
                    </div>
                   <div className='username-container'>
                     {senders[chat._id] && (
                        <p className='message-username'>{senders[chat._id].name}</p>
                    )}
                   </div>
                 
                    <i className="bi bi-chat"/>
                  </div>
                </li>
              </Link>
          ))}
      </ul>
      </div>
    </main>
    <BottomNav/>
  </>
  )
}
