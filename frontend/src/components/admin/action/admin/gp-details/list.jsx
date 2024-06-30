import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const GpDetailsApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: (approval) => approval.id },
    { header: "State", render: (approval) => approval.state_name },
    { header: "GP Name", render: (approval) => approval.gp_name },
    { header: "Status", render: (approval) =>
        approval.decision == 0
          ? "Pending"
          : approval.decision == 1
          ? "Approved"
          : "Sent back for Modification"
    },
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
