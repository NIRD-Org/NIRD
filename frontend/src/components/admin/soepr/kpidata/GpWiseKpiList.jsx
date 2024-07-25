import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { NirdEditIcon,NirdViewIcon } from "../../Icons";

function SoeprGpWiseKpiList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpiApprovals, setKpiApprovals] = useState([]);
  const [state, setState] = useState({});
  const [theme, setTheme] = useState({});

  const getAllKpiApprovals = async () => {
    try {
      const response = await API.get(
        `/api/v1/soepr-kpi-data`
      );
      let data = response.data.data;
      data?.sort((a, b) => a.created_at - b.created_at);
      data = data?.filter(item => item.decision != 1);
      setKpiApprovals(data || []);
    } catch (error) {
      console.log(error);
    }
  };


  const getState = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/get-state/${state_id}`);
      setState(data?.state);
    } catch (error) {
      console.log(error);
    }
  };

  

  const getTheme = async () => {
    try {
      const { data } = await API.get(`/api/v1/soepr-theme/get-theme/${theme_id}`);
      setTheme(data?.theme);
      console.log(theme)
    } catch (error) {
      console.log(error);
    }
  };


    useEffect(() => {
      if (state_id &&  theme_id) {
        getState();
        getTheme();
      }
    }, [state_id,  theme_id]);

  useEffect(() => {
    if (state_id &&  theme_id) {
      getAllKpiApprovals();
    }
  }, [state_id, theme_id]);

  return (
    <div>
      <div className="p-6">
        {/* <YfLayout /> */}
        <div className="flex justify-around py-6 items-center ">
          {/* <h1 className="text-2xl font-bold">Gram Panchayat wise KPI</h1> */}
          <h2>State: {state.name}</h2>
          <h2>Theme : {theme?.theme_name}</h2>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to={`/admin/soepr/add-gp-wise-kpi?state_id=${state_id}&theme_id=${theme_id}`}
          >
            <Button>Add New</Button>
          </Link>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission ID</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiApprovals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center ">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                kpiApprovals.map(kpiApproval => (
                  <TableRow key={kpiApproval.id}>
                    <TableCell>{kpiApproval.id}</TableCell>
                    <TableCell>{kpiApproval.theme_id}</TableCell>
                    <TableCell>{new Date(kpiApproval.date || kpiApproval.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {kpiApproval.decision == 0
                        ? "Submitted"
                        : kpiApproval.decision == 1
                        ? "Approved"
                        : "Send for modification"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {kpiApproval.decision == 0 && (
                        <Link to={`/admin/edit/gp-wise-kpi/${kpiApproval.submitted_id}`}>
                          <NirdEditIcon />
                        </Link>
                      )}
                      <Link to={`/admin/view/gp-wise-kpi/${kpiApproval.submitted_id}`}>
                        <NirdViewIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SoeprGpWiseKpiList;
