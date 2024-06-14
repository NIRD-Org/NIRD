import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GpWiseKpiList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const taluk_id = searchParams.get("taluk_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  

  const handleGpWiseKpiEdit = () => {
    navigate(`/admin/add-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&taluk_id=${taluk_id}&gram_id=${gram_id}&theme_id=${theme_id}`);
  };
  return (
    <div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleGpWiseKpiEdit} variant="outline">Add GP Wise KPI</Button>
      </div>
    </div>
  );
}

export default GpWiseKpiList;
