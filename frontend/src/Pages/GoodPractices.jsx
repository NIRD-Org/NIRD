import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import API from "@/utils/API";
import GradientLine from "@/components/GradientLine";
import GoodPracticesCard from "@/components/GoodPracticesCard";

import BlockFilter from "@/components/admin/filter/BlockFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";
import GramFilter from "@/components/admin/filter/GramFilter";
import StateFilter from "@/components/admin/filter/StateFilter";

import { Button } from "@/components/ui/button";

// Example color palette for theme buttons.
// Feel free to adjust these or add more.
const THEME_COLORS = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-teal-600",
  "bg-pink-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-indigo-600",
];

export default function GoodPractices() {
  // Query params & state
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [goodPractices, setGoodPractices] = useState(null);
  const [filteredGoodPractices, setFilteredGoodPractices] = useState(null);
  const [themeData, setThemeData] = useState([]);

  // Extract filter params from the URL
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const fy = searchParams.get("financial_year") || "";
  const theme_id = searchParams.get("theme") || "";

  // Fetch all Good Practices
  const getGoodPractices = async () => {
    try {
      const { data } = await API.get("/api/v1/good-practice/");
      setGoodPractices(data?.data);
    } catch (error) {
      console.error("Error fetching Good Practices:", error);
      setGoodPractices(null);
    }
  };

  // Fetch Good Practices with filters
  const getGoodPracticesFilters = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/good-practice?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gp_id=${gp_id}&theme_id=${theme_id}&fy=${fy}`
      );
      setFilteredGoodPractices(data?.data);
    } catch (error) {
      console.error("Error fetching filtered Good Practices:", error);
      setFilteredGoodPractices(null);
    }
  };

  // Fetch Good Practices by search
  const getGoodPracticesSearch = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/good-practice?keyword=${search}&fy=${fy}`
      );
      setFilteredGoodPractices(data?.data);
    } catch (error) {
      console.error("Error fetching search Good Practices:", error);
      setFilteredGoodPractices(null);
    }
  };

  // Fetch Themes (no images, just names)
  const getThemeData = async () => {
    try {
      const { data } = await API.get("/api/v1/theme/all");
      setThemeData(data?.themes || []);
    } catch (error) {
      console.error("Error fetching themes:", error);
      setThemeData([]);
    }
  };

  // On mount
  useEffect(() => {
    getGoodPractices();
    getThemeData();
  }, []);

  // Whenever filter params change
  useEffect(() => {
    getGoodPracticesFilters();
  }, [state_id, dist_id, block_id, gp_id, fy, theme_id]);

  // Generate list of financial years
  const financialYears = [];
  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  // Handle Reset
  const handleReset = () => {
    setSearchParams({});
  };

  // Handle text-based search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (fy) {
      setSearchParams({ financial_year: fy });
    } else {
      setSearchParams({});
    }
    getGoodPracticesSearch();
  };

  // Button to pick a theme
  const handleThemeSelect = (themeId) => {
    if (themeId) {
      searchParams.set("theme", themeId);
    } else {
      searchParams.delete("theme");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row bg-gray-100 px-5 py-8 md:px-20 md:py-10 gap-5 justify-between items-center">
        <h1 className="text-5xl md:text-6xl text-sky-900 font-bold">
          Good Practices
        </h1>
        <a
          href="#good-practices"
          className="text-md py-3 px-4 bg-primary text-white font-semibold flex items-center gap-2"
        >
          Explore All Good Practices <ArrowRight />
        </a>
      </div>
      <GradientLine />

      {/* Main Container */}
      <div
        id="good-practices"
        className=" px-5 py-16 md:px-20 md:py-10"
      >
        {/* Intro */}
        <div className="pb-10">
          <p className="text-black-500 text-xl">
            Explore innovative projects across a diverse range of sectors,
            categories, and regions. Uncover how these good practices initiatives
            are driving social and economic progress, fostering inclusive and
            resilient societies.
          </p>
        </div>

        {/* Top Filters: Year + location + reset + search */}
<div className="flex flex-nowrap items-end gap-2 sm:gap-3  bg-yellow-30 overflow-x-auto mb-6">

  {/* Financial Year Dropdown */}
  <div className="flex items-center gap-1">
    <label className="text-sm font-semibold text-black">Financial Year:</label>
    <select  className="border-gray-300 bg-white-100 rounded px-2 py-1"
      value={fy}
      onChange={(e) => {
        searchParams.set("financial_year", e.target.value);
        setSearchParams(searchParams);
      }}
     
    >
      <option value="">All Years</option>
      {financialYears.map((yearObj, i) => (
        <option key={i} value={yearObj.value}>
          {yearObj.label}
        </option>
      ))}
    </select>
  </div>

  {/* State Filter */}
  <div className="flex items-center gap-1">
    <label className="text-sm font-semibold text-black-700">State:</label>
    <StateFilter className="focus:outline-none bg-gray-100 rounded px-2 py-1" />
  </div>

  {/* District Filter */}
  <div className="flex items-center gap-1">
    <label className="text-sm font-semibold text-black-700">District:</label>
    <DistrictFilter className="focus:outline-none bg-gray-100 rounded px-2 py-1" />
  </div>

  {/* Block Filter */}
  <div className="flex items-center gap-1">
    <label className="text-sm font-semibold text-black-700">Block:</label>
    <BlockFilter className="focus:outline-none bg-gray-100 rounded px-2 py-1" />
  </div>

  {/* Gram Filter */}
  <div className="flex items-center gap-1">
    <label className="text-sm font-semibold text-black-700">Gram:</label>
    <GramFilter className="focus:outline-none bg-gray-100 rounded px-2 py-1" />
  </div>

  {/* Reset Button */}
  <Button
    className="bg-primary hover:bg-gray-500 text-white font-semibold"
    onClick={handleReset}
  >
    Reset
  </Button>

  {/* Search Form */}
  <form
    onSubmit={handleSearchSubmit}
    className="flex items-center gap-1 ml-auto" // pushes search to the right if desired
  >
    <label className="text-sm font-semibold text-black-700 hidden md:block">
      Search:
    </label>
    <input
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="States, Districts, Blocks..."
      className="focus:outline-none rounded px-2 py-1 bg-white-100 text-white-800"
    />
    <button
      type="submit"
      className="bg-primary text-white font-semibold rounded px-3 py-1"
    >
      Search
    </button> 
    <br/>
  </form>
</div>

        {/* 2-column layout: Themes on left, GP results on right */}
        <div className=" flex flex-col lg:flex-row gap-5">
          {/* Left Pane: List of Themes as color-coded buttons */}
          <div className=" bg-yellow-50 lg:w-1/4 w-full bg-white p-5 rounded shadow-sm">
            <h2 className="font-bold text-lg mb-4">Themes</h2>

            <div className="flex flex-col gap-2">
              {/* "All Themes" button */}
              <button
                onClick={() => handleThemeSelect("")}
                className="px-4 py-2 rounded-md bg-yellow-500 text-white font-semibold"
              >
                All Themes
              </button>
              {/* Actual theme data: one color-coded button per theme */}
              {themeData.map((themeObj, i) => (
                <button
                  key={themeObj.id}
                  onClick={() => handleThemeSelect(themeObj.id)}
                  className={`px-4 py-2 rounded-md text-white font-semibold ${
                    THEME_COLORS[i % THEME_COLORS.length]
                  }`}
                >
                  {themeObj.theme_name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Pane: Good Practices Results */}
          <div className="lg:w-3/4 w-full">
            <p className="pt-5 mb-5 text-md">
              Showing{" "}
              <span className="text-primary font-bold">
                {filteredGoodPractices?.goodPractices?.length ?? 0}
              </span>{" "}
              results
            </p>
            <div className="bg-white p-5 rounded shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGoodPractices &&
              filteredGoodPractices.goodPractices?.length > 0 ? (
                filteredGoodPractices.goodPractices.map((gp) => (
                  <GoodPracticesCard
                    key={gp.id}
                    id={gp.id}
                    activity={gp.activityTitle}
                    block={gp.block_name}
                    district={gp.dist_name}
                    gp={gp.gp_name}
                    image={gp.image || gp.images?.[0]}
                    state={gp.state_name}
                    theme={gp.theme_name}
                  />
                ))
              ) : (
                <div className="text-center col-span-full py-10">
                  No Good Practices Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
