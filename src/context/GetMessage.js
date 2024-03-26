import { useState } from "react";
import messageContext from "./messageContext";

const ConversationState = (props) => {
  const host = process.env.REACT_APP_BASE_URL;

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [otheruser, setOtheruser] = useState([]);
  const [currentuser, setCurrentuser] = useState({});
  const [clickedUser, setClickedUser] = useState();
  const [deletePrompt, setDeletePrompt] = useState(null);

  // Get current user details

  const CurrentuserDetails = async () => {
    console.log(host);

    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log(json);
      localStorage.setItem("currentuser", JSON.stringify(json));

      setCurrentuser(json);
    } catch (error) {
      console.log("error while fetching current user", error);
    }
  };

  //Fetch other user details
  const fetchusers = async (id) => {
    const response = await fetch(`${host}/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);

    setOtheruser(json);
    return json;
  };

  //Fetch conversations
  const fetchConversation = async () => {
    const response = await fetch(`${host}/api/chat/getchats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);

    setChats(json);
  };

  //Fetch messages
  const fetchMessages = async (id) => {
    const response = await fetch(`${host}/api/message/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);

    setMessages(json);
  };

  // send message

  const createMessage = async (message) => {
    const response = await fetch(`${host}/api/message/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(message),
    });

    const json = await response.json();
    console.log(json);

    setMessages(messages.concat(json));
  };



  const CreateConversation = async (id,currentuserID) => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/chat`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body : JSON.stringify({senderId:id,receiverId:currentuserID})
        });
    
        const json = await response.json();
        console.log(json);
  
        return json;
    }catch(err){
      console.log("error while creating chat", err);
    }
  }

  const deleteMessage = async (id) => {
    const response = await fetch(
      `${host}/api/message/deleteMessage/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    console.log(json);

    const newMessages = messages.filter((message) => {
      return message._id !== id;
    });
    setMessages(newMessages);
  };

  return (
    <messageContext.Provider
      value={{
        messages,
        chats,
        setChats,
        otheruser,
        currentuser,
        clickedUser,
        deletePrompt,
        setDeletePrompt,
        setClickedUser,
        fetchMessages,
        fetchConversation,
        fetchusers,
        createMessage,
        CurrentuserDetails,
        CreateConversation,
        setMessages,
        deleteMessage,
      }}
    >
      {props.children}
    </messageContext.Provider>
  );
};

export default ConversationState;
