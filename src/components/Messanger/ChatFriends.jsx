import React, { useEffect, useState } from 'react'
import Friends from './Friends'
import { Link } from 'react-router-dom'
import AddConversation from './AddConversation';
import Loading from './Loading';


export default function ChatFriends(props) {

    const {setOtherUser,currentuser,chats,arrivalMessage,clicked, setClicked ,getMessage , search, setSearch, loading} = props;
    const [friends,setFriends] = useState([]);
    const [newCon,setNewCon] = useState(false);
    const [filteredFriends,setFilteredFriends] = useState([]);


    const fetchFriends = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/chat/getFriends`, {
            method: "GET",
            headers: {
              "auth-token" : localStorage.getItem('token')
            }
          });
    
          const json = await response.json();
          console.log(json);
    
          setFriends(json);
          setFilteredFriends(json);
          setNewCon(true);
    }


    useEffect(() => {
        setFilteredFriends(friends.filter(friend => friend.name.toLowerCase().includes(search)));
      }, [friends,search])


  return (
    <div className="nameList w-[30%] bg-[#1c2e46] h-full relative">


{/* Your Name and profile information */}

        <div className="py-2 bg-[#20344f] shadow-lg flex items-center justify-between">

        {/* back button */}
        {newCon 
        ? <>
            <i className="fa-solid fa-arrow-left text-white text-xl cursor-pointer mx-2" onClick={()=>setNewCon(false)}></i>
            <div className="mx-auto text-white ease-in">Add new Chat</div> 
        </>
        : <>
            <Link to="/" onClick={()=>{setOtherUser(null)}}><i className="fa-solid fa-arrow-left text-white text-xl cursor-pointer mx-2"></i></Link>
            <img className="w-[40px] h-[40px] rounded-full mr-6" src={currentuser.pic} alt="" />
          </>}

        </div>

            {/* searchbar */}
            <div className="p-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-white" ></i>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search to chat..." required onChange={(e)=>{setSearch(e.target.value.toLowerCase());}} />
                    <button type="submit" className="text-black absolute right-1.5 bottom-1 bg-white hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2">Search</button>
                </div>
            </div>

        {/* ADD new conversation */}
        <div className={`absolute bottom-12 right-7 shadow-xl rounded-full bg-slate-600 text-gray-300 p-[19px] py-[17px] z-10`}>
        {newCon 
        ? <div className="cursor-pointer" onClick={()=>setNewCon(false)}>cancel</div> 
        : <i className="fa-solid fa-comment text-3xl relative cursor-pointer" onClick={fetchFriends}>
            <i className="fa-solid fa-plus text-lg absolute top-[18%] left-[24%] text-[#20344f]"></i>
            </i>}
        </div>


        {/* fetching conversations */}

            <div className='overflow-y-auto h-[83vh] scrollbar'>
            
            {loading && <><Loading/><Loading/><Loading/></> }
            
            {newCon && filteredFriends.map((friend) => {
                return <AddConversation  key={friend._id} userData={friend} getMessage={getMessage} setClicked={setClicked} currentuserID={currentuser._id} setNewCon={setNewCon} />;
            })}
            
            {!loading && !newCon && chats.map((user) => {
                return <Friends  key={user._id} userData={user} getMessages={getMessage} clicked={clicked} currentuserID={currentuser._id} arrivalMessage={arrivalMessage} />;
            })}
            </div>

    </div>
  )
}
