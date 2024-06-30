import React from "react";
import ApprovalForm from "../../components/ApprovalForm";
import IndicatorView from "./cview";

const IndicatorApprovalAdminForm = () => {
  return (
    <ApprovalForm
      endpoint="/api/v1/indicator-approvals/update"
      headerText="Young Fellow - Indicator Entry Form"
      DetailsView={IndicatorView}
    />
  );
};

export default IndicatorApprovalAdminForm;
