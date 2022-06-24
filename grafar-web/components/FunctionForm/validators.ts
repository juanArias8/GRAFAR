export const isAllTrue = (array: any[] | undefined) => {
  if (!array) return false;
  return array.every((value) => value === true);
};

export const validateInput = (input: any) => {
  return input.value && isAllTrue(input.validators);
};

export const required = (value: any) => {
  return (value && value?.length && value?.trim() !== "") || "field required. ";
};

export const minLength = (value: any, len: number) => {
  return value?.length >= len || `at least ${len} characters. `;
};

export const maxLength = (value: any, len: number) => {
  return value?.length <= len || `almost ${len} characters. `;
};

export const isNumber = (value: any) => {
  return !isNaN(Number(value)) || `${value} is not a valid number. `;
};
