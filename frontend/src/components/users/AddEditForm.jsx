import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Input from "../global/Input"; // Assuming Input component is in a separate file
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidationSchema } from "../../utils/validations";
import Button from "../global/Button";
import Form from "../global/Form";
import Box from "../global/Box";
import { FaTrash } from "react-icons/fa";
import { addUser, editUser, getUserById } from "../../services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { failure, success } from "../../utils/notifications";

const defaultValues = {
  name: "",
  email: "",
  role: "admin",
  phoneNo: "",
  addresses: [
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
    },
  ],
};

const AddEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isSuccess } = useQuery({
    queryKey: ["users", id],
    queryFn: getUserById,
    enabled: id !== undefined,
  });
  const { mutate: addUserMutation, isPending: isAddPending } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", {}] });
      success("User added successfully");
    },
    onError: (error) => failure(error.message),
  });
  const { mutate: updateUserMutation, isPending: isUpdatePending } =
    useMutation({
      mutationFn: editUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", {}] });
        success("User has been updated");
      },
      onError: (error) => failure(error.message),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: isSuccess ? user?.data?.data : defaultValues,

    resolver: yupResolver(userValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data) => {
    if (id) {
      updateUserMutation(data);
      navigate("/");
    } else {
      addUserMutation(data);
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        name="name"
        register={register}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <Input
        label={"Select Role"}
        type="select"
        name="role"
        register={register}
        error={errors.role?.message}
      >
        {["admin", "user"].map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Input>
      <Input
        label="Phone No"
        name="phoneNo"
        register={register}
        error={errors.phoneNo?.message}
      />
      {fields.map((address, index) => (
        <Box className="flex-col" key={address.id}>
          <div className="flex gap-2 items-center w-full">
            <label className="font-bold text-xl underline">
              Address {index + 1}
            </label>
            {fields.length !== 1 && (
              <Button
                className="!rounded-full"
                type="button"
                onClick={() => remove(index)}
              >
                <FaTrash />
              </Button>
            )}
          </div>
          <Input
            label="Address Line 1"
            name={`addresses[${index}].addressLine1`}
            register={register}
            error={errors.addresses?.[index]?.addressLine1?.message}
          />
          <Input
            label="Address Line 2"
            name={`addresses[${index}].addressLine2`}
            register={register}
          />
          <Input
            label="City"
            name={`addresses[${index}].city`}
            register={register}
            error={errors.addresses?.[index]?.city?.message}
          />
          <Input
            label="State"
            name={`addresses[${index}].state`}
            register={register}
            error={errors.addresses?.[index]?.state?.message}
          />
          <Input
            label="Country"
            name={`addresses[${index}].country`}
            register={register}
            error={errors.addresses?.[index]?.country?.message}
          />{" "}
        </Box>
      ))}
      <Button type="button" onClick={() => append({})}>
        Add More Address
      </Button>
      <Button
        type="submit"
        isLoading={id !== undefined ? isUpdatePending : isAddPending}
      >
        {id !== undefined ? "Update User" : "Add User"}
      </Button>
    </Form>
  );
};

export default AddEditForm;
