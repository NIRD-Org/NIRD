import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const GpDetailsApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: (approval) => approval.id },
    { header: "State", render: (approval) => approval.state_name },
    { header: "GP Name", render: (approval) => approval.gp_name },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/gp-details/all"
      title="GP Details Approvals List"
      columns={columns}
      redirect={"gp-details"}
    />
  );
};

export default GpDetailsApprovalsList;
