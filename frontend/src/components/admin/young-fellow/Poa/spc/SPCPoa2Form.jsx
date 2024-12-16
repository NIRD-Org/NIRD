import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { useAdminState } from "@/components/hooks/useAdminState";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { FaRegTimesCircle } from "react-icons/fa";
import { showAlert } from "@/utils/showAlert";

// Updated KPI Themes with their respective Activities

const kpiThemes = {
  "Training and Capacity Building": [
    "Conducting training sessions for Gram Panchayats on participatory planning.",
    "Organizing workshops on SDG-focused GPDP and budget preparation.",
    "Facilitating training needs assessments for GP officials and ERs.",
    "Providing orientation for Young Fellows on project tools and portals."
  ],
  "Monitoring and Supervision": [
    "Supervising Young Fellows’ activities and performance.",
    "Reviewing weekly reports submitted by Young Fellows.",
    "Monitoring project interventions in project GPs.",
    "Conducting on-site visits to assess the quality of outcomes."
  ],
  "Community Mobilization": [
    "Organizing Gram Sabhas, Ward Sabhas, Mahila Sabhas, and Bal Sabhas.",
    "Enhancing community participation through IEC campaigns.",
    "Promoting no-cost/low-cost voluntary actions for development.",
    "Engaging SHGs and community-based organizations in planning."
  ],
  "No work Day": ["Public Holiday", "Weekoff", "Leave"],
  "Others(100 words Only)": ["Others"],
  "Tour": ["Tour"]
};

const SPCPoa2Form = ({ update }) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: currentYear % 4 === 0 ? 29 : 28 }, // Leap year check
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const { id: poalId } = useParams();
  const [formDataState, setFormData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);


  const [states, setStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [allGps, setAllGps] = useState([]);

  const lastDayOfWeek = 7;

  function getAugustDate(day, year = new Date().getFullYear()) {
    return new Date(Date.UTC(year, selectedMonth, day));
  }

  const augustDate = getAugustDate(14, 2024);


const fetchAllDistricts = async (statesArray) => {
  const districtPromises = statesArray.map((state) =>
    API.get(`/api/v1/dist/state/${state.id}`).then(
      (res) => res.data?.districts || []
    )
  );
  const districts = (await Promise.all(districtPromises)).flat();
  return districts;
};

const fetchAllBlocks = async (districtsArray) => {
  const blockPromises = districtsArray.map((district) =>
    API.get(`/api/v1/block/get?dist=${district.id}`).then(
      (res) => res.data?.blocks || []
    )
  );
  const blocks = (await Promise.all(blockPromises)).flat();
  return blocks;
};

const fetchAllGps = async (blocksArray) => {
  const gpPromises = blocksArray.map((block) =>
    API.get(`/api/v1/gram/get?block=${block.id}`).then(
      (res) => res.data?.gram || []
    )
  );
  const gps = (await Promise.all(gpPromises)).flat();
  return gps;
};

const fetchLocations = async (statesArray) => {
  setDataLoading(true)
  try {
    // Fetch all data concurrently at each level
    const districts = await fetchAllDistricts(statesArray);
    const blocks = await fetchAllBlocks(districts);
    const gps = await fetchAllGps(blocks);

    // Update state in batch after all data is fetched
    setAllDistricts(districts);
    setAllBlocks(blocks);
    setAllGps(gps);
  } catch (error) {
    console.error("Error fetching locations", error);
  } finally{
    setDataLoading(false)
  }
};



  useEffect(() => {
    if (update) {
      const fetchPoalData = async () => {
        try {
          const response = await API.get(`/api/v1/spc-poa1/get/${poalId}`);
          setFormData(response.data.data.poaData);
        } catch (error) {
          console.error("Error fetching POA data:", error);
          toast.error("Error fetching POA data.");
        }
      };
      fetchPoalData();
    }
  }, [poalId, update]);

  // Get the YF locations
  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/user-location");
        const data = response.data.data;
         fetchLocations(data.states);
        setStates(data.states);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLocations();
  }, []);

  const getWeekDay = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN");
  };
