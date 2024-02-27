import React, {useState,useContext} from 'react'
import wel from '../Assets/welcome1.jpg'
import { Link ,useNavigate} from 'react-router-dom';
import messageContext from '../../context/messageContext';


export default function Login() {
  const navigate = useNavigate();


  const context = useContext(messageContext);
  const {CurrentuserDetails} = context;

  const [credentials, setCredentials,] = useState({name:"", email:"", password:"", confirmPass:"", pic:""})
  const [view, setView,] = useState(true);
  const [alert, setAlert,] = useState(false);
  const [confView, setConfView,] = useState(true);

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const submit = async (e) => {
    e.preventDefault();

    if(credentials.password !== credentials.confirmPass) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return;
    }
    console.log("hi");

    const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
    })

    const json = await response.json();

    if(json.success) {
      localStorage.setItem("token",json.authToken);
      CurrentuserDetails();
      navigate("/");
    }
    else {
      
    }
  }


  return (
    <div className="flex overflow-hidden h-[100vh] ">
      <div className="hidden lg:block w-[65%] h-full bg-cover ">
        <img src={wel} alt="nothing here" className="h-full"></img>
      </div>

      <div className="w-full lg:w-[35%] border-1 flex justify-center items-center flex-col bg-zinc-100">

        <div className="text-3xl font-bold mb-6">Sign up</div>

        <form className="max-w-[500px] w-full p-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg" onSubmit={submit}>
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 mx-auto">Enter name</label>
            <input type="text" id="name" name='name' className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter name.." required onChange={onChange}/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mx-auto">Enter email</label>
            <input type="email" id="email" name='email' className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required onChange={onChange}/>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Create password</label>
            <input name='password' type={`${view ? "password" : "text"}`} id="password" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required onChange={onChange}/>
            <i className={`fa-regular fa-eye${view ?"" :"-slash"} absolute inset-y-10 right-3 flex items-center text-gray-300`} onClick={()=>{setView(!view)}}></i>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
            <input name='confirmPass' type={`${confView ? "password" : "text"}`} id="confpassword" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required onChange={onChange}/>
            <i className={`fa-regular fa-eye${confView ?"" :"-slash"} absolute inset-y-10 right-3 flex items-center text-gray-300`} onClick={()=>{setConfView(!confView)}}></i>
          </div>

          <div className={`text-center text-red-500 -mt-3 mb-4 ${alert ? "" : " hidden"}`}>
            **Passwords doesn't match**
          </div>

          <div className="mb-4 relative">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Upload Profile Picture</label>
            <input name='pic' type="file" id="image" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={onChange}/>
          </div>
          
          <div className="flex items-center gap-2">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create id</button>
              <div>or</div>
            <Link to="/login" className="text-md underline text-gray-500 hover:text-blue-600 opacity-90">Login here</Link>
          </div>      
        </form>


      </div>

    </div>
  )
}
