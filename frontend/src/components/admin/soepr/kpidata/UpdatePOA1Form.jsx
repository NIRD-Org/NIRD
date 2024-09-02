import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
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

const UpdatePOA1Form = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedState, setSelectedState] = useState();
  const [plans, setPlans] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [formDataState, setFormData] = useState({});
  const selectedMonth = months[currentMonthIndex];
  const { soeprState: states, soeprDist: districts } = useSoeprLocation({
    state_id: selectedState,
  });
  const [loading, setLoading] = useState(false);
  const [poaType, setPoaType] = useState("poa1");
  const [selectedActions, setSelectedActions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedState(states?.[0]?.id);
  }, [states]);

  useEffect(() => {
    const fetchPoalData = async () => {
      try {
        const response = await API.get(
          `/api/v1/poa1/get/${poalId}?poaType=${poaType}`
        );
        const data = response.data.data.poaData;
        const monthName = new Date(
          response.data.data.created_at
        )?.toLocaleString("en-IN", { month: "long" });
        const days = new Date(
          new Date(response.data.data.created_at).getFullYear(),
          new Date(response.data.data.created_at).getMonth() + 1,
          0
        ).getDate();

        selectedMonth.name = monthName;
        selectedMonth.days = days;

        const groupedData = data.reduce((acc, item) => {
          const [day, month, year] = item.date.split("/");
          const parsedDate = new Date(`${year}-${month}-${day}`);
          const dayOfMonth = parsedDate.getDate();

          if (!acc[dayOfMonth]) {
            acc[dayOfMonth] = [];
          }
          acc[dayOfMonth].push(item);
          return acc;
        }, {});

        setFormData(groupedData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchPoalData();
  }, [poalId, poaType]);

  const getDaysInMonth = () =>
    Array.from({ length: selectedMonth.days }, (_, i) => i + 1);

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handlePlanChange = (day, index, selectedPlan) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, plan: selectedPlan } : item
      ),
    }));
    setSelectedActions((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [index]: "",
      },
    }));
  };

  const handleActionChange = (day, index, selectedAction) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, action: selectedAction } : item
      ),
    }));
  };

  const handleDistrictChange = (day, index, selectedDistrict) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, dist_id: selectedDistrict } : item
      ),
    }));
  };

  const handleInputChange = (day, index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      console.log(formDataState);

      Object.keys(formDataState).forEach((day) => {
        formDataState[day].forEach((item, index) => {
          formData.append(`poaData[${day}][${index}][date]`, item.date);
          formData.append(`poaData[${day}][${index}][weekday]`, item.weekday);
          formData.append(`poaData[${day}][${index}][plan]`, item.plan);
          formData.append(`poaData[${day}][${index}][action]`, item.action);
          formData.append(
            `poaData[${day}][${index}][plannedEvent]`,
            item.plannedEvent || ""
          );
          formData.append(`poaData[${day}][${index}][state_id]`, selectedState);
          formData.append(`poaData[${day}][${index}][poaType]`, poaType);
          formData.append(
            `poaData[${day}][${index}][dist_id]`,
            item.dist_id || ""
          );
          formData.append(
            `poaData[${day}][${index}][achievements]`,
            item.achievements || ""
          );

          if (item.photo) {
            formData.append(`poaData[${day}][${index}][photo]`, item.photo);
          }
          formData.append(
            `poaData[${day}][${index}][remarks]`,
            item.remarks || ""
          );
        });
      });

      await API.post(`/api/v1/poa1/update/${poalId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Form updated successfully!");
      navigate(`/admin/soepr/POA1/view/${poalId}`);
    } catch (error) {
      tst.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>
        Update Fortnightly Plan Of Action - Month : {selectedMonth.name}{" "}
        {currentYear}
      </AdminHeader>
      <div className="mb-4 flex gap-5 justify-between px-5 md:px-12">
        <div className="flex gap-2 items-center">
          <h4 className="text-primary font-semibold">State: </h4>
          <p className="font-semibold text-gray-700">{states[0]?.name}</p>
        </div>
        <div className="flex flex-col ml-5">
          <label className="text-sm text-primary text-start py-2 font-semibold">
            POA Type
          </label>
          <select
            className="border text-sm bg-white p-2 px-4 rounded-md"
            value={poaType}
            onChange={(e) => setPoaType(e.target.value)}
          >
            <option value="poa1">POA1</option>
            <option value="poa2">POA2</option>
          </select>
        </div>
      </div>
      <Table style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}>
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
        <tbody>
          {getDaysInMonth().map((day, dayIndex) => (
            <React.Fragment key={dayIndex}>
              {formDataState[day]?.map((entry, index) => (
                <TableRow key={index} className="border-t border-gray-400">
                  {index === 0 && (
                    <>
                      <TableCell
                        className="p-2"
                        rowSpan={formDataState[day].length}
                      >
                        {/* {formatIndianDate(day)} */}
                        {entry?.date}
                      </TableCell>
                      <TableCell
                        className="p-2"
                        rowSpan={formDataState[day].length}
                      >
                        {getWeekDay(day)}
                      </TableCell>
                    </>
                  )}
                  <TableCell className="p-2">
                    <select
                      className="px-2 py-1 rounded"
                      style={{ width: "100%" }}
                      value={entry.plan || ""}
                      onChange={(e) =>
                        handlePlanChange(day, index, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {Object.keys(planOfDayOptions).map((planKey) => (
                        <option key={planKey} value={planKey}>
                          {planKey}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="p-2">
                    <select
                      className="px-2 py-1 rounded"
                      style={{ width: "100%" }}
                      value={entry.action || ""}
                      onChange={(e) =>
                        handleActionChange(day, index, e.target.value)
                      }
                      disabled={!entry.plan}
                    >
                      <option value="">Select</option>
                      {entry.plan &&
                        planOfDayOptions[entry.plan]?.map((action, idx) => (
                          <option key={idx} value={action}>
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
                      value={entry.plannedEvent || ""}
                      onChange={(e) =>
                        handleInputChange(
                          day,
                          index,
                          "plannedEvent",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <select
                      className="px-2 py-1 rounded"
                      style={{ width: "100%" }}
                      value={entry.dist_id || ""}
                      onChange={(e) =>
                        handleDistrictChange(day, index, e.target.value)
                      }
                      disabled
                    >
                      <option value="">Select</option>
                      {districts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name}
                        </option>
                      ))}
                      <option value="NIRD">NIRD</option>
                      <option value="SIRD/SPRC">SIRD/SPRC</option>
                      <option value="None">None</option>
                    </select>
                  </TableCell>
                  <TableCell className="p-2">
                    <input
                      className="px-2 py-1 rounded"
                      type="text"
                      style={{ width: "100%" }}
                      value={entry.achievements || ""}
                      onChange={(e) =>
                        handleInputChange(
                          day,
                          index,
                          "achievements",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <input
                      className="px-2 py-1 rounded"
                      type="file"
                      onChange={(e) =>
                        handleInputChange(
                          day,
                          index,
                          "photo",
                          e.target.files[0]
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <input
                      className="px-2 py-1 rounded"
                      type="text"
                      style={{ width: "100%" }}
                      value={entry.remarks || ""}
                      onChange={(e) =>
                        handleInputChange(day, index, "remarks", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end md:px-10">
        <Button pending={loading} onClick={handleSubmit} className="mt-4">
          {loading ? "Submitting ..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default UpdatePOA1Form;
