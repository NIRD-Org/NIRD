import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
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





const UpdatePMUPOA1Form = () => {
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
          `/api/v1/pmu-poa/get/${poalId}?poaType=${poaType}`
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

     const poaData = Object.keys(formDataState).flatMap(
       (day) =>
         formDataState[day]?.map((item, index) => ({
           date: formatIndianDate(day),
           weekday: getWeekDay(day),
           plannedEvent: item.plannedEvent || "",
           target: item.target || "",
           achievements: item.achievements || "",
           remarks: item.remarks || "",
           poaType,
         })) || []
     );


      await API.post(`/api/v1/pmu-poa/update/${poalId}`, {poaData}, {
        headers: { "Content-Type": "application/json" },
      });

      showAlert("Form updated successfully!");
      navigate(`/admin/PMU/POA/view/${poalId}`);
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
      <div className="mb-4 flex gap-5 justify-end px-5 md:px-12">
      
        <div className="flex flex-col">
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
                  Planned Event
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Target
                </TableHead>
                
                <TableHead className="px-2 text-primary font-bold">
                  Achievements
                </TableHead>
                {/* <TableHead className="px-2 text-primary font-bold">
                  Upload Photo
                </TableHead> */}
                <TableHead className="px-2 text-primary font-bold">
                  Remarks
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
                          value={entry.target || ""}
                          readOnly
                        />
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

export default UpdatePMUPOA1Form;
