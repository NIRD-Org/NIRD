import React, { useState } from "react";


  const points = [
    "Young Fellows serve as vital links between Gram Panchayats (GPs) and communities, building trust and encouraging active participation in development initiatives.",
    "They provide essential training to elected representatives and functionaries, equipping them with skills to strengthen institutional governance.",
    "Young Fellows gather baseline data, identify gaps, and help GPs make evidence-based decisions to prioritize development needs.",
    "They guide GPs on adopting transparent practices, ensuring accountability in governance and effective implementation of projects.",
    "Young Fellows actively facilitate the preparation of Gram Panchayat Development Plans (GPDP) and ensure alignment with Sustainable Development Goals (SDGs).",
    "They mentor and motivate Panchayat members to organize and conduct vibrant Gram Sabha meetings, fostering inclusive participation.",
    "Young Fellows support capacity building of Self-Help Groups (SHGs), enhancing livelihoods and reducing poverty in rural areas.",
    "They act as change agents, introducing modern tools, technologies, and methods to enhance efficiency in governance.",
    "Young Fellows assist GPs in mobilizing resources, such as government schemes and CSR funding, for infrastructure and welfare projects.",
    "Their proactive approach ensures a collaborative environment between various stakeholders, driving sustainable and impactful development."
  ];


const sections = [
  {
    title: "Activities of YF for Institutional Strengthening of GPs",
    activities: [
      "Visiting GP to understand the socio-cultural-economic-political status of the GP areas, acquaint with the ERs and functionaries of the GPs, and to convince them about the purpose of the Project for Creating 250 Model GP Clusters across India.",
      "Visiting GP to understand system of functioning as institutions of self-government – its strengths and limitations, the functioning of Gram Sabha, Ward Sabha, Mahila Sabha, Bal Sabha etc. and check the same with the Registers maintained by the GP.",
      "Visiting the GP to collect baseline information in the given format.",
      "Meeting the State Nodal Officer to build affinity.",
      "Meeting the State Nodal Officer to discuss various aspects and challenges of the Project GPs.",
      "Meeting the line department employees of the GP to build affinity and to collect the relevant information about the status of development, the major problems faced by the GPs and the efforts they have made to solve the problems.",
      "Meeting the Block/Mandal/Janpad Panchayat/Taluka, to build affinity and to collect the relevant information about the status of development, the major problems faced by the GPs and the efforts they have made to solve the problems.",
      "Meeting the SHG Federation to build affinity and to collect the relevant information about the status of development, the major problems faced by the GPs and the efforts they have made to solve the problems.",
      "Identifying a number of volunteers as ‘Panchayat Bandhu’, to build affinity and to motivate them to join the mission of transforming the GPs into institutions of self-development.",
      "Meeting a few communities to tell them about the purpose of the Project and build up affinity with them.",
      "Initiating NCVAs in the GP.",
      "Understanding & Analyzing GPDP documents of the previous years and to understand the gaps in them; to understand the Resource Envelope; status of OSR; and the status of fund utilization and achievements made by each GP so far.",
      "Conduct Orientation to ERs and functionaries of the GPs about the issues related to Localization of SDGs, preparation of Theme/Sankalp-based GPDPs for 2024-25.",
      "Conduct Orientation to ERs and functionaries of the GPs about various portals of MoPR.",
      "Meeting ERs to Motivate for organizing Vibrant Gram Sabhas.",
      "Meeting line departments to motivate them to actively participate in the Vibrant Gram Sabha meetings.",
      "Meeting SHGs and their Federations to motivate them to actively participate in the Vibrant Gram Sabha meetings.",
      "Organizing Vibrant Gram Sabhas/ Facilitating the Conduct of Vibrant Gram Sabha Meeting.",
      "Meeting Sarpanch/Pradhan/Mukhiya and Secretary to motivate for holding a monthly collective body meeting.",
      "Organizing Monthly Collective Body Meeting/ Facilitating the Conduct of Monthly Collective Body Meeting.",
      "Meeting line department officers and employees to encourage their presence in the Gram Sabha.",
      "Meeting Ward Members to orient and motivate to actively participate in the functioning of the GP.",
      "Organizing Gram Sabha/ Facilitating the Conduct of Gram Sabha Meeting.",
      "Organizing Ward Sabha/ Facilitating the Conduct of Ward Sabha Meeting.",
      "Organizing Mahila Sabha/ Facilitating the Conduct of Mahila Sabha Meeting.",
      "Organizing Bal Sabha/ Facilitating the Conduct of Bal Sabha Meeting.",
      "Meeting with line department officers and employees to gather information about departmental schemes, status of development, display, and utilization of a Citizen Charter in the GP.",
      "Organizing community meetings to disseminate Departmental Schemes information.",
      "Conducting/Organizing awareness meetings with the community to raise awareness about the significance of Gram Sabha.",
      "Conducting/Organizing awareness meetings with the community to raise awareness about the significance of Baal Sabha.",
      "Conducting/Organizing awareness meetings with the community to raise awareness about the significance of Mahila Sabha.",
      "Conduct Training need-assessment/Identify training needs among Village Panchayat Leaders, Village Officials, and SHGs.",
      "Organizing training for Village Panchayat Leaders.",
      "Organizing training for Village Officials.",
      "Organizing training for SHGs.",
      "Meeting with ERs and functionaries to mentor and guide them on enhancing organizational dynamics, enabling them to operate effectively as a collective body.",
      "Meeting the ERs to orient for the collection and consolidation of secondary data to support evidence-based GPDP.",
      "Meeting the GP functionaries to orient for the collection and consolidation of secondary data to support evidence-based GPDP.",
      "Meeting the line department employees to orient for the collection and consolidation of secondary data to support evidence-based GPDP.",
      "Meeting the GPs to guide in setting up Standing Committees as per the State Panchayati Raj Act, to ensure all committees operate effectively.",
      "Meeting the line department staff to guide in setting up Standing Committees as per the State Panchayati Raj Act, to ensure all committees operate effectively.",
      "Meeting the ERs to motivate and guide in mobilizing and utilizing OSR.",
      "Meeting the GP Functionaries to motivate and guide in mobilizing OSR.",
      "Meeting the GP staff to mentor and guide them to enhance the management and maintenance of Registers and Records.",
      "Meeting the ERs and functionaries of the GP to orient measures to adopt for improvement in practicing transparency & accountability including Voluntary Disclosure of information at public places.",
      "Meeting with ERs to guide and support them so that they can effectively implement and monitor their assigned activities and schemes with enhanced institutional capacity.",
      "Meeting with GP staff to guide and support them so that they can effectively implement and monitor their assigned activities and schemes with enhanced institutional capacity.",
      "Meeting the ERs to motivate and help them understand and recognize the value of operating independently as self-governing bodies, free from any internal or external control.",
      "Meeting the GP functionaries to motivate and help them understand and recognize the value of operating independently as self-governing bodies, free from any internal or external control.",
      "Facilitating the timely submission of the monthly report to the BDO/CEO (BP/JP).",
      "Preparing the Agenda Points to discuss in the monthly meeting with BDO/CEO (BP/JP).",
      "Preparing the Agenda Points to discuss in the monthly meeting with DPRO/CEO (ZP).",
      "Monthly meeting with the BDO/CEO (BP/JP).",
      "Monthly meeting with the DPRO/CEO (ZP).",
    ],
  },
  {
    title: "Activities of YF for Poverty Free and Enhanced Livelihoods Villages",
    activities: [
      "Assessment of the number of Job card holders and out of them how many have demanded wage employment under MGNREGS.",
      "Assessment of the number of Job card holders having received wage employment under MGNREGS.",
      "Assessment of the number of households having received benefit under PMAY-G and to mentor and guide the GPs on how the households under Waiting List can be given benefit under PMAY-G/ similar State Schemes.",
      "Supporting the GP in registration and preparation of a list of eligible beneficiaries (farmers) under the PM-KISAN scheme.",
      "Conducting a drive to identify eligible households which do not have ration cards and to facilitate the process of providing ration cards.",
      "Assessment of the households yet to be covered under National Food Security Act and to assist the GPs to cover them on saturation basis.",
      "Assisting in preparation of a list of households so far covered under NSAP/similar State Pension scheme.",
      "Assisting in the conduct of assessing the gap to plan for covering all the eligible households under NSAP/similar State Pension scheme on saturation basis.",
      "Assisting in preparation of the list of persons so far covered under PMJDY.",
      "Assisting in assessing the gap to plan for covering all the eligible population under PMJDY on saturation basis.",
      "Facilitating the conduct of assessment of the number of women belonging to BPL HHs already brought under SHGs.",
      "Conduct of assessment of the number of women's SHGs belonging to BPL HHs brought under Bank loan.",
      "Conduct of meeting to orient and guide the GP on how the BPL women's SHGs can be brought under Bank loan.",
      "Assessment of the number of women's SHGs serving nutritious food or Mid-Day Meal in schools and Anganwadi Centres etc.",
      "Conduct of meeting to orient and guide the GPs on how women's SHGs can be engaged in income-generating activities including Nutri-Gardens/Kitchen Gardens.",
      "Assessment of the number of the eligible persons registered for skill development training, how many of them have been trained and certified so far.",
      "Conduct of meeting to orient and guide the GPs on how all the eligible persons can be brought under skill development training and certification process.",
      "Guiding the GP on how GP Budget can be allocated for implementing various poverty reduction & livelihood activities other than MGNREGS & NRLM planned under GPDP."
    ],
  },
  {
    title: "Activities of YF for Healthy Village",
    activities: [
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
      "Organise meetings to sensitise and guide GP & communities to reduce water-borne diseases.",
      "Conduct IEC campaigns, distribution of mosquito nets, sanitisation of public places & houses, health check-ups and distribution of preventive medicines to reduce water-borne diseases.",
      "Facilitate regular meetings of VHSNC.",
      "Guiding the GP on how GP Budget can be allocated for implementing various health-related activities planned under GPDP."
    ]
  },
  {
    title: "Activities of YF for Child Friendly Village",
    activities: [
      "Conduct meetings in the GP to discuss the negative impacts of malnutrition, the risks associated and measures of prevention among children below 5 years of age.",
      "Data collection on no. of malnourished children below 5 years of age in the GP.",
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
      "Guiding the GP on how GP Budget can be allocated for implementing various child-friendly related activities planned under GPDP."
    ]
    
  },
  {
    title: "Activities of YF for Water Sufficient Village",
    activities: [
      "Facilitating the meetings conducted by the Village Water & Sanitation Committee (VWSC)/ Paani Samitis or any related Standing Committee as per JJM guidelines in the GP.",
      "Supporting the preparation of Village Action Plan by the GP & Village Water & Sanitation Committee (VWSC) in the GP.",
      "Supporting the GP in providing Tap Water Connection to 100% households as per guidelines of JJM.",
      "Supporting the GP in providing Tap Water Connection to schools, Anganwadi centres, GP buildings, Health centres, wellness centres, community buildings etc.",
      "Facilitating the initiatives for water conservation measures like rooftop rainwater harvesting in the GP.",
      "Facilitating the initiatives for watershed-based development for conservation of rainwater in the GP.",
      "Facilitate the preparation of a broad-based plan to ensure 65 litres of water on a per capita per day basis in the GP.",
      "Facilitate the cleaning/chlorination of Storage Tanks in the GP.",
      "Facilitate the initiatives on water quality testing using Field Test Kits in the GP.",
      "Conduct meetings with GP and communities to discuss Water Conservation/Drought Management/related issues in Gram Sabha Meetings of the GP.",
      "Guiding the GP on how GP Budget can be allocated for implementing various water-related activities planned under GPDP."
    ]
    
    
  }, {
    title: "Activities of YF for Clean and Green Village",
    activities: [
      "Facilitating the meetings conducted by the Village Water & Sanitation Committee (VWSC)/ Paani Samitis or any related Standing Committee as per JJM guidelines in the GP.",
      "Facilitating the third-party verification by inter-Block/District Teams after self-declaration as ODF Plus in the GP.",
      "Facilitating the conduct of Operation and Maintenance of Solid & Liquid Waste Management (SLWM) assets in the GP.",
      "Facilitating the maintenance of the People’s Biodiversity Register by Biodiversity Management Committee (BMC) in the GP.",
      "Facilitating the GP in registration of the eligible households under UJALA/Similar State/UT schemes to obtain benefit under the schemes.",
      "Facilitating the GP in registration of the eligible households under deposit free LPG connections under the PMUY/Similar State/UT schemes to obtain benefit under the schemes.",
      "Facilitating the conduct of meeting of the Standing Committee/Sub Committee on Environment Preservation/Natural Resource Management in the GP.",
      "Facilitating the GP to provide support to the communities and citizens for taking benefit of solarized irrigation pumps, solarized streetlights etc.",
      "Guiding the GP on how GP Budget can be allocated for implementing various clean and green activities planned under GPDP.",
      "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing ‘clean and green’ activities in the GP."
    ]
    
    
  },

  {
    title: "Activities of YF for Self-Sufficient Infrastructure in Villages",
    activities: [
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
      "Facilitating the GP to identify and secure government programs and schemes, CSR funds, partnerships with NGOs or private sector entities for the infrastructure improvements such as electricity, drinking water, and toilets.",
      "Conducting survey of the existing public transport services and infrastructure in the GP, including the availability of bus sheds, drinking water, and toilet facilities at bus stops, and identifying specific gaps & needs such as the lack of public transport options, absence of disabled-friendly infrastructure, and inadequate waiting area amenities.",
      "Conducting a comprehensive assessment in collaboration with local authorities and the community to identify areas vulnerable to floods, cyclones, and other disasters and to identify and acquire a suitable site for the relief center.",
      "Conduct meetings with GP members to discuss the design, location, and operational plan for the relief center.",
      "Facilitating the GP to identify and secure government programs and schemes, CSR funds, partnerships with NGOs or private sector entities for the construction of relief centres in the GP.",
      "Conducting assessment of the community’s water needs, identifying potential sites for storage tanks.",
      "Supporting the GP in mobilizing resources, which may include government grants, community contributions, and external funding for the construction of storage tanks for water storage in the GP.",
      "Conducting a survey within the GP to assess the healthcare needs of the population, collect data on the nearest health facilities, current access issues, and gaps in service delivery.",
      "Facilitating meetings between GP representatives and district health officials to discuss the need for establishing or improving access to a Health Sub Centre or Health & Wellness Centre in the GP.",
      "Facilitating the GP members to ensure construction or renovation of the Health Sub Centre or Health & Wellness Centre in the GP.",
      "Conducting survey within the GP to assess the livestock population, common health issues, and the current availability of veterinary services.",
      "Facilitating meetings between GP representatives, local livestock owners, and the district veterinary department to discuss the need for a Livestock Aid Centre and to engage with agricultural & animal husbandry officials to seek support and input.",
      "Supporting the GP in identifying funding sources for the construction and maintenance of the livestock aid centre.",
      "Establishing partnerships with nearby veterinary colleges, animal husbandry departments, and mobile veterinary units to provide regular outreach services, vaccination drives, and health camps in the GP.",
      "Conducting survey of the existing school premises to identify if any existing play areas or suitable locations for playgrounds.",
      "Organizing meetings between GP members, school principals, teachers, parents and school management committees (SMCs) to discuss the importance of having a dedicated playground.",
      "Supporting the GP to identify funding sources for establishing playgrounds, including government grants, CSR initiatives, or community contributions.",
      "Guiding the GP on how GP Budget can be allocated for implementing various infrastructure-related activities planned under GPDP.",
      "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing infrastructure-related activities in the GP."
    ]
    
    
  },

  {
    title: "Activities of YF for Socially Just & Socially Secured Village",
    activities: [
      "Assisting registration of eligible households for benefits under NSAP of Central Government or similar State/UT Government schemes and to plan for covering as many households as possible under NSAP or even OSR as a means of social security.",
      "Assisting registration of eligible households for benefits for assistive devices (wheelchairs, crutches, artificial limbs, walking sticks for blind etc.) and to plan for covering as many households as possible under disability supporting schemes and even with OSR.",
      "Assisting registration of eligible senior citizens (above 60 years) for Physical Aids and Assisted-living Devices under the Rashtriya Vayoshri Yojana/other State-specific scheme and to plan for covering as many eligible persons as possible even with OSR.",
      "Assisting registration of eligible disabled persons for Unique Disability Identity Card (UDID) and to plan for covering as many differently abled persons as possible under various schemes even with OSR.",
      "Assisting registration of eligible persons for Ayushman Bharat Card under PMJAY or similar under State specific schemes and to plan for covering as many eligible persons as possible under similar State schemes.",
      "Organizing community awareness sessions on the importance of ICDS benefits, such as supplementary nutrition, immunization, health check-ups, and early childhood education in the GP.",
      "Conducting survey in the GP to identify all eligible children (0-6 years), pregnant women, and lactating mothers and ensure they can receive benefits under the ICDS.",
      "Guiding the GP on how GP Budget can be allocated for implementing various social assistance to persons (such as old, widow, disabled etc.) activities planned under GPDP.",
      "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various activities for upliftment of marginalized groups [SC/ST/Women/Destitute/Old/Senior Citizen/Divyangjan (People with Special Needs)] in the GP."
    ]
    
    
  },

  {
    title: "Activities of YF for Village with Good Governance",
    activities: [
      "Identifying available resources and potential gaps that need to be addressed to equip the GPs with the necessary technology.",
      "Organising meeting with GP members to highlight the benefits of having dedicated computers and accessories and emphasize the role of digital tools in improving efficiency, transparency, and service delivery.",
      "Assisting the GP in identifying funding sources, such as government grants, CSR funds, or local resources, to purchase computers and accessories.",
      "Organizing training programs for GP members and staff on using computers, data entry, report generation and portals of MoPR.",
      "Organizing training sessions for GP members on planning and conducting vibrant Gram Sabhas.",
      "Working with GP members to develop an annual calendar for Gram Sabhas (at least six meetings throughout the year) and to ensure Gram Sabha meetings are inclusive (participation from marginalized groups, women, and youth).",
      "Assisting the GP in documenting the proceedings of Gram Sabha meetings, including the issues discussed, decisions made, and actions planned.",
      "Organising training sessions to GP members and staff to utilise the e-Gram Swaraj portal for various purposes of Panchayat functioning (planning, reporting, geotagging, accounting and online payments).",
      "Organising training sessions to GP members and staff to equip them with necessary information including basic profile including LGD, Connectivity details, Election details, Elected Member details, Panchayat Committee details, Panchayat Committee member details etc.",
      "Conducting assessment of the GP’s existing record-keeping practices related to financial expenditures of the GP.",
      "Assisting the GP in developing templates and formats for maintaining records of expenditures from various sources, such as CSS, State Schemes, SFC funds, and OSR, financial registers, ledgers, and reports that are easy to use and understand.",
      "Assisting the GP in creating a key financial activities and deadlines throughout the year, culminating in the closure of accounts by 31st March including audits and submission of reports.",
      "Supporting the GP in preparing for audits every year.",
      "Reviewing the current GPDP to identify Critical and Moderate MA Gaps to fix specific targets for bridging Critical MA Gaps in GPDP and Moderate MA Gaps in GPDP.",
      "Facilitating the GP to upload GPDP online.",
      "Supporting the GP to get the GP accounts under Central Finance Commission Grant audited through Audit online.",
      "Supporting the GP to have its own website in active condition.",
      "Facilitating the GP to map all the villages with LGD.",
      "Facilitating the GP to electronically provide services including regulatory services like trade license, permit for construction of buildings, vehicle registration, income certificate, land valuation certificate etc.; statutory services like issuance of Birth/Death certificate, Senior Citizen Certificate, issuance of passes to Goods Vehicle etc.; development services; consumer utility services like bill payment, Issuance of Migration Certificate, Tracking Beneficiary Pension Detail, Application for Education Loan for Backward Classes etc.",
      "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various activities to promote Good Governance."
    ]
    
    
  },

  {
    title: "Activities of YF for Women Friendly Villages",
    activities: [
      "Organising Mahila Sabha/ Facilitating the Conduct of Mahila Sabha Meeting in the GP.",
      "Conducting awareness campaigns in the community, highlighting the importance of girls’ education.",
      "Identifying girls who are not enrolled in school or have dropped out and organising enrolment drives in collaboration with local schools to ensure that all identified out-of-school girls are enrolled in the GP.",
      "Organising community-wide campaigns focusing on the importance of proper nutrition for girl children to ensure that no girl child is underweight, stunted, anaemic (including women) in the GP.",
      "Organising regular health camps in collaboration with local health centers and Anganwadi centres to monitor the weight and growth of all girl children in the GP.",
      "Facilitating the enrolment of underweight girls in government nutrition programs such as ICDS (Integrated Child Development Services), and coordinating with Anganwadi centers to distribute rations to families in need in the GP.",
      "Supporting the families in the GP to set up kitchen gardens to grow vegetables and fruits, improving access to fresh and nutritious food.",
      "Facilitating the GP to fully utilize government schemes aimed at improving child nutrition, such as the Mid-Day Meal Scheme, Poshan Abhiyaan, and public distribution systems and assisting families in accessing these resources effectively.",
      "Conduct orientation to GP members & communities on benefits of Ayushman Bharat/ PMJAY / PMMVY / similar State Govt Health scheme /health insurance.",
      "Conduct gap assessment to identify the gaps in coverage among women and facilitate registration of all eligible women in the GP under Ayushman Bharat/ PMJAY / PMMVY / similar State Govt Health scheme /health insurance.",
      "Conducting awareness campaigns to educate BPL women and their families about the benefits of joining SHGs in the GP.",
      "Conducting survey within the GP to identify all BPL households, map the women eligible to join SHGs.",
      "Identifying specific training needs & organising training to the SHGs in the GP.",
      "Guiding the GP on how GP Budget can be allocated for implementing various women development-related activities planned under GPDP.",
      "Conducting a meeting to discuss how GP can make greater financial contribution, through own resources or voluntary, for implementing various women development activities."
    ]
    
    
  },
  
];



