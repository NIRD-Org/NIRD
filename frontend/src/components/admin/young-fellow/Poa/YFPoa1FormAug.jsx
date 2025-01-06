import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { FaRegTimesCircle } from "react-icons/fa";
import { showAlert } from "@/utils/showAlert";

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

// const YFPoa1Form = ({ update }) => {
//   const currentMonthIndex = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
//   const { id: poalId } = useParams();
//   const [selectedStates, setSelectedStates] = useState({});
//   const [selectedKpiTheme, setSelectedKpiTheme] = useState("");
//   const [selectedActivities, setSelectedActivities] = useState({});
//   const [selectedDistricts, setSelectedDistricts] = useState({});
//   const [selectedGps, setSelectedGps] = useState({});
//   const [selectedBlocks, setSelectedBlocks] = useState({});
//   const [formDataState, setFormData] = useState([]);

//   const selectedMonth = months[currentMonthIndex];

//   const lastDayOfWeek = 7;

//   useEffect(() => {
//     if (update) {
//       const fetchPoalData = async () => {
//         try {
//           const response = await API.get(`/api/v1/yf-poa1/get/${poalId}`);
//           setFormData(response.data.data.poaData);
//         } catch (error) {
//           console.error("Error fetching POA data:", error);
//           toast.error("Error fetching POA data.");
//         }
//       };
//       fetchPoalData();
//     }
//   }, [poalId, update]);

//   const getDaysInMonth = () =>
//     Array.from({ length: lastDayOfWeek }, (_, i) => i + 1);

//   const getWeekDay = (day) => {
//     const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
//     return date.toLocaleDateString("en-IN", { weekday: "long" });
//   };

//   const formatIndianDate = (day) => {
//     const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
//     return date.toLocaleDateString("en-IN");
//   };

//   const handleKpiThemeChange = (day, selectedTheme) => {
//     setSelectedKpiTheme((prev) => ({ ...prev, [day]: selectedTheme }));
//     setSelectedActivities((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleActivityChange = (day, selectedActivity) => {
//     setSelectedActivities((prev) => ({
//       ...prev,
//       [day]: selectedActivity,
//     }));
//   };

//   const handleStateChange = (day, selectedState) => {
//     setSelectedStates((prev) => ({ ...prev, [day]: selectedState }));
//     setSelectedDistricts((prev) => ({ ...prev, [day]: "" }));

//     setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };
//   const handleDistrictChange = (day, selectedDistrict) => {
//     setSelectedDistricts((prev) => ({ ...prev, [day]: selectedDistrict }));
//     setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleBlockChange = (day, selectedBlock) => {
//     setSelectedBlocks((prev) => ({ ...prev, [day]: selectedBlock }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleGpChange = (day, selectedGp) => {
//     setSelectedGps((prev) => ({ ...prev, [day]: selectedGp }));
//   };

//   const handleInputChange = (day, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [key]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formDataToSubmit = new FormData();

//       Object.keys(selectedKpiTheme).forEach((day) => {
//         formDataToSubmit.append(`poaData[${day}][date]`, formatIndianDate(day));
//         formDataToSubmit.append(`poaData[${day}][weekday]`, getWeekDay(day));
//         formDataToSubmit.append(
//           `poaData[${day}][kpi_theme]`,
//           selectedKpiTheme[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][activity]`,
//           selectedActivities[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][plannedEvent]`,
//           formDataState[day]?.plannedEvent || ""
//         );
//         formDataToSubmit.append(`poaData[${day}][poaType]`, "poa1");
//         formDataToSubmit.append(
//           `poaData[${day}][state_id]`,
//           selectedStates[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][dist_id]`,
//           selectedDistricts[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][block_id]`,
//           selectedBlocks[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][gp_id]`,
//           selectedGps[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][achievements]`,
//           formDataState[day]?.achievements || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][tentativeTarget]`,
//           formDataState[day]?.tentativeTarget || ""
//         );

//         if (formDataState[day]?.photo) {
//           formDataToSubmit.append(
//             `poaData[${day}][photo]`,
//             formDataState[day].photo
//           );
//         }
//         formDataToSubmit.append(
//           `poaData[${day}][remarks]`,
//           formDataState[day]?.remarks || ""
//         );
//       });

//       await API.post("/api/v1/yf-poa1/create", formDataToSubmit, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to submit form.");
//     }
//   };

//   return (
//     <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
//       <AdminHeader>
//         First Weekly Plan Of Action - Month : {selectedMonth.name} {currentYear}
//       </AdminHeader>

//       <Table
//         border="1"
//         cellPadding="3"
//         cellSpacing="0"
//         style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
//       >
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Day</th>
//             <th>KPI Theme</th>
//             <th>Activity</th>
//             <th>Planned Event</th>
//             <th>Tentative Target (Description in 50 words)</th>
//             <th>State</th>
//             <th>District</th>
//             <th>Block</th>

