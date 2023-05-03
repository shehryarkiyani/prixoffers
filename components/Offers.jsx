import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import OfferCard from "./Cards/OfferCard";
import { setOffers } from "@/redux/offersSlice";
import {ColorRing} from 'react-loader-spinner'

const Offers = ({ title,users ,offerType = "all",homeoffers=[],deal=[],voucher=[],loading=false }) => {

 const language=useSelector((state)=>state?.language?.value)


  const offersList = useSelector((state) =>
    offerType == "all"
      ? homeoffers
      : offerType == "deals"
      ? deal
      : voucher
  );
  const [offers,setoffers]=useState(offersList)
  const selectedCategory = useSelector((state) => state.selectedCategory.value);
  const searchvalue=useSelector((state)=>state.SearchOffers.value)
  const[activeCategory,setactiveCategory]=useState(selectedCategory)
  
     


const[filteredList,setFilteredList]=useState(
  selectedCategory !== "All"
? offers?.filter((item)=>item?.category?.name?.toLowerCase()==selectedCategory?.toLowerCase()) 
: offers)
 

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
 
  useEffect(()=>{
// console.log("homeoffers", homeoffers,"deals",deal,"voucher",voucher)

  },[offers,filteredList,activeCategory,homeoffers])
  const RenderData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const filter=useSelector(state=> state.selectedFilter.value)
    const[items,setItem]=useState(filteredList)
    const pricestate=useSelector(state=>state?.PriceFilter?.value)
    const[price,setprice]=useState(pricestate || {min:0,max:0})
    useEffect(()=>{
      if(filter=="Active"){
        let newItems= [...filteredList].filter((item)=>item.isActive===true)
        setItem(newItems)
    
        }else if(filter=="Latest"){
       
         const newItems = [...filteredList]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         setItem(newItems)
        
       
        }else{
          const newItems = [...filteredList]?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setItem(newItems)
        }
  
    },[filter])
    useEffect(()=>{
      if(searchvalue==""){
        setItem(filteredList)
      }else{
        let newItems=filteredList.filter((item)=>item?.title?.toLowerCase().includes(searchvalue.toLowerCase()))
        setItem(newItems)
      }
      
    },[searchvalue])
    useEffect(()=>{
      if(selectedCategory!=="All"){
        setItem(offers.filter((item)=>item?.category?.name?.toLowerCase()==selectedCategory?.toLowerCase()) )
      }else{
        setItem(offers)
      
      }
    },[activeCategory, selectedCategory])
  useEffect(()=>{
setItem(filteredList)
  },[])
  useEffect(()=>{
    
    let min=pricestate?.min==""? 0:Number(pricestate?.min)
    let max=pricestate?.max==""? 0:Number(pricestate?.max)
    if((min==0)&& (max==0)){
      setItem(offersList)
      console.log(min,max,"min max")
    }else if((min==0) && (max!=0)){
      let filteritems=offersList?.filter((item)=>item?.discountedPrice<=(max))
      setItem(filteritems)
      console.log(filteritems,"filterprice",min,max)
    }else if((min!=0) && (max==0)){
      let filteritems=offersList?.filter((item)=>item?.discountedPrice>=(min))
      setItem(filteritems)
      console.log(filteritems,"filterprice",min,max)
    }else{
      let filteritems=offersList?.filter((item)=>item?.discountedPrice<=(min) && item?.discountedPrice>=(max))
      setItem(filteritems)
      console.log(filteritems,"filterprice",min,max)
    }
  },[price,pricestate])
  {loading===true && 
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
   </div>
  }
    if (items.length == 0) {
      return (
        <>
        {loading ===false &&  <div className="w-full">Sorry no data available.</div> }
     
        </>
      );
    }
    return (
      <>
      {
        loading ===false &&
        items
        .slice(start, end)
        .map((offer) => (
          <OfferCard
            key={offer._id}
            item={offer}
            time={offer.time}
            image={offer.image.path}
            title={offer.title}
            deal={offer.deal}
            price={offer.discountedPrice}
            realPrice={offer.recommendedRetailPrice}
            likes={offer.likes}
            comments={offer.comments}
            offerType={offer.type}
            offerid={offer._id}
            user={users}
          />
        ))
      }
      </>
    )
  };

  const RenderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2">
        <button
          className="text-gray-400 bg-white p-2 rounded-lg hover:text-gray-500"
          onClick={() => {
          
            currentPage>1 && setCurrentPage(currentPage-1)
 
          }}
        >
          {language=="AR"?
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M9 5l7 7-7 7"
           />
         </svg>:
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        }
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`text-primary w-10 bg-white p-2 rounded-lg hover:text-gray-500 ${
              currentPage === number && "bg-primary text-white"
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="text-gray-400 bg-white p-2 rounded-lg hover:text-gray-500"
          onClick={() => {
            
            currentPage<totalPages && setCurrentPage(currentPage+1)

          }}
        >
         {language=="AR"?
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M15 19l-7-7 7-7"
           />
         </svg>:
         <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M9 5l7 7-7 7"
         />
       </svg>
        }
        </button>
      </div>
    );
  };

  return (
    <div>
      <p className="font-bold">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3">
        {RenderData()}
      </div>
      <div className="py-10">{RenderPagination()}</div>
    </div>
  );
};

export default Offers;
