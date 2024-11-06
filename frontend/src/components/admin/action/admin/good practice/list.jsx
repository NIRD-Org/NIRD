import React from "react";
import CommonApprovalsList from "../../components/CommonApprovalsList";

const GoodPracticeApprovalsList = () => {
  const columns = [
    { header: "Submitted Id", render: (approval) => approval.id },
    { header: "Theme", render: (approval) => approval.theme_name },
    { header: "Activity Title", render: (approval) => approval.activityTitle },
    { header: "State", render: (approval) => approval.state_name },
    { header: "GP Name", render: (approval) => approval.gp_name },
  ];

  return (
    <CommonApprovalsList
      apiEndpoint="/api/v1/good-practice/all"
      title="Good Practice Approvals List"
      columns={columns}
      redirect={"good-practice"}
      edit={true}
    />
  );
};

export default GoodPracticeApprovalsList;
