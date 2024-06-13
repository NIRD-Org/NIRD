import React from "react";

const Progress = ({ value }) => {
  return (
    <div className="w-[10rem]">
      <div
        className={`inline-block mb-2 ms-[calc(90%-1.25rem)] py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500`}
      >
        {value}%
      </div>
      <div
        className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
