import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useAdminState } from "@/components/hooks/useAdminState";

const UserLocation = ({ role }) => {
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedState, setSelectedState] = useState(""); // Initialize as empty string
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedGp, setSelectedGp] = useState([]);
  const [gps, setGps] = useState([]);
  const { user } = useAuthContext();
  const { userId } = useParams();
  const { adminStates } = useAdminState();
  const [adists, setAdists] = useState([]);

  const handleStateChange = (event) => {
    const value = event.target.value;
    setSelectedState(value); // Update selected state
    setSelectedDistrict([]);
    setSelectedBlock([]);
    setSelectedGp([]);
  };

  const handleDistrictChange = (value) => {
    const distIds = districts.filter(dist => value.includes(dist.name)).map(dist => dist.id);
    setSelectedDistrict(distIds);
  };

  const handleBlockChange = (value) => {
    const blockIds = blocks.filter(block => value.includes(block.name)).map(block => block.id);
    setSelectedBlock(blockIds);
  };

  const handleGPChange = (value) => {
    const gpIds = gps.filter(gp => value.includes(gp.name)).map(gp => gp.id);
    setSelectedGp(gpIds);
  };

  const postLocation = async () => {
    const blockIds = Array.from(new Set(gps.filter(gp => selectedGp.includes(gp.id)).map(gp => gp.block_id)));
    const distIds = Array.from(new Set(blocks.filter(block => blockIds.includes(block.id)).map(block => block.dist_id)));
    const stateIds = Array.from(new Set(adists.filter(dist => distIds.includes(dist.id)).map(dist => dist.state_id)));

    const userLocations = {
      state_ids: [selectedState], // Now using the selected state
      dist_ids: distIds,
      block_ids: blockIds,
      gp_ids: selectedGp,
    };

    if (selectedGp.length === 0) return;

    try {
      const response = await API.post("/api/v1/user-location/create", {
        user_id: userId,
        userLocations,
      });
      console.log("Location assigned successfully", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [stateRes, districtRes, blockRes, gpRes, adistRes] = await Promise.all([
          API.get("/api/v1/state/all"),
          API.get(`/api/v1/dist/all`),
          API.get(`/api/v1/block/all`),
          API.get(`/api/v1/gram/all`),
          API.get(`/api/v1/dist/all`)
        ]);

        setStates(stateRes.data?.states || []);
        setDistricts(districtRes.data || []);
        setBlocks(blockRes.data || []);
        setGps(gpRes.data?.gps || []);
        setAdists(adistRes.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="my-4">
        <select
          className="text-sm px-4 py-2 rounded-md bg-transparent border max-w-[500px] mx-auto block"
          value={selectedState || ""} // Ensure selected state is reflected here
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {(user.role === 1 ? states : adminStates)?.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {selectedState && ( // Only show district/block/GP selection if a state is selected
        <div className="mt-6 overflow-visible">
          <Table className="min-h-[10vh]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">S.No.</TableHead>
                <TableHead className="w-[200px]">Districts</TableHead>
                <TableHead className="w-40">Blocks</TableHead>
                <TableHead className="w-40">GP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts
                ?.filter(district => district.state_id === selectedState) // Filter districts based on selected state
                .map((district, index) => (
                  <TableRow key={district.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{district.name}</TableCell>
                    <TableCell>
                      <Multiselect
                        isObject={false}
                        onRemove={(_, value) => handleBlockChange(value)}
                        onSelect={(_, value) => handleBlockChange(value)}
                        options={blocks.filter(block => block.dist_id === district.id).map(block => block.name)}
                        avoidHighlightFirstOption
                        customArrow={<span>&#x25BC;</span>}
                        showCheckbox={true}
                        style={{
                          multiselectContainer: { zIndex: 100, position: "relative" },
                          searchBox: {
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                          },
                          optionContainer: {
                            position: "absolute",
                            backgroundColor: "#fff",
                            zIndex: 9999,
                            maxHeight: "300px",
                            overflowY: "auto",
                            top: "calc(100% + 2px)",
                            transform: "translateY(-100%)",
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Multiselect
                        isObject={false}
                        onRemove={(_, value) => handleGPChange(value)}
                        onSelect={(_, value) => handleGPChange(value)}
                        options={gps.filter(gp => gp.dist_id === district.id && selectedBlock.includes(gp.block_id)).map(gp => gp.name)}
                        avoidHighlightFirstOption
                        customArrow={<span>&#x25BC;</span>}
                        showCheckbox={true}
                        style={{
                          multiselectContainer: { zIndex: 100, position: "relative" },
                          searchBox: {
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                          },
                          optionContainer: {
                            position: "absolute",
                            backgroundColor: "#fff",
                            zIndex: 9999,
                            maxHeight: "300px",
                            overflowY: "auto",
                            top: "calc(100% + 2px)",
                            transform: "translateY(-100%)",
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Button onClick={postLocation} className="mx-auto block px-20 mt-40">
        Submit
      </Button>
    </div>
  );
};

export default UserLocation;
