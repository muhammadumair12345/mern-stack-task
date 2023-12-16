import Swal from "sweetalert2";
import { toast } from "react-toastify";

let toastId = null;

export const success = (message) => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "success" });
};

export const warning = (message) => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "warning" });
};

export const failure = (message) => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "error" });
};

export const confirmation = (message = "delete data", buttonText = "Delete") =>
  Swal.fire({
    title: "Are you sure?",
    text: `You want to ${message}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000000",
    cancelButtonColor: "#d33",
    confirmButtonText: buttonText,
  });
