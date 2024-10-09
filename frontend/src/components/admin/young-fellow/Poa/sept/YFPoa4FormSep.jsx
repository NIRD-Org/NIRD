import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // Adjust for leap years if needed
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

// Updated KPI Themes with their respective Activities
const kpiThemes = {
  "Institutional Strengthening of GPs": [
    "To acquaint with the ERs and functionaries of the GP.",
    "To understand system of functioning as institutions of self-government.",
    "Baseline Data collection",
    "Meeting with the State Nodal Officer",
    "Meeting with the line department employees of the GP",
    "Meeting with the Block/Mandal/Janpad Panchayat/Taluka officials",
    "Meeting the SHG Federation",
    "To Identify several volunteers as ‘Panchayat Bandhus’",
    "Meeting with communities",
    "Initiating LCVAs in the GP",
    "Analysing GPDP documents of the previous years",
    "Conducting orientation/reorientation to ERs and functionaries of the GP",
    "Meeting ERs (Sarpanch/Pradhan/Mukhiya and Secretary), GP Functionaries, line departments officials and employees, SHGs and their Federations, Ward Members",
    "Organising/Facilitating the conduct of Vibrant Gram Sabha/ Ward Sabha/Mahila Sabha/Bal Sabha/ Monthly Collective Body Meeting.",
    "Organising community meetings to disseminate Departmental Schemes information.",
    "Conducting/Organising awareness meetings with the community to raise awareness about the significance of Gram Sabha/ Ward Sabha/Mahila Sabha/Bal Sabha",
    "Conducting Training need-assessment/Identifying training needs of the GP.",
    "Organising trainings for Village Panchayat Leaders, Village Officials, SHGs",
    "Monthly meeting with BDO/CEO (BP/JP) and DPRO/CEO (ZP).",
  ],
  "Poverty Free and Enhanced Livelihoods Villages": [
    "Wage Employment under MGNREGS.",
    "Activities to Promote PMAY-G/similar state schemes.",
    "Activities to Promote PM-KISAN scheme",
    "Providing Ration Cards",
    "Activities to Promote NSAP/ similar State Pension scheme.",
    "Activities to Promote PMJDY",
    "Promoting SHGs",
    "Activities to promote Skill Development Trainings",
    "Preparation of Sankalp-based GPDP",
  ],
  "Healthy Village": [
    "Activities to reduce child deaths",
    "Activities to reduce anaemia in the GP.",
    "Activities to promote TB-free GP.",
    "Activities to promote 100% immunization coverage.",
    "Activities to promote 100% institutional births.",
    "Ayushman Health Cards",
    "Activities to reduce water-borne diseases.",
    "Preparation of Sankalp-based GPDP",
  ],
  "Child-Friendly Village": [
    "Activities to improve Nutritional status of Children.",
    "Activities to promote 100% immunization coverage.",
    "Activities to reduce anaemia among children in the GP.",
    "Activities to promote a child-friendly village by improving infrastructure in the GP",
    "Activities to improve the enrolment of children and enrolment of drop-out children from school in the GP.",
    "Ayushman Health Cards for all eligible Children",
    "Organising/ Facilitating the Conduct of Bal Sabha.",
    "Preparation of Sankalp-based GPDP",
  ],
  "Water Sufficient Villages": [
    "Providing Tap water connection to 100% HH in the GP",
    "Activities related to promote Rainwater Harvesting",
    "Activities related to Watershed-based Development",
    "Activities related to Water Quality",
    "Preparation of Sankalp-based GPDP",
  ],
  "Clean and Green Villages": [
    "Activities related to Solid & Liquid Waste Management",
    "Activities related to UJALA/ Similar State/UT schemes.",
    "Facilitating activities to ensure Standing Committees in the GP Biodiversity and Environment Preservation",
    "Activities to ensure electricity, streetlights etc",
    "Preparation of Sankalp-based GPDP",
  ],
  "Self-Sufficient Infrastructure in Villages": [
    "Activities related to PMAY-G",
    "Activities to improve infrastructure in the GP",
    "Activities to improve road facilities in the GP",
    "Activities to improve and provide basic amenities in the GP for making it disable-friendly",
    "Activities related to establishing relief centre establishment in the GP",
    "Activities to improve community water needs.",
    "Activities to improve healthcare infrastructure",
    "Activities to improve veterinary services in the GP",
    "Activities to improve School infrastructure in the GP",
    "Preparation of Sankalp-based GPDP",
  ],
  "Socially Just & Socially Secured Village": [
    "Activities to Promote NSAP/ similar State Pension scheme.",
    "Activities to support GP to deliver services to persons with disability",
    "Ayushman Health Cards",
    "Preparation of Sankalp-based GPDP",
  ],
  "Village with Good Governance": [
    "Activities related to Gram Sabha",
    "Activities to improve financial management and record maintenance in the GP",
    "Facilitating the process of GPDP",
    "Activities relate to service delivery",
    "Preparation of Sankalp-based GPDP",
  ],
  "Women Friendly Villages": [
    "Organising Mahila Sabha/ Facilitating the Conduct of Mahila Sabha Meeting in the GP.",
    "Activities to improve the enrolment of girl children and enrolment of drop-out girl children from school.",
    "Activities to improve the health of girl children and women in the GP",
    "Enrolment of women in Self-help Groups",
    "Preparation of Sankalp-based GPDP",
  ],
  "No work Day": ["Public Holiday", "Weekoff", "Leave"],
  "Others(100 words Only)": ["Others"],
  Tour: ["Tour"],
};

