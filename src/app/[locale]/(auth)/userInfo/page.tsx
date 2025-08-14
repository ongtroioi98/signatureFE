"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { Card, Avatar, Typography, Upload, message } from "antd";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { API_STORAGE } from "@/apiUrls/storage";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { getErrorMessage } from "@/services/api";
import { useUserStore } from "@/store/user";
// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "vi" }];
// }
const { Title, Text } = Typography;
const { Dragger } = Upload;
// ✅ Chuyển file sang Base64
const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // data:image/png;base64,...
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const validateFile = (file: File) => {
  const isAllowedType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp";

  if (!isAllowedType) {
    message.error("Only accept JPG, PNG, WEBP");
    return false;
  }

  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("File's size must be lesser than 1MB");
    return false;
  }

  return true;
};
export default function UserProfile() {
  const userInfo = useUserStore((state) => state.info);
  const [signature, setSignature] = useState<string | null>(
    userInfo?.signature
  );
  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return Upload.LIST_IGNORE;

    try {
      const base64 = await getBase64(file);
      const res = await fetchWithAuth(API_STORAGE.UPLOAD_SIGNATURE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "11111111-1111-1111-1111-111111111111",
          imageBase64: base64,
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      setSignature(base64); // Lưu chữ ký vào state
      message.success("Upload signature successfully");
    } catch (err: any) {
      message.error(getErrorMessage(err));
    }

    return Upload.LIST_IGNORE; // Ngăn AntD tự upload
  };
  return (
    <Card
      style={{ maxWidth: 500, margin: "0 auto", marginTop: 50, padding: 16 }}
      bordered={false}
    >
      {/* <div style={{ textAlign: "center" }}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src="https://i.pravatar.cc/150?img=3" // Avatar giả lập
        />
        <Title level={4} style={{ marginTop: 16 }}>
          {userInfo?.userName}
        </Title>
      </div> */}
      <Title level={4}>Upload root signature</Title>
      <div style={{ marginTop: 24 }}>
        <Text strong>Signature:</Text>
        <div style={{ marginTop: 8 }}>
          {signature ? (
            <img
              src={signature}
              alt="Signature"
              style={{
                maxWidth: "100%",
                padding: 8,
                height: "150px",
                width: "auto",
                border: "none",
              }}
            />
          ) : (
            <Text type="secondary"></Text>
          )}
        </div>
      </div>

      <Dragger
        name="signature"
        action={API_STORAGE.UPLOAD_SIGNATURE} // API upload của bạn
        showUploadList={false}
        beforeUpload={handleUpload}
        accept=".jpg,.png,.webp"
        style={{ marginTop: 16 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Drag or select file here to upload sinature
        </p>
        <p className="ant-upload-hint">Allowed image type (JPG, PNG, ...)</p>
      </Dragger>
    </Card>
  );
}
