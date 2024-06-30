// useGp.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useGp = ({block_id}) => {
  const [grams, setGrams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (block_id) {
      const getAllGPs = async () => {
        setLoading(true);
        try {
          const { data } = await API.get(`/api/v1/gram/get?block=${block_id}`);
          setGrams(data?.gram || []);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      getAllGPs();
    } else {
      setLoading(false);
    }
  }, [block_id]);

  return { grams, loading };
};

export default useGp
