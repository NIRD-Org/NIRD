import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ThemeCard = ({ id, imgUrl, theme }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <a
      onClick={() => {
        if (id) {
          searchParams.set("theme", id);
          setSearchParams(searchParams);
        } else {
          searchParams.delete("theme");
          setSearchParams(searchParams);
        }
      }}
      className="group"
    >
      <div className="hover:cursor-pointer relative h-[5.5rem] w-[12rem]  rounded-lg overflow-hidden">
        <img src={imgUrl} alt="" className="h-full w-full object-cover " />
        <div className="absolute text-sm z-10 inset-0 w-full h-full flex items-center justify-center text-center bg-black/50 text-white font-semibold group-hover:text-gray-300">
          {theme}
        </div>
      </div>
    </a>
  );
};

const ThemeFilters = () => {
  const [themeData, setThemeData] = useState([]);

  const getThemeData = async () => {
    const { data } = await API.get("/api/v1/theme/all");
    setThemeData(data?.themes);
  };

  useEffect(() => {
    getThemeData();
  }, []);

  return (
    <div className="w-[90vw] flex overflow-x-auto lg:overflow-hidden lg:flex-wrap gap-8">
      <ThemeCard
        id=""
        imgUrl="https://media.istockphoto.com/id/1351895555/photo/orange-and-yellow-gradient-defocused-blurred-motion-abstract-background.webp?b=1&s=170667a&w=0&k=20&c=pUsEOtS6PgM-WX-tGf7C0_G6_rrukwMfguxJp0zfkww="
        theme="All Themes"
      />
      {themeData &&
        themeData.length > 0 &&
        themeData.map((d) => (
          <ThemeCard id={d.id} imgUrl={d.theme_image} theme={d.theme_name} />
        ))}
    </div>
  );
};

export default ThemeFilters;
