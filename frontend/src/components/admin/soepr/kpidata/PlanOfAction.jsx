import React, { useState } from 'react';
import AdminHeader from "../../AdminHeader";

const EmployeeForm = () => {
  // State for collapsing the sections
  const [gramSabhaCollapsed, setGramSabhaCollapsed] = useState(true);
  const [participationCollapsed, setParticipationCollapsed] = useState(true);
  const [monitoringCollapsed, setMonitoringCollapsed] = useState(true);
  const [osrCollapsed, setOsrCollapsed] = useState(true);
  const [serviceDeliveryCollapsed, setServiceDeliveryCollapsed] = useState(true);
  const [supportCollapsed, setSupportCollapsed] = useState(true);
  const [partnershipCollapsed, setPartnershipCollapsed] = useState(true);
  const [learningMaterialsCollapsed, setLearningMaterialsCollapsed] = useState(true);
  const [caseStudiesCollapsed, setCaseStudiesCollapsed] = useState(true);
  const [goodPracticesCollapsed, setGoodPracticesCollapsed] = useState(true);

  // State for storing the rows in each section
  const [gramSabhaRows, setGramSabhaRows] = useState([{ id: 1, ldCode: '', gpsVisited: 0, gsConducted: 0, gsRecorded: 0, gsMembers: 0, gsAgendaPercentage: 0, actionReportPercentage: 0, gsMinutesPercentage: 0, gsMediaPercentage: 0 }]);
  const [participationRows, setParticipationRows] = useState([{ id: 1, ldCode: '', gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 }]);
  const [monitoringRows, setMonitoringRows] = useState([{ id: 1, ldCode: '', gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 }]);
  const [osrRows, setOsrRows] = useState([{ id: 1, ldCode: '', gpsVisited: 0, gpsWithOsrRule: 0, osrCollection: 0, osrIncrease: 0 }]);
  const [serviceDeliveryRows, setServiceDeliveryRows] = useState([{ id: 1, ldCode: '', servicesDelivered: 0, gpsCollectingFee: 0, amountCollected: 0 }]);
  const [supportRows, setSupportRows] = useState([{ id: 1, ldCode: '', supportActivities: 0, panchayatDevelopmentIndex: 0 }]);
  const [partnershipRows, setPartnershipRows] = useState([{ id: 1, ldCode: '', stateLevelVisits: 0, districtLevelVisits: 0, otherInstitutionVisits: 0, modelGpClustersVisits: 0 }]);
  const [learningMaterialsRows, setLearningMaterialsRows] = useState([{ id: 1, ldCode: '', learningMaterialsPrepared: 0 }]);
  const [caseStudiesRows, setCaseStudiesRows] = useState([{ id: 1, ldCode: '', caseStudiesPrepared: 0 }]);
  const [goodPracticesRows, setGoodPracticesRows] = useState([{ id: 1, ldCode: '', goodPracticesDocumented: 0 }]);

  // Function to handle adding a row to any section
  const addRow = (sectionRows, setSectionRows, emptyRow) => {
    setSectionRows([...sectionRows, { id: sectionRows.length + 1, ldCode: '', ...emptyRow }]);
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
             <td className="py-2 px-4">{row.id}</td>
             <td className="py-2 px-4">
              <input
                type="text"  className="w-24 px-2 py-1 border-none rounded-md bg-gray-100"
                value={row.ldCode}
                onChange={(e) => handleChange(index, 'ldCode', e.target.value, rows, setRows)}
              />
            </td>
            {fields.map(field => (
              <td key={field}>
                <input
                  type="number"  className="w-24 px-2 py-1 border-none rounded-md bg-gray-100"
                  value={row[field]}
                  onChange={(e) => handleChange(index, field, e.target.value, rows, setRows)}
                />
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan={fields.length + 2}>
            <button 
              type="button" 
              className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer" 
              onClick={() => addRow(rows, setRows, emptyRow)}
            >
              + Add Row
            </button>
          </td>
        </tr>
        <tr>
           <td className="py-2 px-4">Total</td>
           <td className="py-2 px-4"></td> {/* For LD Code column */}
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

      {/* Functioning of Gram Panchayats/ Gram Sabhas Section */}
      <div>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setGramSabhaCollapsed(!gramSabhaCollapsed)}
        >
          Functioning of Gram Panchayats/ Gram Sabhas (Click to {gramSabhaCollapsed ? "expand" : "collapse"})
        </button>
        {!gramSabhaCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs Visited</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GS conducted by the GP during the Current Year</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GS of which details recorded by GPs</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average No. of GS Members who attended GSs</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Percentage of GS Agenda uploaded on meeting online App</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Percentage of GS Action taken report presented in GS</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Percentage of GS minutes uploaded on Panchayat Nirnaya App</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Percentage of GS Videos/Photos uploaded on Panchayat Nirnaya App</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(gramSabhaRows, ['gpsVisited', 'gsConducted', 'gsRecorded', 'gsMembers', 'gsAgendaPercentage', 'actionReportPercentage', 'gsMinutesPercentage', 'gsMediaPercentage'], setGramSabhaRows, { gpsVisited: 0, gsConducted: 0, gsRecorded: 0, gsMembers: 0, gsAgendaPercentage: 0, actionReportPercentage: 0, gsMinutesPercentage: 0, gsMediaPercentage: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Participation in GPDP Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setParticipationCollapsed(!participationCollapsed)}
        >
          Participation in GPDP (Click to {participationCollapsed ? "expand" : "collapse"})
        </button>
        {!participationCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs Visited</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GP Profilers Examined</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average No. of Flagship Schemes included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Amount of OSR included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of Activities included in Sankalp Theme</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of Resources (Amount) included in Sankalp Theme</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average No. of LCVAs/NCVAs included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of GPDP Activities Completed during the Previous Year</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(participationRows, ['gpsVisited', 'gpProfilersExamined', 'flagshipSchemesIncluded', 'osrAmount', 'sankalpActivities', 'sankalpResources', 'lcvaIncluded', 'gpdpActivitiesCompleted'], setParticipationRows, { gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Monitoring of GPDP Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setMonitoringCollapsed(!monitoringCollapsed)}
        >
          Monitoring of GPDP (Click to {monitoringCollapsed ? "expand" : "collapse"})
        </button>
        {!monitoringCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs Visited</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GP Profilers Examined</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average No. of Flagship Schemes included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Amount of OSR included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of Activities included in Sankalp Theme</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of Resources (Amount) included in Sankalp Theme</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average No. of LCVAs/NCVAs included in GPDP</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Average Percentage of GPDP Activities Completed during the Previous Year</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(monitoringRows, ['gpsVisited', 'gpProfilersExamined', 'flagshipSchemesIncluded', 'osrAmount', 'sankalpActivities', 'sankalpResources', 'lcvaIncluded', 'gpdpActivitiesCompleted'], setMonitoringRows, { gpsVisited: 0, gpProfilersExamined: 0, flagshipSchemesIncluded: 0, osrAmount: 0, sankalpActivities: 0, sankalpResources: 0, lcvaIncluded: 0, gpdpActivitiesCompleted: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* OSR Collection and Increase Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setOsrCollapsed(!osrCollapsed)}
        >
          OSR Collection and Increase (Click to {osrCollapsed ? "expand" : "collapse"})
        </button>
        {!osrCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs Visited</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs with OSR Rule Implemented</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Total OSR Amount Collected</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">OSR Amount Increase</th>
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
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setServiceDeliveryCollapsed(!serviceDeliveryCollapsed)}
        >
          Service Delivery (Click to {serviceDeliveryCollapsed ? "expand" : "collapse"})
        </button>
        {!serviceDeliveryCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Services Delivered</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of GPs Collecting Fees</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Total Amount Collected</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(serviceDeliveryRows, ['servicesDelivered', 'gpsCollectingFee', 'amountCollected'], setServiceDeliveryRows, { servicesDelivered: 0, gpsCollectingFee: 0, amountCollected: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Support to GP and PRI Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setSupportCollapsed(!supportCollapsed)}
        >
          Support to GP and PRI (Click to {supportCollapsed ? "expand" : "collapse"})
        </button>
        {!supportCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Support Activities</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Panchayat Development Index</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(supportRows, ['supportActivities', 'panchayatDevelopmentIndex'], setSupportRows, { supportActivities: 0, panchayatDevelopmentIndex: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Partnership with Other Institutions Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setPartnershipCollapsed(!partnershipCollapsed)}
        >
          Partnership with Other Institutions (Click to {partnershipCollapsed ? "expand" : "collapse"})
        </button>
        {!partnershipCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of State Level Visits</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of District Level Visits</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Other Institution Visits</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Model GP Clusters Visits</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(partnershipRows, ['stateLevelVisits', 'districtLevelVisits', 'otherInstitutionVisits', 'modelGpClustersVisits'], setPartnershipRows, { stateLevelVisits: 0, districtLevelVisits: 0, otherInstitutionVisits: 0, modelGpClustersVisits: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Learning Materials Preparation Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setLearningMaterialsCollapsed(!learningMaterialsCollapsed)}
        >
          Learning Materials Preparation (Click to {learningMaterialsCollapsed ? "expand" : "collapse"})
        </button>
        {!learningMaterialsCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Learning Materials Prepared</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(learningMaterialsRows, ['learningMaterialsPrepared'], setLearningMaterialsRows, { learningMaterialsPrepared: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Case Studies Preparation Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setCaseStudiesCollapsed(!caseStudiesCollapsed)}
        >
          Case Studies Preparation (Click to {caseStudiesCollapsed ? "expand" : "collapse"})
        </button>
        {!caseStudiesCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Case Studies Prepared</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(caseStudiesRows, ['caseStudiesPrepared'], setCaseStudiesRows, { caseStudiesPrepared: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Good Practices Documentation Section */}
      <div>
        <br/>
        <button 
          type="button" 
          className="bg-blue-950 text-white py-2 px-4 border-none cursor-pointer"
          onClick={() => setGoodPracticesCollapsed(!goodPracticesCollapsed)}
        >
          Good Practices Documentation (Click to {goodPracticesCollapsed ? "expand" : "collapse"})
        </button>
        {!goodPracticesCollapsed && (
          <div>
            <table>
              <thead>
                <tr>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">Sl. No.</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">LGD Code</th>
                   <th className="py-2 px-4 text-sm font-medium text-gray-700 border-b border-gray-300">No. of Good Practices Documented</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(goodPracticesRows, ['goodPracticesDocumented'], setGoodPracticesRows, { goodPracticesDocumented: 0 })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
