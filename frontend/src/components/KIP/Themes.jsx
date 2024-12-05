import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
const ThemeCard = ({ imgUrl, theme }) => {
  return (
    <a href={`#${theme}`}>
      <div className="hover:cursor-pointer relative w-[85vw] sm:w-[20rem] h-[9rem] lg:w-[15rem] xl:w-[16rem] rounded-lg overflow-hidden bg-blue-900">
        {imgUrl ? (
          <img src={imgUrl} alt={theme} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white text-lg font-bold">
            {theme.charAt(0)}
          </div>
        )}
        <div className="absolute text-sm z-10 inset-0 w-full h-full flex items-center justify-center text-center bg-black/50 text-white font-semibold">
          {theme}
        </div>
      </div>
    </a>
  );
};

const Themes = () => {
  const [searchParams] = useSearchParams();
  const [themeData, setThemeData] = useState([]);

  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";

  const getThemeData = async () => {
    try {
      const { data } = await API.get("/api/v1/theme/all");
      setThemeData(data?.themes || []);
    } catch (error) {
      console.error("Error fetching themes:", error);
      setThemeData([]);
    }
  };

  useEffect(() => {
    getThemeData();
  }, []);

  return (
    <div className="w-[90vw] grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
      {themeData.map((d) => (
        <Link
          key={d.id}
          to={
            d.id === "10"
              ? `/gp-wise-data/theme10?state=${state}&dist=${dist}&block=${block}&gp=${gp}`
              : `/gp-wise-data/theme/${d.id}?state=${state}&dist=${dist}&block=${block}&gp=${gp}`
          }
        >
          <ThemeCard imgUrl={d.theme_image} theme={d.theme_name} />
        </Link>
      ))}
      <Link to={`/kpi?tab=Institutional Strengthening`}>
        <ThemeCard
          imgUrl={
            "https://www.ultimusfundsolutions.com/wp-content/uploads/2021/12/MicrosoftTeams-image-1024x459.jpg"
          }
          theme={"Institutional Strengthening"}
        />
      </Link>
    </div>
  );
};

export default Themes;
