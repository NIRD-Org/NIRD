import React from "react";
import ApprovalForm from "../../components/ApprovalForm";
import GoodPracticeView from "./cview";

const GoodPracticeApprovalPage = () => {
  return (
    <ApprovalForm
      endpoint="/api/v1/good-practice"
      headerText="Good Practice Details"
      DetailsView={GoodPracticeView}
    />
  );
};

export default GoodPracticeApprovalPage;
