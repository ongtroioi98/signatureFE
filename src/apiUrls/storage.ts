import { API_HOST, API_VERSION } from ".";

export const PATH = API_HOST + `/${API_VERSION}`;
export const API_STORAGE = {
  DOWNLOAD_PRIVATE: (id: string) => PATH + `/download/${id}`,
  UPLOAD_SIGNATURE: PATH + "/signatures/upload",
};
