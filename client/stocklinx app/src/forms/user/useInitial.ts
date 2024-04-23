import uuid4 from "uuid4";
import { IUser } from "../../interfaces/serverInterfaces";

export const useInitial = (user?: IUser, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: IUser = {
    id: uuid4(),
    employeeNo: "",
    firstName: "",
    lastName: "",
    departmentId: "",
    email: "",
    password: "",
    phoneNo: null,
    language: null,
    website: null,
    startDate: new Date("2023-01-01"),
    endDate: null,
    jobTitle: null,
    notes: null,
  };

  if (user) {
    initialValues = { ...user };
    isCreate = false;
  }
  if (!user || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
