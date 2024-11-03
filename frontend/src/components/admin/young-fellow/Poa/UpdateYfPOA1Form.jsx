import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import API from "@/utils/API";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tst } from "@/lib/utils";
import { useYfLocation } from "@/components/hooks/useYfLocation";
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

// const planOfDayOptions = {
//   "Functioning of Gram Panchayats/ Gram Sabhas": [
//     "Observe Ward Sabhas",
//     "Observe Mahila Sabhas",
//     "Ensure Agenda of Gram Sabha circulated/ uploaded through Panchayat Nirnay app/Meeting Online App",
//     "Observe Gram Sabha",
//     "Make aware of Panchayat Nirnay app/Meeting Online App",
//   ],
//   "Training Needs Assessment (TNA) facilitated": [
//     "To Facilitate State Level/ District Level/Block Level TNAs",
//   ],
//   "Training Calendar preparation": [
//     "To facilitate preparation of Training Calendar at State/ District/ Block Level",
//     "To design/ facilitate to design Trainings  ",
//     "To prepare/Update Training modules",
//   ],
//   "Development/customization of Learning Materials": [
//     "Develop/customize learning material on LSDGs/GPDP/Panchayat Governance/PESA/OSR",
//     "Conduct Training Session as a Resource Person",
//     "Visit to Training Institutions (SPRC/ETC/DPRC/PTC/BPRC/PLC) ",
//   ],
//   "Participation in GPDP": [
//     "Facilitate to update Gram Panchayat Profile (MoPR Portals)",
//     "To ensure inclusion of flagship schemes under planning",
//     "To ensure inclusion of flagship schemes included in resource envelope",
//     "To ensure implementation of activities in Sankalp theme",
//     "To facilitate GP to take up low-cost activities",
//     "To facilitate GP to take up no-cost activities",
//   ],
//   "Augmentation of Own Source Revenue (OSR) by PRIs": [
//     "To ensure preparation of GP OSR rule",
//   ],
//   "Delivery of Services mentioned in the Citizen Charter": [
//     "Percentage of Services delivered by the GP compared to the listed Services mentioned in the Citizen Charter",
//   ],
//   "Partnership on CB&T initiatives": [
//     "To visit the District Magistrate/District Panchayat Officer/line department officers for effective partnership on CB&T initiatives",
//     "To visit NGOs for effective partnership on CB&T initiatives",
//   ],
//   "Monitoring and documentation": [
//     "To Monitor Model GP Clusters",
//     "To Prepare Case Studies",
//     "To make documentation of Good Practices",
//   ],
//   "No work Day": ["Public Holiday", "Weekoff", "Casual Leave"],
//   "Others(100 words Only)": ["Others"],
// };

