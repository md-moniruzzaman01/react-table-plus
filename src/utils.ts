export const handleCheckboxChange = (
    id: number,
    checkedRows: number[],
    setCheckedRows: (rows: number[]) => void
  ) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((item) => item !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };
  
  // All-checkbox handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const handleAllCheckboxChange = <T extends { [key: string]: any }>(
    checkedRows: number[],
    setCheckedRows: (rows: number[]) => void,
    items: T[],
    idKey: keyof T
  ) => {
    const allIds = items
      ?.map((item) => item[idKey] as unknown as number) // assert as number
      .filter((id) => id !== undefined && id !== null) || [];
  
    if (checkedRows.length === allIds.length) {
      setCheckedRows([]);
    } else {
      setCheckedRows(allIds);
    }
  };


  export const getValue = (item: any, key: string) => {
    return key.split(".").reduce((acc, k) => acc?.[k], item);
  };
  