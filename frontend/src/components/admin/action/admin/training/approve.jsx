import React from "react";
import ApprovalForm from "../../components/ApprovalForm";
import TrainingView from "./cview";

const TrainingApprovalPage = () => {
  return (
    <ApprovalForm
      endpoint="/api/v1/training"
      headerText="Training Details"
      DetailsView={TrainingView}
    />
  );
};

export default TrainingApprovalPage;