import React from "react";
import Container from "../../components/global/Container";
import Table from "../../components/global/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../services/users";
import { useQueryString } from "../../hooks/useQueryString";
import { confirmation } from "../../utils/notifications";

const tableHeadings = ["Name", "Email", "Role", "Phone No.", "Actions"];

const Users = () => {
  const searchParams = useQueryString();
  const params = searchParams.getAll();
  const queryClient = useQueryClient();
  const { data: users, isFetching } = useQuery({
    queryKey: ["users", params],
    queryFn: getUsers,
  });
  const { mutate: deleteUserMutation } = useMutation({
    queryFn: deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users", params] }),
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
        isLoading={isFetching}
        tableHeadings={tableHeadings}
      >
        {users?.data?.data?.items?.map((user) => (
          <tr key={user?._id}>
            <td className="px-6 py-3">{user?.name}</td>
            <td className="px-6 py-3">{user?.email}</td>
            <td className="px-6 py-3">{user?.role}</td>

            <td className="px-6 py-3">{user?.phoneNo}</td>
            <td className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleDelete(user?._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default Users;