import {
  AssetProductCheckOutDto,
  AssetProductDto,
  EmployeeProductCheckOutDto,
  EmployeeProductDto,
} from "@/interfaces/dtos";

export const setCheckedRecord = (data: any, res: any) => {
  if (!data) {
    return res ? [res] : [];
  }
  const isExist = data.find((up: any) => up.id === res.id);
  if (!isExist && res) {
    return [...data, res];
  }
  return data.map((up: any) => (up.id === res.id ? res : up));
};

export const handleCheckOutEmployeeProduct = (
  data: any,
  req: EmployeeProductCheckOutDto,
  res: EmployeeProductDto[]
) => {
  const isExist = res.find((x) => x.id === req.employeeProductId);
  if (!data) {
    return res;
  }
  if (!isExist) {
    const filtered = data.filter((x: any) => x.id !== req.employeeProductId);
    return [...filtered, ...res];
  }
  const filtered = res.filter((x) => x.id !== req.employeeProductId);
  const updated = data.map((x: any) => {
    if (x.id === req.employeeProductId) {
      return isExist;
    }
    return x;
  });
  return [...filtered, ...updated];
};

export const handleCheckOutAssetProduct = (
  data: any,
  req: AssetProductCheckOutDto,
  res: AssetProductDto[]
) => {
  const isExist = res.find((x) => x.id === req.assetProductId);
  if (!data) {
    return res;
  }
  if (!isExist) {
    const filtered = data.filter((x: any) => x.id !== req.assetProductId);
    return [...filtered, ...res];
  }
  const filtered = res.filter((x) => x.id !== req.assetProductId);
  const updated = data.map((x: any) => {
    if (x.id === req.assetProductId) {
      return isExist;
    }
    return x;
  });
  return [...filtered, ...updated];
};

export const setAssetCheckStatus = (data: any, dto: any) => {
  return data?.map((asset: any) =>
    asset.id === dto.assetId
      ? { ...asset, productStatusId: dto.productStatusId }
      : asset
  );
};
