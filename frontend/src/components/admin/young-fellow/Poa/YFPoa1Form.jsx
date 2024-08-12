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

const planOfDayOptions = {
  "Functioning of Gram Panchayats/ Gram Sabhas": [
    "Observe Ward Sabhas",
    "Observe Mahila Sabhas",
    "Ensure Agenda of Gram Sabha circulated/ uploaded through Panchayat Nirnay app/Meeting Online App",
    "Observe Gram Sabha",
    "Make aware of Panchayat Nirnay app/Meeting Online App",
  ],
  "Training Needs Assessment (TNA) facilitated": [
    "To Facilitate State Level/ District Level/Block Level TNAs",
  ],
  "Training Calendar preparation": [
    "To facilitate preparation of Training Calendar at State/ District/ Block Level",
    "To design/ facilitate to design Trainings  ",
    "To prepare/Update Training modules",
  ],
  "Development/customization of Learning Materials": [
    "Develop/customize learning material on LSDGs/GPDP/Panchayat Governance/PESA/OSR",
    "Conduct Training Session as a Resource Person",
    "Visit to Training Institutions (SPRC/ETC/DPRC/PTC/BPRC/PLC) ",
  ],
  "Participation in GPDP": [
    "Facilitate to update Gram Panchayat Profile (MoPR Portals)",
    "To ensure inclusion of flagship schemes under planning",
    "To ensure inclusion of flagship schemes included in resource envelope",
    "To ensure implementation of activities in Sankalp theme",
    "To facilitate GP to take up low-cost activities",
    "To facilitate GP to take up no-cost activities",
  ],
  "Augmentation of Own Source Revenue (OSR) by PRIs": [
    "To ensure preparation of GP OSR rule",
  ],
  "Delivery of Services mentioned in the Citizen Charter": [
    "Percentage of Services delivered by the GP compared to the listed Services mentioned in the Citizen Charter",
  ],
  "Partnership on CB&T initiatives": [
    "To visit the District Magistrate/District Panchayat Officer/line department officers for effective partnership on CB&T initiatives",
    "To visit NGOs for effective partnership on CB&T initiatives",
  ],
  "Monitoring and documentation": [
    "To Monitor Model GP Clusters",
    "To Prepare Case Studies",
    "To make documentation of Good Practices",
  ],
  "No work Day": ["Public Holiday", "Weekoff", "Casual Leave"],
  "Others(100 words Only)": ["Others"],
};

