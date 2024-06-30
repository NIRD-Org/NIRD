import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const TrainingApprovalsList = () => {
  const columns = [
    { header: "Programme Code", render: (approval) => approval.programmeCode },
    { header: "Title", render: (approval) => approval.title },
    { header: "Type", render: (approval) => approval.type },
    { header: "Online/Offline", render: (approval) => approval.onlineOffline },
    { header: "Status", render: (approval) =>
        approval.decision === 0
          ? "Pending"
          : approval.decision === 1
          ? "Approved"
          : "Sent back for Modification"
    },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/training/all"
      title="Training Approvals List"
      columns={columns}
      redirect="training"
    />
  );
};

export default TrainingApprovalsList;
