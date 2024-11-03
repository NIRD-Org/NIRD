import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, tst } from "@/lib/utils";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useAdminState } from "@/components/hooks/useAdminState";
import { showAlert } from "@/utils/showAlert";

const SoeprUserLocation = () => {
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [adists, setAdists] = useState([]);
  const { userId } = useParams();
  const { adminStates } = useAdminState();

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setState(selectedStateId);
    setSelectedDistricts([]);
  };

  const handleDistrictChange = (selectedList) => {
    const districtIds = selectedList.map((item) => item.id);
    setSelectedDistricts(districtIds);
  };

  const postLocation = async () => {
    const SoeprUserLocations = {
      state_ids: [state],
      dist_ids: selectedDistricts,
    };

    if (!state || selectedDistricts.length === 0) {
      tst.error("Please select a state and at least one district.");
      return;
    }

    try {
      await API.post("/api/v1/soepr-location/create", {
        user_id: userId,
        userLocations: SoeprUserLocations,
      });
      showAlert("User has been assigned location successfully", "success");
    } catch (error) {
      tst.error("Error assigning location. Please try again.");
    }
  };

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/soepr-state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchADists() {
      try {
        const response = await API.get(`/api/v1/soepr-dist/all`);
        setAdists(response.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDistricts() {
      if (state) {
        try {
          const response = await API.get(`/api/v1/soepr-dist/state/${state}`);
          setDistricts(response.data?.districts || []);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchStates();
    fetchADists();
    fetchDistricts();
  }, [state]);

  return (
    <div className="p-6 max-w-[700px] mx-auto">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select State
        </label>
        <select
          className="block w-full p-2 border rounded-md"
          value={state || ""}
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {states?.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Districts
        </label>
        <Multiselect
          options={districts}
          selectedValues={selectedDistricts.map((id) =>
            districts.find((dist) => dist.id === id)
          )}
          displayValue="name"
          onSelect={handleDistrictChange}
          onRemove={handleDistrictChange}
          placeholder="Select multiple districts"
          style={{
            chips: { background: "#2563EB" },
            searchBox: {
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            },
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          onClick={postLocation}
          className="block  text-white py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SoeprUserLocation;
