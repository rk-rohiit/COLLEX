import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  //   theme: "colored",
};

// ✅ Success Toast
export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

// ❌ Error Toast
export const showError = (message) => {
  toast.error(message, toastConfig);
};

// ⚠️ Info Toast
export const showInfo = (message) => {
  toast.info(message, toastConfig);
};

// 🔔 Warning Toast
export const showWarning = (message) => {
  toast.warning(message, toastConfig);
};
