import { useState } from "react";
import messageContext from "./messageContext";

const ConversationState = (props)=>{

    const host = process.env.REACT_APP_BASE_URL;

    const [messages, setMessages ] = useState([]);
    const [chats, setChats ] = useState([]);
    const [otheruser, setOtheruser ] = useState([]);
    const [currentuser, setCurrentuser ] = useState({});
    const [clickedUser, setClickedUser ] = useState();
    const [deletePrompt, setDeletePrompt ] = useState(null);


  // Get current user details

    const CurrentuserDetails = async ()=>{

      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token" : localStorage.getItem('token')
        }
      });

      const json = await response.json();
      console.log(json);

      setCurrentuser(json);
    }

    //Fetch other user details
    const fetchusers = async (id)=>{

      const response = await fetch(`${host}/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const json = await response.json();
      console.log(json);

      setOtheruser(json);
      return json;
    }


     //Fetch conversations
     const fetchConversation = async ()=>{

      const response = await fetch(`${host}/api/chat/getchats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      });

      const json = await response.json();
      console.log(json);

      setChats(json);
    }


      //Fetch messages
      const fetchMessages = async (id)=>{

        const response = await fetch(`${host}/api/message/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        });

        const json = await response.json();
        console.log(json);

        setMessages(json);
      }

      // send message
      
      const createMessage = async (message) => {
        const response = await fetch(`${host}/api/message/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify(message),
        });

        const json = await response.json();
        console.log(json);


        setMessages(messages.concat(json));
      }


      const deleteMessage = async (id) => {
        const response = await fetch(`http://localhost:5000/api/message/deleteMessage/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        });
    
        const json = await response.json();
        console.log(json);
    
        const newMessages = messages.filter((message) => {return (message._id !== id)});
        setMessages(newMessages);
    
      }
      
      

      


    return (
        <messageContext.Provider value={{messages,chats,setChats,otheruser,currentuser,clickedUser,deletePrompt, setDeletePrompt, setClickedUser,fetchMessages,fetchConversation,fetchusers,createMessage, CurrentuserDetails,setMessages, deleteMessage}}>
            {props.children}
        </messageContext.Provider>
    )
}

export default ConversationState;