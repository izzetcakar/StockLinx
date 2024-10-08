import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IUserLoginDto } from "@interfaces/dtos";
import {
  Button,
  Flex,
  Image,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useUser } from "@queryhooks";
import logo from "@assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./user.scss";

const Login = () => {
  const captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
  const navigate = useNavigate();
  const { mutate: signIn, isLoading: signLoading } = useUser.SignIn();
  const [recaptcha, setRecaptcha] = useState(false);

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

  const handleSignIn = () => {
    signIn(signForm.values);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [localStorage.getItem("token")]);

  return (
    <Flex w="100%" h="100vh" justify={"center"} align={"center"} bg={"#f4f0f0"}>
      <Paper shadow="xs" py="md" px={40} mah="90%" maw="90%">
        <Flex direction="column" gap={10} mah="100%" maw="100%" bg={"white"}>
          <Image alt="..." src={logo} mah={350} fit="contain" />
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
              <Button
                type="submit"
                color="dark"
                disabled={!recaptcha}
                loading={signLoading}
              >
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Flex>
  );
};

export default Login;
