import { useAssetProduct, useEmployeeProduct } from "@queryhooks";
import { ILicense } from "@/interfaces/serverInterfaces";
import React from "react";

const LicenseQuantity: React.FC<ILicense> = (license: ILicense) => {
  const { data: employeeProducts } = useEmployeeProduct.GetAll();
  const { data: assetProducts } = useAssetProduct.GetAll();

  const checkedUserQuantity = employeeProducts
    ?.filter((employeeProduct) => employeeProduct.licenseId === license.id)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const checkedAssetQuantity = assetProducts
    ?.filter((assetProduct) => assetProduct.licenseId === license.id)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const availableQuantity =
    license.quantity - (checkedUserQuantity || 0) - (checkedAssetQuantity || 0);

  return <div>{availableQuantity}</div>;
};

export default LicenseQuantity;
