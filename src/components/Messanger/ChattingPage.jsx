import React, { useContext, useEffect, useState, useRef } from 'react'
import messageContext from '../../context/messageContext';
import Messages from './Messages';
import ChatFriends from './ChatFriends';
import { io } from "socket.io-client";
import MessageLoading from './MessageLoading';
import DeletePrompt from './DeletePrompt';
import Typing from './Typing';



export default function ChattingPage() {

  const context = useContext(messageContext);

  const { chats, setChats, messages, CreateConversation, fetchConversation, fetchMessages, currentuser, createMessage, CurrentuserDetails, setMessages } = context;
  const [otherUser, setOtherUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);
  const scroll = useRef(null);
  const socket = useRef();
  const input = useRef();



  // to fetch conversation/chats with users
  useEffect(() => {

    const users = async () => {
      setLoading(true);
      await CurrentuserDetails();
      await fetchConversation();
      setLoading(false);
    }

    users();

    // eslint-disable-next-line
  }, [])


  // websocket formation and recieving message 
  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_BASE_URL}`);

    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })
    // eslint-disable-next-line
  }, [])


  // updating the messages when a new message arrives
  useEffect(() => {
    if (otherUser && arrivalMessage && (otherUser._id === arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
    else if(arrivalMessage) {
      fetchConversation();
    }

  }, [arrivalMessage, otherUser, setMessages])



  // showing online i.e. connecting to the server
  useEffect(() => {
    if (currentuser !== null) socket.current.emit("addUser", currentuser._id);

    socket.current.on("getusers", users => {
      setOnlineUsers(users);
    })

  }, [currentuser])



  // to scroll to the latest message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages])



  //  Fetch all the messages of the selected chat
  const getMessage = async (id, chat) => {
    setMessageLoading(true);
    setOtherUser(chat);
    await fetchMessages(id);
    setMessageLoading(false);
    setClicked(id);
    if (arrivalMessage?.sender === chat._id) setArrivalMessage([]);
  }


  // send message
  const sendMessage = (e) => {
    e.preventDefault();

    if (input.current.value !== "") {
      //sending socket io message
      socket.current.emit("sendMessage", {
        senderId: currentuser._id,
        recipientId: otherUser._id,
        message: newMessage
      })

      const messageBody = {
        sender: currentuser._id,
        message: newMessage,
        chatModel: clicked
      }

      createMessage(messageBody);
    }
    setNewMessage(null);
    input.current.value = "";
  }




  return (
    <>
      <div className="h-[100vh] flex">

        {/* Name list     */}

        {currentuser && <ChatFriends currentuser={currentuser} setOtherUser={setOtherUser} chats={chats} arrivalMessage={arrivalMessage}
          clicked={clicked} setClicked={setClicked} getMessage={getMessage} search={search} setSearch={setSearch} loading={loading} />}


        {/* chat area   */}
        <div className={`bg-gray-200 h-full ${clicked ? 'flex w-full' : "hidden"} sm:w-[70%] relative sm:flex flex-col-reverse`}>

          {otherUser && <div className={`name w-full shadow h-16 absolute top-0 bg-gray-200 flex items-center gap-2 px-4 ${otherUser !== null ? "" : "hidden"}`}>
            <div className={`sm:hidden ${clicked ? 'block' : "hidden"} flex items-center`} onClick={() => { setClicked(null) }}>
              <i className="fa-solid fa-chevron-left text-black text-xl cursor-pointer "></i>
            </div>
            <img className="w-[40px] h-[40px] rounded-full" src={otherUser.pic} alt="" />

            <div className="px-2">
              <div>{otherUser.name}</div>
              <div className="text-[12px] flex items-center gap-1">
                <div className={`h-2 w-2 ${onlineUsers.find(x => x.userId === otherUser._id) ? "bg-green-500" : "hidden"} rounded-full`}> </div>
                {onlineUsers.find(x => x.userId === otherUser._id) ? "Online" : "Inactive"}
              </div>
            </div>
          </div>}


          {/* messsages  */}

          <div className='flex flex-col mb-16 p-5 gap-2 overflow-auto mt-16 scrollbar h-full'> 
          

            {!otherUser && <div className='flex flex-col absolute top-[30%] left-[30%]'>
              <i className="fa-brands fa-rocketchat text-[20vw] text-gray-400"></i>
              <div className="text-gray-400 text-[1.8vw] font-bold mx-auto"> Open new conversation</div>
            </div>}


            {messageLoading && <MessageLoading />}

            {!messageLoading && otherUser && messages.map((message) => {
              return (<div key={message._id} ref={scroll}>
                <Messages owner={currentuser._id !== message.sender} message={message} />
              </div>)

            })}

            {
              otherUser && (
                <Typing senderId={currentuser._id} socket={socket} input={input} recipientId={otherUser}/>
              )
            }

          </div>



          {/* sending area */}

          {otherUser && <form className="w-full shadow-[0_3px_10px_rgba(0,0,0,0.3)] absolute bottom-0 p-2 flex 
          justify-between items-center gap-5" onSubmit={sendMessage}  >

            <i className="fa-solid fa-face-smile text-2xl hover:scale-110 ml-2"></i>

            <input ref={input} type="text" id="messageInput" placeholder="Enter message..." onChange={(e) => { setNewMessage(e.target.value) }} className="px-6 p-3 rounded-full w-full bg-gray-400 text-black placeholder-white shadow-inner focus:outline-none focus:placeholder-opacity-0" />

            <i className="fa-solid fa-paperclip text-2xl hover:scale-110"></i>

            <button type="submit" className="bg-[#1c2e46] rounded-full py-[10px] px-3 hover:scale-110">
              <i className="fa-solid fa-paper-plane text-center text-white text-xl"></i>
            </button>
          </form>}
        </div>
      </div>


      {/* Delete Prompt */}
      <DeletePrompt />

    </>
  )
}
