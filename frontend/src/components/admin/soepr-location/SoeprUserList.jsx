import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import API from "@/utils/API";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import AdminHeader from "../AdminHeader";
import {
  NirdAssignIcon,
  NirdBanIcon,
  NirdDeleteIcon,
  NirdEditIcon,
  NirdViewIcon,
} from "../Icons";

const SoeprUserList = () => {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responses = await Promise.all([
          API.get('/api/v1/users/all?role=4'),
          API.get('/api/v1/users/all?role=5'),
          API.get('/api/v1/users/all?role=7') // New API call for role 7
        ]);
        const mergedData = responses.flatMap(response => response.data.data);
        setUsers(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container p-4">
      <AdminHeader>SOEPR location</AdminHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.employee_id || "NA"}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell className="flex gap-4">
                <>
                  {!user.location_assigned ? (
                    <Link
                      to={`/admin/user-location/assign/soepr/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <NirdAssignIcon />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={`/admin/user-location/update/soepr/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <NirdEditIcon />
                      </Link>
                      <Link
                        to={`/admin/user-location/view/soepr/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <NirdViewIcon />
                      </Link>
                    </>
                  )}
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SoeprUserList;
