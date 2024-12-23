import GoodPracticesCard from "@/components/GoodPracticesCard";
import GradientLine from "@/components/GradientLine";
import API from "@/utils/API";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const GoodPracticeDetails = () => {
  const { id } = useParams();
  const [goodPractice, setGoodPractice] = useState();
  const [loading, setLoading] = useState();
  const [similarGoodPractices, setSimilarGoodPractices] = useState([]);
  const getGoodPractice = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/v1/good-practice/${id}`);
      setGoodPractice(data?.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGoodPractice();
  }, [id]);

  const getGoodPracticesFilters = async () => {
    try {
      const { data } = await API.get(`/api/v1/good-practice/similar/${id}`);
      setSimilarGoodPractices(data?.data);
    } catch (error) {
      setSimilarGoodPractices();
      console.log(error.message);
    }
  };

  useEffect(() => {
    getGoodPracticesFilters();
  }, [id]);

  if (loading) {
    return (
      <div className="py-10 px-5 md:px-20 lg:py-16 flex items-center justify-center h-screen text-2xl text-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-5 bg-white">
      {/* header */}
      {goodPractice && (
        <>
          <div className="pt-4 md:pt-10 px-2 md:px-20">
            <h1 className="text-primary text-4xl font-semibold md:text-5xl">
              {goodPractice.activityTitle}
            </h1>
            <p className="w-fit md:w-fit my-7 text-sm md:text-lg md:my-10 rounded-full px-2 md:px-4 py-1 bg-primary text-white">
              {goodPractice.theme_name}
            </p>
          </div>
          <GradientLine />
          <div className="px-5 md:px-20 py-10 flex flex-col md:flex-row w-full md:h-[80vh] h-full items-start justify-center">
            <div className="w-full h-full md:w-4/6 ">
              <a
                href={goodPractice.document}
                download={goodPractice.document}
                className="flex my-1 gap-2 items-center justify-center w-fit text-xl text-sky-900"
              >
                <Download />
                Download
              </a>
              <ReactPlayer url={goodPractice?.video} controls width={"100%"} />
            </div>
            <div className="mt-9 w-full md:w-2/6 h-fit py-6 flex flex-col justify-between  bg-gray-200">
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">State</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.state_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">District</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.dist_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">Block</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.block_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">Gram Panchayat</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.gp_name}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="px-5 md:px-20 py-10 bg-gray-100">
        <h1 className="text-3xl md:text-5xl mb-5 text-center md:text-left text-primary font-bold">
          Other Good Practices
        </h1>
        <div className="px-5 pt-5 md:px-10 md:pb-10 w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-20 mb-5">
          {similarGoodPractices && similarGoodPractices.length > 0 ? (
            similarGoodPractices.map((data) => (
              <GoodPracticesCard
                id={data.id}
                activity={data.activityTitle}
                block={data.block_name}
                district={data.dist_name}
                gp={data.gp_name}
                image={data.image || data.images[0]}
                state={data.state_name}
                theme={data.theme_name}
                key={data.id}
              />
            ))
          ) : (
            <div className="text-center flex justify-center items-center h-min-screen md:min-h-[50vh]">
              No Good Practices Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodPracticeDetails;
