export const setCheckedRecord = (data: any, checkedRecord: any) => {
  if (!data) {
    return checkedRecord ? [checkedRecord] : [];
  }
  const isExist = data.find((up: any) => up.id === checkedRecord.id);
  if (!isExist && checkedRecord) {
    return [...data, checkedRecord];
  } else if (!isExist && !checkedRecord) {
    return data.filter((up: any) => up.id !== checkedRecord.id);
  } else {
    return data.map((up: any) =>
      up.id === checkedRecord.id ? checkedRecord : up
    );
  }
};

export const setAssetCheckStatus = (data: any, dto: any) => {
  return data.map((asset: any) =>
    asset.id === dto.assetId
      ? { ...asset, productStatusId: dto.productStatusId }
      : asset
  );
};