const start = 8
  const getDaysInMonth = () =>
    Array.from({ length: 14 - start + 1 }, (_, i) => start + i);

  // Initialize rows for the table
  useEffect(() => {
    const initialRows = getDaysInMonth().map((day) => ({
      id: uuidv4(),
      date: day,
    }));
    setRows(initialRows);
  }, []);

  // Handle form data updates
  const handleInputChange = (day, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], [key]: value },
    }));
  };

  const handleStateChange = (day, selectedState) => {
    setFormData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        state: selectedState,
        district: "",
        block: "",
        gp: "",
      },
    }));
  };

  const handleDistrictChange = (day, selectedDistrict) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], district: selectedDistrict, block: "", gp: "" },
    }));
  };

  const handleBlockChange = (day, selectedBlock) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], block: selectedBlock, gp: "" },
    }));
  };

  const handleGpChange = (day, selectedGp) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], gp: selectedGp },
    }));
  };

  const handleKpiThemeChange = (day, selectedTheme) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], plan: selectedTheme, activity: "" },
    }));
  };

  const handleActivityChange = (day, selectedActivity) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], activity: selectedActivity },
    }));
  };

  const handleAddRow = (clickedDay) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((row) => row.date === clickedDay);
      const newRow = { id: uuidv4(), date: clickedDay };
      const newRows = [...prevRows];
      newRows.splice(index + 1, 0, newRow);
      return newRows;
    });
  };

  // Clear a particular row

  const handleClearRow = (id) => {
    // Remove the row from the 'rows' state by filtering it out
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);

    // Also remove the corresponding form data for that row
    const updatedFormDataState = { ...formDataState };
    delete updatedFormDataState[id];
    setFormData(updatedFormDataState);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSubmit = new FormData();
      rows.forEach((row) => {
        const dayData = formDataState[row.id] || {};
        formDataToSubmit.append(
          `poaData[${row.date}][date]`,
          formatIndianDate(row.date)
        );
        formDataToSubmit.append(
          `poaData[${row.date}][weekday]`,
          getWeekDay(row.date)
        );
        formDataToSubmit.append(
          `poaData[${row.date}][plan]`,
          dayData.plan || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][activity]`,
          dayData.activity || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][plannedEvent]`,
          dayData.plannedEvent || ""
        );
        formDataToSubmit.append(`poaData[${row.date}][poaType]`, "poa2");
        formDataToSubmit.append(
          `poaData[${row.date}][state_id]`,
          dayData.state || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][dist_id]`,
          dayData.district || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][block_id]`,
          dayData.block || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][gp_id]`,
          dayData.gp || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][achievements]`,
          dayData.achievements || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][tentativeTarget]`,
          dayData.tentativeTarget || ""
        );

        if (dayData.photo) {
          formDataToSubmit.append(`poaData[${row.date}][photo]`, dayData.photo);
        }

        formDataToSubmit.append(
          `poaData[${row.date}][remarks]`,
          dayData.remarks || ""
        );
      });

      await API.post(
        `/api/v1/spc-poa1/create?created_at=${augustDate}`,
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };


  if(dataLoading) {
    return <div className="h-screen md:h-[80vh] flex items-center justify-center">
      <h1 className="text-2xl text-center font-semibold">Loading..</h1>
    </div>
  }

  return (
    <div
      className="max-w-full lg:max-w-[80vw]"
      style={{ fontSize: "14px", margin: "0 auto" }}
    >
      <AdminHeader>
      Second Weekly Plan Of Action - Month : {months[selectedMonth].name} {new Date().getFullYear()}
      </AdminHeader>
      <div className="mb-4">
        <label htmlFor="month-select" className="mr-2">
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
          className="p-2 rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <Table
        border="1"
        cellPadding="3"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Date</th>
            <th>Weekday</th>
            <th>Task</th>
            <th>Activity</th>
            <th>Planned Event</th>
            <th>Tentative Target (Description in 50 words)</th>
            <th>State</th>
            <th>District</th>
            <th>Block</th>
            <th>Gram Panchayat</th>
            <th>Achievements</th>
            <th>Upload Photo</th>
            <th>Remarks/Reason for Failure</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((day, idx) => {
            const dayData = formDataState[day.id] || {};
            const districts = allDistricts?.filter(
              (dist) => dist.state_id === dayData.state
            );
            const blocks = allBlocks?.filter(
              (block) =>
                block.state_id === dayData.state &&
                block.dist_id === dayData.district
            );
            const gps = allGps?.filter(
              (gp) =>
                gp.state_id === dayData.state &&
                gp.dist_id === dayData.district &&
                gp.block_id === dayData.block
            );

            return (
              <tr key={idx}>
                <td>
                  <button
                    onClick={() => handleClearRow(day.id)}
                    className="text-red-500 bg-red-500/30 mr-2 mb-1 p-1 font-semibold rounded-full "
                  >
                    <FaRegTimesCircle className="text-lg" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleAddRow(day.date)}>
                    <PlusCircle className="text-primary text-lg" />
                  </button>
                </td>
                <td>{formatIndianDate(day.date)}</td>
                <td>{getWeekDay(day.date)}</td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={dayData.plan || ""}
                    onChange={(e) =>
                      handleKpiThemeChange(day.id, e.target.value)
                    }
                  >
                    <option value="">Select Task</option>
                    {Object.keys(kpiThemes).map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={dayData.activity || ""}
                    onChange={(e) =>
                      handleActivityChange(day.id, e.target.value)
                    }
                    disabled={!dayData.plan}
                  >
                    <option value="">Select Activity</option>
                    {dayData.plan &&
                      kpiThemes[dayData.plan].map((activity, index) => (
                        <option key={index} value={activity}>
                          {activity}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "plannedEvent", e.target.value)
                    }
                    value={dayData.plannedEvent || ""}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(
                        day.id,
                        "tentativeTarget",
                        e.target.value
                      )
                    }
                    value={dayData.tentativeTarget || ""}
                  />
                </td>
                <td>
                  <select
                    className="w-fit px-2 py-1 rounded min-w-40"
                    value={dayData.state || ""}
                    onChange={(e) => handleStateChange(day.id, e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}<option value="NIRD">NIRD</option>
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      handleDistrictChange(day.id, e.target.value)
                    }
                    value={dayData.district || ""}
                  >
                    <option value="">Select District</option>
                    {districts?.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}<option value="SIRD">SIRD</option>
                    <option value="None">None</option>

                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleBlockChange(day.id, e.target.value)}
                    value={dayData.block || ""}
                    disabled={!dayData.district}
                  >
                    <option value="">Select Block</option>
                    {blocks?.map((block) => (
                      <option key={block.id} value={block.id}>
                        {block.name}
                      </option>
                    ))}  <option value="None">None</option>
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleGpChange(day.id, e.target.value)}
                    value={dayData.gp || ""}
                    disabled={!dayData.block}
                  >
                    <option value="">Select GP</option>
                    {gps?.map((gp) => (
                      <option key={gp.id} value={gp.id}>
                        {gp.name}
                      </option>
                    ))}   <option value="None">None</option>
                  </select>
                </td>
                <td>
                  <input disabled
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "achievements", e.target.value)
                    } 
                    value={dayData.achievements || ""}
                  />
                </td>
                <td>
                  <input disabled 
                    type="file"
                    onChange={(e) =>
                      handleInputChange(day.id, "photo", e.target.files[0])
                    }
                  />
                </td>
                <td>
                  <input disabled
                    type="text"
                    className="border rounded border-gray-300"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "remarks", e.target.value)
                    }
                    value={dayData.remarks || ""}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        pending={loading}
        onClick={handleSubmit}
        className="primary-button float-right mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default SPCPoa2Form;
