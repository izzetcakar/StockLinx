import { UseFormReturnType } from "@mantine/form/lib/types";
import { toBase64 } from "../../../functions/Image";

export const handleImageChange = async <T>(
  form: UseFormReturnType<T>,
  value: File | null
) => {
  if (!value) return;
  const newImage = await toBase64(value);
  form.setFieldValue("imagePath", newImage as string);
};

// export const SelectItem = forwardRef<HTMLDivElement, IMantineSelectData>(
//     ({ value, label, ...others }: IMantineSelectData, ref) => (
//         <div ref={ref} {...others}>
//             <Group noWrap>
//                 <LoadingOverlay visible={false} />
//                 <div>
//                     <Text size="sm">{value}</Text>
//                     <Text size="xs" opacity={0.65}>
//                         {label}
//                     </Text>
//                 </div>

//             </Group>
//         </div>

//     )
// );

// export const handleSelectComponent = (form: UseFormReturnType<object>, data: IMantineSelectData[], label: string, propTag: string) => {
//     return (
//         <Box pos="relative" key={propTag}>
//             <Select
//                 label={label}
//                 placeholder="Pick one"
//                 data={data}
//                 {...form.getInputProps(propTag)}
//                 transitionProps={{
//                     transition: "pop-top-left",
//                     duration: 80,
//                     timingFunction: "ease",
//                 }}
//                 itemComponent={SelectItem}
//                 searchable
//                 clearable
//                 allowDeselect
//                 dropdownPosition="flip"
//                 nothingFound="No options"
//                 rightSection={<IconChevronDown size="1rem" />}
//                 styles={{ rightSection: { pointerEvents: 'none' } }}
//             />
//         </Box>
//     )
// }
