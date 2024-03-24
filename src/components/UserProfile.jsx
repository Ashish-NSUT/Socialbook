import React from 'react'
import wel from '../components/Assets/welcome1.jpg'
import profile from "../components/Assets/PHOTO.jpeg"
import messageContext from '../context/messageContext';
import { useState,useEffect,useContext } from 'react'

export default function UserProfile(props) {

  
  const [friend, setFriend] = useState(false);
  const [clickedUserProfile, setClickedUserProfile] = useState("");
  const context = useContext(messageContext);
  const {CurrentuserDetails,currentuser,fetchusers,clickedUser} = context;

  useEffect(() => {
    const fetchprofile = async () => {
      
      const response = await fetchusers(clickedUser);
      setClickedUserProfile(response);
    }

    fetchprofile();
   const loggedinuser = JSON.parse(localStorage.getItem("currentuser"));

    if(loggedinuser.Friends.includes(clickedUser)) {
      setFriend(true);
    }

  }, [clickedUser])
  

  const addFriend = async (id) => {
    if(friend) {
      console.log("cant click");
      return ;
    }
    setFriend(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile/addFriend/${clickedUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      });

      const json = await response.json();
      console.log(json);
    }

  return (
    <div className="flex max-w-[1200px] mx-auto justify-between mt-4">
    <div className='w-[75%] rounded-lg'>
          <img src={wel} alt="" className='h-[25vh] w-full rounded-lg'/>

          <img src={clickedUserProfile.pic} alt="" className='h-[24vh] w-[24vh] rounded-full mt-[-18vh] ml-5 border-[5px] border-white inline'/>

          <div className='px-5'>
            <div className='text-3xl'>{clickedUserProfile?.name}</div>
          </div>

          <div className='flex gap-10 p-1'>

            <button className='bg-black text-white py-3 px-6 rounded-xl text-sm shadow-md hover:scale-[101%] flex gap-2 items-center' onClick={addFriend}>
            <i className={`fa-solid fa-user-${friend ? "minus" : "plus"} text-[12px] mb-1`}></i><div>{friend ? "Remove" : "Add"} Friend</div>
            </button>

            <button className='flex py-3 px-10 border rounded-xl text-sm shadow-md hover:scale-[101%] items-center gap-1'>
              <div>Follow</div> <i className="fa-solid fa-plus text-sm"></i>
            </button>
          </div>

    </div>
    <div className='w-[24%] bg-black'>
        <img src="" alt="" className='h-[20vh]'/>

    </div>
    </div>
  )
}
