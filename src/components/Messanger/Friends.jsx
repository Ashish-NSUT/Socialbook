import React from 'react'
import { useEffect,useState,useContext } from 'react';
import messageContext from '../../context/messageContext';



export default function Friends(props) {

  const context = useContext(messageContext);


  const {fetchusers} = context;
  const {userData, getMessages, clicked, currentuserID,arrivalMessage} = props;
  const [chat, setChat] = useState("");
  const [notify, setNotify] = useState(false);


  // fetching details of Friend 
  useEffect(() => {

    const friendID = userData.users?.find(m=> m !== currentuserID) || userData._id;

    const func = async () => {
      const temp = await fetchusers(friendID);
      setChat(temp)
    }
    func();
    // eslint-disable-next-line
  }, [])


// for checking if any message comes for notification
  useEffect(() => {
    if(arrivalMessage && (clicked !== userData._id) && (arrivalMessage?.sender === chat._id)) {
      setNotify(true);
    }
    else if(clicked === userData._id) setNotify(false);

  }, [clicked,chat,arrivalMessage])

  
    

  return (
    <div className={`p-3 text-sm text-white flex ${clicked === userData._id ? "bg-slate-700": ""} hover:bg-slate-700`}>

        <img className="w-[40px] h-[40px] rounded-full" src={`${chat.pic}`} alt="" />

        <div className='px-3 pb-4 border-b w-full cursor-pointer my-auto relative' onClick={()=>{getMessages(userData._id, chat)}}>
          <div className="name ">{chat.name}</div>
          <div className="text-[12px] opacity-70"> {userData.lastMessage} </div>
        <div className={`${notify === true ? "" : "hidden"} absolute right-[5%] top-[20%] bg-slate-600 p-1 px-3 rounded-full font-bold`}>1</div>
        </div>
        
    </div>
  )
}
