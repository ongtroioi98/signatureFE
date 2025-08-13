import { getAccessToken } from "./services";
import * as CryptoJS from "crypto-js";
import { API_STORAGE } from "@/apiUrls/storage";
const VITE_DECODE_AES128_KEY = "fTjWnZr4u7x!A%D*";
const VITE_DECODE_IV = "encryptionIntVec";

const keD = VITE_DECODE_AES128_KEY;
const ivN = VITE_DECODE_IV;
export const arrayToTreeHash = (
  arr,
  keyExpr = "id",
  parentExpr = "parentId",
  transformFn = (item) => item
) => {
  return arr.reduce((total, cur) => {
    const key = cur[keyExpr];
    const children = arr.filter((item) => item[parentExpr] === key);
    const values = transformFn(cur);
    return {
      ...total,
      [key]: { ...values, children: children.map((item) => item[keyExpr]) },
    };
  }, {});
};

export const getShortName = (name) => {
  const split = name.split(" ");
  if (split.length > 1) {
    let s = split[0][0] + (split.at(-1).at(0) || "");
    return s.toUpperCase();
  }
  return name?.[0]?.toUpperCase() || "";
};
export const checkSortTable = (arrSortSaveLocal, arrSortDefault) => {
  const result = arrSortSaveLocal.reduce((finalList, item) => {
    const found = arrSortDefault.find((i) => i.key === item.key);
    if (item) {
      finalList.push(found);
    }
    return finalList;
  }, []);
  return result;
};
export const checkAuthority =
  ({
    scope = [
      "list",
      "get",
      "create",
      "update",
      "delete",
      "detail",
      "sync",
      "export",
      "import",
      "approval",
      "share",
      "sign",
      "create-template",
      "send",
      "transfer",
      "bind",
      "assign-task",
    ],
    resourceCode,
  }) =>
  (listAuthority = {}, isRoot = false) => {
    // console.log({ isRoot, listAuthority });
    if (isRoot) {
      if (Array.isArray(scope)) {
        return scope.reduce((total, cur) => ({ ...total, [cur]: true }), {});
      }
      return true;
    }
    if (
      !resourceCode ||
      !listAuthority ||
      Object.keys(listAuthority).length <= 0
    ) {
      if (Array.isArray(scope)) {
        return scope.reduce((total, cur) => ({ ...total, [cur]: false }), {});
      }
      return false;
    }
    if (Array.isArray(scope)) {
      return scope.reduce(
        (total, cur) => ({
          ...total,
          [cur]: listAuthority[resourceCode]?.includes(cur) || false,
        }),
        {}
      );
    }
    return listAuthority[resourceCode]?.includes(scope) || false;
  };

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (nameValue = "Anonymous", rest = {}) => {
  const backgroundColor = stringToColor(nameValue);
  const defaultSx = {
    backgroundColor,
    // color: (theme) => theme.palette.getContrastText(backgroundColor),
  };
  return {
    style: { ...defaultSx, ...rest },
    children: getShortName(nameValue),
  };
};

export function getArrayValue(item) {
  if (item === undefined || item === null) {
    return [];
  }
  if (Array.isArray(item)) return item;
  else return [item];
}
export function getScrollHeightByClassName(
  classNames = ["scroll-caculate-item"]
) {
  let scrollHeight = 0;
  classNames.forEach((className) => {
    if (!className) return;
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
      scrollHeight += element.clientHeight;
    });
  });
  return scrollHeight;
}
// export function getScrollItemsHeight(insideTab) {
//   let h = 0;
//   let items = document.getElementsByClassName('scroll-caculate-item');
//   let tabItems = document.getElementsByClassName('ant-tabs-nav');
//   for (let i = 0; i < items.length; i++) {
//     h += items[i].clientHeight;
//   }
//   if (insideTab && tabItems?.length)
//     for (let i = 0; i < tabItems.length; i++) {
//       let tabH = tabItems[i].clientHeight + 16;
//       h += tabH;
//     }
//   return h;
// }
// export function getScrollFormItemsHeight(insideTab) {
//   let h = 0;
//   let items = document.getElementsByClassName('scroll-form-caculate-item');
//   for (let i = 0; i < items.length; i++) {
//     h += items[i].clientHeight;
//   }
//   if (insideTab) {
//     let itemsTab = document.getElementsByClassName('ant-tabs-nav');
//     for (let i = 0; i < itemsTab.length; i++) {
//       h += itemsTab[i].clientHeight;
//     }
//     //default tab margin bottom 16
//     h += 16;
//   }
//   return h + 'px';
// }
export const downloadURI = (path, filename, withToken) => {
  // Create a new link
  const anchor = document.createElement("a");
  const token = getAccessToken();
  anchor.href = withToken ? `${path}?token=${token}` : path;
  anchor.download = filename;

  // Append to the DOM
  document.body.appendChild(anchor);

  // Trigger `click` event
  anchor.click();

  // Remove element from DOM
  document.body.removeChild(anchor);
};

