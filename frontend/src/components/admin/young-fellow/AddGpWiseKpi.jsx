// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Textarea } from "@/components/ui/textarea";
// import { useAuthContext } from "@/context/AuthContext";
// import { tst } from "@/lib/utils";
// import API from "@/utils/API";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import YfLayout from "./YfLayout";
// import { kpiScoringRules } from "@/lib/data";
// import { disabledKpis } from "@/lib/data";

// function AddGpWiseKpi({ update }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const state_id = searchParams.get("state_id") || "";
//   const dist_id = searchParams.get("dist_id") || "";
//   const block_id = searchParams.get("block_id") || "";
//   const gp_id = searchParams.get("gram_id") || "";
//   const theme_id = searchParams.get("theme_id") || "";
//   const navigate = useNavigate();
//   const [kpis, setKpis] = useState([]);
//   const [formData, setFormData] = useState([]);
//   const [date, setDate] = useState(null);
//   const { user } = useAuthContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [financialYear, setFinancialYear] = useState("");
//   const [frequency, setFrequency] = useState("");
//   const [month, setMonth] = useState("");
//   const [quarter, setQuarter] = useState("");

//   useEffect(() => {
//     const fetchKpis = async () => {
//       try {
//         const response = await API.get(`/api/v1/kpi/theme/${theme_id}`);
//         const kpis = response.data.KPI;
//         setKpis(kpis);
//       } catch (error) {
//         console.error("Error fetching KPIs:", error);
//       }
//     };

//     const run = async () => {
//       setIsLoading(true);
//       await fetchKpis();
//       setIsLoading(false);
//     };

//     run();
//   }, [theme_id, state_id, dist_id, block_id, gp_id]);

//   const calculateScore = (percentage, thresholds, scores) => {
//     for (let i = 0; i < thresholds.length; i++) {
//       if (percentage > thresholds[i]) {
//         return scores[i];
//       }
//     }
//     return scores[thresholds.length];
//   };

//   const booleanKpiScoringRules = {
//     100: { yesScore: 5, noScore: 0 },
//     101: { yesScore: 10, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     53: { yesScore: 6, noScore: 1 },
//     60: { yesScore: 6, noScore: 1 },
//     61: { yesScore: 8, noScore: 1 },
//     65: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//     102: { yesScore: 6, noScore: 0 },
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const updatedData = [...prevData];
//       updatedData[index] = {
//         ...updatedData[index],
//         [name]: value,
//       };

//       if (name === "max_range" || name === "input_data") {
//         const maxRange = updatedData[index].max_range || 0;
//         const inputData = updatedData[index].input_data || 0;
//         const percentage = (inputData / maxRange) * 100;
//         const kpiId = kpis[index].id;
//         const inputType = kpis[index].input_type;

//         const { thresholds, scores } = kpiScoringRules[kpiId];

//         if (inputType === "Percentage") {
//           const percentage = (inputData / maxRange) * 100;
//           updatedData[index].score = calculateScore(
//             percentage,
//             thresholds,
//             scores
//           );
//         } else if (inputType === "Number") {
//           updatedData[index].score = calculateScore(
//             inputData,
//             thresholds,
//             scores
//           );
//         } else if (inputType === "Yes/No") {
//           updatedData[index].score = inputData
//             ? booleanKpiScoringRules[kpiId].yesScore
//             : booleanKpiScoringRules[kpiId].noScore;
//         }
//       }

//       return updatedData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let updatedFormData = kpis.map((item, index) => {
//       return {
//         ...formData[index],
//         kpi_id: item.id,
//       };
//     });

//     const dataToSend = {
//       state_id,
//       dist_id,
//       block_id,
//       gp_id,
//       financial_year: financialYear,
//       frequency,
//       month,
//       quarter,
//       user_id: user.id,
//       date: date,
//       theme_id,
//       formData: updatedFormData,
//     };

