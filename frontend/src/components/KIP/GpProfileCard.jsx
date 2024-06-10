import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";
const GpProfileCard = ({ gpName, gpState, gpDistrict, gptaluk, gpId }) => {
  return (
    <div className="w-[15rem] group h-56  hover:bg-[#004B86]/75 bg-slate-100 border flex flex-col justify-between p-4">
      <div className="flex flex-col font-semibold">
        <h4 className="text-[#004B86] group-hover:text-white text-xl">
          {gpName.name}
        </h4>
        <h5 className="text-gray-700 text-xl group-hover:text-white">
          {gpDistrict.name}
        </h5>
        <p className="text-sm font-normal group-hover:text-white text-slate-600">
          {gptaluk.name} -{gpState.name}
        </p>
      </div>
      <Link
        to={`/gp-profile/${gpId}?state=${gpState.id}&dist=${gpDistrict.id}&taluk=${gptaluk.id}`}
        className="flex group-hover:text-white items-center gap-2 hover:text-orange-600 hover:scale-[1.01] transition-all ease-in-out duration-100"
      >
        {" "}
        View Profile <RiArrowRightLine className="text-orange-600" />
      </Link>
    </div>
  );
};

export default GpProfileCard;
