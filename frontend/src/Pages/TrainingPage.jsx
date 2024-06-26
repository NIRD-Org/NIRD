import React from "react";

const TrainingPage = () => {
  return (
    <div className="px-5  py-8 md:px-20 md:py-10">
      {/* Header */}
      <div className="pb-16">
        <h1 className="text-5xl md:text-6xl text-primary font-bold">
          Training & Capacity Building
        </h1>
      </div>

      <div>
        <h1 className="text-4xl text-primary font-semibold">Overview</h1>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          Young Fellows (YFs), State Programme Coordinators (SPCs), and other
          project staff undergo comprehensive training at NIRDPR, including a
          two-week induction and annual one-week refresher courses.{" "}
        </p>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          Additionally, SPCs and YFs receive periodic orientation from SIRDs,
          focusing on state initiatives for Panchayat strengthening and rural
          development. Senior officers from the MoPR regularly address the YFs
          on issues like Localization of SDGs and Panchayat Development Index
          (PDI).{" "}
        </p>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          NIRDPR also provides orientation for state and district officers,
          block development officers, elected representatives, and functionaries
          on project objectives, mostly online or in hybrid mode. Weekly or
          fortnightly calls are held to resolve project issues, and extensive
          learning materials and operational guidelines are distributed to
          enhance the training of project GPs.
        </p>
      </div>
    </div>
  );
};

export default TrainingPage;
