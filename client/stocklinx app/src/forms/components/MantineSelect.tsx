import React from "react";
import {
  IMantinSelectProps,
  IMantineSelectData,
} from "../interfaces/interfaces";
import { Box, Group, Select, Text, FocusTrap } from "@mantine/core";

const MantineSelect: React.FC<IMantinSelectProps> = (props) => {
  const { data, value, label, propTag } = props;

  const SelectItem = React.forwardRef<HTMLDivElement, IMantineSelectData>(
    ({ label, ...others }: IMantineSelectData, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          {/* <Text size="sm">{value}</Text> */}
          <Text size="xs" opacity={0.65}>
            {label}
          </Text>
        </Group>
      </div>
    )
  );

  return (
    <Box pos="relative" key={propTag}>
      <FocusTrap>
        <Select
          label={label}
          placeholder="Pick one"
          data={data}
          value={value}
          transitionProps={{
            transition: "pop-top-left",
            duration: 80,
            timingFunction: "ease",
          }}
          clearable
          itemComponent={SelectItem}
          allowDeselect
          dropdownPosition="flip"
          nothingFound="No options"
          // rightSection={<IconChevronDown size="1rem" />}
          // styles={{ rightSection: { pointerEvents: 'none' } }}
        />
      </FocusTrap>
    </Box>
  );
};
export default MantineSelect;
