import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  ScrollArea,
  Flex,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { ProductStatusType, IProductStatus } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { productStatusActions } from "../../redux/productStatus/actions";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";
interface ProductStatusFormProps {
  productStatus?: IProductStatus;
}

const ProductStatusForm: React.FC<ProductStatusFormProps> = ({
  productStatus,
}) => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const [company, setCompany] = useState(productStatus?.companyId || "");
  const dispatch = useDispatch();
  const form = useForm<IProductStatus>({
    initialValues: productStatus
      ? { ...productStatus }
      : {
          id: uuid4(),
          type: ProductStatusType.AVAILABLE,
          branchId: "",
          name: "",
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      branchId: (value: string) =>
        value !== "" ? null : "Branch should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    productStatus
      ? dispatch(
          productStatusActions.update({ productStatus: data as IProductStatus })
        )
      : dispatch(
          productStatusActions.create({ productStatus: data as IProductStatus })
        );
  };
  const openNextModel = () =>
    modals.open({
      modalId: "next-modal",
      title: "Page 2",
      children: (
        <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
          Back
        </Button>
      ),
    });

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    form.setFieldValue("branchId", "");
  };

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          <Select
            data={companies.map((company) => ({
              value: company.id,
              label: company.name,
            }))}
            label="Company"
            placeholder="Select Company"
            value={company}
            onChange={(value) => handleCompanyChange(value as string)}
            withAsterisk
          />
          <Select
            data={branches
              .filter((branch) => branch.companyId === company)
              .map((branch) => ({
                value: branch.id,
                label: branch.name,
              }))}
            label="Branch"
            placeholder="Select Branch"
            {...form.getInputProps("branchId")}
            withAsterisk
          />
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
            withAsterisk
          />
          <Select
            data={[
              { value: ProductStatusType.AVAILABLE, label: "Avaliable" },
              { value: ProductStatusType.DAMAGED, label: "Damaged" },
              { value: ProductStatusType.DEPLOYED, label: "Deployed" },
              { value: ProductStatusType.ORDERED, label: "Ordered" },
              { value: ProductStatusType.OUT_OF_STOCK, label: "Out of Stock" },
            ]}
            label="Type"
            placeholder="Select Type"
            {...form.getInputProps("type")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="dark">
              Submit
            </Button>
            <Button onClick={() => openNextModel()} color="dark">
              Next Modal
            </Button>
          </Group>
        </Flex>
      </form>
    </ScrollArea.Autosize>
  );
};

export default ProductStatusForm;
