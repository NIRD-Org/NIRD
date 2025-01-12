import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/table";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { FaRegTimesCircle } from "react-icons/fa";
import { showAlert } from "@/utils/showAlert";

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

// Updated KPI Themes with their respective Activities
const kpiThemes = {
  "Poverty Free and Enhanced Livelihoods Village": [
    "Assessment of the number of Job card holders and out of them how many have demanded wage employment under MGNREGS.",
    "Assessment of the number of Job card holders having received wage employment under MGNREGS.",
    "Assisting in registration/enrolment of Job Cards of eligible beneficiaries for wage employment under MGNREGS.",
    "Assisting GP to identify eligible households for PMAY-G/similar state schemes.",
    "Assessment of the number of households having received benefit under PMAY-G.",
    "Assisting GP members to ensure the households under Waiting List can be given benefit under PMAY-G/ similar State Schemes.",
    "Supporting the GP in registration and preparation of a list of eligible beneficiaries (farmers) under the PM-KISAN scheme.",
    "Conducting a drive to identify eligible households which do not have ration cards and to facilitate the process of providing ration cards.",
    "Assessment of the households yet to be covered under National Food Security Act and to assist the GPs to cover them on saturation basis.",
    "Assisting in preparation of a list of households so far covered under NSAP/ similar State Pension scheme.",
    "Assisting in the conduct of assessing the gap to plan for covering all the eligible households under NSAP/similar State Pension scheme on saturation basis.",
    "Assisting in preparation of the list of persons so far covered under PMJDY",
    "Assisting in assessing the gap to plan for covering all the eligible population under PMJDY on saturation basis.",
    "Facilitating the conduct of assessment of the number of women belonging to BPL HHs already brought under SHGs.",
    "Conduct of assessment of the number of women's SHGs belonging to BPL HHs brought under Bank loan.",
    "Conduct of meeting to orient and guide the GP on how the BPL women's SHGs can be brought under Bank loan.",
    "Assessment of the number of women's SHGs serving nutritious food or Mid-Day Meal in schools and Anganwadi Centres etc.",
    "Conduct of meeting to orient and guide the GPs on how women's SHGs can be engaged in income-generating activities including Nutri-Gardens/Kitchen Gardens.",
    "Assessment of the number of the eligible persons registered for skill development training, how many of them have been trained and certified so far.",
    "Conduct of meeting to orient and guide the GPs on how all the eligible persons can be brought under skill development training and certification process.",
    "Guiding the GP on how GP Budget can be allocated for implementing various poverty reduction & livelihood activities other than MGNREGS & NRLM planned under GPDP.",
    "Guiding the GP on how OSR can be allocated for implementing various poverty reduction & livelihood activities other than MGNREGS & NRLM planned under GPDP.",
  ],
  "Healthy Village": [
    "Data collection on no. of child deaths (0-59 months) occurred in the GP.",
    "Conduct meetings in the GP to discuss the importance of child health, the risks associated with child deaths and measures to be taken to reduce/prevent child deaths.",
    "Data collection on no. of anaemic women in the GP.",
    "Conduct meetings in the GP to discuss the ill-effects of anaemia, the risks associated with it and measures to be taken to reduce/prevent anaemia among women.",
    "Data collection on the no. of TB patients vis-à-vis the no. of TB patients who have completed the prescribed course of medicine in the GP.",
    "Conduct meetings in the GP to discuss the ill-effects of TB and measures to be taken for TB-free society.",
    "Conduct meetings in the GP to discuss the importance of full immunisation of children (0-6 years).",
    "Identification of partially immunised children (0-6 years).",
    "Organise immunisation drives to ensure 100% children (0-6 years) with full immunisation.",
    "Organise meetings with GP & communities to orient/reorient the benefits and necessary measures to cover all eligible women under PMMVY/similar State scheme.",
    "Organise meetings with GP & communities to orient/reorient the essentiality of institutional births to ensure 100% institutional births.",
    "Preparing a list of all eligible beneficiaries in the GP under (PMJAY) /similar State scheme for Ayushman Health Cards.",
    "Facilitating the Registration of eligible beneficiaries in the GP under (PMJAY) /similar State scheme for Ayushman Health Cards.",
    "Organise meetings to sensitise and guide GP & communities to reduce water-borne diseases.",
    "Conduct IEC campaigns, distribution of mosquito nets, sanitisation of public places & houses, health check-ups and distribution of preventive medicines to reduce water-borne diseases.",
    "Facilitate regular meetings of VHSNC.",
    "Guiding the GP on how GP Budget can be allocated for implementing various health related activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing health related activities in the GP.",
  ],

  "Child Friendly Village": [
    "Conduct meetings in the GP to discuss the negative impacts of malnutrition, the risks associated and measures of prevention among children below 5 years of age.",
    "Data collection on no. of malnourished children below 5 years of age in the GP.",
    "Organizing community awareness sessions on the importance of ICDS benefits, such as supplementary nutrition, immunization, health check-ups, and early childhood education in the GP.",
    "Conducting survey in the GP to identify all eligible children (0-6 years), pregnant women, and lactating mothers and ensure they can receive benefits under the ICDS.",
    "Conduct meetings in the GP to discuss the importance of full immunisation of children (0-6 years).",
    "Identification of partially immunised children (0-6 years).",
    "Organise immunisation drives to ensure 100% children (0-6 years) with full immunisation.",
    "Data collection on number of anaemic children in the GP.",
    "Conduct meetings in the GP to discuss the ill-effects of anaemia, the risks associated with it and measures to be taken to reduce/prevent anaemia among children.",
    "Meeting the GP & communities to motivate to develop Nutri-Gardens or Poshan Vatikas.",
    "Facilitating the set-up of play area with facilities for both indoor and outdoor activities in the GP.",
    "Facilitating the set-up of e-library or library in the GP.",
    "Facilitating the set-up of facilities for children with special needs such as wheelchair or ramp or hearing or visual assistance in the GP.",
    "Facilitating the set-up of separate toilets for boys and girls in schools in the GP.",
    "Conduct meetings with GP and communities to discuss the necessity of Pre-School or Early Childhood Education for children including special needs in the GP.",
    "Facilitating the set-up of Pre-School or Early Childhood Education for children including special needs in the GP.",
    "Facilitating the GPs initiatives for making provision for Pre-School Education kit (Play and Learning material).",
    "Conduct meetings with the GP and communities to discuss and motivate proactive roles of School Management Committees in the GP.",
    "Facilitate regular meetings of School Management Committees in the GP.",
    "Conduct orientation to GP & Communities on benefits of Ayushman Bharat Health Account/Cards under State/UT specific schemes.",
    "Conduct gap assessment to identify the gaps in coverage among eligible children (0-6 years) and facilitate registration of all eligible children in the GP under Ayushman Bharat Health Account/Cards under State/UT specific schemes.",
    "Organising Bal Sabha/ Facilitating the Conduct of Bal Sabha Meeting.",
    "Facilitate the conduct of meeting of the Standing Committee looking after child protection in the GP.",
    "Guiding the GP on how GP Budget can be allocated for implementing various child-friendly related activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing child development related activities in the GP.",
  ],
  "Water Sufficient Village": [
    "Facilitating the meetings conducted by the Village Water & Sanitation Committee (VWSC)/ Paani Samitis or any related Standing Committee as per JJM guidelines in the GP.",
    "Supporting the preparation of Village Action Plan by the GP & Village Water & Sanitation Committee (VWSC) in the GP.",
    "Supporting to the GP in providing Tap Water Connection to 100% households as per guidelines of JJM.",
    "Supporting to the GP in providing Tap Water Connection to schools, Anganwadi centres, GP buildings, Health centres, wellness centres, community buildings etc.",
    "Facilitating the initiatives for water conservation measures like rooftop rainwater harvesting in the GP.",
    "Facilitating the initiatives for watershed-based development for conservation of rainwater in the GP.",
    "Conduct meetings with GP and communities to discuss Water Conservation/Drought Management/related issues in Gram Sabha Meetings of the GP.",
    "Identifying the houses/public buildings without grey water management.",
    "Conducting meetings with GP members and community members to orient/reorient the need for grey water management structure.",
    "Facilitating the establishment of grey water management structure.",
    "Facilitating the preparation of a broad-based plan to ensure 65 litres of water on per capita per day basis in the GP.",
    "Facilitating the cleaning/chlorination of Storage Tanks in the GP.",
    "Facilitating the initiatives on water quality testing using Field Test Kits in the GP.",
    "Guiding the GP on how GP Budget can be allocated for implementing various water related activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing water related activities in the GP.",
  ],
  "Clean and Green Village": [
    "Facilitating the meetings conducted by the Village Water & Sanitation Committee (VWSC)/ Paani Samitis or any related Standing Committee as per JJM guidelines in the GP.",
    "Facilitating the third-party verification by inter-Block/District Teams after self-declaration as ODF Plus in the GP.",
    "Facilitating the conduct of Operation and Maintenance of Solid & Liquid Waste Management (SLWM) assets in the GP.",
    "Facilitating the maintenance of the People’s Biodiversity Register by Biodiversity Management Committee (BMC) in the GP.",
    "Facilitating the GP in registration of the eligible households under UJALA/Similar State/UT schemes to obtain benefit under the schemes.",
    "Facilitating the GP in registration of the eligible households under deposit free LPG connections under the PMUY/Similar State/UT schemes to obtain benefit under the schemes.",
    "Facilitating the conduct of meeting of the Standing Committee/Sub Committee on Environment Preservation/Natural Resource Management in the GP.",
    "Facilitating the GP to provide support to the communities and citizens for taking benefit of solarized irrigation pumps, solarized streetlights etc.",
    "Guiding the GP on how GP Budget can be allocated for implementing various clean and green activities planned under GPDP.",
    "Guiding the GP on how OSR can be allocated for implementing various clean and green activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing ‘clean and green’ activities in the GP.",
  ],
  "Self-Sufficient Infrastructure in Village": [
    "Organising meetings in GP to educate the community about the importance of pucca housing and available government schemes like PMAY-G (Pradhan Mantri Awas Yojana - Gramin).",
    "Assisting the community members to register in PMAY-G.",
    "Conducting survey in the GP to identify households living in kutcha houses and assess their eligibility for government housing schemes.",
    "Provide training to GP members on the various housing schemes available, the application process, and their role in facilitating these schemes.",
    "Organizing meeting for GP members and local leaders to educate them on the importance of having a CSC or similar facility within the GP building.",
    "Conducting orientation sessions for GP members, local leaders, and community stakeholders to explain the importance of well-equipped GP Bhawans (including computers, internet, and separate toilets for men and women, meeting hall, drinking water, furniture etc.) in enhancing governance and service delivery in the GP.",
    "Facilitating the set-up of a library, a community centre, Anganwadi Centre, playground, park etc. in the GP.",
    "Conducting assessment of the current road infrastructure in the GP.",
    "Facilitating the GP to identify government programs and schemes that support all-weather roads construction.",
    "Conducting survey of the existing marketplaces in the GP to assess the availability and condition of basic amenities such as electricity, drinking water, and toilets and to identify specific gaps & needs.",
    "Facilitating the GP to identify and securing government programs and schemes, CSR funds, partnerships with NGOs or private sector entities for the infrastructure improvements such as electricity, drinking water, and toilets.",
    "Conducting survey of the existing public transport services and infrastructure in the GP, including the availability of bus sheds, drinking water, and toilet facilities at bus stops and to identify specific gaps & needs such as the lack of public transport options, absence of disabled-friendly infrastructure, and inadequate waiting area amenities.",
    "Conducting a comprehensive assessment in collaboration with local authorities and the community to identify areas vulnerable to floods, cyclones, and other disasters and to identify and acquiring suitable site for the relief center.",
    "Conduct meetings with GP members to discuss the design, location, and operational plan for the relief center.",
    "Facilitating the GP to identify and securing government programs and schemes, CSR funds, partnerships with NGOs or private sector entities for the construction of relief centre in the GP.",
    "Conducting assessment of the community’s water needs, identify potential sites for storage tank.",
    "Supporting the GP in mobilizing resources, which may include government grants, community contributions, and external funding for the construction of Storage Tank for water storage in the GP.",
    "Conduct a survey within the GP to assess the healthcare needs of the population, collect data on the nearest health facilities, current access issues, and gaps in service delivery.",
    "Facilitating meetings between GP representatives and district health officials to discuss the need for establishing or improving access to a Health Sub Centre or Health & Wellness Centre in the GP.",
    "Facilitating the GP members to ensure construction or renovation of the Health Sub Centre or Health & Wellness Centre in the GP.",
    "Conducting survey within the GP to assess the livestock population, common health issues, and the current availability of veterinary services.",
    "Facilitating the GP to mobilize resources to improve or establish the Veterinary Services infrastructure in the GP.",
    "Conducting survey within the GP to assess the need and availability of adult literacy programs, training facilities and digital literacy infrastructure.",
    "Facilitating the GP to mobilize resources to improve or establish the Adult Literacy Programs, Skill Development Centres and Digital Literacy infrastructure in the GP.",
    "Organising meeting with the GP members to educate them on the importance of electricity connections and availability of government schemes like Saubhagya (Pradhan Mantri Sahaj Bijli Har Ghar Yojana).",
    "Conducting survey within the GP to identify households without electricity connections and their eligibility for the Saubhagya scheme.",
    "Facilitating the GP to ensure installation of electricity connections in the identified households and availing of the benefits under the Saubhagya scheme.",
    "Conducting survey within the GP to assess the quality and reliability of the existing public sanitation services and infrastructure, including community toilets, waste management, and drainage systems.",
    "Facilitating the GP to mobilize resources to improve or establish public sanitation facilities and services in the GP.",
    "Facilitating meetings with GP members to educate them on the importance of internet connectivity and available government schemes or private sector solutions for enhancing internet infrastructure.",
    "Conducting survey within the GP to assess the current status of internet connectivity and identifying areas with inadequate or no access.",
    "Facilitating the GP to mobilize resources to enhance or establish internet connectivity infrastructure in the GP.",
  ],

  "Socially Just & Socially Secured Village": [
    "Assisting registration of eligible households for benefits under NSAP of Central Government or similar State/UT Government schemes and to plan for covering as many households as possible under NSAP or even OSR as a means of social security.",
    "Assisting registration of eligible households for benefits for assistive devices (wheelchairs, crutches, artificial limbs, walking sticks for blind etc.) and to plan for covering as many households as possible under disability supporting schemes and even with OSR.",
    "Assisting registration of eligible senior citizens (above 60 years) for Physical Aids and Assisted-living Devices under the Rashtriya Vayoshri Yojana/other State-specific scheme and to plan for covering as many eligible persons as possible even with OSR.",
    "Assisting registration of eligible disabled persons for Unique Disability Identity Card (UDID) and to plan for covering as many differently abled persons as possible under various schemes even with OSR.",
    "Assisting registration of eligible persons for Ayushman Bharat Card under PMJAY or similar under State specific schemes) and to plan for covering as many eligible persons as possible under similar State schemes.",
    "Organizing community awareness sessions on the importance of ICDS benefits, such as supplementary nutrition, immunization, health check-ups, and early childhood education in the GP.",
    "Conducting survey in the GP to identify all eligible children (0-6 years), pregnant women, and lactating mothers and ensure they can receive benefits under the ICDS.",
    "Guiding the GP on how GP Budget can be allocated for implementing various social assistance to persons (such as old, widow, disabled etc.) activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various activities for upliftment of marginalized groups [SC/ST/Women/Destitute/Old/Senior Citizen/Divyangjan (People with Special Needs) in the GP.",
  ],
  "Village with Good Governance": [
    "Identifying available resources and potential gaps that need to be addressed to equip the GPs with the necessary technology.",
    "Organizing meeting with GP members to highlight the benefits of having dedicated computers and accessories and emphasize the role of digital tools in improving efficiency, transparency, and service delivery.",
    "Assisting the GP in identifying funding sources, such as government grants, CSR funds, or local resources, to purchase computers and accessories.",
    "Organizing training programs for GP members and staff on using computers, data entry, report generation and portals of MoPR.",
    "Organizing training sessions for GP members on planning and conducting vibrant Gram Sabhas.",
    "Working with GP members to develop an annual calendar for Gram Sabhas (at least six meetings throughout the year) and to ensure Gram Sabha meetings are inclusive (participation from marginalized groups, women, and youth).",
    "Assisting the GP in documenting the proceedings of Gram Sabha meetings, including the issues discussed, decisions made, and actions planned.",
    "Organizing training sessions to GP members and staff to utilize the e-Gram Swaraj portal for various purposes of Panchayat functioning (planning, reporting, geotagging, accounting and online payments).",
    "Organizing training sessions to GP members and staff to equip them with necessary information including basic profile including LGD, Connectivity details, Election details, Elected Member details, Panchayat Committee details, Panchayat Committee member details etc.",
    "Conducting assessment of the GP’s existing record-keeping practices related to financial expenditures of the GP.",
    "Assisting the GP in developing templates and formats for maintaining records of expenditures from various sources, such as CSS, State Schemes, SFC funds, and OSR, financial registers, ledgers, and reports that are easy to use and understand.",
    "Assisting the GP in creating a key financial activities and deadlines throughout the year, culminating in the closure of accounts by 31st March including audits and submission of reports.",
    "Supporting the GP in preparing for audits every year.",
    "Reviewing the current GPDP to identify Critical and Moderate MA Gaps to fix specific target for bridging Critical MA Gaps in GPDP and to fix specific target for bridging Moderate MA Gaps in GPDP.",
    "Facilitating the GP to upload GPDP online.",
    "Supporting the GP to get the GP accounts under Central Finance Commission Grant audited through Audit online.",
    "Supporting the GP to have own website in active condition.",
    "Facilitating the GP to map all the villages with LGD.",
    "Facilitating the GP to electronically provide services including regulatory services like trade license, permit for construction of buildings, vehicle registration, income certificate, land valuation certificate etc.; statutory services like issuance of Birth/Death certificate, Senior Citizen Certificate, issuance of passes to Goods Vehicle etc.; development services; consumer utility services like bill payment, Issuance of Migration Certificate, Tracking Beneficiary Pension Detail, Application for Education Loan for Backward Classes etc.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various activities to promote Good Governance.",
  ],
  "Women Friendly Villages": [
    "Organizing Mahila Sabha/Facilitating the Conduct of Mahila Sabha Meeting in the GP.",
    "Conducting awareness campaigns in the community, highlighting the importance of girls’ education.",
    "Identifying girls who are not enrolled in school or have dropped out and organizing enrolment drives in collaboration with local schools to ensure that all identified out-of-school girls are enrolled in the GP.",
    "Organizing community-wide campaigns focusing on the importance of proper nutrition for girl children to ensure that no girl child is underweight, stunted, anaemic (including women) in the GP.",
    "Organizing regular health camps in collaboration with local health centers and Anganwadi centres to monitor the weight and growth of all girl children in the GP.",
    "Facilitating the enrolment of underweight girls in government nutrition programs such as ICDS, and coordinate with Anganwadi centers to distribute rations to families in need in the GP.",
    "Supporting the families in the GP to set up kitchen gardens to grow vegetables and fruits, improving access to fresh and nutritious food.",
    "Facilitating the GP to fully utilize government schemes aimed at improving child nutrition, such as the Mid-Day Meal Scheme, Poshan Abhiyaan, and public distribution systems and assisting families in accessing these resources effectively.",
    "Conduct orientation to GP members & communities on benefits of Ayushman Bharat/PMJAY/PMMVY/similar State Govt Health scheme/health insurance.",
    "Conduct gap assessment to identify the gaps in coverage among women and facilitate registration of all eligible women in the GP under Ayushman Bharat/PMJAY/PMMVY/similar State Govt Health scheme/health insurance.",
    "Conducting awareness campaigns to educate BPL women and their families about the benefits of joining SHGs in the GP.",
    "Conducting survey within the GP to identify all BPL households, map the women eligible to join SHGs.",
    "Identifying specific training needs & organizing training to the SHGs in the GP.",
    "Guiding the GP on how GP Budget can be allocated for implementing various women development-related activities planned under GPDP.",
    "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various women development activities.",
  ],

  "Institutional Strengthening": [
    "Visiting GP to understand system of functioning as institutions of self-government – its strengths and limitations, the functioning of Gram Sabha, Ward Sabha, Mahila Sabha, Bal Sabha etc. and check the same with the Registers maintained by the GP.",
    "Meeting ERs to Motivate for organizing Vibrant Gram Sabhas.",
    "Meeting line departments to motivate them to actively participate in the Vibrant Gram Sabha meetings.",
    "Meeting SHGs and their Federations to motivate them to actively participate in the Vibrant Gram Sabha meetings.",
    "Organizing Vibrant Gram Sabhas/Facilitating the Conduct of Vibrant Gram Sabha Meeting.",
    "Conducting/Organizing awareness meetings with the community to raise awareness about the significance of Gram Sabha.",
    "Meeting the ERs to motivate and guide in mobilizing and utilizing OSR.",
    "Meeting the GP Functionaries to motivate and guide in mobilizing OSR.",
  ],
  "No work Day": ["Public Holiday", "Weekoff", "Leave"],
  "Others(100 words Only)": ["Others"],
  Tour: ["Tour"],
};

