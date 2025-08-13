"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Upload,
  message,
  Button,
  Flex,
  Divider,
  Tag,
  Spin,
} from "antd";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { API_STORAGE } from "@/apiUrls/storage";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { getErrorMessage, postAPI } from "@/services/api";
import { useUserStore } from "@/store/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_IAM } from "@/apiUrls/iam";
import { API_SIGNATURE } from "@/apiUrls/signature";
import { showError, showSuccess } from "@/utils";
import { renderStatus } from ".";
import dayjs from "dayjs";

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
export default function ApplicationDetail({ row, onClose }) {
  const userInfo = useUserStore((state) => state.info);
  console.log("userInfo....", userInfo);
  const rootSignature = localStorage.getItem("rootSignature");
  const [signature, setSignature] = useState<string | null>(
    userInfo?.signature
  );
  const requestApproval = useMutation({
    mutationFn: () =>
      postAPI(API_SIGNATURE.REQUEST_APPROVE_SIGNATURE(row.applicationId), {}),
    onSuccess: () => {
      showSuccess("Sent Approval request successfully");
      onClose(true);
    },
    onError: () => {
      showError("Failed to send request");
    },
  });
  const approveMutation = useMutation({
    mutationFn: () =>
      postAPI(API_SIGNATURE.APPROVE_SIGNATURE(row.applicationId), {}),
    onSuccess: () => {
      debugger;
      showSuccess("Approve request successfully");
      onClose(true);
    },
    onError: (e) => {
      debugger;
      showError("Failed to send request");
    },
  });
  const rejectRequest = useMutation({
    mutationFn: () =>
      postAPI(API_SIGNATURE.REQUEST_REJECT_SIGNATURE(row.applicationId), {}),
    onSuccess: () => {
      showSuccess("The request has been rejected");
      onClose(true);
    },
    onError: () => {
      showError("Failed to send request");
    },
  });
  const compareRequest = useMutation({
    mutationFn: () =>
      postAPI(API_SIGNATURE.COMPARE_SIGNATURE, {
        applicationId: row.applicationId,
      }),
    onSuccess: () => {},
    onError: () => {
      showError("Compare signatures error");
    },
  });

  // const {
  //   data: compareData,
  //   isLoading: compareLoading,
  //   isError: isCompareError,
  //   error: compareError,
  //   refetch: callCompare,
  // } = useQuery({
  //   queryKey: ["signaturecompare"], // cache key
  //   queryFn: () =>
  //     postAPI(API_SIGNATURE.COMPARE_SIGNATURE, {
  //       applicationId: row.applicationId,
  //     }),
  //   staleTime: 1000 * 60, // dữ liệu cache 1 phút
  //   enabled: false,
  // });
  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return Upload.LIST_IGNORE;

    try {
      const base64 = await getBase64(file);

      const res = await fetchWithAuth(API_STORAGE.UPLOAD_SIGNATURE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "xxxxx",
          imageBase64: base64,
        }),
      });

      if (!res.ok) throw new Error("Upload thất bại");

      setSignature(base64); // Lưu chữ ký vào state
      message.success("Upload signature successfully");
    } catch (err) {
      message.error(getErrorMessage(err));
    }

    return Upload.LIST_IGNORE; // Ngăn AntD tự upload
  };
  const sendApproveRequest = () => {
    // refetch();
    requestApproval.mutate();
  };
  const renderScore = (score: number) => {
    let color = "green";
    if (score < 0.86) {
      color = "red";
    } else if (score > 0.86 && score < 0.95) color = "gold";
    return (
      <Typography.Title level={3} style={{ color: color }}>
        {(score * 100)?.toFixed(1)}%
      </Typography.Title>
    );
  };
  useEffect(() => {
    compareRequest.mutate();
  }, []);
  console.log("compare......", compareRequest.data);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <Flex>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr",
            gridGap: "8px 16px",
            marginBottom: "16px",
          }}
        >
          <Typography.Title level={5}>User:</Typography.Title>
          <Typography.Text>{row?.fullName}</Typography.Text>
          <Typography.Title level={5}>Created Date:</Typography.Title>
          <Typography.Text>
            {!row?.createdDate
              ? ""
              : dayjs(row?.createdDate).format("MM/DD/YYYY hh:mm")}
          </Typography.Text>
          <Typography.Title level={5}>Status:</Typography.Title>
          <Typography.Text>{renderStatus(row?.status)}</Typography.Text>
        </div>
      </Flex>
      <Flex gap={16} align="flex-start">
        {rootSignature && (
          <Card bordered={false} style={{ height: "250px", minWidth: "50%" }}>
            <Typography.Title level={5}>Root signature</Typography.Title>
            <img
              src="/Signature.jpg"
              alt="root signature"
              style={{ maxWidth: "250px", height: "150px" }}
            />
          </Card>
        )}
        <Card bordered={false} style={{ height: "250px", minWidth: "50%" }}>
          <Typography.Title level={5}>Signature</Typography.Title>
          <div style={{ marginTop: 8 }}>
            {row.signatureImage ? (
              <img
                src={row.signatureImage}
                alt="Signature"
                style={{
                  maxWidth: "250px",
                  padding: 8,
                  height: "150px",
                  width: "auto",
                  border: "none",
                }}
              />
            ) : (
              <Text type="secondary">No signature</Text>
            )}
          </div>
        </Card>
      </Flex>
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
      {compareRequest.isPending && (
        <Flex justify="center" style={{ margin: "15px 0px" }}>
          <Typography.Text style={{ fontSize: "16px", fontWeight: 600 }}>
            Similarity score:&nbsp;
          </Typography.Text>{" "}
          <Spin></Spin>
        </Flex>
      )}
      {!compareRequest.isPending && compareRequest?.data && (
        <Flex
          align="baseline"
          justify="center"
          style={{ padding: "16px", textAlign: "center" }}
        >
          <Typography.Text style={{ fontSize: "16px", fontWeight: 600 }}>
            Similarity score:&nbsp;
          </Typography.Text>
          {renderScore(compareRequest?.data?.score)}
          <Typography.Text style={{ fontSize: "16px" }}>
            &nbsp;
            {compareRequest?.data?.result === "isMatch" ? (
              <Tag color="green">Matched</Tag>
            ) : (
              <Tag color="red">Not matched</Tag>
            )}
          </Typography.Text>
        </Flex>
      )}
      {/* <Divider style={{ borderColor: "#cac8c6", margin: "12px 0px" }} /> */}
      {userInfo?.roles?.includes("staff") && (
        <Flex justify="flex-end" gap={16} style={{ marginTop: "16px" }}>
          <Button
            type="primary"
            onClick={sendApproveRequest}
            size="large"
            loading={requestApproval.isPending}
          >
            Send Approval request
          </Button>
          <Button size="large" style={{ width: 150 }} onClick={onClose}>
            Close
          </Button>
        </Flex>
      )}

      {userInfo?.roles?.includes("manager") && (
        <Flex justify="flex-end" gap={16} style={{ marginTop: "16px" }}>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              approveMutation.mutate();
            }}
            style={{ width: 150 }}
            loading={approveMutation.isPending}
          >
            Approve
          </Button>
          <Button
            size="large"
            type="primary"
            danger={true}
            style={{ width: 150 }}
            loading={rejectRequest.isPending}
            onClick={() => {
              rejectRequest.mutate();
            }}
          >
            Reject
          </Button>
        </Flex>
      )}
      {/* <Dragger
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
      </Dragger> */}
    </div>
  );
}
