import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tst } from "@/lib/utils";

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
  ],
  "Development/customization of Learning Materials": [
    "Develop/customize learning material on LSDGs/GPDP/Panchayat Governance/PESA/OSR",
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
  "No work Day": ["Public Holiday", "Weekoff"],
  "Others(100 words Only)": ["Others"],
};

const POA2Form = ({ update }) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedState, setSelectedState] = useState();
  const [plans, setPlans] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [formDataState, setFormData] = useState([]);
  const selectedMonth = months[currentMonthIndex];
  const { soeprState: states, soeprDist: districts } = useSoeprLocation({
    state_id: selectedState,
  });
  const [isEditableOn16th, setIsEditableOn16th] = useState(false);
  const [isEditableOnLastDay, setIsEditableOnLastDay] = useState(false);

  // Determine the start and end date of the second fortnight
  const startDate = new Date(currentYear, currentMonthIndex, 16);
  const endDate = new Date(currentYear, currentMonthIndex, selectedMonth.days);
  const today = new Date();

  useEffect(() => {
    // Set editability based on today's date
    const isToday16th = today.getDate() >= 16;
    const isTodayLastDay = today.getDate() === selectedMonth.days;

    setIsEditableOn16th(isToday16th);
    setIsEditableOnLastDay(isTodayLastDay);
  }, [today, selectedMonth]);

  const [loading, setLoading] = useState(false);

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

  const getDaysInMonth = () => {
    const startDay = 16;
    const endDay = selectedMonth.days;
    return Array.from(
      { length: endDay - startDay + 1 },
      (_, i) => i + startDay
    );
  };

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
    setLoading(true);
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
        formData.append(`poaData[${day}][poaType]`, "poa2");
        formData.append(
          `poaData[${day}][dist_id]`,
          selectedDistricts[day] || ""
        );
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

      await API.post(
        `/api/v1/poa1/create?poa2_created_at=${Date.now()}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Form submitted successfully!");
    } catch (error) {
      tst.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>
        Second Fortnightly Plan Of Action - Month : {selectedMonth.name}{" "}
        {currentYear}
      </AdminHeader>
      <div style={{ margin: "15px 0", textAlign: "center" }}>
        <p
          style={{
            color: today < startDate || today > endDate ? "red" : "black",
          }}
        >
          Available for Entry: {formatIndianDate(startDate)} -{" "}
          {formatIndianDate(endDate)}
        </p>
      </div>
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <div className="flex gap-2 items-center">
          <h4 className="text-primary font-semibold">State: </h4>
          <p className="font-semibold text-gray-700">{states[0]?.name}</p>
        </div>
      </div>
      <Table
        border="1"
        cellPadding="3"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 text-primary font-bold">Date</TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Weekday
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Action Plan (KPI Category)
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Planned Event
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Tentative Target (Description in 50 words)
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Location
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Achievements
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Upload Photo
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Remarks/Reason for Failure
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getDaysInMonth().map((day, idx) => (
            <TableRow key={idx}>
              <TableCell className="p-2">{formatIndianDate(day)}</TableCell>
              <TableCell className="p-2">{getWeekDay(day)}</TableCell>
              <TableCell className="p-2">
                <select
                  className="px-2 py-1 rounded"
                  style={{ width: "100%" }}
                  value={plans[day] || ""}
                  onChange={(e) => handlePlanChange(day, e.target.value)}
                  disabled={!isEditableOn16th}
                >
                  <option value="">Select</option>
                  {Object.keys(planOfDayOptions).map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell className="p-2">
                <select
                  className="px-2 py-1 rounded"
                  style={{ width: "100%" }}
                  value={selectedActions[day] || ""}
                  onChange={(e) => handleActionChange(day, e.target.value)}
                  disabled={!plans[day] || !isEditableOn16th}
                  required
                >
                  <option value="">Select</option>
                  {plans[day] &&
                    planOfDayOptions[plans[day]].map((action) => (
                      <option key={action} value={action}>
                        {action}
                      </option>
                    ))}
                </select>
              </TableCell>
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "plannedEvent", e.target.value)
                  }
                  value={formDataState[day]?.plannedEvent || ""}
                  disabled={!isEditableOn16th}
                />
              </TableCell>
              <TableCell className="p-2">
                <select
                  className="px-2 py-1 rounded min-w-20"
                  style={{ width: "100%" }}
                  onChange={(e) => handleDistrictChange(day, e.target.value)}
                  value={selectedDistricts[day] || ""}
                  required
                  disabled={!isEditableOn16th}
                >
                  <option value="" disable>
                    Select Location
                  </option>
                  {districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                  <option value="NIRD">NIRD</option>
                  <option value="SIRD/SPRC">SIRD/SPRC</option>
                  <option value="ETC">ETC</option>
                  <option value="NoVal">None</option>
                </select>
              </TableCell>
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "achievements", e.target.value)
                  }
                  value={formDataState[day]?.achievements || ""}
                  disabled={!isEditableOnLastDay}
                />
              </TableCell>
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="file"
                  onChange={(e) =>
                    handleInputChange(day, "photo", e.target.files[0])
                  }
                  disabled={!isEditableOnLastDay}
                />
              </TableCell>
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "remarks", e.target.value)
                  }
                  disabled={!isEditableOnLastDay}
                  value={formDataState[day]?.remarks || ""}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end md:px-10">
        <Button pending={loading} onClick={handleSubmit} className="mt-4">
          {loading ? "Submitting ..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default POA2Form;
