import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FormattedMessage } from 'react-intl';
import Link from "next/link";
export async function getStaticProps() {
  const news = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/?fields=-content`
  ).then((res) => res.json());

  return {
    props: {
      news,
    },
    revalidate: 60,
  };
}

const News = ({ news }) => {
  
  const router = useRouter();
  const restNews=news?.blogs.slice(1)
  console.log(restNews,"rest")
  const RenderData = () => {
    return (
      <div className="lg:max-w-7xl flex flex-wrap lg:space-x-4 w-full px-2 lg:px-5 mb-5 space-y-2 lg:space-y-0">
        <Link href={`/news/${news.blogs[0]?._id}`}
          className="bg-white flex flex-col lg:lg:w-[50%] rounded-xl py-4 cursor-pointer"
         
        >
          <div className="text-3xl font-bold px-4 pb-3">
            {news.blogs[0]?.title}
          </div>
          <Image
            src={news.blogs[0]?.coverImage}
            alt="news"
            className="w-full h-fit py-3"
            width={560}
            height={420}
          />
          <div className="px-4">{news.blogs[0]?.description}</div>
          <button
            className="flex font-bold space-x-1 px-4 py-5 w-fit"
           
          >
            <p className="text-danger font-medium text-xs"><FormattedMessage id="Savings" /></p>
            <ChevronRightIcon className="h-4 w-4 text-danger" />
          </button>
        </Link>


        <div className="flex flex-col justify-between gap-y-2 lg:space-y-0 flex-1">
         {restNews.map((item,index)=>{
          return(
            <Fragment key={index}>
 <Link href={`/news/${item?._id}`}
            className="flex rounded-xl bg-white w-full cursor-pointer"
           
          >
            <Image
              className="rounded-l-xl w-[30%] lg:w-[40%] h-44"
              src={item?.coverImage}
              alt="news"
              width={240}
              height={150}
            />
            <div className="flex flex-col justify-between px-4 py-3">
              <div className="text-lg leading-5 font-bold">
                {item?.title}
              </div>
              <button className="flex font-bold space-x-1 pt-4 w-fit">
                <p className="text-danger font-medium text-xs"><FormattedMessage id="Savings" /></p>
                <ChevronRightIcon className="h-4 w-4 text-danger" />
              </button>
            </div>
          </Link>
        
            </Fragment>
          )
         })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col pt-20 bg-secondary justify-center items-center">
      {RenderData()}
    </div>
  );
};

export default News;
