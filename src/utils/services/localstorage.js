const { VITE_NAME } = 'myApp';
const LocalStorageKey = {
  ACCESS_TOKEN: `${VITE_NAME}_access_token`,
  REFRESH_TOKEN: `${VITE_NAME}_refresh_token`,
  CONFIG: `${VITE_NAME}_config`,
  LOCALE: `${VITE_NAME}_locale`,
  SHOW_INTRO: `${VITE_NAME}_show_intro`,
  COLUMNS_CONFIG: `${VITE_NAME}_columns_config`,
  BOARD_KANBAN_CONFIG: `${VITE_NAME}_board_kanban_config`,
  CURRENT_USER_GROUP: `${VITE_NAME}_current_group`,
  CURRENT_VENDOR_ID: `${VITE_NAME}_current_vendor_id`,
};

const getAccessToken = () => {
  return localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
};

const getRefreshToken = () => {
  return localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
};

const setToken = ({ access_token, refresh_token } = {}) => {
  localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
  if (refresh_token) {
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);
  }
};

const getCurrentLanguage = () => {
  return 'vi';
  const lng = localStorage.getItem(LocalStorageKey.LOCALE);
  if (!lng) {
    const navLng = navigator.language;
    return navLng.includes('en') ? 'en' : 'vi';
  } else return lng == 'en' ? 'en' : 'vi';
};

const setCurrentLanguage = (lng) => {
  localStorage.setItem(LocalStorageKey.LOCALE, lng);
};

const clearData = () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
  localStorage.removeItem(LocalStorageKey.CURRENT_USER_GROUP);
  localStorage.removeItem(LocalStorageKey.CURRENT_VENDOR_ID);
  // localStorage.removeItem(LocalStorageKey.USER_INFO);
};

const clearAcessToken = () => {
  const refresh_token = getRefreshToken();
  if (refresh_token) {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  }
};

export {
  LocalStorageKey,
  setToken,
  getAccessToken,
  getRefreshToken,
  clearData,
  getCurrentLanguage,
  setCurrentLanguage,
  clearAcessToken,
};
