import { UseFormReturnType } from "@mantine/form/lib/types";
import { toBase64 } from "../../functions/Image";

export const handleImageChange = async <T>(
  form: UseFormReturnType<T>,
  value: File | null
) => {
  if (!value) return;
  const newImage = await toBase64(value);
  form.setFieldValue("imagePath", newImage as string);
};