//     try {
//       const response = await API.post("/api/v1/gp-wise-kpi/submit", dataToSend);
//       console.log("Success:", response.data);
//       tst.success("Form submitted successfully");
//       navigate("/admin/young-professionals");
//     } catch (error) {
//       tst.error(error);
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div>
//         <div className="mb-2 text-center">
//           <h2 className="text-xl font-semibold mb-10 bg-slate-100 py-3">
//             Young Fellow - LSG _ Theme wise KPI Entry Form
//           </h2>
//         </div>
//         <YfLayout />
//         <form onSubmit={handleSubmit} className="overflow-x-auto mt-10">
//           <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-10">
//             <div className="mb-4">
//               <Label htmlFor="financialYear">Financial Year</Label>
//               <select
//                 id="financialYear"
//                 name="financialYear"
//                 value={financialYear}
//                 onChange={(e) => setFinancialYear(e.target.value)}
//                 className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
//               >
//                 <option value="">Select Financial Year</option>
//                 {Array.from({ length: 30 }, (_, i) => {
//                   const startYear = 2021 + i;
//                   const endYear = startYear + 1;
//                   return (
//                     <option key={i} value={`FY${startYear}-${endYear}`}>
//                       FY{startYear}-{endYear}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>

//             <div className="mb-4">
//               <Label htmlFor="frequency">Frequency</Label>
//               <select
//                 id="frequency"
//                 name="frequency"
//                 value={frequency}
//                 onChange={(e) => setFrequency(e.target.value)}
//                 className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
//               >
//                 <option value="">Select Frequency</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Quarterly">Quarterly</option>
//               </select>
//             </div>

//             {frequency === "Monthly" && (
//               <div className="mb-4">
//                 <Label htmlFor="month">Month</Label>
//                 <select
//                   id="month"
//                   name="month"
//                   value={month}
//                   onChange={(e) => setMonth(e.target.value)}
//                   className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
//                 >
//                   <option value="">Select Month</option>
//                   <option value="January">January</option>
//                   <option value="February">February</option>
//                   <option value="March">March</option>
//                   <option value="April">April</option>
//                   <option value="May">May</option>
//                   <option value="June">June</option>
//                   <option value="July">July</option>
//                   <option value="August">August</option>
//                   <option value="September">September</option>
//                   <option value="October">October</option>
//                   <option value="November">November</option>
//                   <option value="December">December</option>
//                 </select>
//               </div>
//             )}

//             {frequency === "Quarterly" && (
//               <div className="mb-4">
//                 <Label htmlFor="quarter">Quarter</Label>
//                 <select
//                   id="quarter"
//                   name="quarter"
//                   value={quarter}
//                   onChange={(e) => setQuarter(e.target.value)}
//                   className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
//                 >
//                   <option value="">Select Quarter</option>
//                   <option value="Q1">Q1</option>
//                   <option value="Q2">Q2</option>
//                   <option value="Q3">Q3</option>
//                   <option value="Q4">Q4</option>
//                 </select>
//               </div>
//             )}
//           </div>
//           <div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-20">ID</TableHead>
//                   <TableHead className="w-[200px]">KPI Name</TableHead>
//                   <TableHead className="w-[200px]">Data point</TableHead>
//                   <TableHead className="w-20">Input type</TableHead>
//                   <TableHead className="w-40">
//                     Max Number (Total Number)
//                   </TableHead>
//                   <TableHead className="w-40">
//                     Cumulative Achieved Number
//                   </TableHead>
//                   <TableHead className="w-28">Score</TableHead>
//                   <TableHead className="w-40">Remarks</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {kpis.map((data, index) => {
//                   const isDisabled = disabledKpis.includes(parseInt(data.id));
//                   return (
//                     <TableRow key={data.id}>
//                       <TableCell>{data.id}</TableCell>
// <TableCell>{data.name}</TableCell>
// <TableCell>
//   {data.kpi_datapoint || "No question"}
// </TableCell>
// <TableCell>{data?.input_type}</TableCell>
// <TableCell>
//   <Input
//     disabled={isDisabled}
//     type="number"
//     name="max_range"
//     value={
//       isDisabled ? "0" : formData[index]?.max_range || ""
//     }
//     onChange={(e) => handleChange(e, index)}
//   />
// </TableCell>
//                       <TableCell>
//                         {!isDisabled ? (
//                           <Input
//                             required
//                             max={formData[index]?.max_range}
//                             type="number"
//                             name="input_data"
//                             value={formData[index]?.input_data || ""}
//                             onChange={(e) => handleChange(e, index)}
//                           />
//                         ) : (
//                           <Input
//                             required
//                             type="number"
//                             name="input_data"
//                             value={formData[index]?.input_data || ""}
//                             onChange={(e) => handleChange(e, index)}
//                           />
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           disabled
//                           type="number"
//                           name="score"
//                           value={formData[index]?.score || "0"}
//                           onChange={(e) => handleChange(e, index)}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Textarea
//                           type="text"
//                           name="remarks"
//                           value={formData[index]?.remarks || ""}
//                           onChange={(e) => handleChange(e, index)}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="w-max my-4">
//             <Label htmlFor="date" className="text-right mt-2">
//               Date
//             </Label>
//             <Input
//               type="date"
//               name="date"
//               value={date || ""}
//               onChange={(e) => setDate(e.target.value)}
//               id="date"
//               placeholder="Enter date"
//               className="px-10"
//             />
//           </div>
//           <Button type="submit">Submit</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddGpWiseKpi;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import YfLayout from "./YfLayout";
import { kpiScoringRules } from "@/lib/data";
import { disabledKpis } from "@/lib/data";

