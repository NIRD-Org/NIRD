import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const LCVAApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: approval => approval.id },
    // { header: "Theme", render: (approval) => approval.theme_name },
    { header: "State", render: approval => approval.state_name },
    { header: "GP", render: approval => approval.gp_name },
    /*  { header: "Submission Date", render: (approval) =>
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
    }, */
    {
      header: "Status",
      render: approval =>
        approval.decision == 0
          ? "Pending"
          : approval.decision == 1
          ? "Approved"
          : "Sent back for Modification",
    },
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
