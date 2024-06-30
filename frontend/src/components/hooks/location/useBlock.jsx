// useBlock.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useBlock = ({dist_id}) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dist_id) {
      const getAllBlocks = async () => {
        setLoading(true);
        try {
          const { data } = await API.get(`/api/v1/block/get?dist=${dist_id}`);
          setBlocks(data?.blocks || []);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getAllBlocks();
    }
  }, [dist_id]);

  return { blocks, loading };
};

export default useBlock;

