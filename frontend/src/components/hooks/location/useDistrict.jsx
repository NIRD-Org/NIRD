
// useDistrict.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useDistrict = ({state_id}) => {
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state_id) {
      const fetchDistricts = async () => {
        setIsLoading(true);
        try {
          const { data } = await API.get(`/api/v1/dist/state/${state_id}`);
          setDistricts(data?.districts || []);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDistricts();
    }
  }, [state_id]);

  return { districts, isLoading };
};
export default useDistrict;
