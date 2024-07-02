import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const LCVAApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: approval => approval.id },
    { header: "State", render: approval => approval.state_name },
    { header: "GP", render: approval => approval.gp_name },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/lcva/all"
      title="LCVA Approvals List"
      columns={columns}
      redirect="lcva"
    />
  );
};

export default LCVAApprovalsList;
