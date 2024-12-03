import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering ChartJS components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const GraphsPage = () => {
  const [expanded, setExpanded] = useState(Array(10).fill(false));

  const toggleSection = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const chartsData = [
    {
      title: "Achievements of Project GPs under Poverty Free and Enhanced Livelihoods in Village",
      labels: [
        'Percentage of job card holders that received employment under MGNREGA',
        'Percentage of households (HHs) covered under Housing Scheme (PMAY-G/Similar Schemes)',
        'Percentage of population covered under Minor Social Assistance Programme (NSAP/Similar Scheme)',
        'Percentage of population covered under Pradhan Mantri Jan Dhan Yojana (PMJDY)',
        'Percentage of women beneficiaries to BPL List as per SECC-2011/ Self-Help Groups (SHGs)'
      ],
      datasets: [
        {
          label: 'Baseline Status',
          data: [75, 38, 48, 64, 37],
          backgroundColor: '#3e95cd',
        },
        {
          label: 'Status as of 31.03.2024',
          data: [80, 52, 52, 78, 48],
          backgroundColor: '#ffa726',
        },
        {
          label: 'Status as of 30.09.2024',
          data: [83, 55, 55, 83, 50],
          backgroundColor: '#8e8e8e',
        },
      ],
    },
    {
      title: "Achievements of Project GPs under Healthy Village",
      labels: [
        'Percentage of child deaths (in the age group of 0-5 years)',
        'Percentage of pregnant women (15-49 years)',
        'Percentage of children (0-6 years) fully vaccinated',
        'Percentage of women benefited under',
        'Percentage of beneficiaries who have...'
      ],
      datasets: [
        {
          label: 'Baseline Status',
          data: [2, 82, 58, 76, 62],
          backgroundColor: '#3e95cd',
        },
        {
          label: 'Status as of 31.03.2024',
          data: [15, 89, 72, 76, 82],
          backgroundColor: '#ffa726',
        },
        {
          label: 'Status as of 30.09.2024',
          data: [11, 95, 91, 88, 86],
          backgroundColor: '#8e8e8e',
        },
      ],
    },
    {
      title: "Achievements of Project GPs under Child-Friendly Village",
      labels: [
        'Percentage of children (0-6 years) who received Ayushman Bharat Health Account (ABHA)',
        'Percentage of children out of school',
        'Percentage of schools with separate toilets for boys and girls',
        'Percentage of Halls with Nutri-Gardens or Poshan Vatikas created',
        'Percentage of children (6-59 months) recorded anemic (<11.0 g/dl)',
      ],
      datasets: [
        {
          label: 'Baseline Status',
          data: [59, 12, 80, 34, 5],
          backgroundColor: '#3e95cd',
        },
        {
          label: 'Status as of 31.03.2024',
          data: [57, 11, 84, 26, 6],
          backgroundColor: '#ffa726',
        },
        {
          label: 'Status as of 30.09.2024',
          data: [62, 9, 84, 34, 6],
          backgroundColor: '#8e8e8e',
        },
      ],
    },
    {
      title: "Achievements of Project GPs under Water Sufficient Village",
      labels: [
        'Percentage of households in the project GPs avail themselves of 65 LPCD (Litres Per Capita Per Day) water',
        'Percentage of Houses/Public Building that are facilitated with Grey water Management Structure',
        'Percentage of Houses/Public Building that are facilitated with functional rooftop rain water harvesting structure',
        'Percentage of institutions (Schools, Anganwadi centres, GP buildings, Health centres, wellness centres and community buildings etc.) located in Project GP having access to Tap Water Connection',
        'Percentage of HHs having Tap Water Connection (as per Jal Jeevan Mission)',
      ],
      datasets: [
        {
          label: 'Baseline Status',
          data: [74, 24, 1.5, 68, 15],
          backgroundColor: '#3e95cd',
        },
        {
          label: 'Status as of 31.03.2024',
          data: [74, 23, 15, 65, 12],
          backgroundColor: '#ffa726',
        },
        {
          label: 'Status as of 30.09.2024',
          data: [90, 24, 15, 68, 15],
          backgroundColor: '#8e8e8e',
        },
      ],
    },
    // Add the other chart data objects in the same format...
  ];

  return (
    <div>
      <h1>Project GPs Achievements</h1>
      <div className="grid grid-cols-2 gap-8">
        {chartsData.map((chart, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg mb-6"
            style={{ maxWidth: '45%' }}
          >
            <div
              className="cursor-pointer text-xl font-semibold my-4"
              onClick={() => toggleSection(index)}
              style={{ color: '#004B86' }}
            >
              {chart.title}
            </div>
            {expanded[index] && (
              <div>
                <Bar
                  data={{
                    labels: chart.labels,
                    datasets: chart.datasets,
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        maxWidth: 60,
                        ticks: {
                          autoSkip: true,
                          maxRotation: 45,
                          minRotation: 45,
                          callback: function (value) {
                            // Wrap text of X-axis labels into multiple lines
                            return value.split(' ').join('\n');
                          },
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 10,
                        },
                      },
                    },
                  }}
                  height={250} // Reduce graph height
                  width={300} // Graph width to fit as card
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphsPage;
