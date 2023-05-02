import Offers from "@/components/Offers";
import React, { useEffect, useState } from "react";
import FilterLayout from "@/components/Layouts/FilterLayout";
import { setVouchers } from "@/redux/offersSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
export async function getStaticProps() {
  try {
    const vouchers = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/?fields=-details`
    ).then((res) => res.json());

    return {
      props: {
        vouchers,
      },
    };
  } catch (e) {
    console.log(e, "Error");
  }
}

const VouchersPage = ({ vouchers }) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state=> state.auth.user);
  const[user,setuser]=useState(userdata)
  const [Vouchers,setvouchers]=useState(vouchers.vouchers)
  const jwt = getCookie("token");
  
  useEffect(() => {
    dispatch(setVouchers(vouchers.vouchers));
    setvouchers(vouchers.vouchers)
  }, [vouchers.vouchers, dispatch]);
useEffect(()=>{
setuser(userdata)
},[jwt])
  return (
    <FilterLayout headTitle="Vouchers">
      <Offers
      users={user}
      voucher={Vouchers}
        title={
          <>
            <FormattedMessage id="Todays" /> <FormattedMessage id="Vouchers" />
          </>
        }
        offerType="vouchers"
      />
    </FilterLayout>
  );
};

export default VouchersPage;
