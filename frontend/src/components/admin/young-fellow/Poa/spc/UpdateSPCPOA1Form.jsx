import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import toast from "react-hot-toast";
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
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { showAlert } from "@/utils/showAlert";

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

const UpdateSPCPOA1Form = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedState, setSelectedState] = useState();
  const [plans, setPlans] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [formDataState, setFormData] = useState({});
  const selectedMonth = months[currentMonthIndex];
  const {
    yfState: states,
    yfDist: districts,
    yfBlock: blocks,
    yfGp: gps,
  } = useYfLocation({
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
          `/api/v1/spc-poa1/get/${poalId}?poaType=${poaType}`
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
        console.log(groupedData);
        
        setFormData(groupedData);
      } catch (error) {
        setFormData({});
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

      Object.keys(formDataState).forEach((day) => {
        formDataState[day].forEach((item, index) => {
          formData.append(`poaData[${day}][${index}][date]`, item.date);
          formData.append(`poaData[${day}][${index}][weekday]`, item.weekday);
          formData.append(
            `poaData[${day}][${index}][plan]`,
            item.plan
          );
          formData.append(`poaData[${day}][${index}][activity]`, item.activity);
          formData.append(
            `poaData[${day}][${index}][plannedEvent]`,
            item.plannedEvent || ""
          );
          formData.append(
            `poaData[${day}][${index}][tentativeTarget]`,
            item.tentativeTarget || ""
          );
          formData.append(`poaData[${day}][${index}][state_id]`, item.state_id);
          formData.append(`poaData[${day}][${index}][dist_id]`, item.dist_id);
          formData.append(`poaData[${day}][${index}][block_id]`, item.block_id);
          formData.append(`poaData[${day}][${index}][gp_id]`, item.gp_id);

          formData.append(`poaData[${day}][${index}][poaType]`, poaType);
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

      await API.post(`/api/v1/spc-poa1/update/${poalId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("Form updated successfully!");
      navigate(`/admin/spc/POA1/view/${poalId}`);
    } catch (error) {
      console.log(error);

      tst.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-screen md:max-w-[80vw]"
      style={{ fontSize: "14px", margin: "0 auto" }}
    >
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
            <option value="poa3">POA3</option>
            <option value="poa4">POA4</option>
          </select>
        </div>
      </div>

      {formDataState &&
      !(
        Object.keys(formDataState).length === 0 &&
        formDataState.constructor === Object
      ) ? (
        <>
          <Table style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 text-primary font-bold">
                  Date
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Weekday
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Task
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Activity
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Planned Event
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Tentative Target (Description in 50 words)
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  State
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  District
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Block
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Gram Panchayat
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
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.plan || ""}
                          onChange={(e) =>
                            handlePlanChange(day, index, e.target.value)
                          }
                          disabled
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
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.activity || ""}
                          onChange={(e) =>
                            handleActionChange(day, index, e.target.value)
                          }
                          disabled={!entry.plan}
                        >
                          <option value="">Select</option>
                          {entry.activity &&
                            planOfDayOptions[entry.plan]?.map(
                              (action, idx) => (
                                <option key={idx} value={action}>
                                  {action}
                                </option>
                              )
                            )}
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-28"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.plannedEvent || ""}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          className="px-2 py-1 rounded min-w-28"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.tentativeTarget || ""}
                          readOnly
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.state_id || ""}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value={entry.state.id}>
                            {entry?.state.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.dist_id || ""}
                          disabled
                        >
                          <option value="">Select</option>

                          <option value={entry?.district?.id}>
                            {entry?.district?.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.block_id || ""}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value={entry?.block?.id}>
                            {entry?.block?.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>{" "}
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.gp_id || ""}
                          disabled
                        >
                          <option value={entry?.gp.id}>{entry?.gp.name}</option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-24"
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
                          className="px-2 py-1 rounded min-w-24"
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
                          className="px-2 py-1 rounded min-w-24"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.remarks || ""}
                          onChange={(e) =>
                            handleInputChange(
                              day,
                              index,
                              "remarks",
                              e.target.value
                            )
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
        </>
      ) : (
        <div className="text-center texxt-2xl md:text-4xl text-gray-500">
          No Data found
        </div>
      )}
    </div>
  );
};

export default UpdateSPCPOA1Form;
