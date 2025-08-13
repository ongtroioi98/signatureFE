import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
// worker.events.on("request:start", ({ request }) => {
//   console.log("[MSW] Request intercepted:", request.method, request.url);
// });
