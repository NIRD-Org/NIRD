import API from "@/utils/API";
import React, { useState } from "react";

const RankingCard = ({ rank, block, district, state }) => {
  return (
    <div className="w-56 h-auto bg-slate-100 p-5 flex flex-col gap-2">
      <p className="text-center bg-sky-600 p-4 text-white">
        Overall Rank#: {rank}
      </p>
      <p className="">Block: {block}</p>
      <p className="">District: {district}</p>
      <p className="">State: {state}</p>
    </div>
  );
};

const Ranking = () => {
  const [gpRankData, setGpRankData] = useState([]);

  const getGpRankData = async () => {
    try {
      const { data } = await API.get("/api/v1/gp-wise-kpi/get-rank");
      setGpRankData(data?.data);
    } catch (error) {
      setGpRankData([]);
      console.log("Failed to get rank data");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ranking</h1>
      <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <RankingCard
          rank={"1"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"2"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"3"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"4"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"5"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"6"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"7"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
        <RankingCard
          rank={"8"}
          block={"Pooch"}
          district={"Kinnaur"}
          state={"Himanchal Pradesh"}
        />
      </div>
    </div>
  );
};

export default Ranking;
