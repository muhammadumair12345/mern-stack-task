import React from "react";
import Container from "../../components/global/Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users";

const Detail = () => {
  const { id } = useParams();
  const { data: user } = useQuery({
    queryKey: ["users", id],
    queryFn: getUserById,
    enabled: id !== undefined,
  });

  return (
    <Container title={"User Detail"}>
      <div>
        <div className="mb-4">
          <p className="font-semibold">Name:</p>
          <p>{user?.data?.data?.name}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Email:</p>
          <p>{user?.data?.data?.email}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Role:</p>
          <p>{user?.data?.data?.role}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Phone Number:</p>
          <p>{user?.data?.data?.phoneNo}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Addresses:</h3>
          {user?.data?.data?.addresses.map((address, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">Address Line 1:</p>
              <p>{address?.addressLine1}</p>
              <p className="font-semibold">Address Line 2:</p>
              <p>{address?.addressLine2}</p>
              <p className="font-semibold">City:</p>
              <p>{address?.city}</p>
              <p className="font-semibold">State:</p>
              <p>{address?.state}</p>
              <p className="font-semibold">Country:</p>
              <p>{address?.country}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Detail;
