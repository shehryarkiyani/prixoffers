import Offers from "@/components/Offers";
import React, { useEffect,useState } from "react";
import FilterLayout from "@/components/Layouts/FilterLayout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setDeals } from "@/redux/offersSlice";
import { FormattedMessage } from "react-intl";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
export async function getStaticProps() {
  const deals = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/deals/?fields=-details`
  ).then((res) => res.json());

  return {
    props: {
      deals,
    },
  };
}
 
const DealsPage = ({ deals }) => {
  const dispatch = useDispatch();
  const[Deals,setdeals]=useState(deals.deals)
  const userdata = useSelector(state=> state.auth.user);
  const[user,setuser]=useState(userdata)
  const jwt = getCookie("token");
  const getdeal=async()=>{
    const deals = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/deals/?fields=-details`
    ).then((res) => res.json());
    setdeals(deals.deals)
  }
  useEffect(() => {
    dispatch(setDeals(deals.deals));
    setdeals(deals.deals)
  }, [deals.deals, dispatch]);
  useEffect(()=>{
    setuser(userdata)
    getdeal();
    },[jwt])
  return (
    <FilterLayout headTitle="Deals">
      <Offers offer={Deals} users={user} title={<><FormattedMessage id="Todays"/> <FormattedMessage id="Deals"/></>  }  offerType="deals" />
    </FilterLayout> 
  );
};

export default DealsPage;
