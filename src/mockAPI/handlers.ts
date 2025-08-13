// ✅ Đúng cách
import { http, HttpResponse } from "msw";

// Ví dụ handler
export const handlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/login/local`,
    async (req) => {
      const body = await req.request.json();
      const data = {
        userId: 1,
        userName: body?.username,
        roles: [body?.username],
        acessToken: "asdasdasdassd",
        refreshToken: "hkhknnnkaassbcccbxss",
      };
      localStorage.setItem("loginAccount", JSON.stringify(data));
      return HttpResponse.json(data);
    }
  ),
  http.post("http://localhost:3000/v1/signatures/upload", async (req) => {
    const body = await req.request.json();
    localStorage.setItem("rootSignature", body?.imageBase64);
    return HttpResponse.json({
      ok: 1,
    });
  }),
  http.post("http://localhost:3000/v1/ai/signature-check", async (req) => {
    const body = await req.request.json();
    return HttpResponse.json({
      result: "isMatch",
      score: Math.random(),
    });
  }),
  http.post(
    "http://localhost:3000/v1/signatures/12A/request-approval",
    async (req) => {
      return HttpResponse.json({
        score: Math.random(),
      });
    }
  ),
  http.post("http://localhost:3000/v1/signatures/12A/approve", async (req) => {
    return HttpResponse.json({
      score: Math.random(),
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/accounts/me`,
    () => {
      return HttpResponse.json(
        JSON.parse(localStorage.getItem("loginAccount") || "{}")
      );
    }
  ),
  http.get("http://localhost:3000/v1/signatures?size=25&page=0", () => {
    const dataSource: DataType[] = [
      {
        key: "1",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage:
          "data:image/png;base64,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",
        status: "PENDING",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "2",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "3",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "4",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "5",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "6",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "7",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "8",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "9",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "10",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "11",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "612",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "613",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "614",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "15",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
      {
        key: "16",
        applicationId: "12A",
        userId: "anhlv",
        fullName: "Alan Walker",
        signatureImage: "",
        status: "",
        createdBy: Date.now(),
        updatedAt: Date.now(),
      },
    ];
    return HttpResponse.json({
      rows: dataSource,
      total: 50,
      page: 1,
    });
  }),
];
