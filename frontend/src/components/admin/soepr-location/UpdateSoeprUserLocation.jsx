import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import { cn, tst } from "@/lib/utils";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { showAlert } from "@/utils/showAlert";

const UpdateSoeprUserLocation = ({ view }) => {
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true); // Track the initial load
  const { user } = useAuthContext();
  const { userId } = useParams();

  const handleStateChange = async (e) => {
    const selectedStateId = e.target.value;
    setState(selectedStateId);
    setSelectedDistricts([]); // Reset selected districts when a new state is chosen
    try {
      const response = await API.get(
        `/api/v1/soepr-dist/state/${selectedStateId}`
      );
      setDistricts(response.data?.districts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictSelect = (selectedList) => {
    setSelectedDistricts(selectedList);
  };

  const handleDistrictRemove = (selectedList) => {
    setSelectedDistricts(selectedList);
  };

  const postLocation = async () => {
    const userLocations = {
      state_ids: [state],
      dist_ids: selectedDistricts.map((district) => district.id),
    };

    if (selectedDistricts.length === 0 || !state) return;

    try {
      await API.put(`/api/v1/soepr-location/${userId}`, {
        userLocations,
      });
      showAlert("Soepr Location updated successfully", "success");
    } catch (error) {
      tst.error(error);
      console.log(error);
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

    async function fetchUserLocation() {
      try {
        const response = await API.get(`/api/v1/soepr-location/${userId}`);
        const data = response.data.data.userLocations;
        setState(data.state_ids[0] || ""); // Set the state from user location

        // Only update selected districts if districts have been fetched
        if (districts.length > 0) {
          const userDistricts = data.dist_ids
            .map((distId) => districts.find((dist) => dist.id === distId))
            .filter(Boolean); // Filter out undefined values
          setSelectedDistricts(userDistricts);
        }

        setInitialLoad(false); // Mark as no longer initial load
      } catch (error) {
        console.log(error);
      }
    }

    fetchStates();
    fetchUserLocation();
  }, [userId]);

  // Refetch districts when the state is set (useEffect dependent on `state`)
  useEffect(() => {
    if (state && !initialLoad) {
      handleStateChange({ target: { value: state } });
    }
  }, [state, initialLoad]);

  return (
    <div className="p-6 max-w-[700px] mx-auto">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select State
        </label>
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
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Districts
        </label>
        <Multiselect
          options={districts}
          selectedValues={selectedDistricts}
          displayValue="name"
          onSelect={handleDistrictSelect}
          onRemove={handleDistrictRemove}
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

      {!view && (
        <Button onClick={postLocation} className="mx-auto block px-20 mt-10">
          Submit
        </Button>
      )}
    </div>
  );
};

export default UpdateSoeprUserLocation;
