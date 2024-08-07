import React from "react";
// import CommonApprovalsList from "../../components/CommonApprovalsList";
import CommonApprovalsList from "../action/components/CommonApprovalsList";

const AmUploadList = () => {
  const columns = [
    { header: "Submitted Id", render: approval => approval.id },
    { header: "State", render: approval => approval.state_id },
    { header: "GP", render: approval => approval.gp_id },
    { header: "Date", render: approval => approval.date },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/am-upload/all"
      title="AM Entry List"
      columns={columns}
      redirect="amu-upload"
      normal
    />
  );
};

export default AmUploadList;
