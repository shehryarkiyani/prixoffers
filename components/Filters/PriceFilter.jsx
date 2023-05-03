import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState,useEffect } from "react";
import { FormattedMessage } from 'react-intl';
import { useSelector,useDispatch } from "react-redux";
import { setPriceFilter } from "@/redux/PriceFilter";
const PriceFilter = () => {
  const [open, setOpen] = useState(true);
  const language=useSelector((state)=>state?.language?.value)
  const pricestate=useSelector(state=>state?.PriceFilter?.value)
  const[price,setprice]=useState(pricestate || {min:0,max:0})
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(setPriceFilter(price))
  },[price])
  return (
    <div className="mb-5 border-b border-gray-300">
      <div
        className="flex justify-between items-center pr-2 pb-3"
        onClick={() => setOpen(!open)}
      >
        <div className="font-bold text-sm uppercase">
        <FormattedMessage id="Price"/> 
          </div>
        <div className="rounded-full p-1 hover:bg-secondary-darker">
          {open ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronUpIcon className="h-4 w-4" />
          )}
        </div>
      </div>
      {open && (
        <div className="flex space-x-2 p-3">
          <input
            className="focus:outline-none w-20 rounded-lg px-2 py-1"
            type="number"
            min={0}
            name="min"
            id="min"
            placeholder={language=="AR"? "من":"Min."}
            value={Number(price?.min)}
            onChange={(e)=>setprice({...price,min:e.target.value})}
          />
          <p>to</p>
          <input
            className="focus:outline-none w-20 rounded-lg px-2 py-1"
            type="number"
            name="max"
            id="max"
            min={0}
            placeholder={language=="AR"? "أقصى":"Max."}
            value={Number(price?.max)}
            onChange={(e)=>setprice({...price,max:e.target.value})}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
