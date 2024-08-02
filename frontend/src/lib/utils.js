import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function error(error) {
  toast.error(
    error?.response?.data?.message
      ? error.response.data.message
      : "Something went wrong"
  );
}

function success(message) {
  toast.success(message);
}

export const tst = { error, success };
