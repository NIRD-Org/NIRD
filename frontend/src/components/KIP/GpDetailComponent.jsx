import React from "react";

const GpDetailComponent = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-10">
      {/* Panchayat Details */}
      <div className="bg-gray-100  overflow-hidden">
        <div className="bg-primary-500 text-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Panchayat Details</h2>
        </div>
        <div className="p-4">
          <table className="divide-y divide-gray-200 min-w-full ">
            <tbody>
              {Object.entries(data.panchayatDetails).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-200 divide-x divide-gray-400  border border-gray-400"
                >
                  <td className="py-2 font-semibold capitalize px-5">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-10 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demography */}
      <div className="bg-gray-100  overflow-hidden">
        <div className="bg-primary-500 text-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Demography</h2>
        </div>
        <div className="p-4">
          <table className="divide-y divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.demography).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-200 divide-x divide-gray-400  border border-gray-400"
                >
                  <td className="py-2 font-semibold capitalize px-5">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-10 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panchayat Area */}
      <div className="bg-gray-100  overflow-hidden">
        <div className="bg-primary-500 text-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Panchayat Area</h2>
        </div>
        <div className="p-4">
          <table className="divide-y divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.panchayatArea).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-200 divide-x divide-gray-400  border border-gray-400"
                >
                  <td className="py-2 font-semibold capitalize px-5">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="text-center px-10 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sarpanch Details */}
      <div className="bg-gray-100  overflow-hidden">
        <div className="bg-primary-500 text-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Sarpanch Details</h2>
        </div>
        <div className="p-4">
          <table className="divide-y divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.sarpanchDetails).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-200 divide-x divide-gray-400  border border-gray-400"
                >
                  <td className="py-2 font-semibold capitalize px-5">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-10 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secretary Details */}
      <div className="bg-gray-100  overflow-hidden">
        <div className="bg-primary-500 text-primary text-center p-2">
          <h2 className="text-2xl font-semibold">Secretary Details</h2>
        </div>
        <div className="p-4">
          <table className="divide-y divide-gray-200 min-w-full">
            <tbody>
              {Object.entries(data.secretaryDetails).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-200 divide-x divide-gray-400  border border-gray-400"
                >
                  <td className="py-2 font-semibold capitalize px-5">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-10 py-2">{value}</td>
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
