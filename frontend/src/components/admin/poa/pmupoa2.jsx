import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
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
import { showAlert } from "@/utils/showAlert";


const POA2Form = ({ update }) => {
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
  
  const [plans, setPlans] = useState({});
  
  const [formDataState, setFormData] = useState([]);
 
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(false);

  const [selectedActions, setSelectedActions] = useState({});
  const lastDayOfWeek = 7; 

  function getSubmissionDate(day, year = new Date().getFullYear()) {
    return new Date(Date.UTC(year, selectedMonth, day));
  }

  const submissionDate = getSubmissionDate(14, 2024);

 

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
    Array.from({ length: lastDayOfWeek }, (_, i) => i + 8);

  const getWeekDay = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
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
        
        formData.append(
          `poaData[${day}][achievements]`,
          formDataState[day]?.achievements || ""
        );
        formData.append(`poaData[${day}][poaType]`, "poa1");
        if (formDataState[day]?.photo) {
          formData.append(`poaData[${day}][photo]`, formDataState[day].photo);
        }
        formData.append(
          `poaData[${day}][remarks]`,
          formDataState[day]?.remarks || ""
        );
      });

      await API.post(
        `/api/v1/poa1/create?created_at=${submissionDate}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Form submitted successfully!", "success");
    } catch (error) {
      tst.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>
        Second Weekly Plan Of Action - Month : {months[selectedMonth].name}{" "}
        {currentYear}
      </AdminHeader>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div className="">
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
              Planned Event
            </TableHead>
            <TableHead className="px-2 text-primary font-bold">
              Tentative Target (Description in 50 words)
            </TableHead>
           
            <TableHead className="px-2 text-primary font-bold">
              Achievements
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
              <input
                  className="px-2 py-1 rounded"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "plannedEvent", e.target.value)
                  }
                  value={formDataState[day]?.plannedEvent || ""}
                />
              </TableCell>
              <TableCell className="p-2">
              <input
                  className="px-2 py-1 rounded"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "Target", e.target.value)
                  }
                  value={formDataState[day]?.Target || ""}
                />
              </TableCell>
                           
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  disabled
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "achievements", e.target.value)
                  }
                  value={formDataState[day]?.achievements || ""}
                />
              </TableCell>
              
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  disabled
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "remarks", e.target.value)
                  }
                  value={formDataState[day]?.remarks || ""}
                />
              </TableCell>
              <TableCell className="p-2">
                <input
                  className="px-2 py-1 rounded"
                  type="text"
                  disabled
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange(day, "remarks", e.target.value)
                  }
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

