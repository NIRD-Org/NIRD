import { useEffect, useState } from "react";
import API from "@/utils/API";

const useKpiApprovals = ({state_id}) => {
  const [kpiApprovals, setKpiApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllKpiApprovals = async () => {
      setLoading(true);
      try {
        const url = `/api/v1/kpi-approvals/get-kpiapprovals?state=${state_id || ""}`;
        const { data } = await API.get(url);
        data?.data?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setKpiApprovals(data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllKpiApprovals();
  }, [state_id]);

  return { kpiApprovals, loading };
};

export default useKpiApprovals