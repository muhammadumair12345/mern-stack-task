import React from "react";
import Container from "../../components/global/Container";
import Table from "../../components/global/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../services/users";
import { useQueryString } from "../../hooks/useQueryString";
import { confirmation, failure, success } from "../../utils/notifications";
import { Link } from "react-router-dom";

const tableHeadings = ["Name", "Email", "Role", "Phone No.", "Actions"];

const Users = () => {
  const searchParams = useQueryString();
  const params = searchParams.getAll();
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", params],
    queryFn: getUsers,
  });
  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params] });
      success("User deleted successfully");
    },
    onError: (error) => failure(error.message),
  });

  const handleDelete = (id) => {
    confirmation().then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation(id);
      }
    });
  };

  return (
    <Container title={"Users"}>
      <Table
        tname={"users"}
        isLoading={isLoading}
        tableHeadings={tableHeadings}
      >
        {users?.data?.data?.items !== 0 ? (
          users?.data?.data?.items?.map((user) => (
            <tr key={user?._id}>
              <td className="px-6 py-3">{user?.name}</td>
              <td className="px-6 py-3">{user?.email}</td>
              <td className="px-6 py-3">{user?.role}</td>

              <td className="px-6 py-3">{user?.phoneNo}</td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(user?._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
                <Link
                  to={`/edit/${user._id}`}
                  className="text-red-600 hover:text-red-900"
                >
                  Edit
                </Link>
                <Link
                  to={`/${user._id}`}
                  className="text-red-600 hover:text-red-900"
                >
                  View
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={tableHeadings.length + 1}
              className="font-bold text-primary text-xl text-center p-8"
            >
              No User Found
            </td>
          </tr>
        )}
      </Table>
    </Container>
  );
};

export default Users;
