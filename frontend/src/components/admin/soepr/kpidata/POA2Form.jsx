import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
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

const POA2Form = () => {
  // Get current month and year
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedState, setSelectedState] = useState(states[0]);
  const [plans, setPlans] = useState({}); // Object to store selected plan for each day
  const [actions, setActions] = useState({}); // Object to store selected action for each day

  const selectedMonth = months[currentMonthIndex];

  const getDaysInMonth = () => {
    const days = selectedMonth.days;
    return Array.from({ length: days - 15 }, (_, i) => i + 16);
  };

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: 'long' });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handlePlanChange = (day, selectedPlan) => {
    setPlans(prev => ({ ...prev, [day]: selectedPlan }));
    setActions(prev => ({ ...prev, [day]: planOfDayOptions[selectedPlan] || [] }));
  };

  const handleActionChange = (day, selectedAction) => {
    setActions(prev => ({ ...prev, [day]: selectedAction }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    toast.success("Form submitted successfully!");
  };

  return (
    <div style={{ fontSize: '14px', maxWidth: '100%', margin: '0 auto' }}>
      <AdminHeader>
        Second Fortnightly Plan Of Action - Month : {selectedMonth.name} {currentYear}
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
      </div>

      <table border="1" cellPadding="3" cellSpacing="0" style={{ width: '100%', marginTop: '20px', fontSize: '12px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weekday</th>
            <th>Plan</th>
            <th>Action</th>
            <th>Planned Event Description</th>
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
                <select
                  value={plans[day] || ""}
                  onChange={(e) => handlePlanChange(day, e.target.value)}
                  style={{ width: '100%', padding: '2px', fontSize: '12px' }}
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
                >
                  <option value="" disabled>Select an Action</option>
                  {(plans[day] ? planOfDayOptions[plans[day]] : []).map((action, idx) => (
                    <option key={idx} value={action}>
                      {action}
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

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default POA2Form;
