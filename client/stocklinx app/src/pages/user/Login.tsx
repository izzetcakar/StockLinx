import { useEffect, useState } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IUserLoginDto } from "../../interfaces/interfaces";
import {
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { userActions } from "../../redux/user/actions";
import ReCAPTCHA from "react-google-recaptcha";
import "./user.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
  const [recaptcha, setRecaptcha] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.generic.loading);
  const signForm = useForm<IUserLoginDto>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 2 ? "Password must have at least 2 letters" : null,
    },
  });
  useEffect(() => {
    dispatch(userActions.getWithToken());
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleSignIn = () => {
    dispatch(userActions.signIn({ user: signForm.values }));
  };

  return (
    <Flex w="100%" h="100vh" justify={"center"} align={"center"} bg={"#f4f0f0"}>
      <LoadingOverlay visible={loading > 0} />
      <Paper shadow="xs" py="md" px={40} mah="90%" maw="90%">
        <Flex direction="column" gap={10} maw="100%" bg={"white"}>
          <Image alt="..." src={logo} />
          <form
            className="sign-form"
            onSubmit={signForm.onSubmit(() => {
              handleSignIn();
            })}
          >
            <Flex direction="column" gap={10} maw="100%" bg={"white"}>
              <TextInput
                mt="sm"
                label="Email"
                placeholder="Email"
                {...signForm.getInputProps("email")}
                leftSection={<IconMail size="1.2rem" />}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...signForm.getInputProps("password")}
                leftSection={<IconKey size="1.2rem" />}
              />
              <ReCAPTCHA
                sitekey={captchaSiteKey}
                onChange={() => setRecaptcha(true)}
              />
              <Button type="submit" color="dark" disabled={!recaptcha}>
                Login
              </Button>
              <Flex
                dir="row"
                justify="space-between"
                align="center"
                w="100%"
                h="fit-content"
              >
                <Link className="sign-bottom-container-text" to="/register">
                  Register
                </Link>
                <div className="sign-bottom-container-text">
                  Forgot Password?
                </div>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Flex>
  );
};

export default Login;
