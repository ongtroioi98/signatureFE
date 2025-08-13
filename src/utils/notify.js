import { notification, Modal } from "antd";
import { getTranslations } from "next-intl/server";

export function showError(error, description = "", navigate, key) {
  notification.error({
    message: error?.message || error,
    description: description,
    key,
  });
  if (navigate) {
    const status = error?.response?.status;
    switch (status) {
      case 404:
        navigate("/404", { replace: true });
        break;
      case 403:
        navigate("/403", { replace: true });
        break;
      default:
        break;
    }
  }
}

export function showSuccess(message, description = "") {
  notification.success({
    message: message,
    description: description,
    duration: 2,
    placement: "top",
  });
}

export function showWarning(message, description = "") {
  notification.warning({
    message: message,
    description: description,
    duration: 3,
  });
}

export function showInfo(message, description = "") {
  notification.info({
    message: message,
    description: description,
    duration: 3,
  });
}

export async function showConfirm(props) {
  const t = await getTranslations();
  const defaultProps = {
    okText: t("action.OK"),
    cancelText: t("action.cancel"),
  };
  Modal.confirm({
    ...defaultProps,
    ...props,
  });
}