const YFPoa1Form = ({ update }) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedState, setSelectedState] = useState();
  const [plans, setPlans] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [selectedGps, setSelectedGps] = useState({});
  const [selectedBlocks, setSelectedBlocks] = useState({});

  const [formDataState, setFormData] = useState([]);
  const selectedMonth = months[currentMonthIndex];
  const {
    yfState: states,
    yfDist: districts,
    yfBlock: blocks,
    yfGp: gps,
  } = useYfLocation({
    state_id: selectedState,
    dist_id: selectedDistricts?.[1],
    block_id: selectedBlocks?.[1],
  });

  const [selectedActions, setSelectedActions] = useState({});
  const lastDayOfFortnight = 15; // Last day of the first fortnight

  useEffect(() => {
    setSelectedState(states?.[0]?.id);
  }, [states]);

  useEffect(() => {
    if (update) {
      const fetchPoalData = async () => {
        try {
          const response = await API.get(`/api/v1/poa1/get/${poalId}`);
          setFormData(response.data.data.poaData);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchPoalData();
    }
  }, [poalId]);

  const getDaysInMonth = () =>
    Array.from({ length: lastDayOfFortnight }, (_, i) => i + 1);

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handlePlanChange = (day, selectedPlan) => {
    setPlans((prev) => ({ ...prev, [day]: selectedPlan }));
    setSelectedActions((prev) => ({ ...prev, [day]: "" }));
  };

  const handleActionChange = (day, selectedAction) => {
    setSelectedActions((prev) => ({
      ...prev,
      [day]: selectedAction,
    }));
  };

  const handleDistrictChange = (day, selectedDistrict) => {
    setSelectedDistricts((prev) => ({ ...prev, [day]: selectedDistrict }));
  };

  const handleBlockChange = (day, selectedBlock) => {
    setSelectedBlocks((prev) => ({ ...prev, [day]: selectedBlock }));
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
      const formData = new FormData();

      Object.keys(plans).forEach((day) => {
        formData.append(`poaData[${day}][date]`, formatIndianDate(day));
        formData.append(`poaData[${day}][weekday]`, getWeekDay(day));
        formData.append(`poaData[${day}][plan]`, plans[day]);
        formData.append(`poaData[${day}][action]`, selectedActions[day]);
        formData.append(
          `poaData[${day}][plannedEvent]`,
          formDataState[day]?.plannedEvent || ""
        );
        formData.append(`poaData[${day}][state_id]`, selectedState);
        formData.append(
          `poaData[${day}][dist_id]`,
          selectedDistricts[day] || ""
        );
        formData.append(`poaData[${day}][block_id]`, selectedBlocks[day] || "");
        formData.append(`poaData[${day}][gp_id]`, selectedGps[day] || "");
        formData.append(
          `poaData[${day}][achievements]`,
          formDataState[day]?.achievements || ""
        );

        if (formDataState[day]?.photo) {
          formData.append(`poaData[${day}][photo]`, formDataState[day].photo);
        }
        formData.append(
          `poaData[${day}][remarks]`,
          formDataState[day]?.remarks || ""
        );
      });

      await API.post("/api/v1/yf-poa1/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit form.");
    }
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>
        First Fortnightly Plan Of Action - Month : {selectedMonth.name}{" "}
        {currentYear}
      </AdminHeader>
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <select
          className="w-fit px-2 py-1 rounded"
          value={selectedState || ""}
          onChange={(e) => setSelectedState(e.target.value)}
          required
        >
          <option value="">Select</option>
          {states &&
            states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
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
            <th>Date</th>
            <th>Weekday</th>
            <th>Action Plan (KPI Category)</th>
            <th>Planned Event</th>
            <th>Tentative Target (Description in 50 words)</th>
            <th>Location</th>
            <th>Block</th>
            <th>Gram Panchayat</th>

            <th>Achievements</th>
            <th>Upload Photo</th>
            <th>Remarks/Reason for Failure</th>
          </tr>
        </thead>
        <tbody>
          {getDaysInMonth().map((day, idx) => (
            <tr key={idx}>
              <td>{formatIndianDate(day)}</td>
              <td>{getWeekDay(day)}</td>
              <td>
                <select
                  style={{ width: "100%" }}
                  value={plans[day] || ""}
                  onChange={(e) => handlePlanChange(day, e.target.value)}
                >
                  <option value="">Select</option>
                  {Object.keys(planOfDayOptions).map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  style={{ width: "100%" }}
                  value={selectedActions[day] || ""}
                  onChange={(e) => handleActionChange(day, e.target.value)}
                  disabled={!plans[day]}
                >
                  <option value="">Select</option>
                  {plans[day] &&
                    planOfDayOptions[plans[day]].map((action) => (
                      <option key={action} value={action}>
                        {action}
                      </option>
                    ))}
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
                <select
                  style={{ width: "100%" }}
                  onChange={(e) => handleDistrictChange(day, e.target.value)}
                  value={selectedDistricts[day] || ""}
                  disabled={!districts}
                  required
                >
                  <option value="" disable>
                    Select Location
                  </option>
                  {districts?.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                  <option value="NIRD">NIRD</option>
                  <option value="SIRD/SPRC">SIRD/SPRC</option>
                  <option value="None">None</option>
                </select>
              </td>
              <td>
                <select
                  style={{ width: "100%" }}
                  onChange={(e) => handleBlockChange(day, e.target.value)}
                  value={selectedBlocks[day] || ""}
                  disabled={!blocks}
                >
                  <option value="" disable>
                    Select Block
                  </option>
                  {blocks?.map((block) => (
                    <option key={block.id} value={block.id}>
                      {block.name}
                    </option>
                  ))}
                </select>
              </td>{" "}
              <td>
                <select
                  style={{ width: "100%" }}
                  onChange={(e) => handleGpChange(day, e.target.value)}
                  value={selectedGps[day] || ""}
                  disabled={!gps}
                >
                  <option value="" disable>
                    Select GP
                  </option>
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
                  disabled
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
                  disabled
                  onChange={(e) =>
                    handleInputChange(day, "photo", e.target.files[0])
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  disabled
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "remarks", e.target.value)
                  }
                  value={formDataState[day]?.remarks || ""}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={handleSubmit}
        className="primary-button float-right mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default YFPoa1Form;
