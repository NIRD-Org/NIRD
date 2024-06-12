import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";
const GpProfileCard = ({ gpName, gpState, gpDistrict, gptaluk, gp }) => {
  return (
    <div className="w-[15rem] relative group h-56  hover:bg-[#004B86]/75 border flex flex-col justify-between p-4">
      <div className={`flex  flex-col font-semibold`}>
        <h4 className="text-[#004B86] group-hover:text-white text-lg">
          {gpName.name}
        </h4>
        <h5 className="text-gray-700 text-md group-hover:text-white">
          {gpDistrict.name}
        </h5>
        <p className="text-xs font-normal group-hover:text-white text-slate-600">
          {gptaluk.name}
        </p>
        <p className="text-xs font-normal group-hover:text-white text-slate-600">
          {gpState.name}
        </p>
      </div>
      <img
        src={gpState.state_icon}
        className="absolute w-1/2 h-1/2 bottom-5 right-2 "
        alt=""
      />
      <Link
        to={`/gp-profile?gp=${gp.id}&state=${gpState.id}&dist=${gpDistrict.id}&taluk=${gptaluk.id}`}
        className="flex group-hover:text-white items-center gap-2 hover:text-orange-600 hover:scale-[1.01] transition-all ease-in-out duration-100"
      >
        {" "}
        View Profile <RiArrowRightLine className="text-orange-600" />
      </Link>
    </div>
  );
};

export default GpProfileCard;