// const YFPoa3Form = ({ update }) => {
//   const currentMonthIndex = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
//   const { id: poalId } = useParams();
//   const [selectedStates, setSelectedStates] = useState({});
//   const [selectedKpiTheme, setSelectedKpiTheme] = useState({});
//   const [selectedActivities, setSelectedActivities] = useState({});
//   const [selectedDistricts, setSelectedDistricts] = useState({});
//   const [selectedBlocks, setSelectedBlocks] = useState({});
//   const [selectedGps, setSelectedGps] = useState({});
//   const [formDataState, setFormData] = useState([]);
//   const selectedMonth = months[currentMonthIndex];

//   // Define the start and end of the second week
//   const thirdWeekStart = 15;
//   const thirdWeekEnd = 21;

//   useEffect(() => {
//     if (update) {
//       const fetchPoalData = async () => {
//         try {
//           const response = await API.get(`/api/v1/poa1/get/${poalId}`);
//           setFormData(response.data.data.poaData);
//         } catch (error) {
//           console.error("Error fetching POA data:", error);
//           toast.error("Error fetching POA data.");
//         }
//       };
//       fetchPoalData();
//     }
//   }, [poalId, update]);

//   const getDaysInWeek = (start, end) =>
//     Array.from({ length: end - start + 1 }, (_, i) => start + i);