const YFActivities = () => {
  const [expandedSectionIndex, setExpandedSectionIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? null : index);
  };

  const downloadActivities = () => {
    const allActivities = sections
      .map(
        (section) =>
          `${section.title}\n${section.activities
            .map((activity, i) => `${i + 1}. ${activity}`)
            .join("\n")}`
      )
      .join("\n\n");

    const blob = new Blob([allActivities], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "YF_Activities.txt";
    link.click();
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Importance Section */}
      <div className="p-6 bg-white mb-20">
        <h1 className="text-2xl font-bold text-center text-[#004B86] mb-6">
          Importance of Young Fellows in the Project
        </h1>
        <ul className="list-disc space-y-4 px-8 text-gray-700 text-md">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Activities Section */}
      <h1 className="text-2xl font-bold text-center text-[#004B86] mb-6">
        Young Fellows Activities
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Explore the detailed activities undertaken by Young Fellows to empower
        Gram Panchayats and foster sustainable development. You can expand each
        section for details or download the full list.
      </p>
      <center><button
        onClick={downloadActivities}
        className="bg-blue-900 text-white px-6 py-2 rounded shadow mb-6 hover:bg-blue-600 transition"
      >
        Download Activities List
      </button> </center>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <h2 className="text-lg font-semibold text-[#004B86]">
                {section.title}
              </h2>
              <button className="text-xl font-bold">
                {expandedSectionIndex === index ? "−" : "+"}
              </button>
            </div>
            {expandedSectionIndex === index && (
              <ul className="mt-4 space-y-2">
                {section.activities.map((activity, i) => (
                  <li key={i} className="text-gray-700">
                    {i + 1}. {activity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YFActivities;