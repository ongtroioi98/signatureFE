import { DatePicker, Form, Select } from "antd";

import dayjs from "dayjs";
import { useEffect } from "react";
import { FilterDrawer } from "@/components/Filter";
import { statusMap } from ".";

export interface FilterProps {
  data: any;
  open: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function Filter({ data, open, onSubmit, onClose }: FilterProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(data);
    }
  }, [open]);

  const onApplyFilter = (filterData: any) => {
   debugger;
  };

  return (
    <FilterDrawer
      onSaveFilter={() => {}}
      isOpen={open}
      title="Filter"
      onOk={() => {
        form.submit();
      }}
      onReset={() => {
        form.setFieldsValue({
          time: null,
          status: null,
        });
      }}
      onClose={onClose}
      screenId="signature"
      onApplyFilter={onApplyFilter}
      body={
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          initialValues={data}
        >
          <Form.Item name="status" label="Status">
            <Select
              allowClear
              size="large"
              variant="filled"
              options={Object.entries(statusMap).map(([key, value]) => {
                return { ...value, value: key };
              })}
              placeholder="Select status"
            />
          </Form.Item>
          <Form.Item label="Start date" name="time">
            <DatePicker.RangePicker
              allowClear
              variant="filled"
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      }
    />
  );
}

export interface WarehouseTreeUserFilterData {
  time?: string;
  application?: string;
  status?: string;
}
