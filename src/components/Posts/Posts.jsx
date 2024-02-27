import React  ,{ useState}from 'react'
import wel from '../Assets/welcome1.jpg'
import profile from '../Assets/profile.webp'


export default function HomeItems() {
    const [clicked, setClicked] = useState("regular");

  const click = () => {

    if(clicked === "regular") {
      setClicked("solid");
      document.getElementById("like").style.color = "red"; 
    }
    else {
      setClicked("regular");
      document.getElementById("like").style.color = "black";
    }
  }
  return (
    <div>
        <div className="max-w-[720px] bg-white border border-gray-200 shadow p-3 mt-3 rounded-md">
        <div className='flex py-4 gap-3 px-3 items-center'>
          <img src={profile} alt="" className="h-[50px] w-[50px] rounded-full"/>
          <div>
            <div>Name</div>
            <div className="text-[12px]">1d ago</div>
          </div>
        </div>
        <div className="p-5 text-sm">
          <p className="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology 
          acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>

        <div>
          <img src={wel} alt=""/>
        </div>
        <div className="flex text-lg"> 
          <div className="w-full border-gray-200 shadow flex  justify-center py-3">
            <i className={`fa-${clicked} fa-heart ease-in-out duration-500 cursor-pointer active:scale-150`} id="like" onClick={click}></i>
          </div>
        
          <div className="w-full border-gray-200 shadow flex  justify-center py-3">
            <i className={`fa-regular fa-comment cursor-pointer`}></i>
          </div>
       
          <div className="w-full border-gray-200 shadow flex  justify-center py-3">
            <i className={`fa-regular fa-share-from-square cursor-pointer`}></i>
          </div>
         
        </div>
      </div>
    </div>
  )
}
