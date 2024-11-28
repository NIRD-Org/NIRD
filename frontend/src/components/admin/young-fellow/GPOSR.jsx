import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import toast from "react-hot-toast";

const OSRForm = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGp, setSelectedGp] = useState("");
  const [osrValues, setOsrValues] = useState({
    "2021-22": "",
    "2022-23": "",
    "2023-24": "",
    "2024-25": "",
    "2025-26": "",
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await API.get("/api/v1/states");
        setStates(response.data.data);
      } catch (error) {
        console.error("Error fetching states:", error);
        toast.error("Failed to load states.");
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = async (stateId) => {
    setSelectedState(stateId);
    setSelectedDistrict("");
    setSelectedBlock("");
    setSelectedGp("");
    setDistricts([]);
    setBlocks([]);
    setGps([]);

    try {
      const response = await API.get(`/api/v1/districts?stateId=${stateId}`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Failed to load districts.");
    }
  };

  const handleDistrictChange = async (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedBlock("");
    setSelectedGp("");
    setBlocks([]);
    setGps([]);

    try {
      const response = await API.get(`/api/v1/blocks?districtId=${districtId}`);
      setBlocks(response.data.data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      toast.error("Failed to load blocks.");
    }
  };

  const handleBlockChange = async (blockId) => {
    setSelectedBlock(blockId);
    setSelectedGp("");
    setGps([]);

    try {
      const response = await API.get(`/api/v1/gps?blockId=${blockId}`);
      setGps(response.data.data);
    } catch (error) {
      console.error("Error fetching GPs:", error);
      toast.error("Failed to load GPs.");
    }
  };

  const handleGpChange = (gpId) => {
    setSelectedGp(gpId);
  };

  const handleOsrChange = (year, value) => {
    setOsrValues((prev) => ({ ...prev, [year]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedGp) {
      toast.error("Please select a Gram Panchayat.");
      return;
    }

    const payload = {
      gpId: selectedGp,
      osrValues,
    };

    try {
      await API.post("/api/v1/osr", payload);
      toast.success("OSR data submitted successfully!");
      setOsrValues({
        "2021-22": "",
        "2022-23": "",
        "2023-24": "",
        "2024-25": "",
        "2025-26": "",
      });
      setSelectedGp("");
    } catch (error) {
      console.error("Error submitting OSR data:", error);
      toast.error("Failed to submit OSR data.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-sm">
      <h2 className="text-lg font-bold mb-4">OSR Data Entry</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">State</label>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">District</label>
        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!selectedState}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Block</label>
        <select
          value={selectedBlock}
          onChange={(e) => handleBlockChange(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!selectedDistrict}
        >
          <option value="">Select Block</option>
          {blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Gram Panchayat</label>
        <select
          value={selectedGp}
          onChange={(e) => handleGpChange(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!selectedBlock}
        >
          <option value="">Select Gram Panchayat</option>
          {gps.map((gp) => (
            <option key={gp.id} value={gp.id}>
              {gp.name}
            </option>
          ))}
        </select>
      </div>
      <h3 className="font-semibold mb-2">OSR Values</h3>
      {Object.keys(osrValues).map((year) => (
        <div className="mb-4" key={year}>
          <label className="block mb-1 font-semibold">{year}</label>
          <input
            type="number"
            value={osrValues[year]}
            onChange={(e) => handleOsrChange(year, e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <Button onClick={handleSubmit} className="primary-button w-full mt-4">
        Submit
      </Button>
    </div>
  );
};

export default OSRForm;
