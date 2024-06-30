// useIndicatorsApprovals.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useIndicatorsApprovals = ({state_id}) => {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllIndicators = async () => {
      setLoading(true);
      try {
        const queryParams = {
          state: state_id,
        };
        const { data } = await API.get(`/api/v1/indicator-approvals/get-approvals`, { params: queryParams });
        data?.data?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setIndicators(data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllIndicators();
  }, [state_id]);

  return { indicators, loading };
};

export default useIndicatorsApprovals;