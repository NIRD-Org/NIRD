import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";

// Sample data for dropdowns
const states = ["State 1", "State 2", "State 3"];
const districts = ["District 1", "District 2", "District 3"]; // Simplified list for example

// Months with days
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

// Plan of the day options split into headings and actions
const planOfDayOptions = {
  "Functioning of Gram Panchayats/ Gram Sabhas": [
    "Observe Ward Sabhas",
    "Observe Mahila Sabhas",
    "Ensure Agenda of Gram Sabha circulated/ uploaded through Panchayat Nirnay app/Meeting Online App",
    "Observe Gram Sabha",
    "Make aware of Panchayat Nirnay app/Meeting Online App"
  ],
  "Training Needs Assessment (TNA) facilitated": [
    "To Facilitate State Level/ District Level/Block Level TNAs"
  ],
  "Training Calendar preparation": [
    "To facilitate preparation of Training Calendar at State/ District/ Block Level"
  ],
  "Development/customization of Learning Materials": [
    "Develop/customize learning material on LSDGs/GPDP/Panchayat Governance/PESA/OSR"
  ],
  "Participation in GPDP": [
    "Facilitate to update Gram Panchayat Profile (MoPR Portals)",
    "To ensure inclusion of flagship schemes under planning",
    "To ensure inclusion of flagship schemes included in resource envelope",
    "To ensure implementation of activities in Sankalp theme",
    "To facilitate GP to take up low-cost activities",
    "To facilitate GP to take up no-cost activities"
  ],
  "Augmentation of Own Source Revenue (OSR) by PRIs": [
    "To ensure preparation of GP OSR rule"
  ],
  "Delivery of Services mentioned in the Citizen Charter": [
    "Percentage of Services delivered by the GP compared to the listed Services mentioned in the Citizen Charter"
  ],
  "Partnership on CB&T initiatives": [
    "To visit the District Magistrate/District Panchayat Officer/line department officers for effective partnership on CB&T initiatives",
    "To visit NGOs for effective partnership on CB&T initiatives"
  ],
  "Monitoring and documentation": [
    "To Monitor Model GP Clusters",
    "To Prepare Case Studies",
    "To make documentation of Good Practices"
  ],
  "No work Day": [
    "Public Holiday",
    "Weekoff"
  ],
  "Others(100 words Only)": [
    "Others"
  ]
};

const formatIndianDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const POA2Form = () => {
  const [plans, setPlans] = useState({});
  const [actions, setActions] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [isEditableOn16th, setIsEditableOn16th] = useState(false);
  const [isEditableOnLastDay, setIsEditableOnLastDay] = useState(false);

  // Get current month and year
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const selectedMonth = months[currentMonthIndex];

  // Determine the start and end date of the second fortnight
  const startDate = new Date(currentYear, currentMonthIndex, 16);
  const endDate = new Date(currentYear, currentMonthIndex, selectedMonth.days);
  const today = new Date();

  useEffect(() => {
    // Set editability based on today's date
    const isToday16th = today.getDate() === 16;
    const isTodayLastDay = today.getDate() === selectedMonth.days;

    setIsEditableOn16th(isToday16th);
    setIsEditableOnLastDay(isTodayLastDay);
  }, [today, selectedMonth]);

  // Get days in month for the form
  const getDaysInMonth = () => {
    const startDay = 16;
    const endDay = selectedMonth.days;
    return Array.from({ length: endDay - startDay + 1 }, (_, i) => i + startDay);
  };

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: 'long' });
  };

  const handlePlanChange = (day, selectedPlan) => {
    setPlans(prev => ({ ...prev, [day]: selectedPlan }));
    setActions(prev => ({ ...prev, [day]: planOfDayOptions[selectedPlan] || [] }));
  };

  const handleActionChange = (day, selectedAction) => {
    setActions(prev => ({ ...prev, [day]: selectedAction }));
  };

  const handleDistrictChange = (day, selectedDistrict) => {
    setSelectedDistricts(prev => ({ ...prev, [day]: selectedDistrict }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    toast.success("Form submitted successfully!");
  };

  return (
    <div style={{ fontSize: '14px', maxWidth: '100%', margin: '0 auto' }}>
      <AdminHeader>
        Second Fortnightly Plan Of Action - Month: {selectedMonth.name} {currentYear}
      </AdminHeader>

      <div style={{ margin: '15px 0', textAlign: 'center' }}>
        <p style={{ color: today < startDate || today > endDate ? 'red' : 'black' }}>
          Available for Entry: {formatIndianDate(startDate)} - {formatIndianDate(endDate)}
        </p>
      </div>

      <table border="1" cellPadding="3" cellSpacing="0" style={{ width: '100%', marginTop: '20px', fontSize: '12px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weekday</th>
            <th>Action Plan (KPI Category)</th>
            <th>Planned Event</th>
            <th>Tentative Target (Description in 50 words)</th>
            <th>District</th>
            <th>Achievements</th>
            <th>Upload Photo</th>
            <th>Remarks/Reason for Failure</th>
          </tr>
        </thead>
        <tbody>
          {getDaysInMonth().map((day, idx) => (
            <tr key={idx}>
              <td>{formatIndianDate(new Date(currentYear, currentMonthIndex, day))}</td>
              <td>{getWeekDay(day)}</td>
              <td>
                <select
                  value={plans[day] || ""}
                  onChange={(e) => handlePlanChange(day, e.target.value)}
                  style={{ width: '100%', padding: '2px', fontSize: '12px' }}
                  disabled={!isEditableOn16th}
                >
                  <option value="" disabled>Select a Plan</option>
                  {Object.keys(planOfDayOptions).map((plan, idx) => (
                    <option key={idx} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={actions[day] || ""}
                  onChange={(e) => handleActionChange(day, e.target.value)}
                  style={{ width: '100%', padding: '2px', fontSize: '12px' }}
                  disabled={!isEditableOn16th}
                >
                  <option value="" disabled>Select an Action</option>
                  {(plans[day] ? planOfDayOptions[plans[day]] : []).map((action, idx) => (
                    <option key={idx} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
              </td>
              <td><input type="text" placeholder="Planned Event" style={{ width: '100%', padding: '2px', fontSize: '12px' }} disabled={!isEditableOn16th} /></td>
              <td>
                <select
                  value={selectedDistricts[day] || ""}
                  onChange={(e) => handleDistrictChange(day, e.target.value)}
                  style={{ width: '100%', padding: '2px', fontSize: '12px' }}
                  disabled={!isEditableOn16th}
                >
                  <option value="" disabled>Select District</option>
                  {districts.map((district, idx) => (
                    <option key={idx} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </td>
              <td><input type="text" placeholder="Achievements" style={{ width: '100%', padding: '2px', fontSize: '12px' }} disabled={!isEditableOnLastDay} /></td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  style={{ width: '100%', fontSize: '12px' }}
                  disabled={!isEditableOnLastDay}
                />
              </td>
              <td><input type="text" placeholder="Remarks" style={{ width: '100%', padding: '2px', fontSize: '12px' }} disabled={!isEditableOnLastDay} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '14px' }}>Submit</Button>
      </div>
    </div>
  );
};

export default POA2Form;
