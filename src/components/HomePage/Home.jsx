import React, {useEffect,useContext} from 'react'
import Posts from '../Posts/Posts'
import { useNavigate } from 'react-router-dom';
import messageContext from '../../context/messageContext';


export default function Home() {

  const navigate = useNavigate();
  const context = useContext(messageContext);
  const {CurrentuserDetails} = context;

  useEffect(() => {
    if(localStorage.getItem("token")) {
      CurrentuserDetails();
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='flex items-center flex-col bg-gray-200 gap-4'>

      <Posts/>
      
      

    </div>
  )
}
