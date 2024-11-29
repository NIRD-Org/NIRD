import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showAlert } from "@/utils/showAlert";

const POA2Form = ({ update }) => {
  const poaType = "poa2"; // Fixed poaType for this form
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [formDataState, setFormDataState] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(false);

  const lastDayOfWeek = 7
  const getDaysInWeek = () =>
    Array.from({ length: lastDayOfWeek }, (_, i) => i + 8);

  // Format the date into Indian format (DD/MM/YYYY)
  const formatIndianDate = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN");
  };

  // Get the weekday of a specific date
  const getWeekDay = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  // Handle input changes for each field
  const handleInputChange = (day, key, value) => {
    setFormDataState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
  };

  // Submit form data to the backend
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const poaData = Object.keys(formDataState).map((day) => ({
        date: formatIndianDate(day),
        weekday: getWeekDay(day),
        plannedEvent: formDataState[day]?.plannedEvent || "",
        target: formDataState[day]?.target || "",
        achievements: formDataState[day]?.achievements || "",
        remarks: formDataState[day]?.remarks || "",
        poaType, // Fixed poaType for this form
      }));

      console.log("Submitting payload:", poaData);
      const response = await API.post("/api/v1/pmu-poa/create", { poaData });
      console.log("Response:", response);

      showAlert("Form submitted successfully!", "success");
      setFormDataState({}); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
      showAlert("Failed to submit form. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing data for updates
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        if (update) {
          const response = await API.get(
            `/api/v1/pmu-poa/getUserPOAs?poaType=${poaType}`
          );
          console.log("Fetched data:", response.data);
          const fetchedData = response.data.data;

          const formattedData = fetchedData.reduce((acc, item) => {
            const day = new Date(item.date).getDate();
            acc[day] = {
              plannedEvent: item.plannedEvent,
              target: item.target,
              achievements: item.achievements,
              remarks: item.remarks,
            };
            return acc;
          }, {});

          setFormDataState(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFormData();
  }, [update]);

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>
        Plan of Action - Second Week of {months[selectedMonth]} {currentYear}
      </AdminHeader>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div>
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
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Table style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Weekday</TableHead>
            <TableHead>Planned Event</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Achievements</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getDaysInWeek().map((day) => (
            <TableRow key={day}>
              <TableCell>{formatIndianDate(day)}</TableCell>
              <TableCell>{getWeekDay(day)}</TableCell>
              <TableCell>
                <input
                  type="text"
                  className="w-full px-2 py-1 rounded"
                  value={formDataState[day]?.plannedEvent || ""}
                  onChange={(e) =>
                    handleInputChange(day, "plannedEvent", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="w-full px-2 py-1 rounded"
                  value={formDataState[day]?.target || ""}
                  onChange={(e) =>
                    handleInputChange(day, "target", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="w-full px-2 py-1 rounded"
                  disabled
                  value={formDataState[day]?.achievements || ""}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="w-full px-2 py-1 rounded"
                  disabled
                  value={formDataState[day]?.remarks || ""}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          pending={loading}
          onClick={handleSubmit}
          className="primary-button mt-4"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default POA2Form;
