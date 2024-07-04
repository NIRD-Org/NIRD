import { useState, useEffect } from "react";
import API from "@/utils/API";


export default function useThemes() {
  const [themes, setThemes] = useState(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await API.get("/api/v1/theme/all");
        setThemes(response?.data?.themes || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchThemes();
  }, []);

  return { themes };
}
