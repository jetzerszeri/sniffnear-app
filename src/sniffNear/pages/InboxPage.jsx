import React, {useContext, useState, useEffect} from 'react';
import { BottomNav, NavBar } from '../components';
import { AuthContext } from '../../auth/context';
import { Link } from 'react-router-dom';
export const InboxPage = () => {
  //logica del inbox
  const { user } = useContext( AuthContext );
  const [chats, setChats] = useState([]);
  const [sender, setSender] = useState({});
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
  
  const updateSenderNames = async (chats, userId) => {
    const newSenders = {};

    for (const chat of chats) {

        const senderId = chat.participants.find(participant => participant !== userId);

        if (senderId) {
          try {

            const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${senderId}`);

            if (response.ok) {

              const data = await response.json();
              console.log(data)
              newSenders[chat._id] = data.user.name;
 
            } else {

              console.error(`Error al obtener el usuario sender: ${response.status}`);
              newSenders[chat._id] = 'Nombre no disponible';

            }
          } catch (error) {

              console.error('Error al traer el usuario sender:', error);
              newSenders[chat._id] = 'Nombre no disponible';

          }
        }
    }

    return newSenders;

  };

  useEffect(() => {
    const fetchSenderNames = async () => {
      try {

        const updatedSenderNames = await updateSenderNames(chats, userId);
        setSender(updatedSenderNames);

      } catch (error) {

        console.error('Error al actualizar los nombres de los remitentes:', error);
      }
    };

    fetchSenderNames();

  }, [chats, userId]);


return (
  <>
    <NavBar title='Bandeja de entrada'/>
    <main>
      <h1 className='conversation'>Tus conversaciones</h1>
      <div>
      <ul className='message-list'>
                {chats.map(chat => (
                    
                    <Link to={`/inbox/chat/${chat._id}`} key={chat._id} className="message-link" >
                        <li className='inbox-card'>
                            <div className='inbox-content'>
                                <p className='message-username'>{sender[chat._id]}</p>
                                <i className="bi bi-chat"></i>
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
