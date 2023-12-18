import React, { useEffect } from "react";
import Box from "../../components/global/Box";
import Form from "../../components/global/Form";
import Input from "../../components/global/Input";
import Button from "../../components/global/Button";
import { signInValidationSchema } from "../../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Signin = () => {
  const { signin, isLoading, auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = (formData) => {
    signin(formData);
  };

  useEffect(() => {
    auth?.token && location.pathname.includes("signin") && navigate("/");
  }, []);

  return (
    <div className="p-4 min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-8 items-center w-[35rem]">
        <Box className="flex-col justify-center p-4 shadow-md border-t-8 border-primary">
          <p className="text-center text-xl font-bold md:leading-tight text-primary  md:text-2xl">
            Sign in
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type={"email"}
              name={"email"}
              register={register}
              error={errors?.email?.message}
              placeholder={"Your registered email"}
            />
            <Input
              type={"password"}
              name={"password"}
              register={register}
              error={errors?.password?.message}
              placeholder={"Your password"}
              passwordIcon={true}
            />
            <Button type="submit" isLoading={isLoading}>
              Sign in
            </Button>
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default Signin;
