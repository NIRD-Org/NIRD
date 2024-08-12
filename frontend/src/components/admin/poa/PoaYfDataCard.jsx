import React from "react";

const PoaYfDataCard = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-300 rounded mb-4">
        <div className="text-center flex   justify-evenly items-center gap-4 bg-primary py-2 text-sm md:text-xl text-white">
          <p>
            State: <span className="text-gray-300">{data.state.name}</span>
          </p>{" "}
          <p>District: {data.district.name} </p>
          <p>Block: {data.block.name} </p>
          <p>Gram Panchayat: {data.gp.name} </p>
        </div>
        <div className="p-4">
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Date:</div>
            <div className="w-full md:w-4/5">{data.date}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Action Plan:</div>
            <div className="w-full md:w-4/5">{data.plan}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Planned Event:</div>
            <div className="w-full md:w-4/5">{data.action}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Tentative Target:</div>
            <div className="w-full md:w-4/5">{data.plannedEvent}</div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Achievement:</div>
            <div className="w-full md:w-4/5 text-justify">
              {data.achievements}
            </div>
          </div>
          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5 self-center">
              Plan Of Action Picture:
            </div>
            <div className="w-full md:w-4/5 max-w-xs">
              <img
                src={data.photo}
                alt="Achievement"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="flex py-4 flex-col md:flex-row">
            <div className="font-bold w-full md:w-1/5">Remarks:</div>
            <div className="w-full md:w-4/5 text-justify">{data.remarks}</div>
          </div>
        </div>
      </div>
      <p className=" page-break" />
    </div>
  );
};

export default PoaYfDataCard;
