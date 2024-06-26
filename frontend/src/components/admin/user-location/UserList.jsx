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

const UserList = ({ role }) => {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=${role}`);
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [role]);

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
                {role == 2 ? (
                  <>
                    {!user.location_assigned ? (
                      <Link
                        to={`/admin/user-location/assign/admin/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Assign
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/admin/user-location/update/admin/${user.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Update
                        </Link>
                        <Link
                          to={`/admin/user-location/view/admin/${user.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!user.location_assigned ? (
                      <Link
                        to={`/admin/user-location/assign/young-fellow/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Assign
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/admin/user-location/update/young-fellow/${user.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Update
                        </Link>
                        <Link
                          to={`/admin/user-location/view/young-fellow/${user.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </>
                    )}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
