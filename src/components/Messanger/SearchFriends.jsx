import React, { useEffect ,useContext} from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import messageContext from '../../context/messageContext';


export default function SearchFriends() {

    const navigate = useNavigate();
    const context = useContext(messageContext);
    const {setClickedUser} = context;

    const [search,setSearch] = useState("");
    const [users,setUsers] = useState([]);


    useEffect(() => {
        const findUsers = async () => {
            console.log(search);
            const response = await fetch(`http://localhost:5000/api/profile?search=${search}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token" : localStorage.getItem('token')
                }
              });
        
              const json = await response.json();
              console.log(json);
        
              setUsers(json);
        }
        if(search) findUsers();

    }, [search])

    const GoToProfile = (id) =>{
        setClickedUser(id);
        setSearch("");
        navigate("/profile");
    }
    


  return (
   <> 
        <div className="hidden w-[30%] pt-2 md:block relative">
            <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-white" ></i>
                </div>
                <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <button type="submit" className="text-black absolute right-1.5 bottom-1 bg-white hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2">Search</button>
            </div>


            <div className={`bg-gray-300 p-3 absolute w-full rounded-lg clip-style ${search ? "" : "hidden"}`}>
                    {users.map((user)=>{
                        return (
                            <div key={user._id} className='p-3 flex gap-2 items-center border-b cursor-pointer' onClick={()=>GoToProfile(user._id)}>
                                <img src={user.pic} alt="" className='h-[30px] w-[30px] rounded-full'/>
                                <div>{user.name}</div>
                            </div>
                        )
                    })}
                    <div>.......</div>
                </div>
            </div>


        </>


  )
}
