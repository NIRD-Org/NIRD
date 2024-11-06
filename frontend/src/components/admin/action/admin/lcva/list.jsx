import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const LCVAApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: (approval) => approval.id },
    { header: "Theme", render: (approval) => approval.theme_name },
    { header: "Activity Title", render: (approval) => approval.activityTitle },
    { header: "State", render: (approval) => approval.state_name },
    { header: "GP Name", render: (approval) => approval.gp_name },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/lcva/all"
      title="LCVA Approvals List"
      columns={columns}
      redirect="lcva"
      edit={true}
    />
  );
};

export default LCVAApprovalsList;
