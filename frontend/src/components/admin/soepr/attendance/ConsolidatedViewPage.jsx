import React, { useState, useEffect } from "react";
import API from "@/utils/API";
import AdminHeader from "../../AdminHeader";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
}

function ConsolidatedViewPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  useEffect(() => {
    fetchEntries();
  }, [selectedMonth, selectedYear]);

  const fetchEntries = async () => {
    try {
      setLoading(true);

      // Define the start and end dates
      const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
      let lastDateOfMonth = new Date(selectedYear, selectedMonth, 0);
      const currentDate = new Date();

      // If the selected month and year match the current month and year
      if (
        selectedYear === currentDate.getFullYear() &&
        selectedMonth === currentDate.getMonth() + 1
      ) {
        lastDateOfMonth = currentDate;
      }

      const today = lastDateOfMonth;

      // Fetch AM and PM entries
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

      const combinedEntries = {};

      amEntries.forEach((entry) => {
        const { date, time, amStatus, remarks, location } = entry;
        const entryDate = new Date(date);
        if (entryDate >= startOfMonth && entryDate <= today) {
          const dateStr = formatDate(entryDate);
          if (!combinedEntries[dateStr]) {
            combinedEntries[dateStr] = {
              date: dateStr,
              day: entryDate.toLocaleDateString(undefined, { weekday: "long" }),
              timeOfAMEntry: time || "N/A",
              statusOfAMEntry: amStatus || "N/A",
              remarksOfAMEntry: remarks || "N/A",
              locationOfAMEntry: location || "N/A",
              timeOfPMEntry: "N/A",
              statusOfPMEntry: "N/A",
              remarksOfPMEntry: "N/A",
              locationOfPMEntry: "N/A",
            };
          } else {
            combinedEntries[dateStr].timeOfAMEntry = time || "N/A";
            combinedEntries[dateStr].statusOfAMEntry = amStatus || "N/A";
            combinedEntries[dateStr].remarksOfAMEntry = remarks || "N/A";
            combinedEntries[dateStr].locationOfAMEntry = location || "N/A";
          }
        }
      });

      pmEntries.forEach((entry) => {
        const { date, time, pmStatus, remarks, location } = entry;
        const entryDate = new Date(date);
        if (entryDate >= startOfMonth && entryDate <= today) {
          const dateStr = formatDate(entryDate);
          if (!combinedEntries[dateStr]) {
            combinedEntries[dateStr] = {
              date: dateStr,
              day: entryDate.toLocaleDateString(undefined, { weekday: "long" }),
              timeOfAMEntry: "N/A",
              statusOfAMEntry: "N/A",
              remarksOfAMEntry: "N/A",
              locationOfAMEntry: "N/A",
              timeOfPMEntry: time || "N/A",
              statusOfPMEntry: pmStatus || "N/A",
              remarksOfPMEntry: remarks || "N/A",
              locationOfPMEntry: location || "N/A",
            };
          } else {
            combinedEntries[dateStr].timeOfPMEntry = time || "N/A";
            combinedEntries[dateStr].statusOfPMEntry = pmStatus || "N/A";
            combinedEntries[dateStr].remarksOfPMEntry = remarks || "N/A";
            combinedEntries[dateStr].locationOfPMEntry = location || "N/A";
          }
        }
      });

      // Generate a list of dates from the 1st of the month to today
      const allDates = [];
      for (
        let date = new Date(startOfMonth);
        date <= today;
        date.setDate(date.getDate() + 1)
      ) {
        const dateStr = formatDate(date);
        allDates.push(dateStr);
      }

      // Mark weekends and missing entries
      const sortedEntries = allDates
        .map((date) => {
          const entry = combinedEntries[date] || {
            date,
            day: new Date(
              date.split("/").reverse().join("-")
            ).toLocaleDateString(undefined, { weekday: "long" }),
            timeOfAMEntry: "N/A",
            statusOfAMEntry: "N/A",
            remarksOfAMEntry: "N/A",
            locationOfAMEntry: "N/A",
            timeOfPMEntry: "N/A",
            statusOfPMEntry: "N/A",
            remarksOfPMEntry: "N/A",
            locationOfPMEntry: "N/A",
          };

          const entryDate = new Date(date.split("/").reverse().join("-"));
          const dayOfWeek = entryDate.getDay();

          if (
            entry.statusOfAMEntry === "N/A" &&
            entry.statusOfPMEntry === "N/A"
          ) {
            if (dayOfWeek === 6 || dayOfWeek === 0) {
              entry.statusOfAMEntry = "H";
              entry.statusOfPMEntry = "H";
            } else {
              entry.statusOfAMEntry = "AB";
              entry.statusOfPMEntry = "AB";
            }
          }

          return entry;
        })
        .sort(
          (a, b) =>
            new Date(a.date.split("/").reverse().join("-")) -
            new Date(b.date.split("/").reverse().join("-"))
        );

      setEntries(sortedEntries);
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
    <div className="">
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
      </div>

      {error && <div className="text-red-500">{error}</div>}

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
            <tr key={entry.date}>
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
