import { useState, useEffect } from "react";
import API from "@/utils/API";

const useKpiApprovals = ({ state_id, page, status }) => {
  const [kpiApprovals, setKpiApprovals] = useState([]);
  let updatedKpiAppprovals = [];

  useEffect(() => {
    const getAllKpiApprovals = async () => {
      try {
        const url = `/api/v1/kpi-approvals/get-kpiapprovals?state=${
          state_id || ""
        }`;
        const response = await API.get(url);
        let data = response.data.data;
        data?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setKpiApprovals(data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    getAllKpiApprovals();
  }, [state_id]);

  useEffect(() => {
    updatedKpiAppprovals = kpiApprovals.filter(data => data.decision == status);
  }, [status]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredKpiApprovals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredKpiApprovals.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [page]);

  return {
    kpiApprovals: updatedKpiAppprovals,
  };
};

export default useKpiApprovals;
