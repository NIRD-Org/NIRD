import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { useYfLocation } from "@/components/hooks/useYfLocation";

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

const YFPoa4FormAug = ({ update }) => {
  const currentMonthIndex = 7;
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedStates, setSelectedStates] = useState({});
  const [selectedKpiTheme, setSelectedKpiTheme] = useState({});
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [selectedBlocks, setSelectedBlocks] = useState({});
  const [selectedGps, setSelectedGps] = useState({});
  const [formDataState, setFormData] = useState([]);
  const selectedMonth = months[currentMonthIndex];

  // Define the current year and month index (zero-indexed)
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // Current month (0 for January, 11 for December)

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    // month is zero-indexed (0 for January, 11 for December)
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(currentMonth, year);

  // Define the start of the fourth week (22nd day of the month)
  const fourthWeekStart = 22;

  // Define the end of the month
  const fourthWeekEnd = daysInMonth;

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

  const getDaysInWeek = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handleKpiThemeChange = (day, selectedTheme) => {
    setSelectedKpiTheme((prev) => ({ ...prev, [day]: selectedTheme }));
    setSelectedActivities((prev) => ({ ...prev, [day]: "" }));
  };

  const handleActivityChange = (day, selectedActivity) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [day]: selectedActivity,
    }));
  };

  const handleStateChange = (day, selectedState) => {
    setSelectedStates((prev) => ({ ...prev, [day]: selectedState }));
    setSelectedDistricts((prev) => ({ ...prev, [day]: "" }));

    setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
    setSelectedGps((prev) => ({ ...prev, [day]: "" }));
  };

  const handleDistrictChange = (day, selectedDistrict) => {
    setSelectedDistricts((prev) => ({ ...prev, [day]: selectedDistrict }));
    setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
    setSelectedGps((prev) => ({ ...prev, [day]: "" }));
  };

  const handleBlockChange = (day, selectedBlock) => {
    setSelectedBlocks((prev) => ({ ...prev, [day]: selectedBlock }));
    setSelectedGps((prev) => ({ ...prev, [day]: "" }));
  };

  const handleGpChange = (day, selectedGp) => {
    setSelectedGps((prev) => ({ ...prev, [day]: selectedGp }));
  };

  const handleInputChange = (day, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();

      Object.keys(selectedKpiTheme).forEach((day) => {
        formDataToSubmit.append(`poaData[${day}][date]`, formatIndianDate(day));
        formDataToSubmit.append(`poaData[${day}][weekday]`, getWeekDay(day));
        formDataToSubmit.append(
          `poaData[${day}][kpi_theme]`,
          selectedKpiTheme[day]
        );
        formDataToSubmit.append(
          `poaData[${day}][activity]`,
          selectedActivities[day]
        );
        formDataToSubmit.append(
          `poaData[${day}][plannedEvent]`,
          formDataState[day]?.plannedEvent || ""
        );
        formDataToSubmit.append(
          `poaData[${day}][tentativeTarget]`,
          formDataState[day]?.tentativeTarget || ""
        );
        formDataToSubmit.append(`poaData[${day}][poaType]`, "poa4");
        formDataToSubmit.append(
          `poaData[${day}][state_id]`,
          selectedStates[day]
        );
        formDataToSubmit.append(
          `poaData[${day}][dist_id]`,
          selectedDistricts[day] || ""
        );
        formDataToSubmit.append(
          `poaData[${day}][block_id]`,
          selectedBlocks[day] || ""
        );
        formDataToSubmit.append(
          `poaData[${day}][gp_id]`,
          selectedGps[day] || ""
        );
        formDataToSubmit.append(
          `poaData[${day}][achievements]`,
          formDataState[day]?.achievements || ""
        );

        if (formDataState[day]?.photo) {
          formDataToSubmit.append(
            `poaData[${day}][photo]`,
            formDataState[day].photo
          );
        }
        formDataToSubmit.append(
          `poaData[${day}][remarks]`,
          formDataState[day]?.remarks || ""
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
    }
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
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
          {getDaysInWeek(fourthWeekStart, fourthWeekEnd).map((day, idx) => {
            const { yfState: states } = useYfLocation({
              state_id: selectedStates[day],
            });
            const { yfDist: districts } = useYfLocation({
              state_id: selectedStates[day],
            });
            const { yfBlock: blocks } = useYfLocation({
              state_id: selectedStates[day],
              dist_id: selectedDistricts[day],
            });
            const { yfGp: gps } = useYfLocation({
              state_id: selectedStates[day],
              dist_id: selectedDistricts[day],
              block_id: selectedBlocks[day],
            });

            return (
              <tr key={idx}>
                <td>{formatIndianDate(day)}</td>
                <td>{getWeekDay(day)}</td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={selectedKpiTheme[day] || ""}
                    onChange={(e) => handleKpiThemeChange(day, e.target.value)}
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
                    value={selectedActivities[day] || ""}
                    onChange={(e) => handleActivityChange(day, e.target.value)}
                    disabled={!selectedKpiTheme[day]}
                  >
                    <option value="">Select Activity</option>
                    {selectedKpiTheme[day] &&
                      kpiThemes[selectedKpiTheme[day]].map(
                        (activity, index) => (
                          <option key={index} value={activity}>
                            {activity}
                          </option>
                        )
                      )}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day, "plannedEvent", e.target.value)
                    }
                    value={formDataState[day]?.plannedEvent || ""}
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day, "tentativeTarget", e.target.value)
                    }
                    value={formDataState[day]?.tentativeTarget || ""}
                  />
                </td>
                <td>
                  <select
                    className="w-fit px-2 py-1 rounded min-w-40"
                    value={selectedStates[day] || ""}
                    onChange={(e) => handleStateChange(day, e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {states &&
                      states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    <option value="None">None</option>
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleDistrictChange(day, e.target.value)}
                    value={selectedDistricts[day] || ""}
                  >
                    <option value="">Select Location</option>
                    {districts?.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </td>
                {/* Block Selection */}
                <td>
                  <select
                    onChange={(e) => handleBlockChange(day, e.target.value)}
                    value={selectedBlocks[day] || ""}
                    disabled={!selectedDistricts[day]}
                  >
                    <option value="">Select Block</option>
                    {blocks?.map((block) => (
                      <option key={block.id} value={block.id}>
                        {block.name}
                      </option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </td>
                {/* GP Selection */}
                <td>
                  <select
                    onChange={(e) => handleGpChange(day, e.target.value)}
                    value={selectedGps[day] || ""}
                    disabled={!selectedBlocks[day]}
                  >
                    <option value="">Select GP</option>
                    {gps?.map((gp) => (
                      <option key={gp.id} value={gp.id}>
                        {gp.name}
                      </option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day, "achievements", e.target.value)
                    }
                    value={formDataState[day]?.achievements || ""}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFormData((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], photo: file },
                      }));
                    }}
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day, "remarks", e.target.value)
                    }
                    value={formDataState[day]?.remarks || ""}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button
        onClick={handleSubmit}
        className="primary-button mb-10 float-right mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default YFPoa4FormAug;
