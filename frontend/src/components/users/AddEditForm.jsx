import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Input from "../global/Input"; // Assuming Input component is in a separate file
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidationSchema } from "../../utils/validations";
import Button from "../global/Button";
import Form from "../global/Form";
import Box from "../global/Box";
import { FaTrash } from "react-icons/fa";
import { addUser, editUser } from "../../services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const defaultValues = {
  name: "",
  email: "",
  role: "",
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
  const queryClient = useQueryClient();
  const { mutate: addUserMutation } = useMutation({
    queryFn: addUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users", {}] }),
  });

  const { mutate: updateUserMutation } = useMutation({
    queryFn: editUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users", {}] }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    resolver: yupResolver(userValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data) => {
    if (id) {
      updateUserMutation(data);
    } else {
      addUserMutation(data);
    }
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
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AddEditForm;