//   const getWeekDay = (day) => {
//     const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
//     return date.toLocaleDateString("en-IN", { weekday: "long" });
//   };

//   const formatIndianDate = (day) => {
//     const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
//     return date.toLocaleDateString("en-IN");
//   };

//   const handleKpiThemeChange = (day, selectedTheme) => {
//     setSelectedKpiTheme((prev) => ({ ...prev, [day]: selectedTheme }));
//     setSelectedActivities((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleActivityChange = (day, selectedActivity) => {
//     setSelectedActivities((prev) => ({
//       ...prev,
//       [day]: selectedActivity,
//     }));
//   };

//   const handleStateChange = (day, selectedState) => {
//     setSelectedStates((prev) => ({ ...prev, [day]: selectedState }));
//     setSelectedDistricts((prev) => ({ ...prev, [day]: "" }));

//     setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleDistrictChange = (day, selectedDistrict) => {
//     setSelectedDistricts((prev) => ({ ...prev, [day]: selectedDistrict }));
//     setSelectedBlocks((prev) => ({ ...prev, [day]: "" }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleBlockChange = (day, selectedBlock) => {
//     setSelectedBlocks((prev) => ({ ...prev, [day]: selectedBlock }));
//     setSelectedGps((prev) => ({ ...prev, [day]: "" }));
//   };

