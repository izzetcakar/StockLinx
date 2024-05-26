// import React from "react";
// import { Button,  Flex, Select, Textarea } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/rootReducer";
// import uuid4 from "uuid4";

// interface CheckInFormProps {
//   deployedProduct: IDeployedProduct;
//   onSubmit: (data: IDeployedProduct) => void;
// }

// const CheckInForm: React.FC<CheckInFormProps> = ({
//   deployedProduct,
//   onSubmit,
// }) => {
//   const users = useSelector((state: RootState) => state.user.users);

//   const form = useForm<IDeployedProduct>({
//     initialValues: {
//       id: uuid4(),
//       userId: "",
//       assetId: deployedProduct.assetId,
//       licenseId: deployedProduct.licenseId,
//       accessoryId: deployedProduct.accessoryId,
//       componentId: deployedProduct.componentId,
//       consumableId: deployedProduct.consumableId,
//       assignDate: new Date(),
//       notes: null,
//     },
//     validate: {
//       userId: (value: string) =>
//         value !== "" ? null : "User must be selected",
//     },
//   });
//   const handleSubmit = (data: IDeployedProduct) => {
//     onSubmit(data);
//   };

//   return (
//     <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
//       <Flex
//         direction="column"
//         gap={10}
//         mx="auto"
//         h={"70dvh"}
//         w={"80dvw"}
//         px={40}
//         pt={20}
//       >
//         <Select
//           data={users.map((user) => ({
//             value: user.id,
//             label: user.firstName + " " + user.lastName,
//           }))}
//           label="User"
//           placeholder="Select User"
//           {...form.getInputProps("userId")}
//           withAsterisk
//         />
//         <Textarea
//           label="Notes"
//           placeholder="Your notes here"
//           {...form.getInputProps("notes")}
//           value={form.values.notes || ""}
//         />
//         <Button type="submit" color="dark">
//           CheckIn
//         </Button>
//       </Flex>
//     </form>
//   );
// };

// export default CheckInForm;
