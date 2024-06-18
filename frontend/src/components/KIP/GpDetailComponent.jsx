import React from "react";

const GpDetailComponent = ({ data }) => {
  return (
    <div className="w-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-10">
      {/* Panchayat Details */}
      <div className="bg-gray-100 overflow-hidden border border-gray-400">
        <div className="text-white bg-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Panchayat Details</h2>
        </div>
        <div className="p-2">
          <table className="divide-y divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.panchayatDetails)
                .filter(
                  ([key, value]) =>
                    !["state", "district", "panchayat", "block"].includes(
                      key.toLowerCase()
                    )
                )
                .map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-200">
                    <td className="py-2 font-semibold capitalize">
                      {key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                        .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
                        .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
                        .charAt(0)
                        .toUpperCase() +
                        key
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                          .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
                          .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
                          .slice(1)}
                    </td>
                    <td className="">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secretary Details */}
      <div className="bg-gray-100  overflow-hidden border border-gray-400">
        <div className=" text-white bg-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Secretary Details</h2>
        </div>
        <div className="p-4">
          <table className="divide-y  divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.secretaryDetails).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-200   ">
                  <td className="py-2 font-semibold capitalize ">
                    {key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                  </td>
                  <td className="">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sarpanch Details */}
      <div className="bg-gray-100  overflow-hidden border border-gray-400">
        <div className=" text-white bg-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Sarpanch Details</h2>
        </div>
        <div className="p-4">
          <table className="divide-y  divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.sarpanchDetails).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-200   ">
                  <td className="py-2 font-semibold capitalize ">
                    {key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                  </td>
                  <td className="">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demography */}
      <div className="bg-gray-100  overflow-hidden border border-gray-400">
        <div className=" text-white bg-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Demography</h2>
        </div>
        <div className="p-4">
          <table className="divide-y  divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.demography).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-200   ">
                  <td className="py-2 font-semibold capitalize ">
                    {key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                      .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
                      .replace(/([a-zA-Z])([0-9])/g, "$1 $2")}
                  </td>
                  <td className="">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panchayat Area */}
      <div className="bg-gray-100  overflow-hidden border border-gray-400">
        <div className=" text-white bg-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Panchayat Area</h2>
        </div>
        <div className="p-4">
          <table className="divide-y  divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.panchayatArea).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-200   ">
                  <td className="py-2 font-semibold capitalize ">
                    {key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                  </td>
                  <td className="text-center ">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GpDetailComponent;
