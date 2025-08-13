export const handleMergeDataArray = (firstData: any[], lastData: any[]) => {
  const dataSet = new Map<string, any>(
    firstData
      .concat(lastData)
      ?.filter((item) => item?.id)
      ?.map((item) => [item?.id || '', item]),
  );
  return [...dataSet.values()];
};

export const handleRemoveDataHadInArray = (
  firstData: any[],
  lastData: any[],
) => {
  const rawLastDataCheck = lastData?.map((item) => item?.id);
  const dataSet = new Map<string, any>(
    firstData
      ?.filter((item) => !rawLastDataCheck?.includes(item?.id))
      ?.map((item) => [item?.id || '', item]),
  );
  return [...dataSet.values()];
};
