import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ThemeCard = ({ imgUrl, theme }) => {
  return (
    <a href={`#${theme}`}>
      <div className="hover:cursor-pointer relative w-[80vw] sm:w-[17rem] h-[8rem] lg:w-[12rem] xl:w-[13rem]   rounded-lg overflow-hidden">
        <img src={imgUrl} alt="" className="h-full w-full object-cover " />
        <div className="absolute text-sm z-10 inset-0 w-full h-full flex items-center justify-center text-center bg-black/50 text-white font-semibold">
          {theme}
        </div>
      </div>
    </a>
  );
};

const Themes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [themeData, setThemeData] = useState([]);

  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";

  const getThemeData = async () => {
    const { data } = await API.get("/api/v1/theme/all");
    setThemeData(data?.themes);
  };

  useEffect(() => {
    getThemeData();
  }, []);

  return (
    <div className="w-[90vw] grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
      {themeData &&
        themeData.length > 0 &&
        themeData.map((d) => (
          <Link
            to={`/gp-wise-data/theme/${d.id}?state=${state}&dist=${dist}&block=${block}&gp=${gp}`}
          >
            <ThemeCard imgUrl={d.theme_image} theme={d.theme_name} />
          </Link>
        ))}
    </div>
  );
};

export default Themes;
