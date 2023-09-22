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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { closeModal } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { IConsumable } from "../../../interfaces/interfaces";
import { handleImageChange } from "../../functions/formFunctions";
import MantineSelect from "../../components/MantineSelect";
import { useDispatch } from "react-redux";
import { consumableActions } from "../../../redux/consumable/actions";
import { useSelectData } from "./selectData";

interface ConsumableFormProps {
  consumable?: IConsumable;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({ consumable }) => {
  const dispatch = useDispatch();

  const form = useForm<IConsumable>({
    initialValues: consumable
      ? { ...consumable }
      : {
          id: "",
          categoryId: null,
          companyId: null,
          locationId: null,
          statusId: null,
          name: "",
          imagePath: null,
          modelNo: null,
          itemNo: null,
          tagNo: null,
          serialNo: null,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          quantity: 1,
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      quantity: (value: number) => {
        return value >= 1 ? null : "Quantity must be greater than 0";
      },
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
    consumable
      ? dispatch(consumableActions.update({ consumable: data as IConsumable }))
      : dispatch(consumableActions.create({ consumable: data as IConsumable }));
    dispatch(consumableActions.getAll());
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
            />
          ))}{" "}
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Serial No"
            placeholder="Serial No"
            {...form.getInputProps("serialNo")}
            value={form.values.serialNo || ""}
          />
          <TextInput
            label="Model No"
            placeholder="Model No"
            {...form.getInputProps("modelNo")}
            value={form.values.modelNo || ""}
          />
          <TextInput
            label="Item No"
            placeholder="Item No"
            {...form.getInputProps("itemNo")}
            value={form.values.itemNo || ""}
          />
          <TextInput
            label="Tag No"
            placeholder="Tag No"
            {...form.getInputProps("tagNo")}
            value={form.values.tagNo || ""}
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
          <NumberInput
            defaultValue={1}
            min={1}
            placeholder="Quantity"
            label="Quantity"
            {...form.getInputProps("quantity")}
            value={form.values.quantity || 1}
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

export default ConsumableForm;
