import { toast } from "react-toastify";

export const showSuccessAlert = (message: string) => {
  toast.success(message);
};

export const showErrorAlert = (message: string) => {
  const general = "An error has occurred, verify your input and try again.";
  const finalMessage = message || general;
  toast.error(finalMessage);
};
