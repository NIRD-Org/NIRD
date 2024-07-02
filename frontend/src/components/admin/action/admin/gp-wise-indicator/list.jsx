import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const AdminIndicatorApprovalList = () => {
  const columns = [
    { header: "Submission ID", render: (indicator) => indicator.submitted_id },
    { header: "State", render: (indicator) => indicator.state_name },
    { header: "GP", render: (indicator) => indicator.gp_name },
    { header: "Submission Date", render: (indicator) =>
        new Date(indicator.date || indicator.created_at).toLocaleDateString()
    },
    { header: "Date of Sent Back", render: (indicator) => 
        indicator.decision == 2
          ? new Date(indicator.modified_at).toLocaleDateString()
          : "-"
    },
    { header: "Approval Date", render: (indicator) => 
        indicator.decision == 1
          ? new Date(indicator.modified_at).toLocaleDateString()
          : "-"
    },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/indicator-approvals/get-approvals"
      title="Indicator Approvals List"
      columns={columns}
      redirect="indicator"
      master
    />
  );
};

export default AdminIndicatorApprovalList;
