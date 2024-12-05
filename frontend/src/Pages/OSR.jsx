import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const OSR = () => {
  const tableHeaders = [
    "Sl. No.",
    "GP",
    "Block",
    "State",
    "OSR collected by the GP during 2021-22 (in Rs.)",
    "OSR collected by the GP during 2022-23 (in Rs.)",
    "OSR collected by the GP during 2023-24 (in Rs.)",
  ];

  const tableData = [
    ["1", "Pabal ", "Shirur ", "Maharashtra", 2842018, 2360380, 1558632],
    ["2", "Dhamari ", "Shirur", "Maharashtra", 2842018, 6663176, 3605654],
    ["3", "Kendur ", "Shirur ", "Maharashtra", 2316301, 1844744, 1805638],
    ["4", "Pusada ", "Amravati ", "Maharashtra", 24000, 55000, 140000],
    ["5", "Nandura Bk ", "Amravati ", "Maharashtra", 18000, 48000, 121000],
    ["6", "Tembha ", "Amravati ", "Maharashtra", 12000, 34000, 108000],
    ["7", "Gopalpur ", "Amravati ", "Maharashtra", 14000, 39000, 92000],
    ["8", "Rohankheda ", "Amravati ", "Maharashtra", 25000, 47000, 105000],
    ["9", "Karnoor ", "Kagal ", "Maharashtra", 676232, 758056, 1472172],
    ["10", "Vhannur ", "Kagal", "Maharashtra", 556232, 617655, 1072172],
   
      ["11", "Pimpalgaon Khurd", "Kagal", "Maharashtra", 500000, 660000, 980000],
      ["12", "Kasba Sangaon", "Kagal", "Maharashtra", 500000, 728890, 980000],
      ["13", "Mouje Sangaon", "Kagal", "Maharashtra", 656451, 723421, 9974582],
      ["14", "Akolner", "Nagar", "Maharashtra", 7946603, 5857115, 991240],
      ["15", "Bhorwadi", "Nagar", "Maharashtra", 3581353, 842687, 833545],
      ["16", "Chas", "Nagar", "Maharashtra", 5535946, 6448103, 5464200],
      ["17", "Kamargaon", "Nagar", "Maharashtra", 2760519, 4057268, 1225457],
      ["18", "Pimplegaon Kauda", "Nagar", "Maharashtra", 207292, 893288, 209936],
      ["19", "Anand Khede", "Dhule", "Maharashtra", 120000, 135000, 150000],
      ["20", "Kundane-War", "Dhule", "Maharashtra", 65000, 80000, 95000],
      ["21", "Sanjori", "Dhule", "Maharashtra", 42500, 50500, 55000],
      ["22", "Kotamgaon", "Nashik", "Maharashtra", 756232, 856897, 1272172],
      ["23", "Odha", "Nashik", "Maharashtra", 6807802, 5847005, 8580000],
      ["24", "Lakhalgaon", "Nashik", "Maharashtra", 4337305, 339494, 6593790],
      ["25", "Pimpri Sayyed", "Nashik", "Maharashtra", 11356789, 12167976, 15555482],
      ["26", "Shilapur", "Nashik", "Maharashtra", 803960, 895930, 1692500],
      ["27", "Pachira", "Surajpur", "Chhattisgarh", 0, 1000, 43500],
      ["28", "Girwarganj", "Surajpur", "Chhattisgarh", 178429, 1000, 52000],
      ["29", "Karwan", "Surajpur", "Chhattisgarh", 36492, 0, 37000],
      ["30", "Keshawnagar", "Surajpur", "Chhattisgarh", 0, 84248, 137000],
      ["31", "Nayanpur", "Surajpur", "Chhattisgarh", 0, 27200, 18006],
      ["32", "Anjani", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
      ["33", "Chuktipani", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
      ["34", "Dhanouli", "Guarella", "Chhattisgarh", 100000, 110000, 120000],
      ["35", "Jhagrakhand", "Guarella", "Chhattisgarh", 10000, 12000, 15000],
      ["36", "Nevsa", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
      ["37", "Tendumuda", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
      ["38", "Aourda", "Pussore", "Chhattisgarh", 0, 8654, 12000],
      ["39", "Amapali", "Pussore", "Chhattisgarh", 0, 0, 0],
      ["40", "Chhichorumariya", "Pussore", "Chhattisgarh", 0, 50000, 50000],
      ["41", "Garhumariya", "Pussore", "Chhattisgarh", 0, 42000, 56000],
      ["42", "Darrighat", "Masturi", "Chhattisgarh", 30000, 44000, 55000],
      ["43", "Lawar", "Masturi", "Chhattisgarh", 20000, 35000, 50000],
      ["44", "Karra", "Masturi", "Chhattisgarh", 50000, 58000, 69000],
      ["45", "Kirari", "Masturi", "Chhattisgarh", 45000, 51000, 59000],
      ["46", "Pendri", "Masturi", "Chhattisgarh", 35000, 42000, 55000],
      ["47", "Champajhar", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
      ["48", "Chirguda", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
      ["49", "Dakaipara", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
      ["50", "Karji", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
      ["51", "Patna", "Bainkuthpur", "Chhattisgarh", 10000, 10000, 10000],
      ["52", "Patora", "Patan", "Chhattisgarh", 180000, 200000, 320000],
      ["53", "Funda", "Patan", "Chhattisgarh", 67000, 85000, 150000],
      ["54", "Mudpar", "Patan", "Chhattisgarh", 0, 20000, 75000],
      ["55", "Chunkatta", "Patan", "Chhattisgarh", 0, 0, 130000],
      ["56", "Dhourabhata", "Patan", "Chhattisgarh", 0, 0, 150000],
      ["57", "Borand", "Narayanpur", "Chhattisgarh", 56307, 126682, 147564],
      ["58", "Badejamhri", "Narayanpur", "Chhattisgarh", 0, 0, 0],
      ["59", "Belgaon", "Narayanpur", "Chhattisgarh", 100422, 167923, 162424],
      ["60", "Bakulwahi", "Narayanpur", "Chhattisgarh", 314233, 107507, 55524],
      ["61", "Nawmunjmeta", "Narayanpur", "Chhattisgarh", 638552, 918996, 372418],
      ["62", "Halamimunjhmeta", "Narayanpur", "Chhattisgarh", 72588, 115965, 132270],
      ["63", "Pharasgaon", "Narayanpur", "Chhattisgarh", 480146, 308174, 330612],
      ["64", "Halamimunjhmeta", "Narayanpur", "Chhattisgarh", 72588, 115965, 132270],
      ["65", "Pharasgaon", "Narayanpur", "Chhattisgarh", 480146, 308174, 330612],
      ["66", "Damkheda", "Zirniya", "Madhya Pradesh", 800000, 1007000, 1105000],
      ["67", "Patajan", "Khalwa", "Madhya Pradesh", 70000, 203000, 890000],
      ["68", "Fefari Sarkar", "Khalwa", "Madhya Pradesh", 0, 1000, 150000],
      ["69", "Padliya", "Khalwa", "Madhya Pradesh", 20000, 50000, 100000],
      ["70", "Tigariya", "Khalwa", "Madhya Pradesh", 0, 0, 50000],
      ["71", "Timarni", "Khalwa", "Madhya Pradesh", 0, 1000, 100000],
      ["72", "Jamanya Sarsari", "Khalwa", "Madhya Pradesh", 0, 1000, 40000],
      ["73", "Karwad", "Petalwad", "Madhya Pradesh", 60000, 258960, 332740],
      ["74", "Gangag Khedi", "Petalwad", "Madhya Pradesh", 10000, 102000, 140000],
      ["75", "Ghughari", "Petalwad", "Madhya Pradesh", 40000, 50000, 50000],
      ["76", "Gunawad", "Petalwad", "Madhya Pradesh", 1000, 32860, 50000],
      ["77", "Mathmath", "Petalwad", "Madhya Pradesh", 3000, 93384, 100000],
      ["78", "Mandan", "Petalwad", "Madhya Pradesh", 20000, 35554, 98766],
      ["79", "Beejanwada", "Pipariya", "Madhya Pradesh", 150000, 162000, 145000],
      ["80", "Matkuli", "Pipariya", "Madhya Pradesh", 185000, 226000, 248000],
      ["81", "Panari", "Pipariya", "Madhya Pradesh", 45000, 54300, 41500],
      ["82", "Richheda", "Pipariya", "Madhya Pradesh", 23000, 25000, 10000],
      ["83", "Samnapur", "Pipariya", "Madhya Pradesh", 265714, 86734, 10000],
      ["84", "Taronkalan", "Pipariya", "Madhya Pradesh", 2500, 60000, 3500],
      ["85", "Shivgarh", "Sailana", "Madhya Pradesh", 900000, 1100000, 1300000],
      ["86", "Walpur", "Sondwa", "Madhya Pradesh", 55000, 150000, 257000],
      ["87", "Julwania", "Rajpur", "Madhya Pradesh", 445000, 610000, 1250000],
      ["88", "Ngopa", "Ngopa", "Mizoram", 1000000, 1700000, 3000000],
      ["89", "Bhaganpur", "Chitrakoot", "Uttar Pradesh", 1000, 50000, 1180000],
      ["90", "Chhapra Mafi", "Chitrakoot", "Uttar Pradesh", 50000, 50000, 1600000],
      ["91", "Kothada", "Zirniya", "Madhya Pradesh", 0, 0, 0],
      ["92", "Kakariya", "Zirniya", "Madhya Pradesh", 0, 0, 0],
      ["93", "Sundi", "Sailana", "Madhya Pradesh", 0, 0, 0],
      ["94", "Bavdi", "Sailana", "Madhya Pradesh", 0, 0, 0],
      ["95", "Kelda", "Sailana", "Madhya Pradesh", 0, 0, 0],
      ["96", "Mundiya", "Zirniya", "Madhya Pradesh", 0, 0, 0],
      ["97", "Binti", "Sailana", "Madhya Pradesh", 0, 0, 0],
      ["98", "Ojhad", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["99", "Sakdi", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["100", "Temla", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["101", "Kukadiya", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["102", "Khamat", "Sondwa", "Madhya Pradesh", 0, 700, 0],
      ["103", "Kulwat", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["104", "Kakrana", "Sondwa", "Madhya Pradesh", 0, 0, 0],
      ["105", "Panwa", "Rajpur", "Madhya Pradesh", 0, 0, 11500],
      ["106", "Takli", "Rajpur", "Madhya Pradesh", 0, 0, 0],
      ["107", "Nihali", "Rajpur", "Madhya Pradesh", 0, 0, 6000],
      ["108", "Rui", "Rajpur", "Madhya Pradesh", 0, 0, 0],
      ["109", "Amb", "Balwal", "Jammu & Kashmir", 4200, 5000, 10000],
      ["110", "Bhalwal Upper-A", "Balwal", "Jammu & Kashmir", 3000, 5000, 8000],
      ["111", "Bhalwal Lower", "Balwal", "Jammu & Kashmir", 20000, 30000, 32000],
      ["112", "Chowa", "Balwal", "Jammu & Kashmir", 12000, 10000, 15000],
      ["113", "Doomi", "Balwal", "Jammu & Kashmir", 5000, 5000, 8000],
      ["114", "CHEE", "Anantnag", "Jammu & Kashmir", 0, 0, 3950],
      ["115", "Aung", "Balwal", "Jammu & Kashmir", 0, 0, 3600],
      ["116", "Anzwala", "Balwal", "Jammu & Kashmir", 0, 0, 3300],
      ["117", "Trehgam A", "Trehgram", "Jammu & Kashmir", 0, 0, 4500],
      ["118", "Trehgam B", "Trehgram", "Jammu & Kashmir", 0, 0, 5500],
      ["119", "Trehgam C", "Trehgram", "Jammu & Kashmir", 0, 0, 6500],
      ["120", "Trehgam D", "Trehgram", "Jammu & Kashmir", 0, 0, 5000],
      ["121", "Trehgam E", "Trehgram", "Jammu & Kashmir", 0, 0, 6800],
      ["122", "Trehgam F", "Trehgram", "Jammu & Kashmir", 0, 0, 12000],
      ["123", "Aghar Jitto", "Katra", "Jammu & Kashmir", 8000, 12000, 10000],
      ["124", "Akhli Buttan", "Katra", "Jammu & Kashmir", 2912, 3619, 3214],
  ["125", "Hutt", "Katra", "Jammu & Kashmir", 12000, 12000, 14000],
  ["126", "Kanjli", "Katra", "Jammu & Kashmir", 0, 0, 0],
  ["127", "Kotli Bajallian", "Katra", "Jammu & Kashmir", 0, 0, 0],
  ["128", "Mebo Gingkong", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
  ["129", "Mebo Gidum", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
  ["130", "Ayeng Beging", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
  ["131", "Ayeng Besok", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
  ["132", "Darne", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
  ["133", "Malini", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
  ["134", "Silli", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
  ["135", "Kuntor", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
  ["136", "Dipa I", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
  ["137", "Dipa II", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
  ["138", "Santipur", "Sivsagar", "Assam", 18000, 18000, 18000],
  ["139", "Namati VDC", "Howraghat", "Assam", 0, 0, 0],
  ["140", "Deosal", "Mayang", "Assam", 80000, 40000, 52000],
  ["141", "Duar Amla VDC", "Chinthong", "Assam", 0, 0, 0],
  ["142", "Khundrakpam", "Sawombung", "Manipur", 0, 10000, 10000],
  ["143", "Waiton", "Sawombung", "Manipur", 0, 0, 0],
  ["144", "Sawombung", "Sawombung", "Manipur", 0, 0, 0],
  ["145", "Haraorou Tangkham", "Sawombung", "Manipur", 0, 0, 0],
  ["146", "Wokha", "Wokha", "Nagaland", 0, 0, 0],
  ["147", "Longsa", "Wokha", "Nagaland", 0, 0, 0],
  ["148", "Longsachung", "Wokha", "Nagaland", 0, 0, 0],
  ["149", "Humtso", "Wokha", "Nagaland", 0, 0, 0],
  ["150", "Riphyim Old", "Wokha", "Nagaland", 0, 0, 0],
  ["151", "Lizu Naghuto", "Zunheboto", "Nagaland", 0, 0, 0],
  ["152", "Lizu Aviqato", "Zunheboto", "Nagaland", 0, 0, 0],
  ["153", "Lizu New", "Zunheboto", "Nagaland", 0, 0, 0],
    
  ];

  const getArrow = (current, previous) => {
    if (current > previous) {
      return <span className="text-green-500 ml-2">↑</span>;
    } else if (current < previous) {
      return <span className="text-red-500 ml-2">↓</span>;
    }
    return null; // No arrow for unchanged values
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(
      "Project for Creating Model GPs Clusters\n" +
        "(70 Clusters of 307 GPs Being Supported by 70 Phase-1 Young Fellows from October 2021)\n" +
        "Achievement Reports on OSR as on 31.03.2024 vis-à-vis Baseline Status as on 31.03.2022",
      105,
      10,
      { align: "center" }
    );

    const rows = tableData.map((row) => [
      row[0],
      row[1],
      row[2],
      row[3],
      row[4].toLocaleString(),
      `${row[5].toLocaleString()} ${
        row[5] > row[4] ? "↑" : row[5] < row[4] ? "↓" : ""
      }`,
      `${row[6].toLocaleString()} ${
        row[6] > row[5] ? "↑" : row[6] < row[5] ? "↓" : ""
      }`,
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: rows,
      startY: 30,
    });

    doc.save("GP_OSR_Achievement_Report.pdf");
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center text-[#004B86] mb-6">
        Gram Panchayat OSR Achievement Report
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              {tableHeaders.map((header, index) => (
                <th key={index} className="py-2 px-4 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border">{row[0]}</td>
                <td className="py-2 px-4 border">{row[1]}</td>
                <td className="py-2 px-4 border">{row[2]}</td>
                <td className="py-2 px-4 border">{row[3]}</td>
                <td className="py-2 px-4 border">
                  {row[4].toLocaleString()}
                </td>
                <td className="py-2 px-4 border">
                  {row[5].toLocaleString()}
                  {getArrow(row[5], row[4])}
                </td>
                <td className="py-2 px-4 border">
                  {row[6].toLocaleString()}
                  {getArrow(row[6], row[5])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={downloadPDF}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default OSR;