const dropdownOptions = {
  59: {
    Weekly: 10,
    Fortnightly: 8,
    Monthly: 6,
    Quarterly: 4,
    Halfyearly: 2,
    "Not Done": 0,
  },
  78: {
    "All the 6 facilities": 12,
    "Any 5 facilities": 10,
    "Any 4 facilities": 8,
    "Any 3 facilities": 6,
    "Any 2 facilities": 4,
    "Any 1 facilities": 2,
    "No facilities": 0,
  },
  79: {
    "All 4 facilities": 8,
    "Any 3 facilities": 6,
    "Any 2 facilities": 4,
    "Any 1 facilities": 2,
    "No facilities": 0,
  },
  81: {
    "All 5 facilities": 10,
    "Any 4 facilities": 8,
    "Any 3 facilities": 6,
    "Any 2 facilities": 4,
    "Any 1 facilities": 2,
    "No facilities": 0,
  },
  83: {
    "24 Hours": 5,
    "at a frequency of 12-24 hours": 4,
    "at a frequency of 8-12 hours": 3,
    "at a frequency of 6-8 hours": 2,
    "Less than 6 Hours": 1,
    "No Electricity facility": 0,
  },
  104: {
    "All the 6 details": 18,
    "Any 5 details": 15,
    "Any 4 details": 12,
    "Any 3 details": 9,
    "Any 2 details": 6,
    "Any 1 details": 3,
    "None Available": 0,
  },
  112: {
    "Two or more Services provided": 2,
    "One Service provided": 1,
    "No services provided": 0,
  },
  113: {
    "Two or more Services provided": 2,
    "One Service provided": 1,
    "No services provided": 0,
  },
  114: {
    "Two or more Services provided": 2,
    "One Service provided": 1,
    "No services provided": 0,
  },
  115: {
    "Two or more Services provided": 2,
    "One Service provided": 1,
    "No services provided": 0,
  },
};

