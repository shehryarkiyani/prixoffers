import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
  HeartIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import XMarkIcon from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/20/solid";
import LoginForm from "@/components/Forms/LoginForm";
import {
  ChatBubbleLeftEllipsisIcon,
  FlagIcon,
  HeartIcon as HeartIconOutline,
  ShareIcon,
} from "@heroicons/react/24/outline";
import React,{useState,useEffect,useRef} from "react";
import Image from "next/image";
import Accordion from "@/components/Accordion/Accordion";
import CommentModal from "@/components/Comment/CommentModal";
import { getCookie } from "cookies-next";
import { useSelector,useDispatch } from "react-redux";
import Link from "next/link";
import DotsDropdown from "@/components/Dropdowns/DotsDropdown";
import { FormattedMessage } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
  import 'react-toastify/dist/ReactToastify.css';
import { setShowJoinModal } from "@/redux/joinModalSlice";

export const getServerSideProps = async (context) => {
  const id = context.params.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/${id}`);
  let voucher = await res.json();
  return {
    props: { voucher },
  };
};
const ProductPage = ({ voucher }) => { 
  const jwt = getCookie("token");
  let user = useSelector((state) => state.auth.user);
  const[Voucher,setVoucher]=useState(voucher)
  const dispatch=useDispatch(); 
  const[Liked,setLiked]=useState(voucher?.voucher?.likes?.length)
  const[isLiked,setisLiked]=useState(voucher?.voucher?.likes?.includes(user._id))
  const[isSaved,setisSaved]=useState(user?.savedVouchers?.includes(voucher?.voucher?.id)||false)
  const[comments,setcomments]=useState(voucher?.voucher?.comments)
  const[openReportModal,setOpenReportModal]=useState(false)
  const[openVoucherModal,setopenVoucherModal]=useState(false)
  const commentModalRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const language=useSelector((state)=>state?.language?.value)
  useEffect(()=>{
setVoucher(voucher?.voucher)
  },[voucher.voucher])
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const likeDeal = () => {
    const axios = require("axios")
    if(JSON.stringify(user)!=='{}'){
      if (isLiked) {
     
        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/offers/likes/${voucher?.voucher?.id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        axios
          .request(config)
          .then(async(response) => {
          
            setLiked((prevLiked) => prevLiked - 1);
            setisLiked(false)
            toast("Dislike Successfully")
          })
          .catch((error) => {
            console.log(error);
            toast(error?.message)
          });
      } else {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/offers/likes/${voucher?.voucher?.id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        axios
          .request(config)
          .then(async(response) => {
            toast("like Successfully")
            setLiked((prevLiked) => prevLiked + 1);
            setisLiked(true)
          })
          .catch((error) => {
            toast(error?.message)
          });
      }
    }else{
      dispatch(setShowJoinModal(true))
    }
   
  };
  const Save=()=>{
    const axios = require("axios");
    if(JSON.stringify(user)!=='{}'){
      if(isSaved){
        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/vouchers/saves/${voucher?.voucher?.id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
         
        };
    
        axios
          .request(config)
          .then(async(response) => {
            setisSaved(false)
           
          
            toast("UnSaved Successfully")
          })
          .catch((error) => {
         
            console.log(error.message);
    
          });
      }else{
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/vouchers/saves/${voucher?.voucher?.id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
         
        };
    
        axios
          .request(config)
          .then(async(response) => {
           
          
            toast("Saved Successfully")
            setisSaved(true)
          })
          .catch((error) => {
         
            console.log(error.message);
    
          });
      }
    }else{
      dispatch(setShowJoinModal(true))
    }
   
   
}
const Share=()=>{
    const axios = require("axios");
    if(JSON.stringify(user)!=='{}'){
      let config = {
        method: "PATCH",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/vouchers/reshare/${voucher?.voucher?.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        
      };
  
      axios
        .request(config)
        .then((response) => {
          
           
          toast("Shared Successfully")
        })
        .catch((error) => {
          console.log(error);
          toast(error?.message)
        });
    }else{
      dispatch(setShowJoinModal(true))
    }
   
}
  const reportOffer = (reportdata) => {
   
    const axios = require("axios");
    if(JSON.stringify(user)!=='{}'){
      let data={
        code: 0,
        offerType: "Voucher",
        missingInfo: {
          title: reportdata.title,
          image: "asd"
      },
      explanation: reportdata.explanation
      }
      let config = {
        method: "post", 
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/reports/${voucher?.voucher?.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
       data:data
      };
  
      axios
        .request(config)
        .then(async(response) => {
         
            
          toast("Report Successfully")
        })
        .catch((error) => {
          toast(error?.message)
          console.log(error);
        });
    }else{
      dispatch(setShowJoinModal(true))
    }
   
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:"30%",
      height:"250px",
      overflowY:"auto",
      position:"relative"
    },
  };
  const customStyles2 = {
    content: {
      top: '45%',
      right: 'auto',
      left: 'auto',
      marginRight: '20%',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width:"30%",
      height:"250px",
      overflowY:"auto",
      position:"relative"
    },
  };
  return (
    <div className="flex flex-col items-center justify-center bg-secondary">
       <ToastContainer />
       <Modal
        isOpen={openVoucherModal}
      
        onRequestClose={()=>setopenVoucherModal(false)}
        style={language=="AR"? customStyles2:customStyles}
        contentLabel="Example Modal" 
      >
          <>
     
          <div className="text-2xl w-full justify-center flex text-center md:text-start  font-bold ">
                   {voucher?.voucher?.title} hey
                 </div>
                 <div className="flex align-middle justify-center gap-10 items-center px-3 py-3 border-[5px] mt-3 border-dotted">
                 <p className="font-[700] text-xl">{voucher?.voucher?.code}</p>
                 <button onClick={()=>{handleCopy(voucher?.voucher?.code)}} className="bg-[#5A0064]  text-white p-2 pl-3 pr-3 flex justify-center align-middle rounded-md">
         <FormattedMessage id="CopyCode"/>
        
         </button>
                 </div>
             {copied && <p className="text-[#5A0064] mt-2 font-[500] text-[13px]">Code Copied</p>}    
         <button onClick={()=>{window.open(`${voucher?.voucher?.link}`,'_blank')}} className="bg-[#5A0064] w-full mt-5 text-white p-2 pl-3 pr-3 flex justify-center align-middle rounded-md">
         <FormattedMessage id="Continue to Serveddrinks"/>
         </button>
          </>

      </Modal>
        {/* {openVoucherModal &&
          <>
     
          <div className="text-2xl w-full justify-center flex text-center md:text-start  font-bold ">
                   {voucher?.voucher?.title} hey
                 </div>
                 <div className="flex align-middle justify-center gap-10 items-center px-3 py-3 border-[5px] mt-3 border-dotted">
                 <p className="font-[700] text-xl">{voucher?.voucher?.code}</p>
                 <button onClick={()=>{handleCopy(voucher?.voucher?.code)}} className="bg-[#5A0064]  text-white p-2 pl-3 pr-3 flex justify-center align-middle rounded-md">
         <FormattedMessage id="CopyCode"/>
        
         </button>
                 </div>
             {copied && <p className="text-[#5A0064] mt-2 font-[500] text-[13px]">Code Copied</p>}    
         <button onClick={()=>{window.open(`${voucher?.voucher?.link}`,'_blank')}} className="bg-[#5A0064] w-full mt-5 text-white p-2 pl-3 pr-3 flex justify-center align-middle rounded-md">
         <FormattedMessage id="Continue to Serveddrinks"/>
         </button>
          </>
          

        } */}
     
      {/* ITEM HEADER */}
      <div className="w-full bg-white flex justify-center mb-8">
        <div className="bg-white pt-20 w-full max-w-5xl px-3 md:px-10">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <HomeIcon className="h-4 w-4" />
              <ChevronRightIcon className="h-4 w-4 pt-1" />
              <p className="text-sm mt-[1.5px]"><FormattedMessage id="Vouchers" /></p>
            </div>
            {/* <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" /> */}
            <DotsDropdown isSaved={isSaved} openReportModal={openReportModal} setOpenReportModal={setOpenReportModal} Save={Save} reportOffer={reportOffer}/>
          </div>
          <div className="flex flex-col md:flex-row mt-5 md:space-x-5 mb-3">
            <div className="h-[350px] w-[350px] flex items-center justify-center p-4 rounded-lg">
              <Image
                src={voucher?.voucher?.image?.path}
                width={350}
                height={350}
                alt="POST"
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div>
                <div className="text-lg text-center md:text-start md:text-2xl font-bold md:w-[80%]">
                  {voucher?.voucher?.title}
                </div>
                <div className="text-gray-500 font-medium mt-2 text-center md:text-start">
                  Available from Amazon
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                  <div className="text-primary font-extrabold text-4xl">
                    £{voucher?.voucher?.discountedPrice}
                  </div>
                  <div className="font-medium text-gray-500 line-through text-2xl">
                    £{voucher?.voucher?.recommendedRetailPrice}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex space-x-2 items-center mb-3 justify-center md:justify-start mt-5 md:mt-1">
                  <div className="p-1 rounded-full bg-red-500">
                    <HeartIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-light">
                  {Liked} <FormattedMessage id="LikePeople" />
                  </div>
                </div> 
                <div onClick={()=>setopenVoucherModal(true)}>
                  <button className="w-full md:w-full flex justify-center items-center text-white p-3 font-medium text-lg mb-5 rounded-lg space-x-2 bg-primary">
                    <p><FormattedMessage id="GetVoucher" /></p>
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div> 
          </div>
          <div className="border-t border-b p-2 mb-5">
            <div className="flex text-gray-500 font-medium text-sm justify-around">
              <button
                onClick={() => likeDeal()}
                className={`flex items-center space-x-2 hover:text-[#FF3D00] cursor-pointer ${isLiked?'text-[#FF3D00]':''}`}
              >
                 {isLiked ===true ?
             <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF3D00" className="w-4 h-4">
             <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
           </svg>:
             <HeartIconOutline className={`h-6 w-6 text-gray-500 hover:bg-[#FFD8CC] hover:text-[#FF3D00] p-[3px] rounded-full ${isLiked?'text-[#FF3D00]':''}`}/>
                
             }
                
                <p><FormattedMessage id="Like" /></p>
              </button>
              <div className="flex items-center space-x-1 hover:text-[#007BC7] cursor-pointer" onClick={()=>{
              
                window.scrollTo({
                  top: commentModalRef?.current?.offsetTop-100,
                  behavior: 'smooth'
                });
                setTimeout(()=>{
                  commentModalRef.current.querySelector('input').focus();
                },1000)
              }} >
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 p-[3px] text-gray-500 hover:bg-[#CCE5F4] hover:text-[#007BC7] rounded-full" />
                <p><FormattedMessage id="Comment" /></p>
                <div className="px-[5px] mt-[3px] bg-gray-400 text-white rounded-full text-xs">
                  {voucher?.voucher?.comments?.length}
                </div>
              </div>
              <button onClick={() => Share()} className="flex items-center space-x-1 cursor-pointer hover:text-[#FFBB00]">
                <ShareIcon className="h-6 w-6 p-[3px] rounded-full text-gray-500 hover:bg-[#FFF1CC] hover:text-[#FFBB00]" />
                <p><FormattedMessage id="Share" /></p>
              </button>
              <button
                onClick={() => setOpenReportModal(true)}
                className="flex items-center space-x-1 cursor-pointer hover:text-[#FF3D00]"
              >
                <FlagIcon className="h-6 w-6 p-[3px] rounded-full text-gray-500 hover:bg-[#FFD8CC] hover:text-[#FF3D00]" />
                <p><FormattedMessage id="Report" /></p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ITEM DETAILS */}
      <Accordion title={<FormattedMessage id="Details" />}>
        <p
          className="mt-5 break-words"
          dangerouslySetInnerHTML={{ __html: voucher?.voucher?.details }}
        ></p>
      </Accordion> 
      {/* Retailer Information */}
      <Accordion title={<FormattedMessage id="RetailerInformation" />}>
        <div className="flex">
          <div className="flex border-gray-300 border rounded w-fit">
            <Image
              src={voucher?.voucher?.sharedBy?.image}
              alt="Retailer Image"
              width={80}
              height={80}
            />
          </div>
          <div className="flex ml-3 flex-col justify-around">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <div className="rounded-full p-2 bg-secondary">
                <ShoppingBagIcon className="h-5 w-5 text-black" />
              </div>
              <p><FormattedMessage id="All" /> {voucher?.voucher?.sharedBy?.name} <FormattedMessage id="deals" /></p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <div className="rounded-full p-2 bg-secondary">
                <TicketIcon className="h-5 w-5 text-black" />
              </div>
              <p> <FormattedMessage id="All" /> {voucher?.voucher?.sharedBy?.name} <FormattedMessage id="discountCodes" /></p>
            </div>
          </div>
        </div>
      </Accordion>
      {/* Comments */}
      <Accordion  title={<FormattedMessage id="Comments" />}>
        <div ref={commentModalRef}>
        <CommentModal  comments={comments}
          setcomments={setcomments} offer={voucher?.voucher} type="voucher" />
        </div>
        
      </Accordion>
    </div>
  );
};

export default ProductPage;