const YFPoa4FormSep = ({ update }) => {
  const currentMonthIndex = 8; // September
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [formDataState, setFormData] = useState([]);
  const [rows, setRows] = useState([]);
  const selectedMonth = months[currentMonthIndex];
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [allGps, setAllGps] = useState([]);

  const weekStart = 22;
  const weekEnd = selectedMonth.days;

  function getAugustDate(day, year = new Date().getFullYear()) {
    return new Date(Date.UTC(year, 7, day));
  }

  const augustDate = getAugustDate(14, 2024);

  useEffect(() => {
    if (update) {
      const fetchPoalData = async () => {
        try {
          const response = await API.get(`/api/v1/poa1/get/${poalId}`);
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
        setAllDistricts(data.districts);
        setAllBlocks(data.blocks);
        setAllGps(data.gps);
        setStates(data.states);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLocations();
  }, []);

  const getDaysInMonth = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  // Initialize rows for the table
  useEffect(() => {
    const initialRows = getDaysInMonth(weekStart, weekEnd).map((day) => ({
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
      [day]: { ...prev[day], kpiTheme: selectedTheme, activity: "" },
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
          `poaData[${row.date}][kpi_theme]`,
          dayData.kpiTheme || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][activity]`,
          dayData.activity || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][plannedEvent]`,
          dayData.plannedEvent || ""
        );
        formDataToSubmit.append(`poaData[${row.date}][poaType]`, "poa4");
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
        `/api/v1/yf-poa1/create?created_at=${augustDate}`,
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-full lg:max-w-[80vw]"
      style={{ fontSize: "14px", margin: "0 auto" }}
    >
      <AdminHeader>
        Fourth Weekly Plan Of Action - Month : {selectedMonth.name}{" "}
        {currentYear}
      </AdminHeader>

      <Table
        border="1"
        cellPadding="3"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Weekday</th>
            <th>KPI Theme</th>
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
                  <button onClick={() => handleAddRow(day.date)}>
                    <PlusCircle className="text-primary text-sm w-[1.1rem] mt-1" />
                  </button>
                </td>
                <td>{formatIndianDate(day.date)}</td>
                <td>{getWeekDay(day.date)}</td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={dayData.kpiTheme || ""}
                    onChange={(e) =>
                      handleKpiThemeChange(day.id, e.target.value)
                    }
                  >
                    <option value="">Select KPI Theme</option>
                    {Object.keys(kpiThemes).map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
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
                    disabled={!dayData.kpiTheme}
                  >
                    <option value="">Select Activity</option>
                    {dayData.kpiTheme &&
                      kpiThemes[dayData.kpiTheme].map((activity, index) => (
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
                    ))}
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
                    ))}
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
                    ))}
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
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "achievements", e.target.value)
                    }
                    value={dayData.achievements || ""}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleInputChange(day.id, "photo", e.target.files[0])
                    }
                  />
                </td>
                <td>
                  <input
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

export default YFPoa4FormSep;
