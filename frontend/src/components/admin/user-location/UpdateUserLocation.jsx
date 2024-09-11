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
import { Label } from "@/components/ui/label";

const UpdateUserLocation = ({ view, role }) => {
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [adists, setAdists] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedGp, setSelectedGp] = useState([]);
  const [gps, setGps] = useState([]);
  const { user } = useAuthContext();
  const { userId } = useParams();

  const handleStateChange = (value) => {
    const stateId = states.find((state) => state.name === value)?.id;
    if (stateId) {
      setSelectedState((prev) => {
        const newSelectedState = new Set([...prev, stateId]);
        return Array.from(newSelectedState);
      });
    }
  };

  const handleBlockChange = (value, dist_id) => {
    const blockIds = blocks
      .filter((block) => value.includes(block.name) && block.dist_id === dist_id)
      .map((block) => block.id);

    setSelectedBlock((prev) => {
      const newSelectedBlocks = new Set([...prev, ...blockIds]);
      return Array.from(newSelectedBlocks);
    });
  };

  const handleBlockRemove = (value, dist_id) => {
    const blockIds = blocks
      .filter((block) => value.includes(block.name) && block.dist_id === dist_id)
      .map((block) => block.id);

    setSelectedBlock((prev) => prev.filter((id) => !blockIds.includes(id)));
  };

  const handleGPChange = (value) => {
    const gpId = gps.filter((gp) => value.includes(gp.name)).map((gp) => gp.id);

    setSelectedGp((prev) => {
      const newSelectedGp = new Set([...prev, ...gpId]);
      return Array.from(newSelectedGp);
    });
  };

  const handleGPRemove = (value) => {
    const gpIds = gps.filter((gp) => value.includes(gp.name)).map((gp) => gp.id);

    setSelectedGp((prev) => prev.filter((id) => !gpIds.includes(id)));
  };

  const handleStateRemove = (value) => {
    const stateIds = states.filter((state) => value.includes(state.name)).map((state) => state.id);

    setSelectedState((prev) => prev.filter((id) => !stateIds.includes(id)));
  };

  const postLocation = async () => {
    const blockIds = Array.from(
      new Set(gps.filter((gp) => selectedGp.includes(gp.id)).map((gp) => gp.block_id))
    );

    const distIds = Array.from(
      new Set(blocks.filter((block) => blockIds.includes(block.id)).map((block) => block.dist_id))
    );

    const stateIds = Array.from(
      new Set(adists.filter((dist) => distIds.includes(dist.id)).map((dist) => dist.state_id))
    );

    const userLocations = {
      state_ids: stateIds,
      dist_ids: distIds,
      block_ids: blockIds,
      gp_ids: selectedGp,
    };

    if (selectedGp.length === 0) return;

    try {
      await API.put(`/api/v1/user-location/${userId}`, { userLocations });
      tst.success("User Location updated successfully");
    } catch (error) {
      tst.error("Failed to update User Location");
      console.log(error);
    }
  };

  const postAdminLocation = async () => {
    const updateUserLocations = {
      state_ids: selectedState,
    };

    if (selectedState.length === 0) return;

    try {
      await API.put(`/api/v1/user-location/${userId}`, { userLocations: updateUserLocations });
      tst.success("User location updated");
    } catch (error) {
      tst.error("Failed to update User Location");
      console.log(error);
    }
  };

  useEffect(() => {
    setSelectedBlock([]);
    setSelectedGp([]);

    const fetchStates = async () => {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchADists = async () => {
      try {
        const response = await API.get(`/api/v1/dist/all`);
        setAdists(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlocks = async () => {
      try {
        const response = await API.get(`/api/v1/block/all`);
        setBlocks(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGPs = async () => {
      try {
        const { data } = await API.get(`/api/v1/gram/all`);
        setGps(data?.gps || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserLocation = async () => {
      try {
        const response = await API.get(`/api/v1/user-location/${userId}`);
        const data = response.data.data.userLocations;
        setState(data.state_ids);
        setSelectedState(data.state_ids);
        setSelectedBlock(data.block_ids);
        setSelectedGp(data.gp_ids);
      } catch (error) {
        console.log(error);
      }
    };

    Promise.all([fetchStates(), fetchADists(), fetchBlocks(), fetchGPs(), fetchUserLocation()]);
  }, [userId]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (state) {
        try {
          const response = await API.get(`/api/v1/dist/state/${state}`);
          setDistricts(response.data?.districts || []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDistricts();
  }, [state]);

  const dropdownStyle = {
    dropdownMenu: {
      position: 'absolute',
      bottom: '100%',
      zIndex: 1000,
      marginBottom: '4px',
    },
  };

  if (role === 2) {
    return (
      <div className="flex flex-col mt-20 w-80 mx-auto">
        <div>
          <Label className="text-right mb-2 inline-block">Select State</Label>
          <Multiselect
            selectedValues={states.filter((s) => selectedState.includes(s.id)).map((state) => state.name)}
            isObject={false}
            onRemove={(_, value) => handleStateRemove(value)}
            onSelect={(_, value) => handleStateChange(value)}
            options={states.map((state) => state.name)}
            style={dropdownStyle}
          />
          <Button onClick={postAdminLocation} className="mx-auto block px-20 mt-20">
            Submit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <select
          className={cn("text-sm px-4 py-2 rounded-md bg-transparent border max-w-[500px] mx-auto block")}
          value={state || ""}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6">
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
            {districts.map((district, index) => (
              <TableRow key={district.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{district.name}</TableCell>
                <TableCell>
                  <Multiselect
                    isObject={false}
                    disable={view}
                    selectedValues={blocks
                      .filter((block) => selectedBlock.includes(block.id) && block.dist_id === district.id)
                      .map((block) => block.name)}
                    onRemove={(_, value) => handleBlockRemove(value, district.id)}
                    onSelect={(_, value) => handleBlockChange(value, district.id)}
                    options={blocks
                      .filter((block) => block.dist_id === district.id)
                      .map((block) => block.name)}
                    style={dropdownStyle}
                  />
                </TableCell>
                <TableCell>
                  <Multiselect
                    disable={view}
                    isObject={false}
                    selectedValues={gps
                      .filter((gp) => selectedGp.includes(gp.id) && gp.dist_id === district.id)
                      .map((gp) => gp.name)}
                    onRemove={(_, value) => handleGPRemove(value)}
                    onSelect={(_, value) => handleGPChange(value)}
                    options={gps
                      .filter((gp) => gp.dist_id === district.id && selectedBlock.includes(gp.block_id))
                      .map((gp) => gp.name)}
                    style={dropdownStyle}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!view && (
        <Button onClick={postLocation} className="mx-auto block px-20 mt-20">
          Submit
        </Button>
      )}
    </div>
  );
};

export default UpdateUserLocation;
