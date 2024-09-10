import React, { useState } from 'react';
import AdminHeader from "../../AdminHeader";

const EmployeeForm = () => {
  // State for collapsing the sections
  const [gramSabhaCollapsed, setGramSabhaCollapsed] = useState(true);
  const [trainingsCollapsed, setTrainingsCollapsed] = useState(true);
  const [gpdpCollapsed, setGpdpCollapsed] = useState(true);
  const [osrCollapsed, setOsrCollapsed] = useState(true);
  const [serviceDeliveryCollapsed, setServiceDeliveryCollapsed] = useState(true);
  const [partnershipCollapsed, setPartnershipCollapsed] = useState(true);
  const [researchCollapsed, setResearchCollapsed] = useState(true);

  // State for storing the rows in each section
  const [gramSabhaRows, setGramSabhaRows] = useState([{ id: 1, gpsVisited: 0, gsConducted: 0, gsRecorded: 0, gsMembers: 0, gsAgendaPercentage: 0, actionReportPercentage: 0, gsMinutesPercentage: 0, gsMediaPercentage: 0 }]);
  const [trainingsRows, setTrainingsRows] = useState([{ id: 1, trainingInstitutionsVisited: 0, learningMaterialsPrepared: 0, trainingsMonitored: 0, sessionsAsResourcePerson: 0, tnasFacilitated: 0 }]);
  const [gpdpRows, setGpdpRows] = useState([{ id: 1, gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 }]);
  const [osrRows, setOsrRows] = useState([{ id: 1, gpsVisited: 0, gpsWithOsrRule: 0, osrCollection: 0, osrIncrease: 0 }]);
  const [serviceDeliveryRows, setServiceDeliveryRows] = useState([{ id: 1, servicesDelivered: 0, gpsCollectingFee: 0, amountCollected: 0 }]);
  const [partnershipRows, setPartnershipRows] = useState([{ id: 1, stateLevelVisits: 0, districtLevelVisits: 0, otherInstitutionVisits: 0, modelGpClustersVisits: 0 }]);
  const [researchRows, setResearchRows] = useState([{ id: 1, caseStudiesPrepared: 0, goodPracticesDocumented: 0, researchArticlesPrepared: 0 }]);

  // Function to handle adding a row to any section
  const addRow = (sectionRows, setSectionRows, emptyRow) => {
    setSectionRows([...sectionRows, { id: sectionRows.length + 1, ...emptyRow }]);
  };

  // Function to handle input changes in any section
  const handleChange = (index, field, value, sectionRows, setSectionRows) => {
    const newRows = [...sectionRows];
    newRows[index][field] = value;
    setSectionRows(newRows);
  };

  // Function to calculate totals in any section
  const calculateTotals = (field, sectionRows) => {
    return sectionRows.reduce((total, row) => total + Number(row[field]), 0);
  };

  // Helper function to render the table rows
  const renderRows = (rows, fields, setRows, emptyRow) => {
    return (
      <>
        {rows.map((row, index) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            {fields.map(field => (
              <td key={field}>
                <input
                  type="number"
                  value={row[field]}
                  onChange={(e) => handleChange(index, field, e.target.value, rows, setRows)}
                />
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan={fields.length + 1}>
          <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer" onClick={() => addRow(rows, setRows, emptyRow)}>+ Add Row</button>
          </td>
        </tr>
        <tr>
          <td>Total</td>
          {fields.map(field => (
            <td key={field}>{calculateTotals(field, rows)}</td>
          ))}
        </tr>
      </>
    );
  };

  return (
    <div>
      <AdminHeader>SOEPR MONTHLY PROGRESS</AdminHeader>

      {/* Gram Sabha Section */}
      <div>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
  onClick={() => setGramSabhaCollapsed(!gramSabhaCollapsed)}
>
          Gram Sabha (Click to {gramSabhaCollapsed ? "expand" : "collapse"})
        </button>
        {!gramSabhaCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of GPs Visited</th>
                  <th>No. of GS conducted by the GP during the Current Year</th>
                  <th>No. of GS of which details recorded by GPs</th>
                  <th>Average No. of GS Members who attended GSs</th>
                  <th>Percentage of GS Agenda uploaded on meeting online App</th>
                  <th>Percentage of GS Action taken report presented in GS</th>
                  <th>Percentage of GS minutes uploaded on Panchayat Nirnaya App</th>
                  <th>Percentage of GS Videos/Photos uploaded on Panchayat Nirnaya App</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(gramSabhaRows, ['gpsVisited', 'gsConducted', 'gsRecorded', 'gsMembers', 'gsAgendaPercentage', 'actionReportPercentage', 'gsMinutesPercentage', 'gsMediaPercentage'], setGramSabhaRows, { gpsVisited: 0, gsConducted: 0, gsRecorded: 0, gsMembers: 0, gsAgendaPercentage: 0, actionReportPercentage: 0, gsMinutesPercentage: 0, gsMediaPercentage: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Trainings Section */}
      <div>
        <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"

          onClick={() => setTrainingsCollapsed(!trainingsCollapsed)}
        >
          Trainings (Click to {trainingsCollapsed ? "expand" : "collapse"})
        </button>
        {!trainingsCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of Training Institutions Visited</th>
                  <th>No. of Learning Materials Prepared/Customised</th>
                  <th>No. of Trainings Monitored</th>
                  <th>No. of Sessions as Resource Person</th>
                  <th>No. of TNAs Facilitated</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(trainingsRows, ['trainingInstitutionsVisited', 'learningMaterialsPrepared', 'trainingsMonitored', 'sessionsAsResourcePerson', 'tnasFacilitated'], setTrainingsRows, { trainingInstitutionsVisited: 0, learningMaterialsPrepared: 0, trainingsMonitored: 0, sessionsAsResourcePerson: 0, tnasFacilitated: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* GPDP Section */}
      <div>
      <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"onClick={() => setGpdpCollapsed(!gpdpCollapsed)}
        >
          Gram Panchayat Development Plan (Click to {gpdpCollapsed ? "expand" : "collapse"})
        </button>
        {!gpdpCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of GPs Visited</th>
                  <th>No. of GP Profilers Examined</th>
                  <th>Average No. of Flagship Schemes included in GPDP</th>
                  <th>Average Amount of OSR included in GPDP</th>
                  <th>Average Percentage of Activities included in Sankalp Theme</th>
                  <th>Average Percentage of Resources (Amount) included in Sankalp Theme</th>
                  <th>Average No. of LCVAs/NCVAs included in GPDP</th>
                  <th>Average Percentage of GPDP Activities Completed during the Previous Year</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(gpdpRows, ['gpsVisited', 'gpProfilersExamined', 'flagshipSchemesIncluded', 'osrAmount', 'sankalpActivities', 'sankalpResources', 'lcvaIncluded', 'gpdpActivitiesCompleted'], setGpdpRows, { gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* OSR Section */}
      <div>
      <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer" onClick={() => setOsrCollapsed(!osrCollapsed)}
        >
          Own Source Revenue (Click to {osrCollapsed ? "expand" : "collapse"})
        </button>
        {!osrCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of GPs Visited</th>
                  <th>No. of GPs with OSR Collection Rules Framed</th>
                  <th>Total Collection of OSR (₹)</th>
                  <th>Average Percentage Increase in OSR Compared to the Previous Year</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(osrRows, ['gpsVisited', 'gpsWithOsrRule', 'osrCollection', 'osrIncrease'], setOsrRows, { gpsVisited: 0, gpsWithOsrRule: 0, osrCollection: 0, osrIncrease: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Delivery Section */}
      <div>
      <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer" onClick={() => setServiceDeliveryCollapsed(!serviceDeliveryCollapsed)}
        >
          Service Delivery (Click to {serviceDeliveryCollapsed ? "expand" : "collapse"})
        </button>
        {!serviceDeliveryCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Total No. of Services Delivered by GPs</th>
                  <th>No. of GPs Collecting Fee for Services</th>
                  <th>Total Amount Collected (₹)</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(serviceDeliveryRows, ['servicesDelivered', 'gpsCollectingFee', 'amountCollected'], setServiceDeliveryRows, { servicesDelivered: 0, gpsCollectingFee: 0, amountCollected: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Partnership Section */}
      <div> <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"    onClick={() => setPartnershipCollapsed(!partnershipCollapsed)}
        >
          Partnership with Line Departments/Other Institutions (Click to {partnershipCollapsed ? "expand" : "collapse"})
        </button>
        {!partnershipCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of State Level Visits</th>
                  <th>No. of District Level Visits</th>
                  <th>No. of Visits to Other Institutions</th>
                  <th>No. of Visits to Model GP Clusters</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(partnershipRows, ['stateLevelVisits', 'districtLevelVisits', 'otherInstitutionVisits', 'modelGpClustersVisits'], setPartnershipRows, { stateLevelVisits: 0, districtLevelVisits: 0, otherInstitutionVisits: 0, modelGpClustersVisits: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Research Section */}
      <div>
      <br/>
      <button 
  type="button" 
  className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"   onClick={() => setResearchCollapsed(!researchCollapsed)}
        >
          Research, Studies, Case Studies (Click to {researchCollapsed ? "expand" : "collapse"})
        </button>
        {!researchCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>No. of Case Studies Prepared</th>
                  <th>No. of Good Practices Documented</th>
                  <th>No. of Research Articles/Reports Prepared</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(researchRows, ['caseStudiesPrepared', 'goodPracticesDocumented', 'researchArticlesPrepared'], setResearchRows, { caseStudiesPrepared: 0, goodPracticesDocumented: 0, researchArticlesPrepared: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
