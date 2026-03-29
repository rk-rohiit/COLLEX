// toastConfig.js
import theme from "./theme.js";

export const toastStyle = {
  style: {
    background: theme.colors.background,
    color: theme.colors.textDark,
    borderRadius: "12px",
    borderLeft: `5px solid ${theme.colors.primary}`,
  },
};