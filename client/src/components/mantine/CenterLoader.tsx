import { Loader } from "@mantine/core";
import React from "react";

interface CenterLoaderProps {
  color?: string;
}

const CenterLoader: React.FC<CenterLoaderProps> = ({ color }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader color={color ? color : "blue"} />
    </div>
  );
};

export default CenterLoader;
