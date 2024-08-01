import React, { useState, useEffect } from "react";
import API from "@/utils/API";
import AdminHeader from "../../AdminHeader";
import { Table } from "@/components/ui/table"; // Assuming you have a Table component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formfield";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
); // Last 50 years

function ConsolidatedViewPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  const fetchEntries = async () => {
    try {
      setLoading(true);

      // Fetch AM and PM entries data
      const [amResponse, pmResponse] = await Promise.all([
        API.get(
          `/api/v1/am-upload/get-attendance?month=${selectedMonth}&year=${selectedYear}`
        ),
        API.get(
          `/api/v1/pm-upload/get-attendance?month=${selectedMonth}&year=${selectedYear}`
        ),
      ]);

      const amEntries = amResponse.data.attendanceData;
      const pmEntries = pmResponse.data.attendanceData;

      // Organize entries by date
      const combinedEntries = {};

      amEntries.forEach((entry) => {
        const {
          date,
          time: amTime,
          amStatus: amStatus,
          remarks: amRemarks,
          location: amLocation,
        } = entry;
        if (!combinedEntries[date]) {
          combinedEntries[date] = {
            date,
            day: new Date(date).toLocaleDateString(undefined, {
              weekday: "long",
            }),
            timeOfAMEntry: amTime || "N/A",
            statusOfAMEntry: amStatus || "Absent",
            remarksOfAMEntry: amRemarks || "Absent",
            locationOfAMEntry: amLocation || "Absent",
            timeOfPMEntry: "N/A",
            statusOfPMEntry: "Absent",
            remarksOfPMEntry: "Absent",
            locationOfPMEntry: "Absent",
          };
        } else {
          combinedEntries[date] = {
            ...combinedEntries[date],
            timeOfAMEntry: amTime || "N/A",
            statusOfAMEntry: amStatus || "Absent",
            remarksOfAMEntry: amRemarks || "Absent",
            locationOfAMEntry: amLocation || "Absent",
          };
        }
      });

      pmEntries.forEach((entry) => {
        const {
          date,
          time: pmTime,
          pmStatus: pmStatus,
          remarks: pmRemarks,
          location: pmLocation,
        } = entry;
        if (!combinedEntries[date]) {
          combinedEntries[date] = {
            date,
            day: new Date(date).toLocaleDateString(undefined, {
              weekday: "long",
            }),
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
      setEntries([]);
      setError("Error fetching entries");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Consolidated View of AM and PM Entries</AdminHeader>

      <div className="mb-5">
        <div className="flex gap-4 mb-4">
          <div>
            <FormField
              type="select"
              label="Select Month"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              options={months}
            />
          </div>
          <div>
            <FormField
              type="select"
              label="Select Year"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              options={years.map((year) => ({
                value: year,
                label: year,
              }))}
            />
          </div>
        </div>
        <Button
          type="button"
          className="mt-5"
          onClick={() => {
            fetchEntries();
          }}
        >
          Load Entries
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="whitespace-nowrap px-3 py-3">Sl. No.</th>
            <th className="whitespace-nowrap px-3 py-3">Date</th>
            <th className="whitespace-nowrap px-3 py-3">Time of AM Entry</th>
            <th className="whitespace-nowrap px-3 py-3">Status of AM Entry</th>
            <th className="whitespace-nowrap px-3 py-3">
              Location of AM Entry
            </th>
            <th className="whitespace-nowrap px-3 py-3">Time of PM Entry</th>
            <th className="whitespace-nowrap px-3 py-3">Status of PM Entry</th>
            <th className="whitespace-nowrap px-3 py-3">
              Location of PM Entry
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} className="text-center py-3">
              <td className="whitespace-nowrap px-3 py-2">{index + 1}</td>
              <td className="whitespace-nowrap px-3 py-2">{entry.date}</td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.timeOfAMEntry}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.statusOfAMEntry}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.locationOfAMEntry}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.timeOfPMEntry}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.statusOfPMEntry}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {entry.locationOfPMEntry}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ConsolidatedViewPage;
