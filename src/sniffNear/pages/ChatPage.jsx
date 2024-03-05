import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/context';
import { BottomNav, NavBar } from '../components';
import { io } from 'socket.io-client';
const socket = io('https://sniffnear-api.onrender.com/');

export const ChatPage = () => {

  const [isConnected, setIsConnected]=useState();
  const [messages, setMessages]=useState([]);
  const [newMessage, setNewMessage]= useState('');
  const [msgHistory , setMsgHistory] = useState([])
  
  const { user } = useContext( AuthContext ); 
  const sender = user.id;
  const {roomId} = useParams();
 
  const [receptor, setReceptor ] = useState('');
  const [imgReceptor, setImgReceptor] = useState('')

  useEffect(()=>{
   
      socket.on("connect",()=>setIsConnected(true));
  
      socket.emit('joinRoom', roomId);

      socket.on('sendMessage',(data)=>{
          
          setMessages(messages=>[...messages, data]);
      })
      
      return ()=>{
          socket.off("connect");
          socket.off('sendMessage');
      }

  },[roomId])


  useEffect(()=>{
      const getHistorial = async ()=>{
          try{
              const response = await fetch(
              `  https://sniffnear-api.onrender.com/api/chats/${roomId}/messages`
              );
              if(response.ok){
                  const data = await response.json()
                  setMsgHistory(data)
              }
          }catch (error){
              console.log('Error al obtener el historial de mensajes', error)
          }
      }
      getHistorial()
  },[roomId])

  useEffect(()=>{
      const getName = async () =>{
       
          try {
              const response = await fetch(
                  `https://sniffnear-api.onrender.com/api/chats/room/${roomId}`
              );
              if(response.ok){
                  const data = await response.json();
                  if(data.participants && data.participants.length >0) {

                      const receptor = data.participants.find(participantId => participantId !== sender);

                      const userResponse = await fetch(
                          `https://sniffnear-api.onrender.com/api/users/${receptor}`
                      )

                      if(userResponse.ok){
                          const userData = await userResponse.json();
                          const receptorName = userData.user.name;
                          const imgRec = userData.user.profileImg;
                          setReceptor(receptorName);
                          setImgReceptor(imgRec);
                      }

                  } else {
                      console.log('La sala de chat no tiene participantes.');
                  }
              } else {
                  console.error('Error al obtener los detalles de la sala de chat');
              }
          } catch (error) {
              console.error('Error al obtener el nombre del receptor:', error);
          }
      };

      if (roomId) {
          getName();
      }

  }, [roomId, sender]);

  const handleSendMessage = async (e)=>{
      e.preventDefault();
      socket.emit('sendMessage',{
          roomId: roomId , 
          sender:sender, 
          text:newMessage
      })
      setNewMessage('');
  };
  return (
    <>
      <NavBar title={'Chat'} />
      <div className='chat-container'>
        <div className='imgAvatarChat'>
          {imgReceptor ? (
            <img 
            src={imgReceptor} 
            alt={receptor}
            /> 
          ) : (
            <img 
              src="/img/defaultAvatar.png" 
              alt="Imagen por defecto"
            /> 
          )}
          <h1>{receptor}</h1> 
        </div>
        <div className='messages'>
          {msgHistory.length > 0 && (
            <> 
            {msgHistory.map((mensaje, index) => (
              <div key={index}  className={` message-card ${mensaje.sender === sender ? "msg-sent" : "msg-received"}`}>
                <p className='message-text'>{mensaje.text}</p>
              </div>
            ))}
            </>   
          )}
          {messages.map((mensaje, index) => (
            <div key={index}  className={`message-card ${mensaje.sender === sender ? "msg-sent" : "msg-received"}`}>
              <p className='message-text'>{mensaje.text}</p>
            </div>
          ))}
        </div> 
        <form className='chat-form'onSubmit={handleSendMessage}>
          <input 
            type='text' 
            className='inputMsg' 
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder='Escribe tu mensaje...'/><br/>
            <button type='submit' className='btnSend'> Enviar </button>
        </form> 
      </div>  
    </>
   
  )
}