//   const handleGpChange = (day, selectedGp) => {
//     setSelectedGps((prev) => ({ ...prev, [day]: selectedGp }));
//   };

//   const handleInputChange = (day, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [key]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formDataToSubmit = new FormData();

//       Object.keys(selectedKpiTheme).forEach((day) => {
//         formDataToSubmit.append(`poaData[${day}][date]`, formatIndianDate(day));
//         formDataToSubmit.append(`poaData[${day}][weekday]`, getWeekDay(day));
//         formDataToSubmit.append(
//           `poaData[${day}][kpi_theme]`,
//           selectedKpiTheme[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][activity]`,
//           selectedActivities[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][plannedEvent]`,
//           formDataState[day]?.plannedEvent || ""
//         );
//         formDataToSubmit.append(`poaData[${day}][poaType]`, "poa3");
//         formDataToSubmit.append(
//           `poaData[${day}][state_id]`,
//           selectedStates[day]
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][tentativeTarget]`,
//           formDataState[day]?.tentativeTarget || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][dist_id]`,
//           selectedDistricts[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][block_id]`,
//           selectedBlocks[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][gp_id]`,
//           selectedGps[day] || ""
//         );
//         formDataToSubmit.append(
//           `poaData[${day}][achievements]`,
//           formDataState[day]?.achievements || ""
//         );

