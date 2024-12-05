import React, { useState } from "react";

const GramSabhaTable = () => {
  // Simplified data structure
  const rawTableData = [
    [1, "Kendur", "Shirur", "Maharashtra", 4, 710, 12164, 5.84, 4, 830, 12756, 6.51, 6, 1490, 19734, 7.55],
    [2, "Pabal", "Shirur", "Maharashtra", 3, 520, 6045, 8.6, 3, 560, 6075, 9.22, 6, 1320, 12480, 10.58],
    [3, "Dhamari", "Shirur", "Maharashtra", 4, 453, 4048, 11.19, 4, 470, 4224, 11.13, 6, 920, 7446, 12.36],
    [4, "Pusada", "Amravati", "Maharashtra", 3, 510, 8580, 5.94, 6, 1710, 18120, 9.44, 6, 2380, 18900, 12.59],
    [5, "Nandura Bk", "Amravati", "Maharashtra", 3, 288, 5130, 5.61, 6, 1055, 11874, 8.88, 6, 1310, 12600, 10.40],
    [6, "Tembha", "Amravati", "Maharashtra", 3, 152, 2960, 5.14, 6, 530, 6444, 8.22, 6, 692, 7020, 9.86],
    [7, "Gopalpur", "Amravati", "Maharashtra", 3, 115, 2280, 5.04, 6, 362, 4872, 7.43, 6, 460, 5169, 8.90],
    [8, "Rohankheda", "Amravati", "Maharashtra", 3, 148, 3006, 4.92, 6, 438, 6336, 6.91, 6, 552, 6780, 8.14],
    [9, "Karnoor", "Kagal", "Maharashtra", 4, 520, 4356, 11.94, 4, 592, 4556, 12.99, 6, 1584, 6936, 22.84],
    [10, "Vhannur", "Kagal", "Maharashtra", 4, 580, 4528, 12.81, 4, 673, 4728, 14.23, 6, 1784, 7560, 23.60],
    [11, "Pimpalgaon Khurd", "Kagal", "Maharashtra", 4, 612, 4128, 14.83, 4, 712, 4328, 16.45, 6, 1684, 7440, 22.63],
    [12, "Kasba Sangaon", "Kagal", "Maharashtra", 4, 2464, 24000, 10.27, 4, 3213, 24657, 13.03, 6, 8100, 41340, 19.59],
    [13, "Mouje Sangaon", "Kagal", "Maharashtra", 4, 450, 3360, 13.39, 4, 532, 3412, 15.59, 6, 1620, 8166, 19.84],
    [14, "Akolner", "Nagar", "Maharashtra", 6, 1090, 22866, 4.77, 6, 1390, 22866, 6.08, 6, 1370, 22866, 5.99],
    [15, "Bhorwadi", "Nagar", "Maharashtra", 6, 940, 10020, 9.38, 6, 710, 10020, 7.09, 6, 1120, 10020, 11.18],
    [16, "Chas", "Nagar", "Maharashtra", 6, 1002, 6936, 14.45, 6, 1190, 6936, 17.16, 6, 1070, 6936, 15.43],
    [17, "Kamargaon", "Nagar", "Maharashtra", 6, 1510, 19440, 7.77, 6, 1500, 19440, 7.72, 6, 1450, 19440, 7.46],
    [18, "Pimplegaon Kauda", "Nagar", "Maharashtra", 6, 1000, 5100, 19.61, 6, 995, 5100, 19.51, 6, 1190, 5100, 23.33],
    [19, "Anand Khede", "Dhule", "Maharashtra", 3, 878, 8550, 10.27, 6, 2002, 18450, 10.85, 6, 2130, 19080, 11.16],
    [20, "Kundane-War", "Dhule", "Maharashtra", 3, 381, 3750, 10.16, 6, 965, 8910, 10.83, 6, 1185, 9870, 12.01],
    [21, "Sanjori", "Dhule", "Maharashtra", 3, 236, 2350, 10.04, 6, 504, 4710, 10.70, 6, 552, 4950, 11.15],
    [22, "Kotamgaon", "Nashik", "Maharashtra", 4, 502, 4556, 11.02, 4, 631, 4752, 13.28, 6, 1490, 7482, 19.91],
    [23, "Odha", "Nashik", "Maharashtra", 4, 716, 7144, 10.02, 4, 835, 7492, 11.15, 6, 2424, 11790, 20.56],
    [24, "Lakhalgaon", "Nashik", "Maharashtra", 4, 984, 9428, 10.44, 4, 1079, 9684, 11.14, 6, 3308, 15258, 21.68],
    [25, "Pimpri Sayyed", "Nashik", "Maharashtra", 4, 2409, 23904, 10.08, 4, 3606, 25420, 14.19, 6, 8390, 40710, 20.61],
    [26, "Shilapur", "Nashik", "Maharashtra", 4, 569, 5296, 10.74, 4, 695, 5468, 12.71, 6, 1827, 8466, 21.58],
    [27, "Girwarganj", "Surajpur", "Chhattisgarh", 4, 436, 5064, 8.61, 6, 678, 7788, 8.71, 6, 456, 8148, 5.60],
    [28, "Karwan", "Surajpur", "Chhattisgarh", 4, 378, 6572, 5.75, 6, 612, 9924, 6.17, 6, 643, 10188, 6.31],
    [29, "Keshawnagar", "Surajpur", "Chhattisgarh", 4, 314, 6048, 5.19, 6, 634, 9198, 6.89, 6, 786, 9336, 8.42],
    [30, "Pachira", "Surajpur", "Chhattisgarh", 4, 193, 4560, 4.23, 6, 260, 998, 26.05, 6, 516, 5640, 9.15],
    [31, "Nayanpur", "Surajpur", "Chhattisgarh", 4, 112, 1232, 9.09, 6, 187, 1920, 9.74, 6, 209, 2136, 9.78],
    [32, "Anjani", "Guarella", "Chhattisgarh", 4, 84, 2560, 3.28, 6, 211, 3840, 5.49, 6, 398, 3840, 10.36],
    [33, "Chuktipani", "Guarella", "Chhattisgarh", 4, 183, 4952, 3.70, 6, 346, 7428, 4.66, 6, 774, 7428, 10.42],
    [34, "Dhanouli", "Guarella", "Chhattisgarh", 2, 164, 6196, 2.65, 4, 462, 12392, 3.73, 6, 1124, 18588, 6.05],
    [35, "Jhagrakhand", "Guarella", "Chhattisgarh", 4, 149, 4720, 3.16, 6, 334, 7080, 4.72, 6, 754, 7080, 10.65],
    [36, "Nevsa", "Guarella", "Chhattisgarh", 2, 182, 6566, 2.77, 4, 492, 13132, 3.75, 6, 1348, 19698, 6.84],
    [37, "Tendumuda", "Guarella", "Chhattisgarh", 4, 143, 4416, 3.24, 6, 323, 6624, 4.88, 6, 684, 6624, 10.33],
    [38, "Aourda", "Pussore", "Chhattisgarh", 6, 129, 11754, 1.10, 6, 132, 11754, 1.12, 6, 167, 11754, 1.42],
    [39, "Amapali", "Pussore", "Chhattisgarh", 5, 105, 4795, 2.19, 6, 136, 11754, 1.16, 6, 145, 5754, 2.52],
    [40, "Chhichorumariya", "Pussore", "Chhattisgarh", 6, 172, 11136, 1.54, 6, 192, 11136, 1.72, 6, 206, 11136, 1.85],
    [41, "Garhumariya", "Pussore", "Chhattisgarh", 5, 176, 18918, 0.93, 6, 199, 18918, 1.05, 6, 216, 18918, 1.14],
    [42, "Darrighat", "Masturi", "Chhattisgarh", 6, 300, 5940, 5.05, 6, 450, 5940, 7.58, 6, 600, 5940, 10.10],
    [43, "Lawar", "Masturi", "Chhattisgarh", 6, 360, 5976, 6.02, 6, 498, 5976, 8.33, 6, 630, 5976, 10.54],
    [44, "Karra", "Masturi", "Chhattisgarh", 6, 450, 6300, 7.14, 6, 486, 6300, 7.71, 6, 660, 6300, 10.48],
    [45, "Kirari", "Masturi", "Chhattisgarh", 6, 480, 7296, 6.58, 6, 564, 7296, 7.73, 6, 756, 7296, 10.36],
    [46, "Pendri", "Masturi", "Chhattisgarh", 6, 456, 5988, 7.62, 6, 504, 5988, 8.42, 6, 600, 5988, 10.02],
    [47, "Champajhar", "Bainkuthpur", "Chhattisgarh", 3, 169, 2832, 5.97, 5, 248, 4800, 5.17, 6, 403, 6120, 6.58],
    [48, "Chirguda", "Bainkuthpur", "Chhattisgarh", 4, 187, 4344, 4.30, 5, 233, 5040, 4.62, 6, 634, 6720, 9.43],
    [49, "Dakaipara", "Bainkuthpur", "Chhattisgarh", 4, 140, 2928, 4.78, 6, 317, 4440, 7.14, 6, 658, 4704, 13.99],
    [50, "Karji", "Bainkuthpur", "Chhattisgarh", 3, 108, 2130, 5.07, 4, 174, 3320, 5.24, 6, 388, 5880, 6.60]
    
  ];
    
 
 // Transform raw data into structured format
  const tableData = rawTableData.map((row) => ({
    slNo: row[0],
    gp: row[1],
    block: row[2],
    state: row[3],
    baselineMeetings: row[4],
    baselineNumerator: row[5],
    baselineDenominator: row[6],
    baselinePercentage: row[7],
    statusMeetings2023: row[8],
    statusNumerator2023: row[9],
    statusDenominator2023: row[10],
    statusPercentage2023: row[11],
    statusMeetings2024: row[12],
    statusNumerator2024: row[13],
    statusDenominator2024: row[14],
    statusPercentage2024: row[15],
  }));

  const [sortedData, setSortedData] = useState([...tableData]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "ascending"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  const headers = [
    { label: "Sl. No", key: "slNo" },
    { label: "Gram Panchayat", key: "gp" },
    { label: "Block", key: "block" },
    { label: "State", key: "state" },
    { label: "No. of Meetings (2022)", key: "baselineMeetings" },
    { label: "Numerator (2022)", key: "baselineNumerator" },
    { label: "Denominator (2022)", key: "baselineDenominator" },
    { label: "Percentage (2022)", key: "baselinePercentage" },
    { label: "No. of Meetings (2023)", key: "statusMeetings2023" },
    { label: "Numerator (2023)", key: "statusNumerator2023" },
    { label: "Denominator (2023)", key: "statusDenominator2023" },
    { label: "Percentage (2023)", key: "statusPercentage2023" },
    { label: "No. of Meetings (2024)", key: "statusMeetings2024" },
    { label: "Numerator (2024)", key: "statusNumerator2024" },
    { label: "Denominator (2024)", key: "statusDenominator2024" },
    { label: "Percentage (2024)", key: "statusPercentage2024" },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-center text-[#004B86] text-2xl font-bold mb-6">
        Achievement Reports on Gram Sabha Meetings
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="bg-[#004B86] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort(header.key)}
                >
                  {header.label}{" "}
                  {sortConfig.key === header.key &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                {headers.map((header) => (
                  <td key={header.key} className="py-3 px-4">
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default GramSabhaTable;
