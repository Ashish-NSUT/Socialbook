import { Link, useLocation } from 'react-router-dom';
import SearchFriends from '../Messanger/SearchFriends';



export default function Navbar(props) {

    let location = useLocation();


    return (
        <>
            <nav className={`flex w-full gap-10 justify-evenly bg-black m-0 p-0 ${location.pathname === '/login' || location.pathname  === '/chatting' || location.pathname === '/signup'? "hidden" : ""} sticky top-0`}>
                
                {/* search  */}
                <SearchFriends/>


                <div className="icons flex gap-10 text-lg leading-3 item-center text-white transition-all origin-left">
                    <Link className={`p-5 cursor-pointer duration-700 ${location.pathname === '/' ? "bg-white rounded-t-xl text-black" : "hover:text-gray-300"}`} to="/">
                        <i className="fa-solid fa-house pt-1 cursor-pointer" id='home'></i>
                    </Link>
                    <Link className={`p-5 cursor-pointer duration-700 ${location.pathname === '/search' ? "bg-white rounded-t-xl text-black" : "hover:text-gray-300"}`} to="/search">
                    <i className="fa-solid fa-user-plus pt-1 cursor-pointer "></i>
                    </Link>
                    <Link className={`p-5 cursor-pointer duration-700 ${location.pathname === '/videos' ? "bg-white rounded-t-xl text-black" : "hover:text-gray-300"}`} to='/videos'>
                        <i className="fa-brands fa-youtube pt-1 cursor-pointer " id='videos'></i>
                    </Link>
                    <Link className={`p-5 cursor-pointer duration-700 ${location.pathname === '/notifications' ? "bg-white rounded-t-xl text-black" : "hover:text-gray-300"}`} to="/notifications">
                        <i className="fa-solid fa-envelope pt-1 cursor-pointer " id='notifications'></i>
                    </Link>
                    <Link className={`p-5 cursor-pointer duration-700 ${location.pathname === '/setting'? "bg-white rounded-t-xl text-black" : "hover:text-gray-300"}`} to="/setting">
                        <i className="fa-solid fa-bars pt-1 cursor-pointer " id='setting'></i>
                    </Link>
                </div>

                <button className='p-3 cursor-pointer text-white hover:text-gray-300' onClick={props.handleClick}>
                    <i className="fa-solid fa-user text-lg p-2 border-2 border-white rounded-full cursor-pointer" id='user'></i>
                </button>
            </nav>

        </>
    )
}
