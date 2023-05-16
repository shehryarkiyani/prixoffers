import {
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React,{useState,useEffect} from "react";
import slugify from "../../utils/slugify";
import { getCookie } from "cookies-next";
import { useSelector,useDispatch } from "react-redux";
import { setShowJoinModal } from "@/redux/joinModalSlice";
import { loginUser } from "@/redux/auth/action-creators";
import { setOffers,setTopDeals } from "@/redux/offersSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OfferCard = ({ offerid, offerType, time, image, title, deal, price, realPrice, likes, comments,item,user }) => {
  const router = useRouter();
  const jwt = getCookie("token");
  const dynamicUrl = `/${offerType == "Voucher" ? "vouchers" : "deals"}/${offerid}`
 console.log('')
  const [liked,setLiked]=useState(item?.likes?.includes(user?._id) || false)
  const[totalLiked,setTotalLiked]=useState(item?.likes?.length || 0)
  const dispatch=useDispatch()
  const Liked=()=>{
  
    if(JSON.stringify(user)!=='{}'){
      likeDeal()
    }else{
      dispatch(setShowJoinModal(true))
    }
  } 
  const likeDeal = () => {
    console.log(item.id,"itemId",user._id," userid","ui",item?.likes?.includes(user?._id),"item",item,"user",user)
    const axios = require("axios");

    if (liked) {
    
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/offers/likes/${item?.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
        
          setLiked(false)
          toast("DisLike Successfully")
          setTotalLiked((prevLiked) => prevLiked - 1);
        })
        .catch((error) => {
         
        });  
    } else {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/offers/likes/${item?.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          toast("Like Successfully")
          setLiked(true)
          setTotalLiked((prevLiked) => prevLiked + 1);
        })
        .catch((error) => {
        
         
        });
    }
    updateUser();
    updateOffers()
  };
  const updateUser=()=>{
    const axios = require("axios");
    let url=`${process.env.NEXT_PUBLIC_API_URL}/users/me`
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log("RES2", response.data);
        dispatch(loginUser(response.data.user));
      
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const updateOffers=async()=>{
    const offers= await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/offers/?fields=-details`
    ).then((res) => res.json())
    console.log(offers,"updatedOffers")
    dispatch(setOffers(offers.offers))
  }
  const updateDeals=()=>{

  }
  const updateVouchers=()=>{

  }
  const CommentClicked=()=>{
    router.push(dynamicUrl)
  }
  useEffect(()=>{
    
    if(jwt==undefined){
      setLiked(false)
    }else{
      if((user?.likedDeals?.includes(offerid)||user.likedVouchers?.includes(offerid))){
        setLiked(true)
      }else{
        setLiked(false)
      }
      // if(item?.likes?.includes(user?._id) ){
       
      // }else{
        
      // }
     
    }
   
  },[user,jwt])

  return (
    <div  className="flex flex-col p-3 bg-white rounded-xl space-y-3 justify-between cursor-pointer h-[345px] sm:h-[385px] lg:h-[410px]">
     <ToastContainer
     autoClose={1000}
     />
      <a onClick={()=>{
      router.push(dynamicUrl)
    }}  className="flex space-x-2">
        <Image
          src="/avatar.png"
          alt="avatar"
          className="rounded-full cursor-pointer"
          width={12}
          height={12}
        />
        <small className="text-gray-300 text-[11px]">{time}</small>
      </a>
      <div onClick={()=>{
      router.push(dynamicUrl)
    }} className="h-[150px] ms:h-[190px] rounded-xl sm:mx-1 flex justify-center items-center overflow-hidden" >
        <Image
          src={image}
          width={200}
          height={200}
          alt="POST"
          className="max-h-full max-w-[full] object-contain hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>
      <p onClick={()=>{
      router.push(dynamicUrl)
    }} className="font-medium text-[13px] text-center" >{title}</p>
      <button onClick={()=>{
      router.push(dynamicUrl)
    }}  className="text-gray-400 text-xs text-center">{deal}</button>
     <p onClick={()=>{
            window.open(item?.link)
          }} className="text-[14px] text-center" >
            Available For Amazon
          </p>
      {
        // If the price is not equal to the real price, then show the real price with a line through it
        price ? (price !== realPrice ? (
          <div onClick={()=>{
            router.push(dynamicUrl)
          }} className="flex justify-center space-x-2" >
            <p className="text-primary text-center font-bold text-lg">
              £{price}
            </p>
            <p className="text-gray-400 text-center line-through">
              £{realPrice}
            </p>
          </div>
        ) : (
          <p onClick={()=>{
            router.push(dynamicUrl)
          }} className="text-lg font-medium text-primary text-center" >
            £{price}
          </p>
        )):(
          <p onClick={()=>{
            router.push(dynamicUrl)
          }} className="text-lg font-medium text-primary text-center" >
            FREE
          </p>
        )
      }
      <div className="border-t border-gray-200 pt-1 flex justify-around">
        <div className="flex items-center gap-1">
          {
        liked ===true ?    <svg onClick={Liked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF3D00" className="w-4 h-4">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>:
           <HeartIcon onClick={Liked} className="h-6 w-6 text-gray-400 hover:bg-[#FFD8CC] hover:text-[#FF3D00] p-1 rounded-full" />
          }
         
          <p 
          
          className="text-gray-400 text-[11px]">{totalLiked}</p>
        </div>
        <div className="flex items-center">
          <ChatBubbleLeftIcon onClick={CommentClicked} className="h-6 w-6 p-1 text-gray-400 hover:bg-[#CCE5F4] hover:text-[#007BC7] rounded-full" />
          <p className="text-gray-400 text-[10px]">{comments ? comments.length : 0}</p>
        </div>
        <div className="flex items-center" onClick={()=>window.open(item?.link,'_blank')}>
          <ArrowRightOnRectangleIcon className="h-6 w-6 p-1 text-gray-400 hover:bg-[#FFF1CC] hover:text-[#FFBB00] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
