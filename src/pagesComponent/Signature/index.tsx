"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Empty,
  Flex,
  GetProps,
  Input,
  Modal,
  Space,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import { Table } from "@/components/Table";
import Filter from "./filter";
import {
  CheckCircleFilled,
  FilterOutlined,
  InfoCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Pagination } from "@/components/Pagination";
import { useFetch } from "@/hooks/useFetch";
import { API_IAM } from "@/apiUrls/iam";
import { useQuery } from "@tanstack/react-query";
import fetchWithAuth from "@/utils/fetchWithAuth";
import ApplicationDetail from "./detail";
interface DataType {
  key: React.Key;
  applicationId: string;
  userId: string;
  fullName: string;
  signatureImage: string;
  status: string;
  createdBy: number;
  updatedAt: number;
}
type Status = {
  value: string;
  label: string;
  color: string;
};
export const statusMap = {
  PENDING: {
    label: "Pending",
    color: "warning",
  },
  CREATED: {
    label: "Pending",
    color: "warning",
  },
  SUCCESS: {
    label: "Success",
    color: "success",
  },
  FAILED: {
    label: "Failure",
    color: "error",
  },
  APPROVED: {
    label: "Approved",
    color: "success",
  },
  REJECTED: {
    label: "Rejected",
    color: "error",
  },
} as const;
export type StatusValue = keyof typeof statusMap;

