import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";

const ThemeFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    getAllThemes();
  }, []);

  const getAllThemes = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleThemeChange = (event) => {
    const selectedThemeId = event.target.value;
    setSearchParams({ theme_id: selectedThemeId });
  };

  return (
    <select
      className={cn(className, "text-sm px-4 py-2 rounded-md bg-transparent border")}
      value={theme_id}
      onChange={handleThemeChange}
    >
      <option value="">Select a theme</option>
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeFilter;
