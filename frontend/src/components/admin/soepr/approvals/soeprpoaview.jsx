import React, { useEffect, useState } from "react";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import API from "@/utils/API";
import { useSoeprLocation } from "@/components/hooks/useSoeprLocation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../../Icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext"; // To access logged-in user

const POAview = () => {
  const { user } = useAuthContext(); // Get logged-in user info
  const [selectedState, setSelectedState] = useState();
  const { soeprState: states } = useSoeprLocation({
    state_id: selectedState,
  });
  const [poaRecords, setPoaRecords] = useState([]);
  const [consultants, setConsultants] = useState([]); // State to store the list of consultants
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [srConsultantState, setSrConsultantState] = useState(""); // Store Senior Consultant's state name

  useEffect(() => {
    // Fetch Senior Consultant's state name
    if (user?.state_id) {
      setSrConsultantState(user?.state_id); // Assuming state_id is available in user data
    }

    const fetchPOARecords = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/v1/poa1/getUserPOAs");
        setPoaRecords(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch POA records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPOARecords();
  }, [user?.state_id]); // Run when user state_id changes

  useEffect(() => {
    // Fetch consultants (role 4) based on selected state
    const fetchConsultants = async () => {
      try {
        // Fetch consultants by role=4 and state_id=selectedState
        const response = await API.get(`/api/v1/users?role=4&state_id=${selectedState}`);
        setConsultants(response.data.data); // Assuming response contains the consultants data
      } catch (error) {
        toast.error("Failed to fetch consultants.");
      }
    };

    if (selectedState) {
      fetchConsultants();
    }
  }, [selectedState]); // Run when selectedState changes

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredRecords = poaRecords.filter((record) => {
    const createdAt = new Date(record.created_at);
    const recordYear = createdAt.getFullYear();
    const recordMonth = createdAt.toLocaleString("en-IN", { month: "long" });

    return (
      (!selectedYear || recordYear.toString() === selectedYear) &&
      (!selectedMonth || recordMonth === selectedMonth)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>Plan of Action Records</AdminHeader>
      <div className="flex gap-2 items-center">
        <h4 className="text-primary font-semibold">State: </h4>
        <p className="font-semibold text-gray-700">{srConsultantState}</p>
      </div>

      <div className="flex gap-4 my-4">
        Select Month and Year :
        <select onChange={handleYearChange} value={selectedYear}>
          <option value="">All Years</option>
          {[...new Set(poaRecords.map((record) => new Date(record.created_at).getFullYear()))].map(
            (year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            )
          )}
        </select>
        <select onChange={handleMonthChange} value={selectedMonth}>
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, idx) => (
            <option key={idx} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Render the state once it's available */}
        {selectedState && (
          <span className="ml-4 font-semibold text-gray-700">
            State: {selectedState}
          </span>
        )}
      </div>

      {/* Display the list of consultants */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Consultants in State:</h4>
        <ul>
          {consultants.map((consultant, idx) => (
            <li key={idx}>{consultant.name} - {consultant.user_id}</li>
          ))}
        </ul>
      </div>

      <Table className="mt-4">
        <TableCaption>List of POA Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record, idx) => {
            const createdAt = new Date(record.created_at);
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell> {/* Serial number */}
                <TableCell>{createdAt.toLocaleString("en-IN", { month: "long" })}</TableCell>
                <TableCell>{createdAt.getFullYear()}</TableCell>
                <TableCell className="flex gap-4">
                  <Link to={`/admin/soepr/POA1/view/${record.id}`}>
                    <NirdViewIcon />
                  </Link>
                  <Link to={`/admin/soepr/POA1/edit/${record.id}`}>
                    <NirdEditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default POAview;
