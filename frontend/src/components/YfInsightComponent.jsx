import React from "react";

const YfInsightComponent = ({ insight }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-300 rounded mb-4">
        <div className="text-center flex justify-evenly items-center gap-4  bg-primary py-2 text-sm md:text-xl text-white">
          <p>
            State: <span className="text-gray-300">{insight.state_name}</span>
          </p>{" "}
          <p>District: {insight.dist_name} </p>{" "}
          <p>Block: {insight.block_name} </p>
          <p>Gram Panchayat: {insight.gp_name}</p>
        </div>
        <div className="grid grid-cols-2 p-4  gap-4">
          <div className="font-bold">Young Fellow Name:</div>
          <div>{insight.name}</div>

          <div className="font-bold">Date of Joining:</div>
          <div>{insight.dateOfJoining}</div>

          <div className="font-bold">Financial Year:</div>
          <div>{insight.financialYear}</div>

          <div className="font-bold self-center">Achievement:</div>
          <div className="max-w-xs">
            <img
              src={insight.achievement}
              alt="Achievement"
              className="w-min h-auto "
            />
          </div>

          <div className="font-bold">Failures:</div>
          <div>{insight.failures}</div>
        </div>
      </div>
    </div>
  );
};

export default YfInsightComponent;
