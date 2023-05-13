import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
const TopOffer = ({image, title, likes,id,handleClick,item}) => {
  const language=useSelector((state)=>state?.language?.value)
  return (
    //${language=="AR"?"justify-end":"justify-start"}
    <div className={`flex   px-2 py-2 rounded-lg bg-white w-64 min-w-[250px] gap-2  cursor-pointer relative`} onClick={()=>handleClick(id,item.type)}>
    {/* {language!=="AR" && 
    <Image
    src={image}
    className="py-2"
    width={60} 
    height={50}
    alt="POST"
  />
    }   */}
     <Image
    src={image}
    className="py-2"
    width={60} 
    height={50}
    alt="POST"
  />
      <div className="relative">
        <p className="font-medium text-xs ">
          {title.length > 40 ? title.slice(0, 40) + "..." : title}
        </p>
      
      </div>
      <div className={`flex justify-end items-center bottom-2  absolute ${language=="AR"?"left-3":"right-3"}`}>
            <HeartIcon className="h-4 w-4 text-red-600 mr-1"  />
            <p className="text-xs">
                {likes}
            </p>
        </div>
     {/* {language == "AR" && 
     <Image
     src={image}
     className="py-2"
     width={60} 
     height={50}
     alt="POST"
   />
     }    */}
    </div>
  
  );
};

export default TopOffer;
