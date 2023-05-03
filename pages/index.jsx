
import { getCookie } from "cookies-next";
import Offers from "@/components/Offers";
import FilterLayout from "@/components/Layouts/FilterLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loginUser, logoutUser } from "@/redux/auth/action-creators";
import { setCategories } from "@/redux/selectedCategorySlice";
import { setOffers,setTopDeals } from "@/redux/offersSlice";
import { FormattedMessage } from 'react-intl';

export async function getStaticProps() {
  try {
    const categories = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    ).then((res) => res.json())
  
    const topDeals=await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/deals?limit=10&sort=-likes`
    ).then((res) => res.json())
    const offers= await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/offers?fields=-details`
    ).then((res) => res.json())
    return {
      props: {
        categories,
        offers,
        topDeals
      },
    };
  } catch (e) {
    return {
      props: {
        categories:[],
        offers:[],
        topDeals:[]
      },
    };
  }

}

export default function Home({categories,offers,topDeals}) {
  const dispatch = useDispatch();
  const userdata = useSelector(state=> state.auth.user);
  
  const[user,setuser]=useState(userdata)
  const[loading,setloading]=useState(false)
  const jwt = getCookie("token");
  const[dealoffers,setdealoffers]=useState([])
 
  const getcategories=async()=>{
    const categories = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    ).then((res) => res.json())
    dispatch(setCategories(categories.categories))
  }
const getdeals=async()=>{
  const offers= await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/offers?fields=-details`
  ).then((res) => res.json())
 
  setdealoffers(offers.offers)
}
  useEffect(() => {
    console.log("JWT", jwt);
   localStorage.setItem("token",JSON.stringify(jwt))
    if (jwt) {
      setloading(true)
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
          console.log("RES1", response.data);
          dispatch(loginUser(response.data.user));
          setuser(response.data.user);
          setloading(false)
        
        })
        .catch((error) => {
          console.log(error);
        });
     
    }
    getdeals();
    getcategories();
  }, [dispatch, jwt]);

useEffect(()=>{
  
  dispatch(setCategories(categories.categories))
    dispatch(setOffers(offers.offers))
    dispatch(setTopDeals(topDeals.deals))
  
   
},[])
//categories.categories,offers.offers,topDeals.deals
  return ( 
    <FilterLayout headTitle="Home">
      <Offers users={user} loading={loading} offer={dealoffers}   offerType="all" title={<><FormattedMessage id="Todays"/> <FormattedMessage id="Offers"/></>  } />
    </FilterLayout>
  );
}
