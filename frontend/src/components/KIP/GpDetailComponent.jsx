import React, { useState } from "react";

const GpDetailComponent = ({ data }) => {
  const [isPanchayatDetailsExpanded, setPanchayatDetailsExpanded] =
    useState(false);
  const [isSecretaryDetailsExpanded, setSecretaryDetailsExpanded] =
    useState(false);
  const [isSarpanchDetailsExpanded, setSarpanchDetailsExpanded] =
    useState(false);
  const [isDemographyExpanded, setDemographyExpanded] = useState(false);
  const [isPanchayatAreaExpanded, setPanchayatAreaExpanded] = useState(false);
  const [isHealthExpanded, setHealthExpanded] = useState(false);
  const [isEducationExpanded, setEducationExpanded] = useState(false);
  const [isSportsExpanded, setSportsExpanded] = useState(false);
  const [isGeneralExpanded, setGeneralExpanded] = useState(false);
  const [isWardDetailsExpanded, setWardDetailsExpanded] = useState(false);
  const [isOthersExpanded, setOthersExpanded] = useState(false);

  return (
    <div className="w-full grid py-6 lg:pt-14 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-10">
      {/* Panchayat Details */}
      <div className="bg-white overflow-hidden  border-gray-400">
        <div
          className="text-white bg-cyan-600 text-center p-2"
          onClick={() =>
            setPanchayatDetailsExpanded(!isPanchayatDetailsExpanded)
          }
        >
          <h2 className="text-2xl font-semibold">Panchayat Details</h2>
        </div>
        {isPanchayatDetailsExpanded && (
          <div className="p-4 border">
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
                      <td className="py-0 font-semibold capitalize">
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
                      <td className="">{value ? value : "N/A"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Demography */}
      <div className="bg-white overflow-hidden  border-gray-400">
        <div
          className="text-white bg-yellow-500 text-center p-2"
          onClick={() => setDemographyExpanded(!isDemographyExpanded)}
        >
          <h2 className="text-2xl font-semibold">Demography</h2>
        </div>
        {isDemographyExpanded && (
          <div className="p-4 border">
            <table className="divide-y divide-gray-200 min-w-full">
              <tbody>
                {Object.entries(data.demography).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-200">
                    <td className="py-0 font-semibold capitalize">
                      {key === "stPopulation"
                        ? "ST Population"
                        : key === "scPopulation"
                        ? "SC Population"
                        : key === "obcPopulation"
                        ? "OBC Population"
                        : key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                            .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
                            .replace(/([a-zA-Z])([0-9])/g, "$1 $2")}
                    </td>
                    <td className="">{value ? value : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Panchayat Area */}
      <div className="bg-white overflow-hidden  border-gray-400">
        <div
          className="text-white bg-gray-700 text-center p-2"
          onClick={() => setPanchayatAreaExpanded(!isPanchayatAreaExpanded)}
        >
          <h2 className="text-2xl font-semibold">Panchayat Area</h2>
        </div>
        {isPanchayatAreaExpanded && (
          <div className="p-4 border">
            <table className="divide-y divide-gray-200 min-w-full">
              <tbody>
                {Object.entries(data.panchayatArea).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-200">
                    <td className="py-0 font-semibold capitalize">
                      {key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                    </td>
                    <td className="text-center">{value ? value : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Health */}
      {data && data?.health && (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-emerald-700 text-center p-2"
              onClick={() => setHealthExpanded(!isHealthExpanded)}
            >
              <h2 className="text-2xl font-semibold">Health Details</h2>
            </div>
            {isHealthExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.health).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Education */}
      {data && data?.education && (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-fuchsia-800 text-center p-2"
              onClick={() => setEducationExpanded(!isEducationExpanded)}
            >
              <h2 className="text-2xl font-semibold">Education Details</h2>
            </div>
            {isEducationExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.education).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Sports */}
      {data && data?.sports && (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-red-500 text-center p-2"
              onClick={() => setSportsExpanded(!isSportsExpanded)}
            >
              <h2 className="text-2xl font-semibold">Sports Details</h2>
            </div>
            {isSportsExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.sports).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* General */}
      {data && data?.general && (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-violet-900 text-center p-2"
              onClick={() => setGeneralExpanded(!isGeneralExpanded)}
            >
              <h2 className="text-2xl font-semibold">General Details</h2>
            </div>
            {isGeneralExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.general).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Ward Details */}
      {data &&
      data?.wardDetails &&
      Array.isArray(data?.wardDetails) &&
      data.wardDetails.length > 0 ? (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-teal-700 text-center p-2"
              onClick={() => setWardDetailsExpanded(!isWardDetailsExpanded)}
            >
              <h2 className="text-2xl font-semibold">Ward Details</h2>
            </div>
            {isWardDetailsExpanded && (
              <div className="p-4 border">
                {data?.wardDetails?.map((ward) => (
                  <table className="divide-y divide-gray-200 min-w-full">
                    <tbody>
                      {Object.entries(ward).map(([key, value]) => (
                        <tr key={key} className="hover:bg-gray-200">
                          <td className="py-0 font-semibold capitalize">
                            {key
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                          </td>
                          <td className="">{value ? value : "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-teal-700 text-center p-2"
              onClick={() => setWardDetailsExpanded(!isWardDetailsExpanded)}
            >
              <h2 className="text-2xl font-semibold">Ward Details</h2>
            </div>
            {isWardDetailsExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.wardDetails).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Others */}
      {data && data?.others && (
        <>
          <div className="bg-white overflow-hidden  border-gray-400">
            <div
              className="text-white bg-lime-700 text-center p-2"
              onClick={() => setOthersExpanded(!isOthersExpanded)}
            >
              <h2 className="text-2xl font-semibold">Other Details</h2>
            </div>
            {isOthersExpanded && (
              <div className="p-4 border">
                <table className="divide-y divide-gray-200 min-w-full">
                  <tbody>
                    {Object.entries(data.others).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="py-0 font-semibold capitalize">
                          {key
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                        </td>
                        <td className="">{value ? value : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Secretary Details */}
      <div className="bg-white overflow-hidden  border-gray-400">
        <div
          className="text-white bg-orange-500 text-center p-2"
          onClick={() =>
            setSecretaryDetailsExpanded(!isSecretaryDetailsExpanded)
          }
        >
          <h2 className="text-2xl font-semibold">Secretary Details</h2>
        </div>
        {isSecretaryDetailsExpanded && (
          <div className="p-4 border">
            <table className="divide-y divide-gray-200 min-w-full">
              <tbody>
                {Object.entries(data.secretaryDetails).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-200">
                    <td className="py-0 font-semibold capitalize">
                      {key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                    </td>
                    <td className="">{value ? value : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sarpanch Details */}
      <div className="bg-white overflow-hidden  border-gray-400">
        <div
          className="text-white bg-sky-600 text-center p-2"
          onClick={() => setSarpanchDetailsExpanded(!isSarpanchDetailsExpanded)}
        >
          <h2 className="text-2xl font-semibold">Sarpanch Details</h2>
        </div>
        {isSarpanchDetailsExpanded && (
          <div className="p-4 border">
            <table className="divide-y divide-gray-200 min-w-full">
              <tbody>
                {Object.entries(data.sarpanchDetails).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-200">
                    <td className="py-0 font-semibold capitalize">
                      {key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                    </td>
                    <td className="">{value ? value : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GpDetailComponent;
