import React from "react";

const YfInsightComponent = ({ insight }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-300 rounded mb-4">
        <div className="text-center flex   justify-evenly items-center gap-4 bg-primary py-2 text-sm md:text-xl text-white">
          <p>
            State: <span className="text-gray-300">{insight.state_name}</span>
          </p>{" "}
          <p>District: {insight.dist_name} </p>{" "}
          <p>Block: {insight.block_name} </p>
          <p>Gram Panchayat: {insight.gp_name}</p>
        </div>
        <div className="p-4">
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Young Fellow Name:</div>
            <div className="w-full md:w-4/5">{insight.name}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Date of Joining:</div>
            <div className="w-full md:w-4/5">{insight.dateOfJoining}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Financial Year:</div>
            <div className="w-full md:w-4/5">{insight.financialYear}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Achievement:</div>
            <div className="w-full md:w-4/5 text-justify">
              {insight.achievement}
            </div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5 self-center">
              Achievement Picture:
            </div>
            <div className="w-full md:w-4/5 max-w-xs">
              <img
                src={insight.achievementPhoto}
                alt="Achievement"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Failures:</div>
            <div className="w-full md:w-4/5 text-justify">
              {insight.failure}
            </div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Plan Of Action:</div>
            <div className="w-full md:w-4/5 text-justify">
              {insight.planOfAction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YfInsightComponent;
