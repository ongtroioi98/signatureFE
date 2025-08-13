import cookieCutter from "cookie-cutter";
import { AuthServices } from "@/services/iam";
import { API_IAM } from "@/apiUrls/iam";
const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  params?: object
): Promise<Response> => {
  try {
    const token = getAccessToken(); // Get the access token from cookies, localStorage, or state
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", `application/json`);
    headers.set("Content-Type", `application/json`);
    const URLParams = new URLSearchParams(params);
    const response = await fetch(
      url + (params ? `?${URLParams.toString()}` : ""),
      {
        ...options,
        headers,
      }
    );
    if (response.status === 401 && url != API_IAM.AUTH_API.REFRESH_TOKEN) {
      // If unauthorized, attempt to refresh the token
      const refreshResponse = await AuthServices.refreshToken("");
      if (refreshResponse.ok) {
        // Extract new token and store it
        const { accessToken } = await refreshResponse.json();
        saveAccessToken(accessToken);

        // Retry original request with the new token
        headers.set("Authorization", `Bearer ${accessToken}`);
        return await fetch(url, { ...options, headers });
      } else {
        // Handle refresh token failure (e.g., logout)
        handleLogout();
      }
    } else if (response.status === 401) {
      handleLogout();
    }

    return response;
  } catch (error) {
    console.error("API call failed", error);
    throw error;
  }
};

const getAccessToken = () => {
  return cookieCutter.get("token");
};

const saveAccessToken = (token: string) => {
  cookieCutter.set("token", token);
};

const handleLogout = () => {};

export default fetchWithAuth;