export function renderStatus(value: StatusValue) {
  if (!value) return null;
  return <Tag color={statusMap[value]?.color}>{statusMap[value]?.label}</Tag>;
}
function renderDateTime(value: number) {
  return dayjs(value).format("MM/DD/YYYY hh:mm");
}
const dataSource: DataType[] = [
  {
    key: "1",
    applicationId: "1111",
    userId: "anhlv",
    fullName: "Alan Walker",
    signatureImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf4AAAEoCAIAAAA2agRAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAsYSURBVHhe7dTRcuLIEgDR/f+f3juhSWLHd4wNRkINdc6TXUhN21LnP/8CMIz0A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI70A4wj/QDjSD/AONIPMI708zL++cfrCvtwlngNv7r/W78DD3CQeAFVf9MIeICDxAuo+roPO3GWWF3V3zQCHuMssbqqr/uwH8eJpVX9TSPgYY4TS6v6ug+7cqJYWuGXftiVE8W6qr7uw94cKhZV9TeNgJ04VKyo5F80BXbiULGikr9pBOzHuWJFVV/34RiOFsup+roPh3G6WE7hl344jNPFcgq/9MNhnC7WUvV1H47kgLGWwi/9cCQHjLUUfumHIzlgLKTqbxoBB3DAWEjV1304mDPGQgq/9MPBnDFWUfU3jYBjOGMsoeRvGgGHccw4X8nfNAKO5KRxspJ/0RQ4kpPGmer9RVPgYA4bZyr5m0bA8Zw3TlPyN42Ap3DkOEfJ3zQCnsWp4xxVX/fhDA4e5yj80g9ncPA4QdXXfTiJs8cJCr/0w0mcPU5Q+KUfTuLs8WxVX/fhPI4fz1b4pR/O4/jxVFV/0wh4OsePp6r6ug+ncgJ5qsIv/XAqJ5Dnqfq6D2dzCHmewi/9cDaHkCep+ptGwEkcQp6k6us+LMA55Bmq/qYRcB7nkGeo+roPa3AUeYbCL/2wBkeRw1V93YdlOI0crvBLPyzDaeRYVX/TCDib08ixqr7uw0ocSI5V+KUfVuJAcqCqr/uwGGeSAxV+6YfFOJMcpepvGgFrcCY5StXX/TX0MD7TFUziqXOUuqIsa+hhXNFFjOGRc4iKsmnEqXoYX+pSBvCwOUQtUZNl9Dw+PpFGf+gD3p0nzSEKiZSsoYexafRRn20a8dY8Zg5RRXRkDT2MLx9HV2wa8b48Y/ZXPxRkDT2MTaMrusiDG8AzZn/1Q0EW0JPYNLqu6zaNeFMeMPsrHvKxgJ7Ezc+iqz27d+cBs7/iIR8L6ElIPx95wOyscmwacZ6exG3Poks3jXhTHjA7qxzasYYexqbRFV100ZQ35QGzs8qhHcvoeXz5RLrioinvyzNmZ8VDPpbR89g0+qjPLpry1jxm9lQ85GMxPZVNo4umF015d540e6ofCrKYnspFU90fzMNmN/Vj04hl9GCu6zpm8LzZTQkRkVX1eD7TFYzhkbObKqIja+sh/aWPmcHzZh/1Q0HW1kP6TFcwg+fNPurHTgVpLT3aVf/TK7qIGTxvdlA8No0e01p6tJP+m9d1HWN45OygfuxXkJaTpIf1f/xSlzKJp84OSsgB6f+lEXfq33dd1zGSx88Oasli6e/+TaMB+oOv6zpm8x7wqIqya1NacdPoft2/afSm+iO/1KWw8ULwqNIi/c/VH/alLoW/eDl4VJmR/oP1l9yme+AKrwiPKjaHpf+Xpnfq5k2jV9Pu79Gd8CUvCqkcS2qLd+rmTaNltK1dtTTcwOvyzkrCAP3BH/XZptGR+qYjXfuW3xuA23lpXl6nnzv177tZtz1X371p9FGfwZ28Oi+mE3+MvuMe3bl3g1r0rfWn3qAbPuoz+BEv0AvorN+v+w/T1xzwRa170fS6rjtVW9lP6/6lj+EBXqNFdcpv0A1naAd776FFP+qze3Tn9Xv7+Dbdc7y+7zNdAQ/zMq2lI35d162hPe29qxbdlu2nH31Fd75IMdvrZ7oC9uOtWkWn/DNdsZg2d8D2WndbuZ9+9C3duXY62+JnugIO4PU6Xwf9L328qnZ5wD5bd1u5n370Ld255H+ynX2mK+BI3rOTddz/0AfLa7sHbLh1t5X76f5v6bZNowW0oc90BTyFF+5MHfpNoxfRpg/YduteVu6X+7+o2y6anqEdXNFF8FzevDN1+l/w/LfvA3beupeV++X+L+q2P/TBwfqy73Q1nMQreKYy8IIhaN8H7Lx1Lyv3y51f1D1/6eP9tO7Nug3O5l08Uz14tSK06U2jnbToH8v2+z1f1A2b//v1l9/X/ED336/7YSXeyzPVhlerQ5s+YNut+8fK/b5p9J2uvrLI37rooz67X/fD2rypZ6oWm0avoB3vvecW3TTaNLrt67p002jTaG+tDq/Gu3um+nHRdHltd9cNt+Km0R/64Ltv7KJNo4/67EdaAt6CF/pkdWXTaHltd9cNt+INyW70ma64c2Pd81GfwZvyip+v2Gwara297rfblts0+ksf33DBL42AKxySJVSsTaOFtdGdttpam0af6Yor1/TZphFwnXOyhKJ10XRV7XKPfbbQptEVXfRd+vsd+JKjsorStWm0qnb58D5b5aLpFV20aXTRdNMI+JKjspDqNSP9LXHR9Lquu2j6cd4I+I7TspYatnbF2uIDm+z+i6bf6eo//N/w92XAt5yWtdSwTaP1tL+f7rCbL5repns+0xXADRyYtZSxi6aLaXN7pL/Rnbr5oz4DbuDALKeSXTRdSTt7ONz9/iMtcdEUuI0zs6J6dtF0GW3rRxvrTrGGUzmBiyqQF03X0J6kH16WE7iuGnnRdAFt6P4tddumEXAGJ3BpZfKi6dnazabRDbph0wg4iUO4umJ50fRs7WbT6EtdetEUOIlD+ALq5UXTs7Wb+9PfCDiPc/gaquZHfXaSNrFpdEUXbRoBp3IUX0bt/ExXPF1f/4c++EMfbBoBZ3MaX08dvaKLnqKvvE33AAtwIF9YTb2u647UN92gG4AFOJDvoLh+qUsP09d8piuAZTiWb6XWfqergalU4G2V+e90NTCJkz9Cmb9BNwBvzVEfp8bfoBuAt+N4T1fmb9M9wItzmPlPgb9f9wMvwqHlqrr+U60CrMf55A5F/WEtB5zEIWQHFf1hLQcczGHjKOV8Jy0K7MGJ4gTlfCctCtzMsWEhtXwnLQr8xfHgNZTznbQoTOUM8PLK+R5aEd6dd513VtH30IrwFrzQTFTO99CK8FK8uPCfcr6TFoX1eDvhJuV8D60I5/EWwkPK+U5alI/67xyv79s0umj6LrxqcJSasZMWfV/9nQtro29B+uHZCsl+WvcVtOPX1N/wFqQfFlJj9tbqT9FX7qqlj9f3XdFFb0H64TWUn/fV37mYNrdp9BakH95BcVpe2+VsngSMUHqP1/exNs8JYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gHGkX6AcaQfYBzpBxhH+gGG+fff/wGD22uC4+4PpgAAAABJRU5ErkJggg==",
    status: "SUCCESS",
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
const columns: TableColumnsType<DataType> = [
  {
    title: "Application ID",
    dataIndex: "applicationId",
    key: "applicationId",
    width: 120,
  },
  { title: "User ID", dataIndex: "userId", key: "userId", width: 100 },
  { title: "Full name", dataIndex: "fullName", key: "fullName", width: 120 },
  {
    title: "Signature image",
    dataIndex: "signatureImage",
    key: "signatureImage",
    width: 150,
    render: (value) => {
      return value ? (
        <Image src={value} alt={value} height={70} width={150} />
      ) : null;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: renderStatus,
  },
  {
    title: "Created by",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 100,
    render: renderDateTime,
  },
  {
    title: "Updated date",
    dataIndex: "updatedDate",
    key: "updatedDate",
    width: 120,
    render: renderDateTime,
  },
];
function SignatureTable() {
  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setFilter({ ...filter, page: 1, keyword: value });
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState({});
  const [paging, setPaging] = useState({ pageSize: 25, current: 1 });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [JSON.stringify(filter) + JSON.stringify(paging)], // cache key
    queryFn: async () => {
      const res = await fetchWithAuth(
        API_IAM.USER.SIGNATURES,
        {},
        { ...filter, ...{ page: paging.current - 1, size: paging.pageSize } }
      );
      return res.json();
    },
    staleTime: 1000 * 60, // dữ liệu cache 1 phút
  });

  const actions = {
    align: "center",
    title: "Action",
    width: 70,
    dataIndex: "c",
    fixed: "right",
    render: (text, record) => {
      return (
        <Button
          title="Detail"
          icon={<InfoCircleOutlined />}
          type="link"
          style={{ color: "#52C41A" }}
          onClick={() => {
            setSelectedItem(record);
          }}
        ></Button>
      );
    },
  };
  const onFilterChange = (value: object) => {
    setFilter(value);
    setOpenFilter(false);
  };
  const onPagingChange = (value: { pageSize: number; current: number }) => {
    setPaging(value);
  };
  console.log("data...........", data);

  return (
    <Flex vertical>
      <Typography.Title level={4}>List Applications</Typography.Title>
      {/* <Flex className="scroll-caculate-item" style={{ padding: "24px 16px" }}>
        <Input.Search
          placeholder="Enter text to search"
          onSearch={onSearch}
          enterButton
          size="large"
          style={{ maxWidth: "450px", margin: "auto" }}
        />
        <Button
          icon={<FilterOutlined />}
          type="default"
          title="Filter"
          size="large"
          shape="circle"
          onClick={() => {
            setOpenFilter(true);
          }}
        ></Button>
      </Flex> */}

      <Table
        offsetBottom={130}
        dataSource={data?.rows || []}
        columns={columns}
        loading={isLoading}
        actions={actions}
        pageSize={paging.pageSize}
        pageIndex={paging.current}
      ></Table>
      {/* <Pagination
        total={dataSource.length}
        onChange={onPagingChange}
        {...paging}
        className="scroll-caculate-item"
      /> */}
      <Filter
        data={filter}
        open={openFilter}
        onSubmit={onFilterChange}
        onClose={() => setOpenFilter(false)}
      />
      <Modal
        title="Application detail"
        open={!!selectedItem}
        onCancel={() => setSelectedItem(false)}
        footer={null}
        height={500}
        width={700}
        destroyOnClose
      >
        <ApplicationDetail
          row={selectedItem}
          onClose={(needReload: boolean) => {
            setSelectedItem(null);
            if (needReload) refetch();
          }}
        />
      </Modal>
    </Flex>
  );
}
export default SignatureTable;