//             <th>Gram Panchayat</th>
//             <th>Achievements</th>
//             <th>Photo</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {getDaysInMonth().map((day, idx) => {
//             const { yfState: states } = useYfLocation({
//               state_id: selectedStates[day],
//             });
//             const { yfDist: districts } = useYfLocation({
//               state_id: selectedStates[day],
//             });
//             const { yfBlock: blocks } = useYfLocation({
//               state_id: selectedStates[day],
//               dist_id: selectedDistricts[day],
//             });
//             const { yfGp: gps } = useYfLocation({
//               state_id: selectedStates[day],
//               dist_id: selectedDistricts[day],
//               block_id: selectedBlocks[day],
//             });

//             return (
//               <tr key={idx}>
//                 <td>{formatIndianDate(day)}</td>
//                 <td>{getWeekDay(day)}</td>
//                 <td>
//                   <select
//                     style={{ width: "100%" }}
//                     value={selectedKpiTheme[day] || ""}
//                     onChange={(e) => handleKpiThemeChange(day, e.target.value)}
//                   >
//                     <option value="">Select KPI Theme</option>
//                     {Object.keys(kpiThemes).map((theme) => (
//                       <option key={theme} value={theme}>
//                         {theme}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     style={{ width: "100%" }}
//                     value={selectedActivities[day] || ""}
//                     onChange={(e) => handleActivityChange(day, e.target.value)}
//                     disabled={!selectedKpiTheme[day]}
//                   >
//                     <option value="">Select Activity</option>
//                     {selectedKpiTheme[day] &&
//                       kpiThemes[selectedKpiTheme[day]].map(
//                         (activity, index) => (
//                           <option key={index} value={activity}>
//                             {activity}
//                           </option>
//                         )
//                       )}
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "plannedEvent", e.target.value)
//                     }
//                     value={formDataState[day]?.plannedEvent || ""}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "tentativeTarget", e.target.value)
//                     }
//                     value={formDataState[day]?.tentativeTarget || ""}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="w-fit px-2 py-1 rounded min-w-40"
//                     value={selectedStates[day] || ""}
//                     onChange={(e) => handleStateChange(day, e.target.value)}
//                     required
//                   >
//                     <option value="">Select State</option>
//                     {states &&
//                       states.map((state) => (
//                         <option key={state.id} value={state.id}>
//                           {state.name}
//                         </option>
//                       ))}<option value="None">None</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     onChange={(e) => handleDistrictChange(day, e.target.value)}
//                     value={selectedDistricts[day] || ""}
//                   >
//                     <option value="">Select Location</option>
//                     {districts?.map((dist) => (
//                       <option key={dist.id} value={dist.id}>
//                         {dist.name}
//                       </option>
//                     ))}
//                     <option value="None">None</option>
//                   </select>
//                 </td>
//                 {/* Block Selection */}
//                 <td>
//                   <select
//                     onChange={(e) => handleBlockChange(day, e.target.value)}
//                     value={selectedBlocks[day] || ""}
//                     disabled={!selectedDistricts[day]}
//                   >
//                     <option value="">Select Block</option>
//                     {blocks?.map((block) => (
//                       <option key={block.id} value={block.id}>
//                         {block.name}
//                       </option>
//                     ))}<option value="None">None</option>
//                   </select>
//                 </td>
//                 {/* GP Selection */}
//                 <td>
//                   <select
//                     onChange={(e) => handleGpChange(day, e.target.value)}
//                     value={selectedGps[day] || ""}
//                     disabled={!selectedBlocks[day]}
//                   >
//                     <option value="">Select GP</option>
//                     {gps?.map((gp) => (
//                       <option key={gp.id} value={gp.id}>
//                         {gp.name}
//                       </option>
//                     ))}<option value="None">None</option>
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "achievements", e.target.value)
//                     }
//                     value={formDataState[day]?.achievements || ""}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       handleInputChange(day, "photo", e.target.files[0])
//                     }
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "remarks", e.target.value)
//                     }
//                     value={formDataState[day]?.remarks || ""}
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//       <div style={{ marginTop: "20px" }}>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </div>
//     </div>
//   );
// };

const YFPoa1Formtemp = ({ update }) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = 2024;

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

  const [states, setStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [allGps, setAllGps] = useState([]);

  const lastDayOfWeek = 7;

  function getAugustDate(day, year = new Date().getFullYear()) {
    return new Date(Date.UTC(year, selectedMonth, day));
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

  const getWeekDay = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN");
  };

  const getDaysInMonth = () =>
    Array.from({ length: lastDayOfWeek }, (_, i) => i + 1);

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
        formDataToSubmit.append(`poaData[${row.date}][poaType]`, "poa1");
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

      showAlert("Form submitted successfully!");
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
        First Weekly Plan Of Action - Month : {selectedMonth.name} {currentYear}
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
                    ))}<option> NIRDPR </option>
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
                    <option> SIRD </option>
                    <option> None </option>
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
                   <option> SIRD </option>
                    <option> None </option>
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
                      
                    ))}<option> None </option>
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

export default YFPoa1Formtemp;
