// utils/showAlert.js
import Swal from "sweetalert2";

export function showAlert(message, type = "success") {
  Swal.fire({
    icon: type,
    title: type === "success" ? "Success" : "Error",
    text: message,
    confirmButtonText: "OK",
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: "rounded-lg shadow-md",
    },
  });
}
