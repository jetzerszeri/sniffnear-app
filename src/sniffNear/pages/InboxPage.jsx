import React, {useContext, useState, useEffect} from 'react';
import { BottomNav, NavBar } from '../components';
import { AuthContext } from '../../auth/context';
import { Link, useNavigate } from 'react-router-dom';
export const InboxPage = () => {
  //logica del inbox
  const { user } = useContext( AuthContext );
  const [chats, setChats] = useState([]);
  const [senders, setsenders] = useState({});
  const userId= user.id;
  const [lastMessages, setLastMessages] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    const getUserChatsRooms = async () => {
      try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/chats/user/${userId}`);

          if (response.ok) {

            const data = await response.json();
            setChats(data);
            const messagePromise=[];

            for (let chat of data) {
              const roomId  = chat._id;
              const messageResponse = await fetch (
                ` https://sniffnear-api.onrender.com/api/chats/${roomId}/messages`
              );
              if(messageResponse.ok){
                const messageData = await messageResponse.json();
                if (messageData.length > 0) {
                  const lastMessage = messageData[messageData.length -1];
                  messagePromise.push(lastMessage)
                  }
              }else{
                console.error('Error al obtener los mensajes de la sala')
              }
              const lastMessages = await Promise.all(messagePromise);
              setLastMessages(lastMessages);
            }
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
                profileImg: userData.user.profileImg || "/img/avatarPorDefecto.webp",
              };
            } else {
              console.error(`Error al obtener el usuario senders: ${response.status}`);
              newsenders[chat._id] = {
                name: 'Nombre no disponible',
                profileImg: "/img/avatarPorDefecto.webp"
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

  const onChatClick = (chatId) => {
    navigate(`/inbox/chat/${chatId}`);
  }


return (
  <>
    <NavBar title='Bandeja de entrada'/>
    <main>
      <div>
      <ul className='message-list'>
          {chats.map(chat => (

              <li className='inbox-card' onClick={() => {onChatClick(chat._id)}} key={chat._id} >
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
                   
                   <div className='container-message'>
                        {senders[chat._id] && (
                            <p>{senders[chat._id].name}</p>
                        )}

                        
                        {lastMessages.find(
                            (message) => message.chatRoom === chat._id
                          ) && (
                          <p className="last-message">
                            {
                              ( lastMessages.find(
                                (message) => message.chatRoom === chat._id
                              ).sender === userId ) && <i className="bi bi-check2-all"> </i> 
                            }
                            
                            {lastMessages.find(
                              (message) => message.chatRoom === chat._id
                            ).text}

                          </p>
                        )}
                   </div>
                 
                    <i className="bi bi-chat"/>
                </div>
              </li>

          ))}
      </ul>
      </div>
    </main>
    <BottomNav/>
  </>
  )
}
