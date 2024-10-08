import CarouselComponent from "@/components/CarouselComponent";
import LcvaCard from "@/components/LcvaCard";
import Themes from "@/components/KIP/Themes";
import ThemeFilters from "@/components/ThemeFilters";
import BlockFilter from "@/components/admin/filter/BlockFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";
import GramFilter from "@/components/admin/filter/GramFilter";
import StateFilter from "@/components/admin/filter/StateFilter";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GradientLine from "@/components/GradientLine";
import LCVADropdown from "@/components/LCVADropdown";

const LCVAPage = () => {
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState("");
  const [lcva, setlcva] = useState();
  const [filteredlcva, setFilteredlcva] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const content = searchParams.get("content_type") || "";
  const fy = searchParams.get("financial_year") || "";
  const theme_id = searchParams.get("theme") || "";

  const handleReset = () => {
    setSearchParams({});
  };

  const getlcva = async () => {
    try {
      const { data } = await API.get("/api/v1/lcva");
      setlcva(data?.data);
    } catch (error) {
      setlcva();

      console.log(error.message);
    }
  };

  const getlcvaFilters = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/lcva?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gp_id=${gp_id}&theme_id=${theme_id}&fy=${fy}`
      );
      setFilteredlcva(data?.data);
    } catch (error) {
      setFilteredlcva();
      console.log(error.message);
    }
  };

  const getlcvaSearch = async () => {
    try {
      const { data } = await API.get(`/api/v1/lcva?keyword=${search}&fy=${fy}`);
      setFilteredlcva(data?.data);
    } catch (error) {
      setFilteredlcva();
      console.log(error.message);
    }
  };

  useEffect(() => {
    getlcva();
  }, []);

  useEffect(() => {
    getlcvaFilters();
  }, [state_id, dist_id, block_id, gp_id, fy, theme_id]);

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (fy) {
      setSearchParams({ financial_year: fy });
    } else {
      setSearchParams({});
    }
    getlcvaSearch();
  };
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex bg-gray-100 px-5  py-8 md:px-20 md:py-10 flex-col sm:flex-row pb-16 gap-5 justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl text-sky-900 font-bold">
            Low Cost / No Cost Voluntary Activities
          </h1>
        </div>
      </div>
      <GradientLine />
      {/* Info Section */}
      <div className="w-full px-5  py-8 md:px-20 md:py-10 bg-white p-2 md:p-10 rounded flex flex-col md:flex-row justify-between gap-5">
        {/* Carousel */}
        <div className=" w-full md:w-4/6">
          {lcva && lcva.lCVAs?.length > 0 ? (
            <CarouselComponent data={lcva.lCVAs} />
          ) : (
            <h4 className="text-gray-500 text-center text-2xl">
              No Images Found
            </h4>
          )}
        </div>
        {/* Info */}
        <div className="w-full md:w-2/6 flex flex-col gap-4 ">
          <select
            value={fy}
            onChange={(e) => {
              searchParams.set("financial_year", e.target.value);
              setSearchParams(searchParams);
            }}
            className="border border-gray-300 text-center w-full p-2  rounded-md"
          >
            <option value="">Select Financial Year</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <div className="bg-gray-200 md:p-5 p-3 flex w-full items-center  justify-between ">
            <p className="text-sm md:text-xl text-gray-700 font-semibold">
              Themes
            </p>
            <p className="text-[#262675] text-xl md:text-2xl font-bold">9</p>
          </div>
          <div className="bg-gray-200 md:p-5 p-3 flex w-full items-center  justify-between ">
            <p className="text-sm md:text-xl text-gray-700 font-semibold">
              Activities
            </p>
            <p className="text-[#262675] text-xl md:text-2xl font-bold">26</p>
          </div>
          <div className="bg-gray-200 md:p-5 p-3 flex w-full items-center  justify-between ">
            <p className="text-sm md:text-xl text-gray-700 font-semibold">
              Details of LCVA(Doc/PDF)
            </p>
            <p className="text-[#262675] text-xl md:text-2xl font-bold">
              {" "}
              {lcva?.totalDocuments ?? 0}
            </p>
          </div>
          <div className="bg-gray-200 md:p-5 p-3 flex w-full items-center  justify-between ">
            <p className="text-sm md:text-xl text-gray-700 font-semibold">
              Videos
            </p>
            <p className="text-[#262675] text-xl md:text-2xl font-bold">
              {" "}
              {lcva?.totalVideos ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Details Section */}

      <div className="py-16 bg-gray-100 px-5  md:px-20 md:py-10">
        <div className="pb-10">
          <h1 className="text-4xl pb-5 font-semibold">
            Explore Low Cost / No Cost Voluntary Activities
          </h1>
          <p className="text-gray-500 text-xl">
            Explore innovative projects across a diverse range of sector,
            categories, and regions. Uncover how the low cost/no cost voluntary
            activities initiative are driving social and ecomnomic progress,
            fostering inclusive and resilient socities.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-5 justify-between mb-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4  items-end gap-2 sm:gap-5">
            <StateFilter className={"!w-full md:w-36"} />
            <DistrictFilter />
            <BlockFilter />
            <GramFilter />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between md:gap-5 gap-4 w-full md:w-fit">
            <Button className="self-end w-fit" onClick={handleReset}>
              Reset
            </Button>

            <form
              onSubmit={handleSearch}
              className="w-full flex items-center space-x-2"
            >
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for States, Districts and Blocks"
                className="border border-gray-300 p-2 rounded w-full lg:w-40 focus:ring focus:ring-primary"
              />
              <button className="bg-primary text-white p-2 rounded focus:outline-none focus:ring focus:ring-primary">
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
        <div className="pb-10">
          <LCVADropdown />
        </div>
        <ThemeFilters />
      </div>
      <h1 className="px-5 pt-8 md:px-20 md:pt-10 text-primary font-semibold text-2xl">
        All Low Cost/No Cost Voluntary Activities{" "}
      </h1>
      <p className="px-5 pt-4 md:px-20">
        Showing{" "}
        <span className="text-primary font-bold">
          {filteredlcva?.lCVAs?.length ?? 0}
        </span>{" "}
        results
      </p>
      <div className="px-5 pt-5 md:px-20 md:pb-10 w-fit bg-white mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-20 mb-5">
        {filteredlcva && filteredlcva?.lCVAs.length > 0 ? (
          filteredlcva.lCVAs.map((data) => (
            <LcvaCard
              id={data.id}
              activity={data.activityTitle}
              block={data.block_name}
              district={data.dist_name}
              gp={data.gp_name}
              images={data.image || data.images[0]}
              state={data.state_name}
              theme={data.theme_name}
              key={data.id}
            />
          ))
        ) : (
          <div className="text-center flex justify-center items-center h-min-screen md:min-h-[50vh]">
            No LCVAs Found
          </div>
        )}
      </div>
    </div>
  );
};

export default LCVAPage;
