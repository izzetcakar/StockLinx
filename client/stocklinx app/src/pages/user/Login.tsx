import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ApiStatus, IUserLoginDto } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { Box, Button, Flex, Image, LoadingOverlay, Paper, PasswordInput, TextInput } from "@mantine/core";
import "./user.scss";
import { IconKey, IconMail, IconPassword, IconUser } from "@tabler/icons-react";
import { getUserWithToken, signInUser } from "../../redux/userReducer";
import { checkEmpty } from "../../functions/checkEmpty";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.user);
  const userApiStatus = useAppSelector((state: RootState) => state.user.status);
  const userError = useAppSelector((state: RootState) => state.user.error);
  const signForm = useForm<IUserLoginDto>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 2 ? 'Password must have at least 2 letters' : null),
    },
  });
  useEffect(() => {
    dispatch(getUserWithToken());
  }, []);

  const handleSignIn = async () => {
    await dispatch(signInUser(signForm.values));
    await dispatch(getUserWithToken());
    if (checkEmpty(user)) {
      navigate("/home");
    }
    userError && alert(userError);
  }


  // const handleChange = (event) => {
  //   setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await register(inputs);
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response.data);
  //     alert(err.response.data);
  //   }
  // };


  return (
    <Flex w="100%" h="100vh" justify={"center"} align={"center"} bg={"#f4f0f0"}>
      <Paper shadow="xs" py="md" px={40} mah="90%" maw="90%">
        <LoadingOverlay visible={userApiStatus === ApiStatus.Loading} />
        <Flex direction="column" gap={10} maw="100%" bg={"white"} >
          <Image alt="..." src={logo} />
          <form className="sign-form" onSubmit={signForm.onSubmit(
            (values, _event) => { _event.stopPropagation(); handleSignIn(); },
          )}>
            <Flex direction="column" gap={10} maw="100%" bg={"white"} >
              <TextInput mt="sm" label="Email" placeholder="Email" {...signForm.getInputProps('email')} icon={<IconMail size="1.2rem" />} />
              <PasswordInput label="Password" placeholder="Password" {...signForm.getInputProps('password')} icon={<IconKey size="1.2rem" />} />
              <Button type="submit" color="dark" >
                Login
              </Button>
              <Flex dir="row" justify="space-between" align="center" w="100%" h="fit-content" >
                <Link className="sign-bottom-container-text" to="/register">
                  Register
                </Link>
                <div className="sign-bottom-container-text">Forgot Password?</div>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Flex >
  );
};

export default Login;