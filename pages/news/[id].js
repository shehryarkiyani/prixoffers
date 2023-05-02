import { HomeIcon } from "@heroicons/react/24/solid";
import React,{useState,useEffect} from "react";
import { useRouter } from 'next/router';
import {ColorRing} from 'react-loader-spinner'

const NewsInstance = () => {
  const router = useRouter();
  const[news,setNews]=useState()
  const { id } = router.query;
  const[loader,setloader]=useState(false)
  useEffect(()=>{
    const getNewsData=async()=>{
      setloader(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`).then((res)=>res.json());
     setNews(res)
     if(res){
      setloader(false)
     }
    }
    getNewsData();
  },[])
  return (
    <>
  
  
    <div className="flex flex-col items-center justify-center bg-secondary px-5 pt-20 pb-5">
    <div className="w-full max-w-2xl">
      <HomeIcon className="h-4 w-4 mb-4 mx-1" />
    </div>
    <div className="bg-white rounded-lg p-4 w-full max-w-2xl break-words font-[350]">
    {loader &&  <div className="flex justify-center">
    <ColorRing
   visible={true}
   height="80"
   width="80"
   ariaLabel="blocks-loading"
   wrapperStyle={{}} 
   wrapperClass="blocks-wrapper"
   colors={['#5A0064']}
  />
   </div>}
      <h1 className="text-2xl font-bold">{news?.blog?.title}</h1>
      <p
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: news?.blog?.content }}
      ></p>
    </div>
  </div>
  
   
    </>
  );
};

export default NewsInstance;


