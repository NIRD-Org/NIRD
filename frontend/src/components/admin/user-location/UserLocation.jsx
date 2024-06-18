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
import { districts } from "@/lib/data";
import { Button } from "@/components/ui/button";

const UserLocation = () => {
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedGp, setSelectedGp] = useState([]);
  const [selectedDist, setSelectedDist] = useState([]);
  const [gps, setGps] = useState([]);

  const handleBlockChange = (value, dist_id) => {
    const blockIds = blocks
      .filter(block => value.includes(block.name))
      .map(block => block.id);

    setSelectedBlock(prev => {
      const newSelectedBlocks = new Set([...prev, ...blockIds]);
      return Array.from(newSelectedBlocks);
    });

    setSelectedDist(prev => {
      const newSelectedDist = new Set([...prev, dist_id]);
      return Array.from(newSelectedDist);
    });
  };

  const handleBlockRemove = (value, dist_id) => {
    const blockIds = blocks
      .filter(block => value.includes(block.name))
      .map(block => block.id);

    setSelectedBlock(prev => prev.filter(id => !blockIds.includes(id)));
    setSelectedDist(prev => prev.filter(id => id !== dist_id));
  };

  const handleGPChange = value => {
    const gpId = gps.filter(gp => value.includes(gp.name)).map(gp => gp.id);

    setSelectedGp(prev => {
      const newSelectedGp = new Set([...prev, ...gpId]);
      return Array.from(newSelectedGp);
    });
  };

  const handleGPRemove = value => {
    const gpIds = gps.filter(gp => value.includes(gp.name)).map(gp => gp.id);

    setSelectedGp(prev => prev.filter(id => !gpIds.includes(id)));
  };

  const postLocation = () => {
    const data = {
      state,
      districts: selectedDist,
      blocks: selectedBlock,
      gps: selectedGp,
    };

    // Make API call with data
    console.log(data);
  };

  useEffect(() => {
    setSelectedBlock([]);
    setSelectedDist([]);
    setSelectedGp([]);

    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDistricts() {
      if (state) {
        try {
          const response = await API.get(`/api/v1/dist/state/${state}`);
          setDistricts(response.data?.districts || []);
        } catch (error) {
          console.log(error);
        }
      }
    }

    async function fetchBlocks() {
      try {
        const response = await API.get(`/api/v1/block/all`);
        setBlocks(response.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchGPs() {
      try {
        const { data } = await API.get(`/api/v1/gram/all`);
        setGps(data?.gps || []);
      } catch (error) {
        console.log(error);
      }
    }

    Promise.all([fetchDistricts(), fetchBlocks(), fetchGPs(), fetchStates()]);
  }, [state]);

  return (
    <div>
      <div className="mx-auto">
        <select
          className={cn(
            "text-sm px-4 py-2 rounded-md bg-transparent border min-80 mx-auto block"
          )}
          value={state}
          onChange={e => setState(e.target.value)}
        >
          <option value="">Select a state</option>
          {states?.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6">
        <Table className="min">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">S.No.</TableHead>
              <TableHead className="w-[400px]">Districts</TableHead>
              <TableHead className="w-40">Blocks</TableHead>
              <TableHead className="w-40">GP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {districts?.map((district, index) => (
              <TableRow key={district.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{district.name}</TableCell>
                <TableCell>
                  <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={(_, value) =>
                      handleBlockRemove(value, district.id)
                    }
                    onSearch={function noRefCheck() {}}
                    onSelect={(_, value) =>
                      handleBlockChange(value, district.id)
                    }
                    options={blocks
                      .filter(block => block.dist_id == district.id)
                      .map(block => block.name)}
                  />
                </TableCell>
                <TableCell>
                  <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={(_, value) => handleGPRemove(value)}
                    onSearch={function noRefCheck() {}}
                    onSelect={(_, value) => handleGPChange(value)}
                    options={gps
                      .filter(
                        gp =>
                          gp.dist_id == district.id &&
                          selectedBlock.includes(gp.block_id)
                      )
                      .map(gp => gp.name)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={postLocation} className="mx-auto block px-20 mt-20">
        Submit
      </Button>
    </div>
  );
};

export default UserLocation;
