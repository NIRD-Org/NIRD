import API from "@/utils/API";
import React, { useEffect, useState } from "react";

const RankingCard = ({ rank, gp, state, block, dist, totalScore }) => {
  return (
    <div className="flex flex-col gap-0 min-w-48 border ">
      <h5 className="bg-sky-700 font-semibold text-white py-3 px-1 text-center">
        Overall Ranking #{rank}
      </h5>
      <div className="p-2 pr-0 flex flex-col gap-1">
        <p className="text-[1rem] font-semibold">
          Total Score: <span className="text-gray-700 pl-2">{totalScore}</span>
        </p>
        {gp && (
          <p className="text-sm font-semibold">
            GP: <span className="text-gray-700 pl-2">{gp}</span>
          </p>
        )}
        <p className="text-sm font-semibold">
          Block: <span className="text-gray-700 pl-2">{block}</span>
        </p>
        <p className="text-sm font-semibold">
          District: <span className="text-gray-700 pl-2">{dist}</span>
        </p>
        <p className="text-sm font-semibold">
          State: <span className="text-gray-700 pl-2">{state}</span>
        </p>
      </div>
    </div>
  );
};

const Ranking = () => {
  const [gpRankData, setGpRankData] = useState([]);
  const [blockRankData, setBlockRankData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [rankType, setRankType] = useState("gp");
  const [financialYear, setFinancialYear] = useState("");

  const [loading, setLoading] = useState(false);
  const getGpRankData = async () => {
    try {
      setBlockRankData([]);
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/get-ranking?keyword=${keyword}&theme=${
          rankType !== "gp" && rankType !== "block" ? rankType : ""
        }&fy=${financialYear}`
      );
      setGpRankData(data?.data);
    } catch (error) {
      setGpRankData([]);
      console.log("Failed to get rank data");
    } finally {
      setLoading(false);
    }
  };

  const getBlockRankData = async () => {
    try {
      setGpRankData([]);
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/get-block-ranking?keyword=${keyword}&fy=${financialYear}`
      );
      setBlockRankData(data?.data);
    } catch (error) {
      setGpRankData([]);
      console.log("Failed to get rank data");
    } finally {
      setLoading(false);
    }
  };

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  useEffect(() => {
    if (rankType === "block") getBlockRankData();
    else getGpRankData();
  }, [rankType, financialYear]);

  return (
    <div className="flex relative pt-5 pb-20 px-4 md:px-20 lg:px-24">
      <div className="ml-1/4 flex-1 overflow-hidden">
        <h1 className="text-center text-4xl md:text-5xl text-primary font-bold py-10">
          Gram Panchayat Ranks
        </h1>
        <div className="flex flex-col sm:flex-row py-5 items-center justify-between space-x-2">
          <div className="flex flex-col">
            <label className="px-2 text-primary font-medium">
              Ranking type
            </label>
            <select
              value={rankType}
              className="p-2 border rounded-md "
              onChange={(e) => setRankType(e.target.value)}
            >
              <option value="">Select Ranking Type</option>
              <option value="gp">Gram Panchayat Wise</option>
              <option value="block">Cluster Wise</option>
              <option value="1">Theme 1</option>
              <option value="2">Theme 2</option>
              <option value="3">Theme 3</option>
              <option value="4">Theme 4</option>
              <option value="5">Theme 5</option>
              <option value="6">Theme 6</option>
              <option value="7">Theme 7</option>
              <option value="8">Theme 8</option>
              <option value="9">Theme 9</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="text-center w-full h-fit p-2 rounded-md"
            >
              <option value="">Select Financial Year</option>
              {financialYears.map((year, index) => (
                <option key={index} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (rankType === "block") getBlockRankData();
                else getGpRankData();
              }}
              className="flex items-center space-x-1"
            >
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for States, Districts and Blocks"
                className="border  p-2 rounded-md w-full lg:w-48 "
              />
              <button className="bg-primary text-white p-2 rounded-md focus:outline-none ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-start  gap-10 h-full">
          {loading ? (
            <div className="col-span-full text-center w-full h-full font-bold text-2xl">
              Loading...
            </div>
          ) : (
            <>
              {rankType !== "block" ? (
                <>
                  {gpRankData && gpRankData.length > 0 ? (
                    gpRankData.map((rankData) => (
                      <RankingCard
                        rank={rankData.rank}
                        gp={rankData.gp_name}
                        state={rankData.state_name}
                        block={rankData.block_name}
                        dist={rankData.dist_name}
                        totalScore={rankData.totalScore}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center w-full h-full font-bold text-3xl text-gray-700 pl-2">
                      Sorry, No Data Found!
                    </div>
                  )}
                </>
              ) : (
                <>
                  {blockRankData && blockRankData.length > 0 ? (
                    blockRankData.map((rankData) => (
                      <RankingCard
                        rank={rankData.rank}
                        state={rankData.state_name}
                        block={rankData.block_name}
                        dist={rankData.dist_name}
                        totalScore={rankData.totalScore}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center w-full h-full font-bold text-3xl text-gray-700 pl-2">
                      Sorry, No Data Found!
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
