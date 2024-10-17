import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";
import SoeprCommonApprovalsList from "../../components/SoeprCommonApprovals";

const SoeprWiseKpiApprovalList = () => {
  const columns = [
    { header: "Id", render: (approval) => approval.id },
    { header: "Theme", render: (approval) => approval.theme_name },
    { header: "State", render: (approval) => approval.state_name },
    {
      header: "Submission Date",
      render: (approval) =>
        new Date(approval.date || approval.created_at).toLocaleDateString(),
    },
    // {
    //   header: "Date of Sent Back",
    //   render: (approval) =>
    //     approval.decision == 2
    //       ? new Date(approval.modified_at).toLocaleDateString()
    //       : "-",
    // },
    // {
    //   header: "Approved Date",
    //   render: (approval) =>
    //     approval.decision == 1
    //       ? new Date(approval.modified_at).toLocaleDateString()
    //       : "-",
    // },
  ];

  return (
    <SoeprCommonApprovalsList
      apiEndpoint="/api/v1/soepr-kpi-data/kpi-data-admin"
      title="SOEPR KPI  List"
      columns={columns}
      redirect="soepr-wise-kpi"
      normal
    />
  );
};

export default SoeprWiseKpiApprovalList;
