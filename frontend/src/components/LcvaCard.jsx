import React from "react";

const LcvaCard = ({ image, theme, activity, state, district, block, gp }) => {
  return (
    <div className="w-[19rem] h-full md:w-[15rem] relative group  border flex flex-col justify-between cursor-pointer bg-white">
      <div className="overflow-hidden">
        <img
          src={image}
          alt="Good Practices"
          className="w-full group-hover:scale-125 transition-all duration-700 ease-in-out"
        />
      </div>
      <div className={`flex  flex-col font-semibold p-2`}>
        <h4 className="text-white text-xs bg-primary text-center px-6 py-1 w-fit rounded-full">
          {theme.substring(25, 0)}...
        </h4>
        <h4 className="text-primary text-lg">{activity}</h4>

        <h4 className="text-gray-700 text-sm">{gp}</h4>
        <h5 className="text-gray-700 text-sm">{block}</h5>
        <p className="text-xs font-normal text-slate-600">{district}</p>
        <p className="text-xs font-normal text-slate-600">{state}</p>
      </div>
    </div>
  );
};

export default LcvaCard;