//         if (formDataState[day]?.photo) {
//           formDataToSubmit.append(
//             `poaData[${day}][photo]`,
//             formDataState[day].photo
//           );
//         }
//         formDataToSubmit.append(
//           `poaData[${day}][remarks]`,
//           formDataState[day]?.remarks || ""
//         );
//       });

//       await API.post("/api/v1/yf-poa1/create", formDataToSubmit, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to submit form.");
//     }
//   };

//   return (
//     <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
//       <AdminHeader>
//         Third Weekly Plan Of Action - Month : {selectedMonth.name} {currentYear}
//       </AdminHeader>

//       <Table
//         border="1"
//         cellPadding="3"
//         cellSpacing="0"
//         style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
//       >
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Weekday</th>
//             <th>KPI Theme</th>
//             <th>Activity</th>
//             <th>Planned Event</th>
//             <th>Tentative Target (Description in 50 words)</th>
//             <th>State</th>
//             <th>Location</th>
//             <th>Block</th>
//             <th>Gram Panchayat</th>
//             <th>Achievements</th>
//             <th>Upload Photo</th>
//             <th>Remarks/Reason for Failure</th>
//           </tr>
//         </thead>
//         <tbody>
//           {getDaysInWeek(thirdWeekStart, thirdWeekEnd).map((day, idx) => {
//             const { yfState: states } = useYfLocation({
//               state_id: selectedStates[day],
//             });
//             const { yfDist: districts } = useYfLocation({
//               state_id: selectedStates[day],
//             });
//             const { yfBlock: blocks } = useYfLocation({
//               state_id: selectedStates[day],
//               dist_id: selectedDistricts[day],
//             });
//             const { yfGp: gps } = useYfLocation({
//               state_id: selectedStates[day],
//               dist_id: selectedDistricts[day],
//               block_id: selectedBlocks[day],
//             });

