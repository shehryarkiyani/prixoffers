
import Image from "next/image";
import Link from "next/link";
import React,{useState,useEffect, use} from "react";
import { FormattedMessage } from 'react-intl';
import { HomeIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import {ColorRing} from 'react-loader-spinner'
import DashboardOffers from "@/components/DashboardOffers";

const Dashboard = () => {
  const searchvalue=useSelector((state)=>state.SearchOffers.value)
  const user=useSelector((state)=>state?.auth?.user)
  const [loader,setloader]=useState(true)
  const[totalLiked,setTotalLiked]=useState([])

 
  const [totalShared,setTotalShared]=useState([])

  
  const [totalSaved,setTotalSaved]=useState([])

  const navOptions = ["Shared", "Liked", "Saved"];
  const [currentSelected,setcurrentSelected]=useState("Shared")
  const[items,setItem]=useState([])
  useEffect(()=>{
    if(searchvalue==""){
      if(currentSelected=="Shared"){
        setItem(totalShared)
      }else if(currentSelected=="Liked"){
        console.log(totalLiked,"totalLiked")
        setItem(totalLiked)
      }else{
        setItem(totalSaved)
      }
      
    }else{
      if(currentSelected=="Shared"){
        let newItem=totalShared.filter((item)=>item?.title?.toLowerCase().includes(searchvalue.toLowerCase()))
        setItem(newItem)
      }else if(currentSelected=="Liked"){
        let newItem=totalLiked.filter((item)=>item.title?.toLowerCase().includes(searchvalue.toLowerCase()))
        setItem(newItem)
      }else{
        let newItem=totalSaved.filter((item)=>item.title?.toLowerCase().includes(searchvalue.toLowerCase()))
        setItem(newItem)
      }
     
      
    }
  },[searchvalue,currentSelected])
 useEffect(()=>{
  const getData=async()=>{
    let token='';
    if(localStorage.getItem("token")!==undefined){
     token=JSON.parse( localStorage.getItem("token"))
    }
    
    const axios = require("axios");
    let url=`${process.env.NEXT_PUBLIC_API_URL}/users/liked`
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.request(config).then((response) => {
      console.log(response,"liked Data")
   
      setTotalLiked([...response.data.likedDeals,...response.data.likedVouchers])
      
      
    })
    .catch((error) => {
      console.log(error);
    });
    config.url=`${process.env.NEXT_PUBLIC_API_URL}/users/shared`
    axios.request(config).then((response) => {
      console.log(response,"Shared Data")
    
      setTotalShared([...response.data.sharedDeals,...response.data.sharedVouchers])
     setItem([...response.data.sharedDeals,...response.data.sharedVouchers])
     setcurrentSelected('Shared')
     setloader(false)
     })
     .catch((error) => {
       console.log(error);
     });
     config.url=`${process.env.NEXT_PUBLIC_API_URL}/users/saved`
     axios.request(config).then((response) => {
      console.log(response,"saved Data")
     
      setTotalSaved([...response.data.savedDeals,...response.data.savedVouchers])
      
     })
     .catch((error) => {
       console.log(error);
     });
  }
  
  getData()
 },[])
  return (
 <>

 <div className="relative bg-secondary">
    <div className="bg-[#5A0064] h-[185px]">
      <div className="max-w-7xl pt-20 mx-auto  ">
      
      <div className="pl-5 pt-0 w-full ">
      <div className="w-full flex gap-1 items-center">
        <HomeIcon className="h-4 w-4  mx-1 text-white" />
        <p className="text-sm text-white">{`> ${user?.username}`}</p>
      </div>
      </div>
      <div className="userImg mt-5 flex  gap-5 ml-4">
    <div className="w-32 h-32 border-white  shadow-md bg-white overflow-hidden rounded-[50%] " >
   
    {user?.image ?
   <Image src={user?.image} width="128" height={128} alt="user-img"/> 
  :
 <div className="w-32 h-32 text-lg bg-yellow-500 rounded-[50%] flex justify-center items-center">
{JSON.stringify(user)!=="{}" && user?.username[0]}
    </div>
  }
    </div>
    <div>
    <p className="text-3xl text-white">{`${user?.username}`}</p>
 {JSON.stringify(user)!=="{}" && <p className="text-1xl text-white">Joined {`${(new Date(user?.createdAt)).toISOString().slice(0, 10)}`}</p>}   
    </div>
    </div>
    </div>
 
    </div>
    <div className="mx-auto bg-white h-[100px] mb-10 pl-7 shadow-md ">
   
    </div>
    <div className="max-w-7xl mx-auto">
    <div className="w-full flex justify-center gap-3 ">
    {navOptions.map((option, index) => (
          <button
          key={index}
          className={`${
            currentSelected==option
              ? "bg-primary font-medium text-white"
              : "bg-secondary-dark hover:bg-secondary-darker"
          } border rounded-3xl px-4 pt-[6px] pb-[7px] text-sm border-gray-300`}
         onClick={()=>setcurrentSelected(option)}
        >
          <FormattedMessage id={option}/>
        </button>
        ))}
    </div>
    {loader ==true? 
 <div className="flex justify-center">
  <ColorRing
 visible={true}
 height="80"
 width="80"
 ariaLabel="blocks-loading"
 wrapperStyle={{}} 
 wrapperClass="blocks-wrapper"
 colors={['#5A0064']}
/>
 </div>:

<div>
{(currentSelected==="Shared" && totalShared.length==0) &&
<div className="w-full h-[120px] bg-white drop-shadow-md flex align-middle flex-col justify-center text-center mt-5" >
<p className="text-2xl"><FormattedMessage id="NoPost"/> </p>
<p><FormattedMessage id="try"/></p>
</div>
} 
{(currentSelected==="Liked" && totalLiked.length==0) &&
<div className="w-full h-[120px] bg-white drop-shadow-md flex align-middle flex-col justify-center text-center mt-5" >
<p className="text-2xl"><FormattedMessage id="NoPost"/></p>
<p><FormattedMessage id="try"/></p>
</div>
} 
{(currentSelected==="Saved" && totalSaved.length==0) &&
<div className="w-full h-[120px] bg-white drop-shadow-md flex align-middle flex-col justify-center text-center mt-5" >
<p className="text-2xl"><FormattedMessage id="NoPost"/></p>
<p><FormattedMessage id="try"/></p>
</div>
} 
</div>
}
  
      <div className="mt-5">
      <DashboardOffers 
    items={items}/>
      </div>
   
    </div> 
    </div>
 </>
  )
} 

export default Dashboard