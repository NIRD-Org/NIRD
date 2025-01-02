import Swal from "sweetalert2";

export function showAlert(
  message,
  type = "success",
  timer = 3000,
  showConfirmButton = true
) {
  Swal.fire({
    icon: type,
    title: type === "success" ? "Success" : "Error",
    text: message,
    timer,
    timerProgressBar: true,
    showConfirmButton, 
    customClass: {
      popup: "rounded-lg shadow-md",
    },
  });
}
