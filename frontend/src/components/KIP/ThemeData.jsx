import React from "react";
import ManregsChart from "./charts/theme1/MenregsChart";
import { useSearchParams } from "react-router-dom";

const ThemeData = ({ kpi }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dist = searchParams.get("dist");
  const state = searchParams.get("state");
  const gp = searchParams.get("gp");
  return (
    <div className="px-4 md:px-10">
      <h1 className="text-2xl mb-5 md:text-3xl font-semibold">
        Poverty Free and Enhanced Livelihoods Village
      </h1>
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {/* Kpi Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo1.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of job card holders in the GP that received wage
              employment under MGNREGS
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            {/* <img src="/theme1/1.png" alt="graph" className="w-7/12" />
             */}
            <ManregsChart
              dist={dist}
              chartType={"Pie"}
              state={state}
              gp={gp}
              kpi={1}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo2.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of Households (HHs) in the GP covered under Pradhan
              Mantri Awas Yojana-Grameen (PMAY-G)/ Similar State schemes
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Bar"}
              state={state}
              gp={gp}
              kpi={2}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo3.jpg" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of farmers in the GP benefited under the Pradhan Mantri
              Kisan Samman Nidhi (PM-KISAN) Scheme
            </p>
          </div>
          <div className="w-fit border-4 flex flex-col justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Line"}
              state={state}
              gp={gp}
              kpi={3}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo4.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of population of the GP covered under National Food
              Security Act, 2013
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Pie"}
              state={state}
              gp={gp}
              kpi={4}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo5.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of population in the GP covered under National Social
              Assistance Programme (NSAP)/similar State pension scheme in the
              State/UT
            </p>
          </div>
          <div className="w-fit  flex justify-end items-end">
            <ManregsChart
              dist={dist}
              chartType={"Doughnut"}
              state={state}
              gp={gp}
              kpi={5}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo6.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of population in the GP covered under Pradhan Mantri
              Jan-Dhan Yojana (PMJDY)
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Polar"}
              state={state}
              gp={gp}
              kpi={6}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo7.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of women belonging to BPL HHs (as per SECC 2011) in the
              GP who became members of Self-Help Groups (SHGs) in the GP.
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Pie"}
              state={state}
              gp={gp}
              kpi={7}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo7.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of SHGs in the GP which availed themselves of Bank
              loan.
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Bar"}
              state={state}
              gp={gp}
              kpi={8}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo7.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of SHGs/members engaged in income generation activities
              in the GP
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Scatter"}
              state={state}
              gp={gp}
              kpi={9}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo10.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of persons certified through the skill development
              training institutes/ITIs in the GP
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Bubble"}
              state={state}
              gp={gp}
              kpi={10}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo1.png" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of the total Budget in the GPDP for 2023-24 allocated
              for implementing various poverty reduction & livelihood activities
              other than MGNREGS & NRLM
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Ploar"}
              state={state}
              gp={gp}
              kpi={11}
            />
          </div>
        </div>
        {/* Card */}
        <div className="w-80 min-h-72 flex flex-col justify-between items-center  h-auto border rounded ">
          <div className="rounded-sm bg-[#004B86] flex gap-2 justify-between items-center font-semibold">
            <img src="/theme1/logo12.jpg" alt="graph" className="w-20 h-20 " />
            <p className="text-sm text-white">
              Percentage of own resource or voluntary contribution provided by
              the GP to address poverty and provide enhanced livelihoods in the
              GP.
            </p>
          </div>
          <div className="w-fit  flex justify-center items-center">
            <ManregsChart
              dist={dist}
              chartType={"Pie"}
              state={state}
              gp={gp}
              kpi={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeData;
