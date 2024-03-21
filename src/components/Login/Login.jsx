import React, {useState,useContext} from 'react'
import wel from '../Assets/welcome1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import messageContext from '../../context/messageContext';

export default function Login() {

  const navigate = useNavigate();


  const context = useContext(messageContext);
  const {CurrentuserDetails} = context;

  const [credentials, setCredentials,] = useState({email:"", password:""})
  const [alert, setAlert] = useState(false);
  const [view, setView] = useState(true);

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password}),
    })

    const json = await response.json();

    if(json.success) {
      localStorage.setItem("token",json.authToken);
      CurrentuserDetails();
      navigate("/");
    }
    else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }


  return (
    <div className="flex overflow-hidden h-[100vh] ">
      <div className="hidden lg:block w-[65%] h-full bg-cover ">
        <img src={wel} alt="nothing here" className="h-full"></img>
      </div>

      <div className="w-full lg:w-[35%] border-1 flex justify-center items-center flex-col bg-zinc-100">

        <div className="text-3xl font-bold mb-6">Login to continue</div>

        <form className="max-w-[500px] w-full p-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg" onSubmit={submit}>
          <div className={`mx-auto w-full text-center mb-4 ${alert ? "" : "hidden"} text-red-500`}>
            **Enter correct details**
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mx-auto">Your email</label>
            <input type="email" id="email" name="email" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required onChange={onChange} />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Enter password</label>
            <input name='password' type={`${view ? "password" : "text"}`} id="password" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required onChange={onChange}/>
            <i className={`fa-regular fa-eye${view ?"" :"-slash"} absolute inset-y-10 right-3 flex items-center text-gray-300`} onClick={()=>{setView(!view)}}></i>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-black focus:ring-3 focus:ring-blue-30"/>
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
          </div>
          <div className="flex items-center gap-2">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
              <div>or</div>
            <Link to="/signup" className="text-md underline text-gray-500 hover:text-blue-600 opacity-90">SignUp here</Link>
          </div>          
        </form>


      </div>

    </div>
  )
}
