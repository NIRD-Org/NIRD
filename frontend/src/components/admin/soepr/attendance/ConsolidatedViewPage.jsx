import React, { useState, useEffect } from "react";
import API from "@/utils/API";
import AdminHeader from "../../AdminHeader";
import { Table } from "@/components/ui/table"; // Assuming you have a Table component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formfield";

function ConsolidatedViewPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        
        // Calculate start and end dates based on selected month and year
        const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
        const endOfMonth = new Date(selectedYear, selectedMonth, 0);

        // Fetch AM and PM entries data
        const [amResponse, pmResponse] = await Promise.all([
          API.get("/api/v1/am-entries", {
            params: {
              startDate: startOfMonth.toISOString().split("T")[0],
              endDate: endOfMonth.toISOString().split("T")[0],
            },
          }),
          API.get("/api/v1/pm-entries", {
            params: {
              startDate: startOfMonth.toISOString().split("T")[0],
              endDate: endOfMonth.toISOString().split("T")[0],
            },
          }),
        ]);

        const amEntries = amResponse.data.data;
        const pmEntries = pmResponse.data.data;

        // Organize entries by date
        const combinedEntries = {};

        amEntries.forEach((entry) => {
          const { date, time: amTime, status: amStatus, remarks: amRemarks, location: amLocation } = entry;
          if (!combinedEntries[date]) {
            combinedEntries[date] = {
              date,
              day: new Date(date).toLocaleDateString(undefined, { weekday: "long" }),
              timeOfAMEntry: amTime || "N/A",
              statusOfAMEntry: amStatus || "Absent",
              remarksOfAMEntry: amRemarks || "Absent",
              locationOfAMEntry: amLocation || "Absent",
              timeOfPMEntry: "N/A",
              statusOfPMEntry: "Absent",
              remarksOfPMEntry: "Absent",
              locationOfPMEntry: "Absent",
            };
          }
        });

        pmEntries.forEach((entry) => {
          const { date, time: pmTime, status: pmStatus, remarks: pmRemarks, location: pmLocation } = entry;
          if (!combinedEntries[date]) {
            combinedEntries[date] = {
              date,
              day: new Date(date).toLocaleDateString(undefined, { weekday: "long" }),
              timeOfAMEntry: "N/A",
              statusOfAMEntry: "Absent",
              remarksOfAMEntry: "Absent",
              locationOfAMEntry: "Absent",
              timeOfPMEntry: pmTime || "N/A",
              statusOfPMEntry: pmStatus || "Absent",
              remarksOfPMEntry: pmRemarks || "Absent",
              locationOfPMEntry: pmLocation || "Absent",
            };
          } else {
            combinedEntries[date] = {
              ...combinedEntries[date],
              timeOfPMEntry: pmTime || "N/A",
              statusOfPMEntry: pmStatus || "Absent",
              remarksOfPMEntry: pmRemarks || "Absent",
              locationOfPMEntry: pmLocation || "Absent",
            };
          }
        });

        setEntries(Object.values(combinedEntries));
      } catch (error) {
        setError("Error fetching entries");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Consolidated View of AM and PM Entries</AdminHeader>
      
      <div className="mb-4">
        <div className="flex gap-4">
          <div>
            <Label htmlFor="month">Select Month</Label>
            <Input
              id="month"
              type="number"
              min="1"
              max="12"
              value={selectedMonth}
              onChange={handleMonthChange}
              placeholder="Month"
            />
          </div>
          <div>
            <Label htmlFor="year">Select Year</Label>
            <Input
              id="year"
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              value={selectedYear}
              onChange={handleYearChange}
              placeholder="Year"
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEntries([]);
            setLoading(true);
          }}
        >
          Load Entries
        </Button>
      </div>
      
      <Table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Date</th>
            <th>Day</th>
            <th>Time of AM Entry</th>
            <th>Status of AM Entry</th>
            <th>Remarks of AM Entry</th>
            <th>Location of AM Entry</th>
            <th>Time of PM Entry</th>
            <th>Status of PM Entry</th>
            <th>Remarks of PM Entry</th>
            <th>Location of PM Entry</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.date}</td>
              <td>{entry.day}</td>
              <td>{entry.timeOfAMEntry}</td>
              <td>{entry.statusOfAMEntry}</td>
              <td>{entry.remarksOfAMEntry}</td>
              <td>{entry.locationOfAMEntry}</td>
              <td>{entry.timeOfPMEntry}</td>
              <td>{entry.statusOfPMEntry}</td>
              <td>{entry.remarksOfPMEntry}</td>
              <td>{entry.locationOfPMEntry}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ConsolidatedViewPage;
