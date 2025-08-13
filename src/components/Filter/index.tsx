import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { Button, Drawer, Spin, Tabs } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  title?: string;
  onReset: () => void;
  screenId: string;
  onApplyFilter: (dataFilter: any) => void;
  onSaveFilter: () => any;
  body: React.ReactNode;
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  onOk,
  title = "Bộ lọc",
  onReset,
  screenId,
  onApplyFilter,
  onSaveFilter,
  body,
}: FilterDrawerProps) => {
  const t = useTranslations();
  const savedFilterRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<string>("filterContent");

  useEffect(() => {
    if (!isOpen) {
      onReset();
    }
  }, [isOpen]);

  const handleApplyFilter = (userFilter: any) => {
    if (userFilter?.filterData) {
      const filterData = JSON.parse(userFilter.filterData);
      onApplyFilter(filterData);
    } else {
      onReset();
    }
    setActiveTab("filterContent");
  };

  const items = [
    {
      key: "filterContent",
      label: "Bộ lọc",
      children: body,
    },
  ];

  const onChange = (key: any) => {
    console.log(key);
    setActiveTab(key);
  };

  return (
    <Drawer
      title={title || ""}
      open={isOpen}
      onClose={onClose}
      closable={false}
      extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
      footer={
        activeTab === "filterContent" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: 130,
              gap: 12,
            }}
            className="ct-flex-row"
          >
            <Button style={{ width: "100%" }} onClick={onReset}>
              {t("action.resetFilter")}
            </Button>
            <Button type="primary" style={{ width: "100%" }} onClick={onOk}>
              {t("action.apply")}
            </Button>
          </div>
        ) : (
          <></>
        )
      }
    >
      {body}
    </Drawer>
  );
};
