import { useState } from "react";

// components
import { DeleteOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Pagination as APagination, Button, Drawer, Flex, List } from "antd";
import { get } from "lodash";
import { useTranslations } from "next-intl";

// selection={{
//   selectedRows,
//   onChange: setSelectedRows,
//   key: 'id',
//   title: 'details.issueName',
//   description: (item) =>
//     dayjs(item.createdDate).format('DD/MM/YYYY HH:mm'),
// }}

interface SelectionProps {
  selectedRows: any[];
  onChange: (rows: any[]) => void;
  key: string;
  title?: string | ((item: any) => string);
  description?: string | ((item: any) => string | null);
  onClick?: () => void;
  parentKey: string;
}

export interface PaginationProps {
  className?: string;
  selection?: SelectionProps;
  [key: string]: any;
}

export const Pagination = ({
  className = "",
  selection,
  ...rest
}: PaginationProps) => {
  const t = useTranslations();
  const [openSelection, setOpenSelection] = useState(false);
  const showTotal = (total: number, range: any) =>
    t("data.infoText", { 0: range[0], 1: range[1], 2: total });
  const defaultProps = {
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: [20, 50, 100],
    showTotal,
    responsive: true,
    showLessItems: true,
    // hideOnSinglePage: true,
  };
  const mergeProps = { ...defaultProps, ...rest };
  const onClearSelection = () => {
    if (selection?.onChange) {
      selection?.onChange([]);
    }
  };
  const onDeleteItem = (item: any) => {
    if (selection?.onChange) {
      const newSelectedRows = selection?.selectedRows.filter(
        (d) => get(d, selection?.key) !== get(item, selection?.key)
      );
      selection?.onChange(newSelectedRows);
    }
  };
  const renderSelectedItem = (item: any) => {
    const title =
      typeof selection?.title == "function"
        ? selection?.title(item)
        : get(item, selection?.title || "name", "");
    const description =
      typeof selection?.description == "function"
        ? selection?.description(item)
        : get(item, selection?.description || "description", null);
    return (
      <List.Item
        // style={{ paddingLeft: item?.[selection?.parentKey] ? "32px" : "0px" }}
        actions={[
          <Button
            icon={<DeleteOutlined />}
            type="text"
            onClick={() => onDeleteItem(item)}
          />,
        ]}
      >
        <List.Item.Meta
          avatar={
            item?.[selection?.parentKey!] ? null : (
              <FolderOpenOutlined style={{ fontSize: "20px" }} />
            )
          }
          title={title}
          description={description}
        />
      </List.Item>
    );
  };
  return (
    <Flex
      align="center"
      justify="center"
      style={{ padding: "8px 0", justifyContent: "space-between" }}
      className={className}
    >
      <div>
        {selection?.selectedRows?.length! > 0 && (
          <>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              onClick={onClearSelection}
              title="Bỏ chọn"
            />
            <Button
              type="text"
              onClick={() => {
                if (selection?.onClick) {
                  selection?.onClick();
                } else setOpenSelection(true);
              }}
            >
              <span
                // css={`
                //   color: ${(props: any) => props.theme.colorPrimary};
                //   text-decoration: underline;
                // `}
              >
                {t("data.selected", { 0: selection?.selectedRows?.length })}
              </span>
            </Button>
            <Drawer
              // css={`
              //   .ant-drawer-header .ant-drawer-header-title {
              //     flex-direction: row-reverse;
              //   }
              // `}
              width={500}
              open={openSelection}
              onClose={() => setOpenSelection(false)}
              title={t("data.selected", { 0: selection?.selectedRows?.length })}
            >
              <div style={{ height: "100%" }}>
                <List
                  dataSource={selection?.selectedRows}
                  renderItem={renderSelectedItem}
                ></List>
              </div>
            </Drawer>
          </>
        )}
      </div>
      <APagination {...mergeProps} />
    </Flex>
  );
};
