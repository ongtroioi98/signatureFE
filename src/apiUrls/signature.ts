import { API_HOST, API_VERSION } from ".";

export const PATH = API_HOST + `/${API_VERSION}`;
export const AI_PATH = API_HOST + `/${API_VERSION}/ai`;
export const API_SIGNATURE = {
  REQUEST_APPROVE_SIGNATURE: (id: string) =>
    PATH + `/signatures/${id}/request-approval`,
  APPROVE_SIGNATURE: (id: string) =>
    PATH + `/signatures/${id}/approve?action=approved`,
  REQUEST_REJECT_SIGNATURE: (id: string) =>
    PATH + `/signatures/${id}/approve?action=denied`,
  COMPARE_SIGNATURE: AI_PATH + `/signature-check`,
};
