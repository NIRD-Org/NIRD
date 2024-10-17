import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GoodPracticeApprovalsList from "../admin/good practice/list";
import IndicatorApprovalsList from "../admin/gp-wise-indicator/list";
import LCVAApprovalsList from "../admin/lcva/list";
import TrainingApprovalsList from "../admin/training/list";
import KpiApprovalsList from "../admin/gp-wise-kpi/list";
import GpDetailsApprovalsList from "../admin/gp-details/list";

function SuperadminApprovalList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const approvalItem = searchParams.get("approvalItem") || "";

  const ApprovalComponent =
    {
      "good-practice": GoodPracticeApprovalsList,
      indicator: IndicatorApprovalsList,
      lcva: LCVAApprovalsList,
      training: TrainingApprovalsList,
      kpi: KpiApprovalsList,
      "gp-details": GpDetailsApprovalsList,
    }[approvalItem] ||
    (() => <div className="text-center mt-10">Select an approval item</div>);

  useEffect(() => {
    if (!approvalItem) {
      setSearchParams({});
    }
  }, [approvalItem, setSearchParams]);

  const handleSelectionChange = (event) => {
    setSearchParams({ approvalItem: event.target.value });
  };

  return (
    <div className="p-4">
      <select
        className="text-sm px-4 py-2 rounded-md bg-white border w-[200px] mx-auto block"
        onChange={handleSelectionChange}
        value={approvalItem}
      >
        <option value="">Select</option>
        <option value="good-practice">Good Practice</option>
        <option value="indicator">Indicator</option>
        <option value="lcva">LCVA</option>
        <option value="training">Training</option>
        <option value="kpi">KPI</option>
        <option value="gp-details">Gp Details</option>
      </select>
      <ApprovalComponent />
    </div>
  );
}

export default SuperadminApprovalList;
