import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";

function YfLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const [state, setState] = useState({});
  const [dist, setDist] = useState({});
  const [block, setBlock] = useState({});
  const [gram, setGram] = useState({});
  const [theme, setTheme] = useState({});

  const getState = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/get-state/${state_id}`);
      setState(data?.state);
    } catch (error) {
      console.log(error);
    }
  };

  const getDist = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/get-dist/${dist_id}`);
      setDist(data?.district);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlock = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get-blocks/${block_id}`);
      setBlock(data?.block);
    } catch (error) {
      console.log(error);
    }
  };

  const getGram = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get-gram/${gram_id}`);
      setGram(data?.gp);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/get-theme/${theme_id}`);
      setTheme(data?.theme);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state_id && dist_id && block_id && gram_id && theme_id) {
      getState();
      getDist();
      getBlock();
      getGram();
      getTheme();
    }
  }, [state_id, dist_id, block_id, gram_id, theme_id]);

  return (
    <div>
      <div className="p-6">
        <div className=" mt-4">
          <div className="flex flex-wrap justify-around">
            {[
              { label: "State:", value: state?.name },
              { label: "District:", value: dist?.name },
              { label: "Block:", value: block?.name },
              { label: "GP:", value: gram?.name },
            ].map(({ label, value }) => (
              <h3 key={label}>
                <strong className="text-primary">{label}</strong> {value}
              </h3>
            ))}
          </div>
          <div className="text-center mt-16">
            <h3>
              <strong>Theme:</strong> {theme?.theme_name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YfLayout;
