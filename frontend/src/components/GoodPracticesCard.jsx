import React from "react";

const GoodPracticesCard = () => {
  return (
    <div className="w-[19rem] h-full md:w-[15rem] relative group  border flex flex-col justify-between cursor-pointer bg-white">
      <div className="overflow-hidden">
        <img
          src="https://abp.championsofchange.gov.in/wp-content/uploads/2023/07/GG_Energy_SE_3.png"
          alt="Good Practices"
          className="w-full group-hover:scale-125 transition-all duration-700 ease-in-out"
        />
      </div>
      <div className={`flex  flex-col font-semibold p-4`}>
        <h4 className="text-white bg-primary text-center px-6 py-1 w-fit   text-sm rounded-full">
          Theme Name
        </h4>
        <h4 className="text-primary text-lg">
          Ayushman Bharat’s integrated approach leads to improved
        </h4>

        <h4 className="text-gray-700   text-sm">{"gpName.name"}</h4>
        <h5 className="text-gray-700 text-sm ">{"gpDistrict.name"}</h5>
        <p className="text-xs font-normal  text-slate-600">{"gpblock.name"}</p>
        <p className="text-xs font-normal  text-slate-600">{"gpState.name"}</p>
      </div>
    </div>
  );
};

export default GoodPracticesCard;
