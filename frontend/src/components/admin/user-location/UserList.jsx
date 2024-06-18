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

const UserList = () => {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(
          `/api/v1/users/all?role=${user.role == 1 ? 2 : 3}`
        );
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container p-4">
      <AdminHeader>User location</AdminHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell className="space-x-4">
                <Link
                  to={`/admin/user-location/assign/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Assign
                </Link>
                <Link
                  to={`/admin/user-location/update/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Update
                </Link>
                <Link
                  to={`/admin/user-location/view/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