//             return (
//               <tr key={idx}>
//                 <td>{formatIndianDate(day)}</td>
//                 <td>{getWeekDay(day)}</td>
//                 <td>
//                   <select
//                     style={{ width: "100%" }}
//                     value={selectedKpiTheme[day] || ""}
//                     onChange={(e) => handleKpiThemeChange(day, e.target.value)}
//                   >
//                     <option value="">Select KPI Theme</option>
//                     {Object.keys(kpiThemes).map((theme) => (
//                       <option key={theme} value={theme}>
//                         {theme}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     style={{ width: "100%" }}
//                     value={selectedActivities[day] || ""}
//                     onChange={(e) => handleActivityChange(day, e.target.value)}
//                     disabled={!selectedKpiTheme[day]}
//                   >
//                     <option value="">Select Activity</option>
//                     {selectedKpiTheme[day] &&
//                       kpiThemes[selectedKpiTheme[day]].map(
//                         (activity, index) => (
//                           <option key={index} value={activity}>
//                             {activity}
//                           </option>
//                         )
//                       )}
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "plannedEvent", e.target.value)
//                     }
//                     value={formDataState[day]?.plannedEvent || ""}
//                   />
//                 </td>
//                 <td>
//                   <textarea
//                     rows="2"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "tentativeTarget", e.target.value)
//                     }
//                     value={formDataState[day]?.tentativeTarget || ""}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="w-fit px-2 py-1 rounded min-w-40"
//                     value={selectedStates[day] || ""}
//                     onChange={(e) => handleStateChange(day, e.target.value)}
//                     required
//                   >
//                     <option value="">Select State</option>
//                     {states &&
//                       states.map((state) => (
//                         <option key={state.id} value={state.id}>
//                           {state.name}
//                         </option>
//                       ))}
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     onChange={(e) => handleDistrictChange(day, e.target.value)}
//                     value={selectedDistricts[day] || ""}
//                   >
//                     <option value="">Select Location</option>
//                     {districts?.map((dist) => (
//                       <option key={dist.id} value={dist.id}>
//                         {dist.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 {/* Block Selection */}
//                 <td>
//                   <select
//                     onChange={(e) => handleBlockChange(day, e.target.value)}
//                     value={selectedBlocks[day] || ""}
//                     disabled={!selectedDistricts[day]}
//                   >
//                     <option value="">Select Block</option>
//                     {blocks?.map((block) => (
//                       <option key={block.id} value={block.id}>
//                         {block.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 {/* GP Selection */}
//                 <td>
//                   <select
//                     onChange={(e) => handleGpChange(day, e.target.value)}
//                     value={selectedGps[day] || ""}
//                     disabled={!selectedBlocks[day]}
//                   >
//                     <option value="">Select GP</option>
//                     {gps?.map((gp) => (
//                       <option key={gp.id} value={gp.id}>
//                         {gp.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "achievements", e.target.value)
//                     }
//                     value={formDataState[day]?.achievements || ""}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="file"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       setFormData((prev) => ({
//                         ...prev,
//                         [day]: { ...prev[day], photo: file },
//                       }));
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <textarea
//                     rows="2"
//                     style={{ width: "100%" }}
//                     onChange={(e) =>
//                       handleInputChange(day, "remarks", e.target.value)
//                     }
//                     value={formDataState[day]?.remarks || ""}
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

