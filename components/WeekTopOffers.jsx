import React,{useState,useEffect} from 'react'
import TopOffer from './Cards/TopOffer'

import {ColorRing} from 'react-loader-spinner'
import { useRouter } from "next/router";
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const WeekTopOffers = () => {
  const router = useRouter();
  const vouchers=useSelector((state)=>state?.offers?.vouchers)
  const[Vouchers,setVouchers]=useState(vouchers)

  const[offers,setoffers]=useState([])
 
  const[Loader,setLoader]=useState(false);
 useEffect(()=>{
const getData=async()=>{
  let topDeals=await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/deals?limit=10&sort=-likes`
  ).then((res) => res.json())
 setoffers(topDeals?.deals)
}
getData()
 },[])

const handleClick=(id,type)=>{
if(type == "Deal" || type == "/" ){
  router.push(`/deals/${id}`)
 
}else{

  router.push(`/vouchers/${id}`)
}
  
}
  return ( 
    <div className='py-2'> 
        <p className="font-medium text-sm"> 
        <FormattedMessage id="WeekTopOffer"/>
       </p>
    {offers?.length ==0 && <p className="font-medium text-sm text-center"> 
        <FormattedMessage id="No Data Available"/>
       </p> }   
{Loader && 
 <ColorRing
 visible={true}
 height="80"
 width="80"
 ariaLabel="blocks-loading"
 wrapperStyle={{}} 
 wrapperClass="blocks-wrapper"
 colors={['#5A0064']}
/>
}
<div className="flex flex-nowrap space-x-3 w-full scroll-smooth py-2 overflow-x-auto scrollbar">
  {offers?.map((item)=>{
    return(
<TopOffer key={item.id} item={item} handleClick={handleClick} id={item.id} title={item.title} image={item?.image?.path} likes={item.likes.length} />
    )
  })}
 
 
 </div>
       
    </div>
  )
}

export default WeekTopOffers