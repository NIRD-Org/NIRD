import React, { useState } from "react";

const LCVADropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Drive for clean village",
    "Drive for plastic-free village with participation by most of the members of the communities as mentioned above.",
    "Drive for spit-free village with a notice to be issued by GPs against spitting at public places.",
    "Drive for kitchen garden at every home to be developed by each household at its own cost.",
    "Drive for soak pit at every home to be developed by each household – water of which will be utilised in kitchen gardens.",
    "Drive for re-excavation of derelict field channels for irrigation purpose.",
    "Drive for minor repair to schools and AWC premises.",
    "Drive for erection of fencing around schools and AWCs.",
    "Drive for contour bunding and trench-cutting at upper reaches/recharge zones for percolation of rainwater and recharge of ground water.",
    "Drive for filling water bodies with rainwater during rains.",
    "Drive for removing hyacinths and other weeds from water bodies.",
    "Drive for wall writing with development slogans.",
    "Drive for universalisation of immunisation and universalisation of institutional delivery.",
    "Awareness camp about health and hygiene.",
    "Drive for hand wash before taking every meal.",
    "Drive for bringing dropouts back to AWCs/schools.",
    "Drive for free coaching for backward learners.",
    "Raising a central nursery for 10000 saplings at every GP.",
    "Drive for plantations with ownership of communities.",
    "Awareness/training on agriculture and farming technology for farmers.",
    "Awareness on issues related to human trafficking.",
    "Legal awareness camps",
    "Mass rally against alcoholism, drug addiction, child abuse, domestic violence etc.",
    "Drive for setting up of a library with Book Bank for school children at every village.",
    "Organising groups of adolescent girls and involving them in social issues.",
    "Organising children’s clubs for games and sports.",
    "others",
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full md:w-56">
      <div className="relative mt-1">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm overflow-x-auto"
        >
          <option value="" disabled>
            Select LVCA
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LCVADropdown;
