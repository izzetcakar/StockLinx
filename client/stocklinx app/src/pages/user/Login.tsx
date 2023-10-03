import { useEffect } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IUserLoginDto } from "../../interfaces/interfaces";
import { Button, Flex, Image, LoadingOverlay, Paper, PasswordInput, TextInput } from "@mantine/core";
import "./user.scss";
import { IconKey, IconMail } from "@tabler/icons-react";
import { checkEmpty } from "../../functions/checkEmpty";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { userActions } from "../../redux/user/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const userApiStatus = useSelector((state: RootState) => state.generic.loading);
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
    dispatch(userActions.getWithToken());
  }, []);

  const handleSignIn = () => {
    dispatch(userActions.signIn({ user: signForm.values }));
    dispatch(userActions.getWithToken());
    if (checkEmpty(user)) {
      navigate("/home");
    }
  }

  return (
    <Flex w="100%" h="100vh" justify={"center"} align={"center"} bg={"#f4f0f0"}>
      <Paper shadow="xs" py="md" px={40} mah="90%" maw="90%">
        <LoadingOverlay visible={userApiStatus > 0} />
        <Flex direction="column" gap={10} maw="100%" bg={"white"} >
          <Image alt="..." src={logo} />
          <form className="sign-form" onSubmit={signForm.onSubmit(
            (_, _event) => { _event.stopPropagation(); handleSignIn(); },
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