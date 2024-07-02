import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const GpWiseKpiApprovalList = () => {
  const columns = [
    { header: "Submission ID", render: (approval) => approval.submitted_id },
    { header: "Theme", render: (approval) => approval.theme_name },
    { header: "GP", render: (approval) => approval.gp_name },
    { header: "Submission Date", render: (approval) => 
        new Date(approval.date || approval.created_at).toLocaleDateString() 
    },
    { header: "Date of Sent Back", render: (approval) => 
        approval.decision == 2
          ? new Date(approval.modified_at).toLocaleDateString()
          : "-"
    },
    { header: "Approved Date", render: (approval) => 
        approval.decision == 1
          ? new Date(approval.modified_at).toLocaleDateString()
          : "-"
    },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/kpi-approvals/get-kpiapprovals"
      title="KPI Approvals List"
      columns={columns}
      redirect="gp-wise-kpi"
      master
    />
  );
};

export default GpWiseKpiApprovalList;
