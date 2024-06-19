import API from "@/utils/API";
import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [gpRankData, setGpRankData] = useState([]);
  const [blockRankData, setBlockRankData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [rankType, setRankType] = useState("gp");

  const [loading, setLoading] = useState(false);
  const getGpRankData = async () => {
    try {
      setBlockRankData([]);
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/get-ranking?keyword=${keyword}&theme=${
          rankType !== "gp" && rankType !== "block" && rankType
        }`
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
        `/api/v1/gp-wise-kpi/get-block-ranking?keyword=${keyword}`
      );
      setBlockRankData(data?.data);
    } catch (error) {
      setGpRankData([]);
      console.log("Failed to get rank data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rankType === "block") getBlockRankData();
    else getGpRankData();
  }, [rankType]);

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
              className="p-2 border rounded border-gray-300"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (rankType === "block") getBlockRankData();
              else getGpRankData();
            }}
            className="flex py-5 items-center space-x-1"
          >
            <input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for States, Districts and Blocks"
              className="border border-gray-300 p-2 rounded w-full lg:w-64 focus:ring focus:ring-orange-200"
            />
            <button className="bg-primary text-white p-2 rounded focus:outline-none focus:ring focus:ring-orange-200">
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
        <div className="flex flex-col h-full">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-x-hidden max-h-screen">
                <table className="divide-y   divide-gray-200 min-w-full">
                  <thead className="bg-primary text-white sticky top-0 z-0">
                    <tr className="text-left divide-x divide-gray-300 border border-gray-300 text-white">
                      <th className="px-5 py-3 ">Rank</th>
                      <th className="px-5 py-3">Total Score</th>
                      {rankType !== "block" && (
                        <th className="px-5 py-3">Gram Panchayat</th>
                      )}
                      <th className="px-5 py-3">Block</th>

                      <th className="px-5 py-3">Distrct</th>
                      <th className="px-5 py-3">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr className="text-center text-2xl text-gray-500">
                        <td colSpan={6} className="py-10 ">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {rankType !== "block" ? (
                          <>
                            {gpRankData && gpRankData.length > 0 ? (
                              gpRankData.map((rankData) => (
                                <tr className="text-left divide-x divide-gray-300 border border-gray-300">
                                  <td className="px-5 py-2">
                                    # {rankData.rank}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.totalScore}
                                  </td>

                                  <td className="px-5 py-2">
                                    {rankData.gp_name}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.block_name}
                                  </td>

                                  <td className="px-5 py-2">
                                    {rankData.dist_name}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.state_name}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="text-center text-2xl text-gray-500">
                                <td colSpan={6} className="py-10 ">
                                  Sorry, No Data Found!
                                </td>
                              </tr>
                            )}
                          </>
                        ) : (
                          <>
                            {blockRankData && blockRankData.length > 0 ? (
                              blockRankData.map((rankData) => (
                                <tr className="text-left divide-x divide-gray-300 border border-gray-300">
                                  <td className="px-5 py-2">
                                    # {rankData.rank}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.totalScore}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.block_name}
                                  </td>

                                  <td className="px-5 py-2">
                                    {rankData.dist_name}
                                  </td>
                                  <td className="px-5 py-2">
                                    {rankData.state_name}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="text-center text-2xl text-gray-500">
                                <td colSpan={6} className="py-10 ">
                                  Sorry, No Data Found!
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
