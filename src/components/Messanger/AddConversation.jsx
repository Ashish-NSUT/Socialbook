import React from 'react'
import { useContext } from 'react';
import messageContext from '../../context/messageContext';



export default function AddConversation(props) {

  const context = useContext(messageContext);


  const {setChats,chats} = context;
  const {userData, setClicked, currentuserID,setNewCon, getMessage} = props;

  const handleClick = async (id) => {
    const chatId = chats.filter(chat => chat.users.includes(id));
    console.log(chatId.length);
    if(chatId.length !== 0) {
        getMessage(chatId[0]._id,userData);
    }
    else {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token" : localStorage.getItem('token')
                },
                body : JSON.stringify({senderId:id,receiverId:currentuserID})
            });
        
            const json = await response.json();
            console.log(json);

            setChats(chats.concat(json));
            setClicked(json._id);
          }
      setNewCon(false);
  }
  
    

  return (
    <div className={`p-3 text-sm text-white flex hover:bg-slate-700`}>

        <img className="w-[40px] h-[40px] rounded-full" src={`${userData.pic}`} alt="" />

        <div className='px-3 pb-4 border-b w-full cursor-pointer my-auto relative' onClick={()=>{handleClick(userData._id)}}>
          <div className="name p-2">{userData.name}</div>
        </div>
        
    </div>
  )
}