const planOfDayOptions = {
  "Institutional Strengthening of GPs": [
    "To acquaint with the ERs and functionaries of the GP.",
    "To understand system of functioning as institutions of self-government.",
    "Baseline Data collection",
    "Meeting with the State Nodal Officer",
    "Meeting with the line department employees of the GP",
    "Meeting with the Block/Mandal/Janpad Panchayat/Taluka officials",
    "Meeting the SHG Federation",
    "To Identify several volunteers as ‘Panchayat Bandhus’",
    "Meeting with communities",
    "Initiating LCVAs in the GP",
    "Analysing GPDP documents of the previous years",
    "Conducting orientation/reorientation to ERs and functionaries of the GP",
    "Meeting ERs (Sarpanch/Pradhan/Mukhiya and Secretary), GP Functionaries, line departments officials and employees, SHGs and their Federations, Ward Members",
    "Organising/Facilitating the conduct of Vibrant Gram Sabha/ Ward Sabha/Mahila Sabha/Bal Sabha/ Monthly Collective Body Meeting.",
    "Organising community meetings to disseminate Departmental Schemes information.",
    "Conducting/Organising awareness meetings with the community to raise awareness about the significance of Gram Sabha/ Ward Sabha/Mahila Sabha/Bal Sabha",
    "Conducting Training need-assessment/Identifying training needs of the GP.",
    "Organising trainings for Village Panchayat Leaders, Village Officials, SHGs",
    "Monthly meeting with BDO/CEO (BP/JP) and DPRO/CEO (ZP).",
  ],
  "Poverty Free and Enhanced Livelihoods Villages": [
    "Wage Employment under MGNREGS.",
    "Activities to Promote PMAY-G/similar state schemes.",
    "Activities to Promote PM-KISAN scheme",
    "Providing Ration Cards",
    "Activities to Promote NSAP/ similar State Pension scheme.",
    "Activities to Promote PMJDY",
    "Promoting SHGs",
    "Activities to promote Skill Development Trainings",
    "Preparation of Sankalp-based GPDP",
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
    "Activities to reduce child deaths",
    "Activities to reduce anaemia in the GP.",
    "Activities to promote TB-free GP.",
    "Activities to promote 100% immunization coverage.",
    "Activities to promote 100% institutional births.",
    "Ayushman Health Cards",
    "Activities to reduce water-borne diseases.",
    "Preparation of Sankalp-based GPDP",
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
  "Child-Friendly Village": [
    "Activities to improve Nutritional status of Children.",
    "Activities to promote 100% immunization coverage.",
    "Activities to reduce anaemia among children in the GP.",
    "Activities to promote a child-friendly village by improving infrastructure in the GP",
    "Activities to improve the enrolment of children and enrolment of drop-out children from school in the GP.",
    "Ayushman Health Cards for all eligible Children",
    "Organising/ Facilitating the Conduct of Bal Sabha.",
    "Preparation of Sankalp-based GPDP",
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
  "Water Sufficient Villages": [
    "Providing Tap water connection to 100% HH in the GP",
    "Activities related to promote Rainwater Harvesting",
    "Activities related to Watershed-based Development",
    "Activities related to Water Quality",
    "Preparation of Sankalp-based GPDP",
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
  "Clean and Green Villages": [
    "Activities related to Solid & Liquid Waste Management",
    "Activities related to UJALA/ Similar State/UT schemes.",
    "Facilitating activities to ensure Standing Committees in the GP Biodiversity and Environment Preservation",
    "Activities to ensure electricity, streetlights etc",
    "Preparation of Sankalp-based GPDP",
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
  "Self-Sufficient Infrastructure in Villages": [
    "Activities related to PMAY-G",
    "Activities to improve infrastructure in the GP",
    "Activities to improve road facilities in the GP",
    "Activities to improve and provide basic amenities in the GP for making it disable-friendly",
    "Activities related to establishing relief centre establishment in the GP",
    "Activities to improve community water needs.",
    "Activities to improve healthcare infrastructure",
    "Activities to improve veterinary services in the GP",
    "Activities to improve School infrastructure in the GP",
    "Preparation of Sankalp-based GPDP",
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
    "Activities to Promote NSAP/ similar State Pension scheme.",
    "Activities to support GP to deliver services to persons with disability",
    "Ayushman Health Cards",
    "Preparation of Sankalp-based GPDP",
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
    "Activities related to Gram Sabha",
    "Activities to improve financial management and record maintenance in the GP",
    "Facilitating the process of GPDP",
    "Activities relate to service delivery",
    "Preparation of Sankalp-based GPDP",
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
    "Organising Mahila Sabha/ Facilitating the Conduct of Mahila Sabha Meeting in the GP.",
    "Activities to improve the enrolment of girl children and enrolment of drop-out girl children from school.",
    "Activities to improve the health of girl children and women in the GP",
    "Enrolment of women in Self-help Groups",
    "Preparation of Sankalp-based GPDP",
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

const UpdateYfPOA1Form = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { id: poalId } = useParams();
  const [selectedState, setSelectedState] = useState();
  const [plans, setPlans] = useState({});
  const [selectedDistricts, setSelectedDistricts] = useState({});
  const [formDataState, setFormData] = useState({});
  const selectedMonth = months[currentMonthIndex];
  const {
    yfState: states,
    yfDist: districts,
    yfBlock: blocks,
    yfGp: gps,
  } = useYfLocation({
    state_id: selectedState,
  });
  const [loading, setLoading] = useState(false);
  const [poaType, setPoaType] = useState("poa1");
  const [selectedActions, setSelectedActions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedState(states?.[0]?.id);
  }, [states]);

  useEffect(() => {
    const fetchPoalData = async () => {
      try {
        const response = await API.get(
          `/api/v1/yf-poa1/get/${poalId}?poaType=${poaType}`
        );
        const data = response.data.data.poaData;
        const monthName = new Date(
          response.data.data.created_at
        )?.toLocaleString("en-IN", { month: "long" });
        const days = new Date(
          new Date(response.data.data.created_at).getFullYear(),
          new Date(response.data.data.created_at).getMonth() + 1,
          0
        ).getDate();

        selectedMonth.name = monthName;
        selectedMonth.days = days;

        const groupedData = data.reduce((acc, item) => {
          const [day, month, year] = item.date.split("/");
          const parsedDate = new Date(`${year}-${month}-${day}`);
          const dayOfMonth = parsedDate.getDate();

          if (!acc[dayOfMonth]) {
            acc[dayOfMonth] = [];
          }
          acc[dayOfMonth].push(item);
          return acc;
        }, {});

        setFormData(groupedData);
      } catch (error) {
        setFormData({});
        console.error("Error fetching user:", error);
      }
    };
    fetchPoalData();
  }, [poalId, poaType]);

  const getDaysInMonth = () =>
    Array.from({ length: selectedMonth.days }, (_, i) => i + 1);

  const getWeekDay = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  };

  const formatIndianDate = (day) => {
    const date = new Date(`${selectedMonth.name} ${day}, ${currentYear}`);
    return date.toLocaleDateString("en-IN");
  };

  const handlePlanChange = (day, index, selectedPlan) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, plan: selectedPlan } : item
      ),
    }));
    setSelectedActions((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [index]: "",
      },
    }));
  };

  const handleActionChange = (day, index, selectedAction) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, action: selectedAction } : item
      ),
    }));
  };

  const handleDistrictChange = (day, index, selectedDistrict) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, dist_id: selectedDistrict } : item
      ),
    }));
  };

  const handleInputChange = (day, index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: prev[day].map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(formDataState).forEach((day) => {
        formDataState[day].forEach((item, index) => {
          formData.append(`poaData[${day}][${index}][date]`, item.date);
          formData.append(`poaData[${day}][${index}][weekday]`, item.weekday);
          formData.append(
            `poaData[${day}][${index}][kpi_theme]`,
            item.kpi_theme
          );
          formData.append(`poaData[${day}][${index}][activity]`, item.activity);
          formData.append(
            `poaData[${day}][${index}][plannedEvent]`,
            item.plannedEvent || ""
          );
          formData.append(
            `poaData[${day}][${index}][tentativeTarget]`,
            item.tentativeTarget || ""
          );
          formData.append(`poaData[${day}][${index}][state_id]`, item.state_id);
          formData.append(`poaData[${day}][${index}][dist_id]`, item.dist_id);
          formData.append(`poaData[${day}][${index}][block_id]`, item.block_id);
          formData.append(`poaData[${day}][${index}][gp_id]`, item.gp_id);

          formData.append(`poaData[${day}][${index}][poaType]`, poaType);
          formData.append(
            `poaData[${day}][${index}][achievements]`,
            item.achievements || ""
          );

          if (item.photo) {
            formData.append(`poaData[${day}][${index}][photo]`, item.photo);
          }
          formData.append(
            `poaData[${day}][${index}][remarks]`,
            item.remarks || ""
          );
        });
      });

      await API.post(`/api/v1/yf-poa1/update/${poalId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("Form updated successfully!");
      navigate(`/admin/yf/POA1/view/${poalId}`);
    } catch (error) {
      console.log(error);

      tst.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-screen md:max-w-[80vw]"
      style={{ fontSize: "14px", margin: "0 auto" }}
    >
      <AdminHeader>
        Update Fortnightly Plan Of Action - Month : {selectedMonth.name}{" "}
        {currentYear}
      </AdminHeader>
      <div className="mb-4 flex gap-5 justify-between px-5 md:px-12">
        <div className="flex gap-2 items-center">
          <h4 className="text-primary font-semibold">State: </h4>
          <p className="font-semibold text-gray-700">{states[0]?.name}</p>
        </div>
        <div className="flex flex-col ml-5">
          <label className="text-sm text-primary text-start py-2 font-semibold">
            POA Type
          </label>
          <select
            className="border text-sm bg-white p-2 px-4 rounded-md"
            value={poaType}
            onChange={(e) => setPoaType(e.target.value)}
          >
            <option value="poa1">POA1</option>
            <option value="poa2">POA2</option>
            <option value="poa3">POA3</option>
            <option value="poa4">POA4</option>
          </select>
        </div>
      </div>

      {formDataState &&
      !(
        Object.keys(formDataState).length === 0 &&
        formDataState.constructor === Object
      ) ? (
        <>
          <Table style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 text-primary font-bold">
                  Date
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Weekday
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  KPI Theme
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Activity
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Planned Event
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Tentative Target (Description in 50 words)
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  State
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  District
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Block
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Gram Panchayat
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Achievements
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Upload Photo
                </TableHead>
                <TableHead className="px-2 text-primary font-bold">
                  Remarks/Reason for Failure
                </TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {getDaysInMonth().map((day, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  {formDataState[day]?.map((entry, index) => (
                    <TableRow key={index} className="border-t border-gray-400">
                      {index === 0 && (
                        <>
                          <TableCell
                            className="p-2"
                            rowSpan={formDataState[day].length}
                          >
                            {/* {formatIndianDate(day)} */}
                            {entry?.date}
                          </TableCell>
                          <TableCell
                            className="p-2"
                            rowSpan={formDataState[day].length}
                          >
                            {getWeekDay(day)}
                          </TableCell>
                        </>
                      )}
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.kpi_theme || ""}
                          onChange={(e) =>
                            handlePlanChange(day, index, e.target.value)
                          }
                          disabled
                        >
                          <option value="">Select</option>
                          {Object.keys(planOfDayOptions).map((planKey) => (
                            <option key={planKey} value={planKey}>
                              {planKey}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.activity || ""}
                          onChange={(e) =>
                            handleActionChange(day, index, e.target.value)
                          }
                          disabled={!entry.plan}
                        >
                          <option value="">Select</option>
                          {entry.activity &&
                            planOfDayOptions[entry.kpi_theme]?.map(
                              (action, idx) => (
                                <option key={idx} value={action}>
                                  {action}
                                </option>
                              )
                            )}
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-28"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.plannedEvent || ""}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          className="px-2 py-1 rounded min-w-28"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.tentativeTarget || ""}
                          readOnly
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.state_id || ""}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value={entry.state.id}>
                            {entry?.state.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.dist_id || ""}
                          disabled
                        >
                          <option value="">Select</option>

                          <option value={entry?.district?.id}>
                            {entry?.district?.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.block_id || ""}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value={entry?.block?.id}>
                            {entry?.block?.name}
                          </option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>{" "}
                      <TableCell className="p-2">
                        <select
                          className="px-2 py-1 rounded min-w-24"
                          style={{ width: "100%" }}
                          value={entry.gp_id || ""}
                          disabled
                        >
                          <option value={entry?.gp.id}>{entry?.gp.name}</option>
                          <option value="NIRD">NIRD</option>
                          <option value="SIRD/SPRC">SIRD/SPRC</option>
                          <option value="None">None</option>
                        </select>
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-24"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.achievements || ""}
                          onChange={(e) =>
                            handleInputChange(
                              day,
                              index,
                              "achievements",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-24"
                          type="file"
                          onChange={(e) =>
                            handleInputChange(
                              day,
                              index,
                              "photo",
                              e.target.files[0]
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          className="px-2 py-1 rounded min-w-24"
                          type="text"
                          style={{ width: "100%" }}
                          value={entry.remarks || ""}
                          onChange={(e) =>
                            handleInputChange(
                              day,
                              index,
                              "remarks",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-end md:px-10">
            <Button pending={loading} onClick={handleSubmit} className="mt-4">
              {loading ? "Submitting ..." : "Submit"}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center texxt-2xl md:text-4xl text-gray-500">
          No Data found
        </div>
      )}
    </div>
  );
};

export default UpdateYfPOA1Form;
