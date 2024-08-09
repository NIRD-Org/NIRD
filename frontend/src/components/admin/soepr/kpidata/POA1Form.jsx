import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formfield";
import AdminHeader from "../../AdminHeader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Sample data for dropdowns
const states = ["State 1", "State 2", "State 3"];
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
const years = Array.from({ length: 27 }, (_, i) => 2024 + i);

// Plan of the day options with disabled state
const planOfDayOptions = [
  { value: "Select from the list", disabled: false },
  { value: "Functioning of Gram Panchayats/ Gram Sabhas", disabled: true , color: 'bg-blue-900'},
  { value: "Observe Ward Sabhas", disabled: false },
  { value: "Observe Mahila Sabhas", disabled: false },
  { value: "Ensure Agenda of Gram Sabha circulated/ uploaded through Panchayat Nirnay app/Meeting Online App", disabled: false },
  { value: "Observe Gram Sabha", disabled: false },
  { value: "Make aware of Panchayat Nirnay app/Meeting Online App", disabled: false },
  { value: "Training Needs Assessment (TNA) facilitated", disabled: true ,color: 'bg-blue-900'},
  { value: "To Facilitate State Level/ District Level/Block Level TNAs", disabled: false },
  { value: "Training Calender preparation", disabled: true , color: 'bg-blue-900' },
  { value: "To facilitate preparation of Training Calendar at State/ District/ Block Level", disabled: false },
  { value: "To design/ facilitate to design Trainings", disabled: false },
  { value: "To prepare/Update Training modules", disabled: false },
  { value: " Development/customization of Learning Materials ", disabled: true , color: 'bg-blue-900' },
  { value: "Develop/customize learning material on LSDGs/GPDP/Panchayat Governance/PESA/OSR", disabled: false },
  { value: "Conduct Training Session as a Resource Person", disabled: false },
  { value: "Visit to Training Institutions (SPRC/ETC/DPRC/PTC/BPRC/PLC)", disabled: false },
  { value: " Participation in GPDP ", disabled: true , color: 'bg-blue-900' },
  { value: "Facilitate to update Gram Panchayat Profile (MoPR Portals)", disabled: false },
  { value: "To ensure inclusion of flagship schemes under planning", disabled: false },
  { value: "To ensure inclusion of flagship schemes included in resource envelop", disabled: false },
  { value: "To ensure implementation of activities in Sankalp theme", disabled: false },
  { value: "To facilitate GP to take up low-cost activities", disabled: false },
  { value: "To facilitate GP to take up no-cost activities", disabled: false },
  { value: " Augmentation of Own Source Revenue (OSR) by PRIs ", disabled: true , color: 'bg-blue-900' },
  { value: "To ensure preparation of GP OSR rule", disabled: false },
  { value: " Delivery of Services  mentioned in the Citizen Charter ", disabled: true , color: 'bg-blue-900' },
  { value: "Percentage of Services delivered by the GP compared to the listed Services mentioned in the Citizen Charter", disabled: false },
  { value: " Partnership on CB&T initiatives. ", disabled: true , color: 'bg-blue-900'},
  { value: "To visit the District Magistrate/District Panchayat Officer/line department officers for effective partnership on CB&T initiatives", disabled: false },
  { value: "To visit NGOs for effective partnership on CB&T initiatives", disabled: false },
  { value: " ", disabled: true , color: 'bg-blue-900'},
  { value: "To Monitor Model GP Clusters", disabled: false },
  { value: "To Prepare Case Studies", disabled: false },
  { value: "To make documentation of Good Practices", disabled: false },
  { value: "Others (100 words)", disabled: false },
  { value: " No work Day ", disabled: true , color: 'bg-blue-900'},
  
  { value: "Public Holiday", disabled: false},
  { value: "Weekoff", disabled: false }
  
];

const POAForm = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const getDaysInMonth = () => {
    const days = selectedMonth.days;
    return Array.from({ length: days > 15 ? 15 : days }, (_, i) => i + 1);
  };

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${selectedYear}`);
    return date.toLocaleDateString("en-IN", { weekday: 'long' });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${selectedYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    toast.success("Form submitted successfully!");
  };

  return (
    <div style={{ fontSize: '14px', maxWidth: '100%', margin: '0 auto' }}>
      <AdminHeader>
        First Fortnightly Plan Of Action - Month : {selectedMonth.name} {selectedYear}
      </AdminHeader>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div>
          <label>State: </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ padding: '4px', fontSize: '14px' }}
          >
            {states.map((state, idx) => (
              <option key={idx} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Month: </label>
          <select
            value={selectedMonth.name}
            onChange={(e) => setSelectedMonth(months.find(month => month.name === e.target.value))}
            style={{ padding: '4px', fontSize: '14px' }}
          >
            {months.map((month, idx) => (
              <option key={idx} value={month.name}>{month.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Year: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ padding: '4px', fontSize: '14px' }}
          >
            {years.map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <table border="1" cellPadding="3" cellSpacing="0" style={{ width: '100%', marginTop: '20px', fontSize: '12px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weekday</th>
            <th>Plan of the Day</th>
            <th>Planned Event</th>
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
                <select style={{ width: '100%', padding: '2px', fontSize: '12px' }}>
                  {planOfDayOptions.map((option, idx) => (
                    <option
                      key={idx}
                      value={option.value}
                      disabled={option.disabled}
                      className={option.color}
                    >
                      {option.value}
                    </option>
                  ))}
                </select>
              </td>
              <td><input type="text" placeholder="Planned Event" style={{ width: '100%', padding: '2px', fontSize: '12px' }} /></td>
              <td><input type="text" placeholder="Achievements" style={{ width: '100%', padding: '2px', fontSize: '12px' }} /></td>
              <td><input type="file" accept="image/*" style={{ fontSize: '12px' }} /></td>
              <td><input type="text" placeholder="Remarks/Reason for Failure" style={{ width: '100%', padding: '2px', fontSize: '12px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Button
        onClick={handleSubmit}
        style={{
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default POAForm;
