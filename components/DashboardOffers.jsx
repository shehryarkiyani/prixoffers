import React, { useState,useEffect } from "react";
import OfferCard from "./Cards/OfferCard";
import { useSelector } from "react-redux";
const DashboardOffers = ({ 
  title,
  items
 

}) => {
  const activeuser=useSelector((state)=>state?.auth?.user)
  const[ filteredOfferList,setfilteredOfferList] = useState(items)
  const language=useSelector((state)=>state?.language?.value)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredOfferList.length / itemsPerPage);
  useEffect(()=>{
    console.log(items,"items")
    setfilteredOfferList(items)
  },[items])
  const RenderData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    
    
    return filteredOfferList?.slice(start, end).map((offer) => (
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
          user={activeuser}
        />
      ));
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

export default DashboardOffers;
