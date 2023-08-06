// import React, { useEffect, useState } from "react";
// import logo from "/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "@mantine/form";
// import { IUserLoginDto } from "../../interfaces/interfaces";
// import { Box, Button, Flex, Image, Paper, PasswordInput, TextInput } from "@mantine/core";
// import "./user.scss";
// import { IconKey, IconMail, IconPassword, IconUser } from "@tabler/icons-react";
// import { getUserWithToken, signInUser } from "../../redux/userReducer";
// import { checkEmpty } from "../../functions/checkEmpty";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/rootReducer";

// const Register = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const userError = useSelector((state: RootState) => state.user.error);
//     const user = useSelector((state: RootState) => state.user.user);
//     const signForm = useForm<IUserLoginDto>({
//         initialValues: {
//             email: "",
//             password: "",
//         },
//         validate: {
//             email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//             password: (value) => (value.length < 2 ? 'Password must have at least 2 letters' : null),
//         },
//     });
//     useEffect(() => {
//         dispatch(getUserWithToken());
//     }, []);

//     const handleSıgnIn = async () => {
//         await dispatch(signInUser(signForm.values));
//         await dispatch(getUserWithToken());
//         if (checkEmpty(user)) {
//             navigate("/home");
//         }
//         userError && alert(userError);
//     }


//     // const handleChange = (event) => {
//     //   setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
//     // };

//     // const handleSubmit = async (e) => {
//     //   e.preventDefault();
//     //   try {
//     //     await register(inputs);
//     //     navigate("/");
//     //   } catch (err) {
//     //     setError(err.response.data);
//     //     alert(err.response.data);
//     //   }
//     // };


//     return (
//         <Flex w="100%" h="100vh" justify={"center"} align={"center"} bg={"#f4f0f0"}>
//             <Paper shadow="xs" py="md" px={40} mah="90%" maw="90%">
//                 <Flex direction="column" gap={10} maw="100%" bg={"white"} >
//                     <Image alt="..." src={logo} />
//                     <form className="sign-form" onSubmit={() => handleSıgnIn}>
//                         <Flex direction="column" gap={10} maw="100%" bg={"white"} >
//                             <TextInput mt="sm" label="Email" placeholder="Email" {...signForm.getInputProps('email')} icon={<IconMail size="1.2rem" />} />
//                             <PasswordInput label="Password" placeholder="Password" {...signForm.getInputProps('password')} icon={<IconKey size="1.2rem" />} />
//                             <Button type="submit" color="dark" >
//                                 Register
//                             </Button>
//                             <Flex dir="row" justify="space-between" align="center" w="100%" h="fit-content" >
//                                 <Link className="sign-bottom-container-text" to="/login">
//                                     Login
//                                 </Link>
//                                 <div className="sign-bottom-container-text">Forgot Password?</div>
//                             </Flex>
//                         </Flex>
//                     </form>
//                 </Flex>
//             </Paper>
//         </Flex >
//     );
// };

// export default Register;
import React from 'react'

const Register = () => {
    return (
        <div>
            Register
        </div>
    )
}

export default Register
