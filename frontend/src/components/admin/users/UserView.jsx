import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const UserView = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/users/${id}`);
        setUser(data.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>User not found</div>; 
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>User Details</AdminHeader>
      <Table className="mt-4 w-full">
        <TableBody>
          <TableRow>
            <TableCell>ID:</TableCell>
            <TableCell>{user.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Username:</TableCell>
            <TableCell>{user.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Role:</TableCell>
            <TableCell>
              {user.role === 1
                ? "Superadmin"
                : user.role === 2
                ? "Admin"
                : "Young Fellow"}
            </TableCell>
          </TableRow>
          {user.department && (
            <TableRow>
              <TableCell>Department:</TableCell>
              <TableCell>{user.department}</TableCell>
            </TableRow>
          )}
          {user.designation && (
            <TableRow>
              <TableCell>Designation:</TableCell>
              <TableCell>{user.designation}</TableCell>
            </TableRow>
          )}
          {user.mobile && (
            <TableRow>
              <TableCell>Mobile:</TableCell>
              <TableCell>{user.mobile}</TableCell>
            </TableRow>
          )}
          {user.email && (
            <TableRow>
              <TableCell>Email:</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          )}
          {user.efDateFrom && (
            <TableRow>
              <TableCell>Date of Joining:</TableCell>
              <TableCell>{new Date(user.efDateFrom).toLocaleDateString()}</TableCell>
            </TableRow>
          )}
          {user.dateOfBirth && (
            <TableRow>
              <TableCell>Date of Birth:</TableCell>
              <TableCell>{new Date(user.dateOfBirth).toLocaleDateString()}</TableCell>
            </TableRow>
          )}
          {user.aadharNo && (
            <TableRow>
              <TableCell>Aadhar No:</TableCell>
              <TableCell>{user.aadharNo}</TableCell>
            </TableRow>
          )}
          {user.officeContactNo && (
            <TableRow>
              <TableCell>Office Contact No:</TableCell>
              <TableCell>{user.officeContactNo}</TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>
  );
};

export default UserView;
