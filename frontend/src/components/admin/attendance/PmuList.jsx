import React from "react";
// import CommonApprovalsList from "../../components/CommonApprovalsList";
import CommonApprovalsList from "../action/components/CommonApprovalsList";

const PmUploadList = () => {
  const columns = [
    { header: "Submitted Id", render: approval => approval.id },
    { header: "State", render: approval => approval.state_id },
    { header: "GP", render: approval => approval.gp_id },
    { header: "Date", render: approval => approval.date },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/pm-upload/all"
      title="PM Entry List"
      columns={columns}
      redirect="pmu-upload"
      normal
    />
  );
};

export default PmUploadList;
