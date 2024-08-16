import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import API from "@/utils/API";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import AdminHeader from "../AdminHeader";
import {
  NirdBanIcon,
  NirdDeleteIcon,
  NirdEditIcon,
  NirdViewIcon,
} from "../Icons";
import StateFilter from "../filter/StateFilter";
import TableSkeleton from "@/components/ui/tableskeleton";

const UserPage = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [roleFilter, setRoleFilter] = useState(user.role === 1 ? null : 3);
  const [searchParams, setSearchParams] = useSearchParams();
  const stateId = searchParams.get("state_id") || "";
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/users/all`);
      console.log("Fetched Users:", data.data); // Debugging output
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user locations
  const fetchUserLocations = async () => {
    try {
      const { data } = await API.get(`/api/v1/user-location/all`);
      console.log("Fetched User Locations:", data.data); // Debugging output
      setUserLocations(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserLocations();
  }, []);

  // Filter users based on role and state
  const filteredUsers = users?.filter((user) => {
    console.log("Filtering User:", user); // Debugging output
    if (roleFilter && user.role !== roleFilter) {
      return false;
    }
    if (stateId) {
      const location = userLocations?.find((loc) => loc.user_id === user.id);
      if (location && location?.userLocations?.state_ids?.includes(stateId)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  });

  // Handle role filter change
  const handleRoleFilterChange = (event) => {
    const selectedRole = parseInt(event.target.value, 10);
    console.log("Selected Role:", selectedRole); // Debugging output
    setRoleFilter(selectedRole);
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/api/v1/users/${id}`);
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, status: "0" } : user
        );
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container p-4">
      <AdminHeader>Users</AdminHeader>
      <div className="flex gap-10 items-start flex-wrap">
        {user.role === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="roleFilter" className="mr-2">
                Role:
              </label>
              <select
                id="roleFilter"
                value={roleFilter || ""}
                onChange={handleRoleFilterChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border"
              >
                <option value="">All</option>
                <option value="1">Superadmin</option>
                <option value="2">Admin</option>
                <option value="3">Young Fellow</option>
                <option value="4">Consultant</option>
                <option value="5">Sr. Consultant</option>
              </select>
            </div>
          </>
        )}
        <div className="">
          <label htmlFor="statefilter" className="mr-2">
            State:
          </label>
          <StateFilter />
        </div>
      </div>

      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={4} />
        ) : (
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.employee_id || "N/A"}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.role === 1
                    ? "Superadmin"
                    : user.role === 2
                    ? "Admin"
                    : user.role === 3
                    ? "Young Fellow"
                    : user.role === 4
                    ? "Consultant"
                    : user.role === 5
                    ? "Sr. Consultant"
                    : "Unknown Role"}
                </TableCell>
                <TableCell className="flex gap-4">
                  {user.status === 0 ? (
                    <div>
                      <NirdBanIcon />
                    </div>
                  ) : (
                    <>
                      <Link
                        to={`/admin/users/view/${user.id}`}
                        className="hover:text-blue-600"
                      >
                        <NirdViewIcon />
                      </Link>
                      <Link
                        to={`/admin/users/update/${user.id}/`}
                        className="hover:text-blue-600"
                      >
                        <NirdEditIcon />
                      </Link>
                      <div onClick={() => handleDelete(user.id)}>
                        <NirdDeleteIcon />
                      </div>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default UserPage;
