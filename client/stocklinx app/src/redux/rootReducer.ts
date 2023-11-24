import { combineReducers } from "redux";
import accessoryReducer from "./accessory/reducer";
import assetReducer from "./asset/reducer";
import categoryReducer from "./category/reducer";
import companyReducer from "./company/reducer";
import componentReducer from "./component/reducer";
import consumableReducer from "./consumable/reducer";
import departmentReducer from "./department/reducer";
import licenseReducer from "./license/reducer";
import locationReducer from "./location/reducer";
import manufacturerReducer from "./manufacturer/reducer";
import modelReducer from "./model/reducer";
import supplierReducer from "./supplier/reducer";
import userReducer from "./user/reducer";
import genericReducer from "./generic/reducer";
import productReducer from "./product/reducer";
import productStatusReducer from "./productStatus/reducer";
import branchReducer from "./branch/reducer";
import fieldSetReducer from "./fieldSet/reducer";
import customFieldReducer from "./customField/reducer";
import fieldSetCustomField from "./fieldSetCustomField/reducer";
import modelFieldData from "./modelFieldData/reducer";

const rootReducer = combineReducers({
  accessory: accessoryReducer,
  asset: assetReducer,
  category: categoryReducer,
  company: companyReducer,
  component: componentReducer,
  consumable: consumableReducer,
  department: departmentReducer,
  license: licenseReducer,
  location: locationReducer,
  manufacturer: manufacturerReducer,
  model: modelReducer,
  fieldSet: fieldSetReducer,
  customField: customFieldReducer,
  fieldSetCustomField: fieldSetCustomField,
  modelFieldData: modelFieldData,
  supplier: supplierReducer,
  product: productReducer,
  productStatus: productStatusReducer,
  branch: branchReducer,
  user: userReducer,
  generic: genericReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