export const buildUrlWithToken = (url) => {
  const token = getAccessToken();
  if (token) {
    return `${url}?token=${token}`;
  }
  return url;
};

export const buildFileUrlWithToken = (id) => {
  const token = getAccessToken();
  if (token) {
    return `${API_STORAGE.DOWNLOAD_PRIVATE(id)}?token=${token}`;
  }

  return API_STORAGE.DOWNLOAD_PRIVATE(id);
};

export const trimAll = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "string") obj[k] = obj[k].trim();
  });
  return obj;
};
export const removeNullAll = (obj) => {
  const p = { ...obj };
  Object.keys(obj).forEach((k) => {
    if (!obj[k]) delete p[k];
  });
  return p;
};

export const listToTree = (
  arr = [],
  options = { parentId: "parentId", id: "id" }
) => {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i][options.id]] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    const parent = node[options.parentId];
    if (parent) {
      if (!arr[map[parent]]?.children) {
        res.push(node);
      } else {
        arr[map[parent]]?.children?.push(node);
      }
    } else {
      res.push(node);
    }
  }
  return res;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const descriptAES = (inputString) => {
  try {
    const plainText = atob(inputString || "");
    var rawData = CryptoJS.enc.Base64.parse(plainText);
    var key = CryptoJS.enc.Latin1.parse(keD);
    var iv = CryptoJS.enc.Latin1.parse(ivN);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: rawData }, key, {
      iv,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return inputString;
  }
};

export const isFormDirty = (form, initialValues) => {
  const formValues = JSON.stringify(form.getFieldsValue());
  const initValues = JSON.stringify(initialValues);
  console.log({ formValues, initValues });
  return formValues !== initValues;
};

export const typeOf = (value) =>
  Object.prototype.toString.call(value).slice(8, -1);

export function generateSessionId() {
  let result = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
export function generateSessionIdByMd5() {
  let result = "";
  const token = getAccessToken();
  const md = CryptoJS.MD5(token).toString();
  for (let i = 0; i < 8; i++) {
    result += md.charAt(i);
  }
  return result;
}

export const jsonParseSafety = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

export function safeRedirect(redirect) {
  let newDirection;
  try {
    let url = new URL(redirect);
    if (url.origin == window.location.origin) {
      // case same origin
      if (url.pathname != "/" && !url.searchParams.get("is_from_login"))
        url.searchParams.append("is_from_login", true);
    } else {
      // case external
      throw new Error("Hacker");
      // url.searchParams.append('access_token', access_token);
    }
    newDirection = url.toString();
  } catch {
    newDirection = window.location.origin;
  }
  window.location.replace(newDirection);
}

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatCurrency(amount, currency = "VND") {
  let locales = "en-US";
  if (currency === "VND") {
    locales = "vi-VN";
  }
  return new Intl.NumberFormat(locales, {
    // style: 'currency',
    // currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function hexToRGBA(hex, opacity) {
  // Ensure the hex format is valid
  const sanitizedHex = hex.replace("#", "");

  // Handle shorthand hex format (#RGB)
  const isShort = sanitizedHex.length === 3;
  const fullHex = isShort
    ? sanitizedHex
        .split("")
        .map((char) => char + char)
        .join("")
    : sanitizedHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
