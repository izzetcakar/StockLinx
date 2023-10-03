import React from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  FileInput,
  rem,
  Image,
  ScrollArea,
  Flex,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { closeModal } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { ILicense, ProductStatus } from "../../../interfaces/interfaces";
import { handleImageChange } from "../../functions/formFunctions";
import MantineSelect from "../../components/MantineSelect";
import { useDispatch } from "react-redux";
import { licenseActions } from "../../../redux/license/actions";
import { useSelectData } from "./selectData";

interface LicenseFormProps {
  license?: ILicense;
}

const LicenseForm: React.FC<LicenseFormProps> = ({ license }) => {
  const dispatch = useDispatch();

  const form = useForm<ILicense>({
    initialValues: license
      ? { ...license }
      : {
          id: "",
          categoryId: null,
          companyId: null,
          locationId: null,
          productStatus: ProductStatus.AVAILABLE,
          supplierId: null,
          name: "",
          imagePath: null,
          licenseEmail: null,
          licenseKey: "",
          orderNo: null,
          maintained: false,
          reassignable: false,
          serialNo: null,
          purchaseCost: null,
          purchaseDate: null,
          expirationDate: null,
          terminationDate: null,
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      licenseEmail: (value) =>
        value && /^\S+@\S+$/.test(value) ? null : "Invalid email",
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
    },
  });
  const handleSubmit = (data: object) => {
    license
      ? dispatch(licenseActions.update({ license: data as ILicense }))
      : dispatch(licenseActions.create({ license: data as ILicense }));
    dispatch(licenseActions.getAll());
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

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          {useSelectData(form).map((selectData) => (
            <MantineSelect
              key={selectData.propTag}
              data={selectData.data}
              value={selectData.value}
              label={selectData.label}
              propTag={selectData.propTag}
              form={form}
            />
          ))}{" "}
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="License Email"
            placeholder="License Email"
            {...form.getInputProps("licenseEmail")}
            value={form.values.licenseEmail || ""}
          />
          <TextInput
            label="License Key"
            placeholder="License Key"
            {...form.getInputProps("licenseKey")}
            value={form.values.licenseKey || ""}
          />
          <TextInput
            label="Serial No"
            placeholder="Serial No"
            {...form.getInputProps("serialNo")}
            value={form.values.serialNo || ""}
          />
          <TextInput
            label="Order No"
            placeholder="Order No"
            {...form.getInputProps("orderNo")}
            value={form.values.orderNo || ""}
          />
          <NumberInput
            placeholder="Purchase Cost"
            label="Purchase Cost"
            {...form.getInputProps("purchaseCost")}
            value={form.values.purchaseCost || ""}
            precision={2}
          />
          <DateInput
            clearable
            label="Purchase Date"
            placeholder="Purchase Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("purchaseDate")}
          />
          <DateInput
            clearable
            label="Expiration Date"
            placeholder="Expiration Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("expirationDate")}
          />
          <DateInput
            clearable
            label="Termination Date"
            placeholder="Termination Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("terminationDate")}
          />
          <NumberInput
            defaultValue={1}
            min={1}
            placeholder="Quantity"
            label="Quantity"
            {...form.getInputProps("quantity")}
          />
          <Checkbox
            label="Maintained"
            {...form.getInputProps("maintained", { type: "checkbox" })}
            checked={form.values.maintained || false}
          />
          <Checkbox
            label="Reassignable"
            {...form.getInputProps("reassignable", { type: "checkbox" })}
            checked={form.values.reassignable || false}
          />
          <FileInput
            label="Upload image"
            placeholder="Upload image"
            accept="image/png,image/jpeg"
            // value={form.getTransformedValues().imagePath}
            onChange={(value) => void handleImageChange(form, value)}
            icon={
              <IconUpload size={rem(14)} {...form.getInputProps("imagePath")} />
            }
          />
          <Image
            maw={240}
            mx="auto"
            radius="md"
            src={form.values.imagePath}
            alt="Random image"
          />
          <Textarea
            placeholder="Your notes here"
            label="Note"
            {...form.getInputProps("notes")}
            value={form.values.notes || ""}
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

export default LicenseForm;
