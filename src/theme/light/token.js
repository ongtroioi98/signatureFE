import { Typography } from "antd";
const tokens = {
  components: {
    Table: {
      colorText: "#000", // Màu chữ đen riêng cho bảng
      headerBg: "#184619",
      headerColor: "#fff",
    },
    Timeline: {
      dotBorderWidth: 1,
      dotBg: "#fff",
      tailColor: "#000",
    },
    Button: {
      colorText: "#000",
    },
    Select: {
      colorText: "#000",
    },
    Pagination: {
      colorText: "#000",
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
  token: {
    name: "light",
    topBackgroundImage: "/light/background.svg",
    fontSize: 16,
    colorPrimary: "#184619",
    colorPrimaryText: "#000",
    colorTextHeading: "#000",
    colorTextDescription: "#cdc5c5cc",
    colorTextSecondary: "#fff",
    colorTextDescription: "#696d75",
    colorText: "#000",
    colorLink: "#fff",
    colorLinkHover: "#fec544",
    // colorBgContainer: "#fff",
    colorBorderSecondary: "#232935",
    colorBorder: "#3f4551",
    // defaultBg: "#fff",
  },
};
export default tokens;