//       <Button
//         onClick={handleSubmit}
//         className="primary-button float-right mt-4"
//       >
//         Submit
//       </Button>
//     </div>
//   );
// };

const YFPoa3Form = ({ update }) => {
  const currentYear = new Date().getFullYear();

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: currentYear % 4 === 0 ? 29 : 28 }, // Leap year check
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

  const { id: poalId } = useParams();
  const [formDataState, setFormData] = useState([]);
  const [rows, setRows] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [allGps, setAllGps] = useState([]);

  const weekStart = 15;
  const weekEnd = 21;

  function getPOADate(day, month, year = new Date().getFullYear()) {
    // Use the current year if not passed
    return new Date(Date.UTC(year, month, day));
}

// Example usage with dynamic year (current year) and dynamic month (selectedMonth)
const POADate = getPOADate(14, selectedMonth);  // Pass selectedMonth here

useEffect(() => {
  if (update) {
    const fetchPoalData = async () => {
      try {
        const response = await API.get(`/api/v1/poa1/get/${poalId}`);
        setFormData(response.data.data.poaData);
      } catch (error) {
        console.error("Error fetching POA data:", error);
        toast.error("Error fetching POA data.");
      }
    };
    fetchPoalData();
  }
}, [poalId, update]);


  // Get the YF locations
  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/user-location");
        const data = response.data.data;
        setAllDistricts(data.districts);
        setAllBlocks(data.blocks);
        setAllGps(data.gps);
        setStates(data.states);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLocations();
  }, []);

  const getDaysInMonth = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getWeekDay = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date.toLocaleDateString("en-IN");
  };

  // Initialize rows for the table
  useEffect(() => {
    const initialRows = getDaysInMonth(weekStart, weekEnd).map((day) => ({
      id: uuidv4(),
      date: day,
    }));
    setRows(initialRows);
  }, []);

  // Handle form data updates
  const handleInputChange = (day, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], [key]: value },
    }));
  };

  const handleStateChange = (day, selectedState) => {
    setFormData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        state: selectedState,
        district: "",
        block: "",
        gp: "",
      },
    }));
  };

  const handleDistrictChange = (day, selectedDistrict) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], district: selectedDistrict, block: "", gp: "" },
    }));
  };

  const handleBlockChange = (day, selectedBlock) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], block: selectedBlock, gp: "" },
    }));
  };

  const handleGpChange = (day, selectedGp) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], gp: selectedGp },
    }));
  };

  const handleKpiThemeChange = (day, selectedTheme) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], kpiTheme: selectedTheme, activity: "" },
    }));
  };

  const handleActivityChange = (day, selectedActivity) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], activity: selectedActivity },
    }));
  };

  const handleAddRow = (clickedDay) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((row) => row.date === clickedDay);
      const newRow = { id: uuidv4(), date: clickedDay };
      const newRows = [...prevRows];
      newRows.splice(index + 1, 0, newRow);
      return newRows;
    });
  };

  // Clear a particular row

  const handleClearRow = (id) => {
    // Remove the row from the 'rows' state by filtering it out
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);

    // Also remove the corresponding form data for that row
    const updatedFormDataState = { ...formDataState };
    delete updatedFormDataState[id];
    setFormData(updatedFormDataState);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSubmit = new FormData();
      rows.forEach((row) => {
        const dayData = formDataState[row.id] || {};
        formDataToSubmit.append(
          `poaData[${row.date}][date]`,
          formatIndianDate(row.date)
        );
        formDataToSubmit.append(
          `poaData[${row.date}][weekday]`,
          getWeekDay(row.date)
        );
        formDataToSubmit.append(
          `poaData[${row.date}][kpi_theme]`,
          dayData.kpiTheme || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][activity]`,
          dayData.activity || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][plannedEvent]`,
          dayData.plannedEvent || ""
        );
        formDataToSubmit.append(`poaData[${row.date}][poaType]`, "poa3");
        formDataToSubmit.append(
          `poaData[${row.date}][state_id]`,
          dayData.state || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][dist_id]`,
          dayData.district || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][block_id]`,
          dayData.block || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][gp_id]`,
          dayData.gp || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][achievements]`,
          dayData.achievements || ""
        );
        formDataToSubmit.append(
          `poaData[${row.date}][tentativeTarget]`,
          dayData.tentativeTarget || ""
        );

        if (dayData.photo) {
          formDataToSubmit.append(`poaData[${row.date}][photo]`, dayData.photo);
        }

        formDataToSubmit.append(
          `poaData[${row.date}][remarks]`,
          dayData.remarks || ""
        );
      });

      await API.post(
        `/api/v1/yf-poa1/create?created_at=${POADate}`,
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-full lg:max-w-[80vw]"
      style={{ fontSize: "14px", margin: "0 auto" }}
    >
      <AdminHeader>
        Third Weekly Plan Of Action - Month : {selectedMonth.name} {currentYear}
      </AdminHeader>

      <div className="mb-4">
        <label htmlFor="month-select" className="mr-2">
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
          className="p-2 rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month.name}
            </option>
          ))}
        </select>
      </div>

      <Table
        border="1"
        cellPadding="3"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Date</th>
            <th>Weekday</th>
            <th>KPI Theme</th>
            <th>Activity</th>
            <th>Planned Event</th>
            <th>Tentative Target (Description in 50 words)</th>
            <th>State</th>
            <th>District</th>
            <th>Block</th>
            <th>Gram Panchayat</th>
            <th>Achievements</th>
            <th>Upload Photo</th>
            <th>Remarks/Reason for Failure</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((day, idx) => {
            const dayData = formDataState[day.id] || {};
            const districts = allDistricts?.filter(
              (dist) => dist.state_id === dayData.state
            );
            const blocks = allBlocks?.filter(
              (block) =>
                block.state_id === dayData.state &&
                block.dist_id === dayData.district
            );
            const gps = allGps?.filter(
              (gp) =>
                gp.state_id === dayData.state &&
                gp.dist_id === dayData.district &&
                gp.block_id === dayData.block
            );

            return (
              <tr key={idx}>
                <td>
                  <button
                    onClick={() => handleClearRow(day.id)}
                    className="text-red-500 bg-red-500/30 mr-2 mb-1 p-1 font-semibold rounded-full "
                  >
                    <FaRegTimesCircle className="text-lg" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleAddRow(day.date)}>
                    <PlusCircle className="text-primary text-sm w-[1.1rem] mt-1" />
                  </button>
                </td>
                <td>{formatIndianDate(day.date)}</td>
                <td>{getWeekDay(day.date)}</td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={dayData.kpiTheme || ""}
                    onChange={(e) =>
                      handleKpiThemeChange(day.id, e.target.value)
                    }
                  >
                    <option value="">Select KPI Theme</option>
                    {Object.keys(kpiThemes).map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    style={{ width: "100%" }}
                    value={dayData.activity || ""}
                    onChange={(e) =>
                      handleActivityChange(day.id, e.target.value)
                    }
                    disabled={!dayData.kpiTheme}
                  >
                    <option value="">Select Activity</option>
                    {dayData.kpiTheme &&
                      kpiThemes[dayData.kpiTheme].map((activity, index) => (
                        <option key={index} value={activity}>
                          {activity}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "plannedEvent", e.target.value)
                    }
                    value={dayData.plannedEvent || ""}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(
                        day.id,
                        "tentativeTarget",
                        e.target.value
                      )
                    }
                    value={dayData.tentativeTarget || ""}
                  />
                </td>
                <td>
                  <select
                    className="w-fit px-2 py-1 rounded min-w-40"
                    value={dayData.state || ""}
                    onChange={(e) => handleStateChange(day.id, e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}  <option> NIRDPR </option>
                    
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      handleDistrictChange(day.id, e.target.value)
                    }
                    value={dayData.district || ""}
                  >
                    <option value="">Select District</option>
                    {districts?.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}  <option> SIRD </option>
                    <option> None </option>
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleBlockChange(day.id, e.target.value)}
                    value={dayData.block || ""}
                    disabled={!dayData.district}
                  >
                    <option value="">Select Block</option>
                    {blocks?.map((block) => (
                      <option key={block.id} value={block.id}>
                        {block.name}
                      </option>
                    ))}  <option> SIRD </option>
                    <option> None </option>
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) => handleGpChange(day.id, e.target.value)}
                    value={dayData.gp || ""}
                    disabled={!dayData.block}
                  >
                    <option value="">Select GP</option>
                    {gps?.map((gp) => (
                      <option key={gp.id} value={gp.id}>
                        {gp.name}
                      </option>
                    ))}  
                    <option> None </option>
                  </select>
                </td>
                <td>
                  <input disabled
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "achievements", e.target.value)
                    }
                    value={dayData.achievements || ""}
                  />
                </td>
                <td>
                  <input disabled
                    type="file"
                    onChange={(e) =>
                      handleInputChange(day.id, "photo", e.target.files[0])
                    }
                  />
                </td>
                <td>
                  <input disabled
                    type="text"
                    className="border rounded border-gray-300"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(day.id, "remarks", e.target.value)
                    }
                    value={dayData.remarks || ""}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        pending={loading}
        onClick={handleSubmit}
        className="primary-button float-right mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default YFPoa3Form;
