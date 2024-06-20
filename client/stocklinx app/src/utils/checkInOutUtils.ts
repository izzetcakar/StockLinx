import {
  AssetProductCheckOutDto,
  AssetProductDto,
  UserProductCheckOutDto,
  UserProductDto,
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

export const handleCheckOutUserProduct = (
  data: any,
  req: UserProductCheckOutDto,
  res: UserProductDto[]
) => {
  const isExist = res.find((x) => x.id === req.userProductId);
  if (!data) {
    return res;
  }
  if (!isExist) {
    const filtered = data.filter((x: any) => x.id !== req.userProductId);
    return [...filtered, ...res];
  }
  const filtered = res.filter((x) => x.id !== req.userProductId);
  const updated = data.map((x: any) => {
    if (x.id === req.userProductId) {
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
  return data.map((asset: any) =>
    asset.id === dto.assetId
      ? { ...asset, productStatusId: dto.productStatusId }
      : asset
  );
};
