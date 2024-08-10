import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import { cn, tst } from "@/lib/utils";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const UpdateSoeprUserLocation = ({ view }) => {
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const { user } = useAuthContext();
  const { userId } = useParams();

  const handleStateChange = async (e) => {
    const selectedStateId = e.target.value;
    setState(selectedStateId);
    setSelectedDistricts([]);
    try {
      const response = await API.get(`/api/v1/dist/state/${selectedStateId}`);
      setDistricts(response.data?.districts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictSelect = (selectedList) => {
    const districtIds = districts
      .filter((district) => selectedList.includes(district.name))
      .map((district) => district.id);
    setSelectedDistricts(districtIds);
  };

  const handleDistrictRemove = (selectedList) => {
    const districtIds = districts
      .filter((district) => selectedList.includes(district.name))
      .map((district) => district.id);
    setSelectedDistricts(districtIds);
  };

  const postLocation = async () => {
    const userLocations = {
      state_ids: [state],
      dist_ids: selectedDistricts,
    };

    if (selectedDistricts.length === 0 || !state) return;

    try {
      await API.put(`/api/v1/soepr-location/${userId}`, {
        userLocations,
      });
      tst.success("Soepr Location updated successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchUserLocation() {
      try {
        const response = await API.get(`/api/v1/soepr-location/${userId}`);
        const data = response.data.data.userLocations;
        setState(data.state_ids[0] || "");
        setSelectedDistricts(data.dist_ids || []);
      } catch (error) {
        console.log(error);
      }
    }

    Promise.all([fetchStates(), fetchUserLocation()]);
  }, [userId]);

  useEffect(() => {
    if (state) {
      handleStateChange({ target: { value: state } });
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mt-6 w-full max-w-[800px]">
        <select
          className={cn(
            "text-sm px-4 py-2 rounded-md bg-transparent border flex-1"
          )}
          value={state}
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <Multiselect
          disable={view}
          isObject={false}
          onSelect={handleDistrictSelect}
          onRemove={handleDistrictRemove}
          selectedValues={districts
            .filter((district) => selectedDistricts.includes(district.id))
            .map((district) => district.name)}
          options={districts.map((district) => district.name)}
          displayValue="name"
          className="flex-1"
        />
      </div>

      {!view && (
        <Button onClick={postLocation} className="mx-auto block px-20 mt-10">
          Submit
        </Button>
      )}
    </div>
  );
};

export default UpdateSoeprUserLocation;
