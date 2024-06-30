import React from "react";
import ApprovalForm from "../../components/ApprovalForm";
import GpDetailsView from "./cview";

const GpDetailsApprovalPage = () => {
  return (
    <ApprovalForm
      endpoint="/api/v1/gp-details"
      headerText="GP Details Approval"
      DetailsView={GpDetailsView}
    />
  );
};

export default GpDetailsApprovalPage;
