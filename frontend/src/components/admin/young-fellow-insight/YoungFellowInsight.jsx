import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";

function YoungFellowInsights() {
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);

  const [selectedState, setSelectedState] = useState(state_id);
  const [selectedDistrict, setSelectedDistrict] = useState(dist_id);
  const [selectedBlock, setSelectedBlock] = useState(block_id);
  const [selectedGP, setSelectedGP] = useState(gram_id);

  const [youngFellowName, setYoungFellowName] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [achievement, setAchievement] = useState("");
  const [achievementPhoto, setAchievementPhoto] = useState(null);
  const [failure, setFailure] = useState("");
  const [planOfAction, setPlanOfAction] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlocks(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedBlock) {
      fetchGps(selectedBlock);
    }
  }, [selectedBlock]);

  const fetchStates = async () => {
    try {
      const { data } = await API.get("/api/v1/locations/states");
      setStates(data.states);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistricts = async stateId => {
    try {
      const { data } = await API.get(
        "/api/v1/locations/districts?state_id=${stateId}"
      );
      setDistricts(data.districts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlocks = async districtId => {
    try {
      const { data } = await API.get(
        "/api/v1/locations/blocks?district_id=${districtId}"
      );
      setBlocks(data.blocks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGps = async blockId => {
    try {
      const { data } = await API.get(
        "/api/v1/locations/gps?block_id=${blockId}"
      );
      setGps(data.gps);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = e => {
    setAchievementPhoto(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("youngFellowName", youngFellowName);
    formData.append("dateOfJoining", dateOfJoining);
    formData.append("state_id", selectedState);
    formData.append("dist_id", selectedDistrict);
    formData.append("block_id", selectedBlock);
    formData.append("gram_id", selectedGP);
    formData.append("financialYear", "FY 2023-24");
    formData.append("achievement", achievement);
    formData.append("achievementPhoto", achievementPhoto);
    formData.append("failure", failure);
    formData.append("planOfAction", planOfAction);

    try {
      await API.post("/api/v1/young-fellow-insights", formData);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Young Fellow Insights FY 2023-24
      </h1>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-3 gap-10">
        <div className="mb-4">
          <label className="block font-bold mb-2">Young Fellow Name</label>
          <input
            type="text"
            value={youngFellowName}
            onChange={e => setYoungFellowName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Date of Joining</label>
          <input
            type="date"
            value={dateOfJoining}
            onChange={e => setDateOfJoining(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">State</label>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">District</label>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Block</label>
          <select
            value={selectedBlock}
            onChange={e => setSelectedBlock(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select Block</option>
            {blocks.map(block => (
              <option key={block.id} value={block.id}>
                {block.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">GP</label>
          <select
            value={selectedGP}
            onChange={e => setSelectedGP(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select GP</option>
            {gps.map(gp => (
              <option key={gp.id} value={gp.id}>
                {gp.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Financial Year</label>
          <select className="p-2 border rounded w-full" required>
            <option value="FY 2023-24">FY 2023-24</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Achievements</label>
          <textarea
            value={achievement}
            onChange={e => setAchievement(e.target.value)}
            className="p-2 border rounded w-full"
            maxLength="300"
            required
          ></textarea>
          <small>Maximum 300 words</small>
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <small>
              Upload a photo that demonstrates your achievements in the last
              financial year with you present in it
            </small>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Failures</label>
          <textarea
            value={failure}
            onChange={e => setFailure(e.target.value)}
            className="p-2 border rounded w-full"
            maxLength="200"
            required
          ></textarea>
          <small>Maximum 200 words</small>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">
            Plan of Action for FY 2024-25
          </label>
          <textarea
            value={planOfAction}
            onChange={e => setPlanOfAction(e.target.value)}
            className="p-2 border rounded w-full"
            maxLength="200"
            required
          ></textarea>
          <small>Maximum 200 words</small>
        </div>
      </form>
      <div className="">
        <Button type="submit" className="px-20">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default YoungFellowInsights;
