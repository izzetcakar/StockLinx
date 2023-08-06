import React from "react";
import "./test.scss";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";
import { Button } from "@mantine/core";
import { accessoryActions } from "../redux/accessory/actions";

const Test = () => {
  const dispatch = useDispatch();
  const accessories = useSelector((state: RootState) => state.accessory.accessories);

  const getAllAccessories = () => {
    dispatch(accessoryActions.getAll());
    console.log(accessories);
  };

  return (
    <div>
      <Button onClick={() => getAllAccessories()}>Get Data</Button>
    </div>
  );
};

export default Test;