function AddGpWiseKpi({ update }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpis, setKpis] = useState([]);
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [financialYear, setFinancialYear] = useState("");
  const [frequency, setFrequency] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");

  const booleanKpiScoringRules = {
    53: ["Yes = 6", "No = 1", "No Committee = 0"],
    60: ["Yes = 6", "No = 1", "No Committee = 0"],
    61: ["Yes = 8", "No = 1", "No Committee = 0"],
    65: [
      "Yes with third party verification = 10",
      "Yes without third party verification = 5",
      "No = 0",
    ],
    66: ["Yes = 10", "No = 5", "No practice of SLWM = 0"],
    67: ["Yes = 10", "No = 5", "No Biodiversity Committee = 0"],
    77: ["Yes = 5", "No = 0"],
    85: ["Yes = 5", "No = 0"],
    86: ["Yes = 5", "No = 0"],
    101: ["Yes = 5", "No = 0"],
    103: ["Yes = 5", "No = 0"],
    106: ["Yes = 5", "No = 0"],
    108: ["Yes = 5", "No = 0"],
    109: ["Yes = 5", "No = 0"],
    110: ["Yes = 7", "No = 0"],
  };

  // const dropdownOptions = {
  //   59: [
  //     "Weekly",
  //     "Fortnightly",
  //     "Monthly",
  //     "Quarterly",
  //     "Halfyearly",
  //     "Not Done",
  //   ],
  //   78: [
  //     "Functional Computers",
  //     "Internet Facility",
  //     "Separate toilets for men and women",
  //     "Meeting hall",
  //     "Drinking Water facility",
  //     "Furniture",
  //   ],
  //   79: [
  //     "Library",
  //     "Community Centre",
  //     "Anganwadi Centre",
  //     "Playground / Park",
  //   ],
  //   81: [
  //     "Public transport facility",
  //     "Disabled friendly bus shed facility",
  //     "Benches in the bus shed for waiting",
  //     "Drinking Water facility in the waiting area of bus stop",
  //     "Toilet facility in the waiting area of bus stop",
  //   ],
  //   83: [
  //     "24 Hours",
  //     "at a frequency of 12-24 hours",
  //     "at a frequency of 8-12 hours",
  //     "at a frequency of 6-8 hours",
  //     "Less than 6 Hours",
  //     "No Electricity facility",
  //   ],
  //   104: [
  //     "Basic profile including LGD",
  //     "Connectivity Details",
  //     "Election Details",
  //     "Elected Member details",
  //     "Panchayat Committee details",
  //     "Panchayat Committee member details",
  //   ],
  //   112: [
  //     "Two or more Services provided",
  //     "One Service provided",
  //     "No services provided",
  //   ],
  //   113: [
  //     "Two or more Services provided",
  //     "One Service provided",
  //     "No services provided",
  //   ],
  //   114: [
  //     "Two or more Services provided",
  //     "One Service provided",
  //     "No services provided",
  //   ],
  //   115: [
  //     "Two or more Services provided",
  //     "One Service provided",
  //     "No services provided",
  //   ],
  // };

  const scoreRules = {
    59: {
      Weekly: 10,
      Fortnightly: 8,
      Monthly: 6,
      Quarterly: 4,
      Halfyearly: 2,
      "Not Done": 0,
    },
    78: {
      "All the 6 facilities": 12,
      "Any 5 facilities": 10,
      "Any 4 facilities": 8,
      "Any 3 facilities": 6,
      "Any 2 facilities": 4,
      "Any 1 facilities": 2,
      "No facilities": 0,
    },
    79: {
      "All 4 facilities": 8,
      "Any 3 facilities": 6,
      "Any 2 facilities": 4,
      "Any 1 facilities": 2,
      "No facilities": 0,
    },
    81: {
      "All 5 facilities": 10,
      "Any 4 facilities": 8,
      "Any 3 facilities": 6,
      "Any 2 facilities": 4,
      "Any 1 facilities": 2,
      "No facilities": 0,
    },
    83: {
      "24 Hours": 5,
      "at a frequency of 12-24 hours": 4,
      "at a frequency of 8-12 hours": 3,
      "at a frequency of 6-8 hours": 2,
      "Less than 6 Hours": 1,
      "No Electricity facility": 0,
    },
    104: {
      "All the 6 details": 18,
      "Any 5 details": 15,
      "Any 4 details": 12,
      "Any 3 details": 9,
      "Any 2 details": 6,
      "Any 1 details": 3,
      "None Available": 0,
    },
    112: {
      "Two or more Services provided": 2,
      "One Service provided": 1,
      "No services provided": 0,
    },
    113: {
      "Two or more Services provided": 2,
      "One Service provided": 1,
      "No services provided": 0,
    },
    114: {
      "Two or more Services provided": 2,
      "One Service provided": 1,
      "No services provided": 0,
    },
    115: {
      "Two or more Services provided": 2,
      "One Service provided": 1,
      "No services provided": 0,
    },
  };

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/kpi/theme/${theme_id}`);
        const kpis = response.data.KPI;
        // Initialize formData with max_range for each KPI
        const initialFormData = kpis.map((kpi) => ({
          max_range: kpi.max_range || 0,
        }));

        setKpis(kpis);
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      }
    };

    const run = async () => {
      setIsLoading(true);
      await fetchKpis();
      setIsLoading(false);
    };

    run();
  }, [theme_id, state_id, dist_id, block_id, gp_id]);

  // const handleChange = (e, index) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => {
  //     const updatedData = [...prevData];
  //     const currentScore = updatedData[index].score; // Preserve the current score

  //     updatedData[index] = {
  //       ...updatedData[index],
  //       [name]: value,
  //     };

  //     const kpiId = kpis[index].id;
  //     const inputType = kpis[index].input_type;

  //     if (inputType === "Yes/No" && name === "input_data") {
  //       // Boolean KPI scoring, only recalculate score if the input_data changes
  //       const scoreOptions = booleanKpiScoringRules[kpiId];
  //       if (scoreOptions) {
  //         const scoreMap = {};
  //         scoreOptions.forEach((option) => {
  //           const [optionText, score] = option.split("=");
  //           scoreMap[optionText.trim()] = parseInt(score.trim());
  //         });

  //         updatedData[index].score = scoreMap[value] || 0; // Update score based on selection
  //       }
  //     } else if (
  //       inputType !== "Yes/No" &&
  //       (name === "max_range" || name === "input_data")
  //     ) {
  //       // Existing logic for Number and Percentage inputs
  //       const maxRange = parseInt(updatedData[index].max_range) || 0;
  //       const inputData = parseInt(updatedData[index].input_data) || 0;
  //       const percentage = (inputData / maxRange) * 100;

  //       const { thresholds, scores } = kpiScoringRules[kpiId];

  //       if (inputType === "Percentage") {
  //         updatedData[index].score = calculateScore(
  //           percentage,
  //           thresholds,
  //           scores
  //         );
  //       } else if (inputType === "Number") {
  //         updatedData[index].score = calculateScore(
  //           inputData,
  //           thresholds,
  //           scores
  //         );
  //       }
  //     } else {
  //       // Preserve the existing score if no change in score-related fields
  //       updatedData[index].score = currentScore;
  //     }

  //     return updatedData;
  //   });
  // };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      const currentScore = updatedData[index].score; // Preserve the current score

      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };

      const kpiId = kpis[index].id;
      const inputType = kpis[index].input_type;

      if (dropdownOptions[kpiId]) {
        // Handle dropdown KPIs
        if (name === "input_data") {
          const scoreMap = dropdownOptions[kpiId];
          updatedData[index].score = scoreMap[value] || 0; // Update score based on dropdown selection
        }
      } else if (inputType === "Yes/No" && name === "input_data") {
        // Boolean KPI scoring
        const scoreOptions = booleanKpiScoringRules[kpiId];
        if (scoreOptions) {
          const scoreMap = {};
          scoreOptions.forEach((option) => {
            const [optionText, score] = option.split("=");
            scoreMap[optionText.trim()] = parseInt(score.trim());
          });

          updatedData[index].score = scoreMap[value] || 0; // Update score based on selection
        }
      } else if (
        inputType !== "Yes/No" &&
        (name === "max_range" || name === "input_data")
      ) {
        // Existing logic for Number and Percentage inputs
        const maxRange = parseInt(updatedData[index].max_range) || 0;
        const inputData = parseInt(updatedData[index].input_data) || 0;
        const percentage = (inputData / maxRange) * 100;
        if (theme_id == "10") return updatedData;
        const { thresholds, scores } = kpiScoringRules[kpiId];

        if (inputType === "Percentage") {
          updatedData[index].score = calculateScore(
            percentage,
            thresholds,
            scores
          );
        } else if (inputType === "Number") {
          updatedData[index].score = calculateScore(
            inputData,
            thresholds,
            scores
          );
        }
      } else {
        // Preserve the existing score if no change in score-related fields
        updatedData[index].score = currentScore;
      }

      return updatedData;
    });
  };

  const calculateScore = (percentage, thresholds, scores) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (percentage > thresholds[i]) {
        return scores[i];
      }
    }
    return scores[thresholds.length];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedFormData = kpis.map((item, index) => ({
      ...formData[index],
      kpi_id: item.id,
      score: formData[index]?.score || 0,
    }));

    const dataToSend = {
      state_id,
      dist_id,
      block_id,
      gp_id,
      financial_year: financialYear,
      frequency,
      month,
      quarter,
      user_id: user.id,
      date: date,
      theme_id,
      formData: updatedFormData,
    };

    try {
      const response = await API.post("/api/v1/gp-wise-kpi/submit", dataToSend);
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
      navigate("/admin/young-professionals");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold mb-10 bg-slate-100 py-3">
            Young Fellow - LSG _ Theme wise KPI Entry Form
          </h2>
        </div>
        <YfLayout />
        <form onSubmit={handleSubmit} className="overflow-x-auto mt-10">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="mb-4">
              <Label htmlFor="financialYear">Financial Year</Label>
              <select
                id="financialYear"
                name="financialYear"
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              >
                <option value="">Select Financial Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const startYear = 2021 + i;
                  const endYear = startYear + 1;
                  return (
                    <option key={i} value={`FY${startYear}-${endYear}`}>
                      FY{startYear}-{endYear}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              >
                <option value="">Select Frequency</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            {frequency === "Monthly" && (
              <div className="mb-4">
                <Label htmlFor="month">Month</Label>
                <select
                  id="month"
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                >
                  <option value="">Select Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, i) => (
                    <option key={i} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {frequency === "Quarterly" && (
              <div className="mb-4">
                <Label htmlFor="quarter">Quarter</Label>
                <select
                  id="quarter"
                  name="quarter"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                >
                  <option value="">Select Quarter</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KPI ID</TableHead>
                <TableHead className="w-[200px]">KPI Name</TableHead>
                <TableHead className="w-[200px]">Data point</TableHead>
                <TableHead className="w-20">Input type</TableHead>{" "}
                <TableHead className="w-40">
                  Max Number (Total Number)
                </TableHead>{" "}
                <TableHead className="w-40">
                  Cumulative Achieved Number
                </TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi, index) => {
                const isDisabled = disabledKpis.includes(kpi.id);
                const isBooleanKpi = kpi.input_type === "Yes/No";
                const maxRange = kpi.max_range;

                return (
                  <TableRow key={kpi.id}>
                    <TableCell>{kpi.id}</TableCell>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell>{kpi.kpi_datapoint || "No question"}</TableCell>
                    <TableCell>{kpi.input_type}</TableCell>
                    <TableCell>
                      <Input
                        name="max_range"
                        // value={kpi.max_range || ""}
                        readOnly={maxRange ? true : false}
                        value={formData[index]?.max_range || ""}
                        onChange={(e) => handleChange(e, index)}
                        className="text-sm"
                      />
                      {/* <Input
                        disabled={isDisabled}
                        name="max_range"
                        value={formData[index]?.max_range || ""}
                        onChange={(e) => handleChange(e, index)}
                      /> */}
                    </TableCell>
                    <TableCell>
                      {kpi.input_type.includes("\n") ? (
                        <select
                          className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                          name="input_data"
                          value={formData[index].input_data || ""}
                          onChange={(e) => handleChange(e, index)}
                        >
                          <option value="">Select</option>
                          {Object.keys(dropdownOptions[kpi.id] || {}).map(
                            (option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            )
                          )}
                        </select>
                      ) : isBooleanKpi ? (
                        <select
                          name="input_data"
                          value={formData[index]?.input_data || ""}
                          onChange={(e) => handleChange(e, index)}
                          className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                          disabled={isDisabled}
                        >
                          <option value="">Select</option>

                          {theme_id == "10" ? (
                            <>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </>
                          ) : (
                            booleanKpiScoringRules[kpi.id]?.map((option, i) => {
                              const optionLabel = option.split("=")[0].trim();
                              return (
                                <option key={i} value={optionLabel}>
                                  {optionLabel}
                                </option>
                              );
                            })
                          )}
                        </select>
                      ) : (
                        <Input
                          type="text"
                          name="input_data"
                          value={formData[index]?.input_data || ""}
                          onChange={(e) => handleChange(e, index)}
                          className="text-sm"
                          disabled={isDisabled}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        name="score"
                        value={formData[index]?.score || "0"}
                        onChange={(e) => handleChange(e, index)}
                        className="text-sm min-w-10"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        name="remarks"
                        value={formData[index]?.remarks || ""}
                        onChange={(e) => handleChange(e, index)}
                        className="text-sm"
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="mt-4">
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGpWiseKpi;
