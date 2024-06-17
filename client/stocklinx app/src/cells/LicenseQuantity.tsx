import { useAssetProduct } from "@/hooks/assetProduct";
import { useUserProduct } from "@/hooks/userProduct";
import { ILicense } from "@/interfaces/serverInterfaces";
import React from "react";

const LicenseQuantity: React.FC<ILicense> = (license: ILicense) => {
  const { data: userProducts } = useUserProduct.GetAll();
  const { data: assetProducts } = useAssetProduct.GetAll();

  const checkedUserQuantity = userProducts
    ?.filter((userProduct) => userProduct.licenseId === license.id)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const checkedAssetQuantity = assetProducts
    ?.filter((assetProduct) => assetProduct.licenseId === license.id)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const availableQuantity =
    license.quantity - (checkedUserQuantity || 0) - (checkedAssetQuantity || 0);

  return <div>{availableQuantity}</div>;
};

export default LicenseQuantity;
