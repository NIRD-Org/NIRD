import React from 'react';
import { FaBuilding, FaChalkboardTeacher, FaHandshake, FaLeaf, FaGavel, FaMoneyBillWave, FaPeopleArrows, FaBookOpen, FaChartLine } from "react-icons/fa";

const SchoolsOfExcellencePage = () => {
  const centers = [
    {
      icon: <FaBuilding className="text-red-500 text-5xl" />,
      title: "School of Governance",
      description: "The School of Governance is dedicated to refining the administrative capabilities and accountability mechanisms within Panchayats. It aims to establish robust governance frameworks, encouraging transparent, effective, and responsible administration. Through workshops, seminars, and direct consultancy, this school seeks to elevate the standards of local governance across diverse regions, emphasizing ethical practices, leadership development, and strategic policy implementation. The ultimate goal is to foster governance models that are not only efficient but also adaptable to the changing needs and challenges of rural administration."
    },
    {
      icon: <FaChalkboardTeacher className="text-green-500 text-5xl" />,
      title: "School of Capacity Building",
      description: "This school is a cornerstone for enhancing the professional skills of Panchayat members, offering training programs that cover a wide range of governance aspects from financial management to ethical leadership. The curriculum is designed to empower leaders with robust skills for managing local governance challenges, focusing on sustainable development, community engagement, and conflict resolution. These programs are crafted to be interactive and practical, ensuring that participants can apply their learning directly to their roles, thereby improving the efficacy and responsiveness of local governance systems."
    },
    {
      icon: <FaHandshake className="text-blue-500 text-5xl" />,
      title: "School of Participatory Governance",
      description: "The School of Participatory Governance champions the inclusion of community voices in the decision-making processes of Panchayats. By promoting participatory planning, budgeting, and project monitoring, this school ensures that governance becomes more inclusive, transparent, and community-focused. It organizes community outreach programs and builds platforms for citizen engagement, enabling a two-way communication channel between the Panchayats and the communities they serve. This approach not only enhances democratic practices but also improves policy receptiveness and public service delivery."
    },
    {
      icon: <FaLeaf className="text-yellow-500 text-5xl" />,
      title: "School of Sustainable Development",
      description: "This school emphasizes environmental stewardship and sustainable resource management within the frameworks of local governance. By integrating sustainability into the core planning and development processes, the School of Sustainable Development guides Panchayats towards adopting eco-friendly policies. It conducts research and offers training on sustainable agricultural practices, waste management, and renewable energy solutions, fostering an ecological consciousness that aims to mitigate environmental impacts while promoting local and global environmental goals."
    },
    {
      icon: <FaGavel className="text-purple-500 text-5xl" />,
      title: "School of Panchayat Law",
      description: "The School of Panchayat Law provides crucial legal education, advisory services, and regulatory support to ensure that governance operations adhere to the law. This school helps Panchayat leaders understand complex legal documents and comply with regulations, reducing legal risks and enhancing governance transparency. It also advocates for policy changes that can empower local governments, facilitating workshops and seminars on legal reforms, rights awareness, and the responsibilities of Panchayat members under the law."
    },
    {
      icon: <FaMoneyBillWave className="text-pink-500 text-5xl" />,
      title: "School of Financial Management",
      description: "Focusing on fiscal responsibility, the School of Financial Management trains Panchayat members in efficient budget management, financial planning, and auditing. This school aims to improve financial literacy and accountability among local government officials, ensuring that public funds are managed transparently and effectively. It offers specialized courses on fund allocation, revenue generation, and financial oversight, empowering Panchayats to achieve economic sustainability and integrity in financial dealings."
    },
    {
      icon: <FaPeopleArrows className="text-orange-500 text-5xl" />,
      title: "School of Social Audit",
      description: "The School of Social Audit promotes the practice of auditing by the community to oversee local projects and ensure accountability in governance. It trains community members in audit techniques, enabling them to effectively scrutinize government work and expenditure. This school plays a pivotal role in fostering transparency, empowering citizens to become watchdogs who ensure that developmental projects are executed efficiently and ethically."
    },
    {
      icon: <FaBookOpen className="text-teal-500 text-5xl" />,
      title: "School of Documentation",
      description: "This school specializes in the systematic documentation and reporting of governance activities, enhancing the transparency and traceability of governmental actions. It teaches Panchayat members how to maintain detailed records of meetings, projects, and financial transactions. Effective documentation practices facilitated by this school help in streamlining processes, aiding in better policy formulation and implementation, and serving as a reference for future governance activities."
    },
    {
      icon: <FaChartLine className="text-gray-500 text-5xl" />,
      title: "School of Planning and Development",
      description: "The School of Planning and Development assists Panchayats in strategic planning and project execution. It supports the creation of development plans that are both visionary and practical, ensuring that local projects align with broader development objectives. This school offers resources and expertise to effectively translate community needs into actionable plans, promoting sustainable growth and comprehensive community development."
    }
  ];

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Nine Schools of Excellence
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Specializing in Various Domains of Panchayati Raj Governance
        </p>
      </div>

      {centers.map((center, index) => (
        <div key={index} className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            {center.icon}
            <h2 className="text-[#004B86] text-2xl font-semibold ml-4">{center.title}</h2>
          </div>
          <p className="text-justify text-md leading-relaxed text-gray-700">
            {center.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SchoolsOfExcellencePage;
