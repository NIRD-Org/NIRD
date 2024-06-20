import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { ArrowLeftIcon } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Themes from "@/components/KIP/Themes";
import API from "@/utils/API";
import GpDetailComponent from "@/components/KIP/GpDetailComponent";
import YfInsightComponent from "@/components/YfInsightComponent";

const YfInsightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const [yfInsights, setYfInsights] = useState([]);
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";
  const navigate = useNavigate();

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
    console.log(data?.states);
  };

  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  const getAllBlocks = async () => {
    const { data } = await API.get(`/api/v1/block/get?dist=${dist}`);
    setBlockOptions(data.blocks);
  };

  const getAllGp = async () => {
    const { data } = await API.get(`/api/v1/gram/get?block=${block}`);
    setGpOptions(data.gram);
  };

  const getYfInsightsData = async () => {
    try {
      const { data } = await API.get(`api/v1/yf-insights/get?gp=${gp}`);
      setYfInsights(data?.data);
    } catch (error) {
      console.log("Error: " + error.message);
      setYfInsights([]);
    }
  };

  useEffect(() => {
    if (gp) {
      getYfInsightsData();
    }
  }, [gp]);

  useEffect(() => {
    setGpOptions([]);
    setBlockOptions([]);
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (dist) {
      getAllBlocks();
    }
  }, [dist]);

  useEffect(() => {
    getAllGp();
  }, [block]);

  const getStateById = async (stateId) => {
    try {
      const { data } = await API.get(`/api/v1/state/${stateId}`);
      setStateData(data.state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStateById(state);
  }, [state]);

  const handleDownloadPDF = () => {
    const input = document.getElementById("yf-insights-content");
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      logging: true,
      letterRendering: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const margin = 10;
      const headingHeight = 20; // height of the heading
      const textSize = 20;
      const text = "GP wise Youngfellow Insights";
      pdf.setFontSize(textSize);
      const textWidth = pdf.getTextWidth(text);
      const textX = (pdf.internal.pageSize.width - textWidth) / 2;
      const textY = margin + textSize;

      pdf.text(text, textX, textY);
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        textY + margin,
        imgWidth - 2 * margin,
        imgHeight
      );
      pdf.save("yf_insights.pdf");
    });
  };

  return (
    <div className="relative py-10 px-1 lg:px-20">
      <button
        onClick={() => navigate("/kpi")}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-2 left-4 md:top-10 md:left-20"
      >
        <ArrowLeftIcon className="w-7 h-5" />
        <p className="hidden md:block">Back</p>
      </button>
      <h1 className="text-3xl text-primary text-center font-bold">
        Gp Wise Youngfellow insights
      </h1>
      <div className="flex flex-col justify-between items-center lg:flex-row text-center text-3xl h-full">
        <div className="w-full h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                State
              </label>
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={state}
                onChange={(e) => {
                  setSearchParams({ state: e.target.value });
                }}
              >
                <option>All States</option>
                {stateOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                District
              </label>
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={dist}
                onChange={(e) => {
                  setSearchParams({ state, dist: e.target.value });
                }}
              >
                <option>All Districts</option>
                {districtOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                Block
              </label>
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={block}
                onChange={(e) => {
                  setSearchParams({ state, dist, block: e.target.value });
                }}
              >
                <option>All Blocks</option>
                {blockOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                Gram Panchayat
              </label>
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={gp}
                onChange={(e) => {
                  setSearchParams({ state, dist, block, gp: e.target.value });
                }}
              >
                <option>All GPs</option>
                {GpOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center lg:w-1/2 h-full">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full max-h-[40vh] xl:max-h-[30vh]"
          />
        </div>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download as PDF
      </button>
      <div
        className="pt-10 grid grid-cols-1 place-items-center"
        id="yf-insights-content"
      >
        {yfInsights.length > 0 ? (
          yfInsights.map((insights, index) => (
            <YfInsightComponent key={index} insight={insights} />
          ))
        ) : (
          <h1 className="text-center text-4xl text-gray-500 font-semibold">
            No Data Available
          </h1>
        )}
      </div>
    </div>
  );
};

export default YfInsightsPage;
