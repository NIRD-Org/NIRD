import API from "@/utils/API";
import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [gpRankData, setGpRankData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const getGpRankData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/get-ranking?keyword=${keyword}`
      );
      setGpRankData(data?.data);
    } catch (error) {
      setGpRankData([]);
      console.log("Failed to get rank data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGpRankData();
  }, []);

  return (
    <div className="flex relative pt-5 pb-20 px-4 md:px-20 lg:px-24">
      <div className="ml-1/4 flex-1 overflow-hidden">
        <h1 className="text-center text-4xl md:text-5xl text-primary font-bold py-10">
          Gram Panchayat Ranks
        </h1>
        <div className="flex flex-col h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getGpRankData();
            }}
            className="flex py-5 items-center self-end space-x-2"
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
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-x-hidden max-h-screen">
                <table className="divide-y   divide-gray-200 min-w-full">
                  <thead className="bg-primary text-white sticky top-0 z-0">
                    <tr className="text-left divide-x divide-gray-300 border border-gray-300 text-white">
                      <th className="px-5 py-3 ">Rank</th>
                      <th className="px-5 py-3">Total Score</th>
                      <th className="px-5 py-3">GP Name</th>
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
                        {gpRankData.map((rankData) => (
                          <tr className="text-left divide-x divide-gray-300 border border-gray-300">
                            <td className="px-5 py-2"># {rankData.rank}</td>
                            <td className="px-5 py-2">{rankData.totalScore}</td>

                            <td className="px-5 py-2">{rankData.gp_name}</td>
                            <td className="px-5 py-2">{rankData.block_name}</td>

                            <td className="px-5 py-2">{rankData.dist_name}</td>
                            <td className="px-5 py-2">{rankData.state_name}</td>
                          </tr>
                        ))}
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
