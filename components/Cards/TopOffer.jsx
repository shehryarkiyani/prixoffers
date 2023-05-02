import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const TopOffer = ({image, title, likes,id,handleClick,item}) => {

  return (
    <div className="flex px-2 py-2 rounded-lg bg-white w-64 min-w-[250px] space-x-2 cursor-pointer relative" onClick={()=>handleClick(id,item.type)}>
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
      <div className="flex justify-end items-center bottom-2 right-3 absolute">
            <HeartIcon className="h-4 w-4 text-red-600 mr-1"  />
            <p className="text-xs">
                {likes}
            </p>
        </div>
    </div>
  );
};

export default TopOffer;
