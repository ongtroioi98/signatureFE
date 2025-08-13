/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSize } from "ahooks";
import {
  Table as AntdTable,
  TableProps,
  Button,
  Checkbox,
  Popover,
  Tag,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { findIndex, forEach, get, map, uniq } from "lodash";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { getScrollHeightByClassName, typeOf } from "@/utils";
import { Box } from "@/components/Box/index";
import {
  CustomGridData,
  Item,
  LinkName,
  LinkNumber,
  RowNumber,
} from "./styled";
import Link from "next/link";

const convertAlignToJustify = {
  left: "flex-start",
  right: "flex-end",
  center: "center",
};

/**
 *
 * @param {height} height : if pass height value as 'fix-scroll',
 *  the height of table is caulate base on document height minus height of scrol items like header, footer
 *  to make table sticky header and not make body overflow scroll
 * @returns
 */
const dataTypeRender = ({
  render,
  dataType = "string",
  format,
  dataIndex,
  buttons,
  to,
  linkProps = {},
  popoverProps = { trigger: "hover" },
  align,
  arrayProps = {},
  invisibleVisibilityOnly,
}) => {
  if (render) return render;
  else {
    switch (dataType) {
      case "array":
        var { displayExpr = "name" } = arrayProps;
        return (_, record) => {
          const arr = get(record, dataIndex, []) || [];
          if (arr?.length <= 0) return null;
          else {
            let val = arr.map((d) => {
              const label =
                typeof displayExpr == "function"
                  ? displayExpr(d)
                  : get(d, displayExpr);
              return label;
            });
            val = uniq(val);
            const first = val.shift();
            if (val?.length > 0) {
              const content = val.map((d, i) => <p key={i}>{d}</p>);
              return (
                <>
                  {first}{" "}
                  <Popover content={content} placement="bottom">
                    <Tag>+{val.length}</Tag>
                  </Popover>
                </>
              );
            } else return first;
          }
        };
      case "link":
        return (text, record) => {
          const propsValue =
            typeof linkProps == "function" ? linkProps(record) : linkProps;
          const { to: goTo, onClick, ...rest } = propsValue;

          return (
            <Link
              to={to?.(record) || goTo || null}
              css={`
                color: ${(props) => props.theme.colorPrimary};
              `}
              onClick={(e) => {
                if (onClick) {
                  e.preventDefault();
                  onClick();
                }
              }}
              {...rest}
            >
              {propsValue?.children || text}
            </Link>
          );
        };
      case "date":
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || "DD/MM/YYYY");
        };
      case "datetime":
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || "HH:mm DD/MM/YYYY");
        };
      case "time":
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || "HH:mm");
        };
      case "number":
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && new Intl.NumberFormat("vi-VN", format).format(value);
        };
      case "boolean":
        return (_, record) => {
          const value = get(record, dataIndex);
          return <Checkbox checked={value} />;
        };
      case "object":
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && JSON.stringify(value);
        };
      case "buttons":
        return (text, record) => (
          <Box
            display="flex"
            gap="2px"
            $items="center"
            $justify={convertAlignToJustify[align]}
          >
            {React.Children.toArray(
              buttons.map((item, index) => {
                const { onClick, element, ...rest } = item;
                if (element)
                  return React.cloneElement(element, { record, ...rest });
                const btProp = {
                  ...{ type: "text", shape: "circle" },
                  ...rest,
                };
                forEach(Object.keys(rest), (r) => {
                  if (typeof rest[r] === "function")
                    btProp[r] = rest[r]({ text, record, index });
                });
                const { title = "", visible = true, icon, ...props } = btProp;

                if (visible || invisibleVisibilityOnly) {
                  return (
                    <Tooltip title={title}>
                      <Button
                        style={{
                          visibility: !visible ? "hidden" : "visible",
                        }}
                        icon={
                          icon
                            ? React.cloneElement(icon, { record, ...rest })
                            : null
                        }
                        {...props}
                        onClick={(event) =>
                          onClick?.({ event, text, record, index })
                        }
                      />
                    </Tooltip>
                  );
                }
                return null;
              })
            )}
          </Box>
        );
      case "popovers":
        var {
          onItemClick,
          keyExpr = "id",
          displayExpr = "name",
          ...props
        } = popoverProps;
        return (text, record) => {
          const array = text || record[dataIndex] || [];
          if (array.length)
            return (
              <RowNumber>
                <LinkName>
                  {array.length && (
                    <Tooltip
                      title={`${array[0][displayExpr]}`}
                    >{`${array[0][displayExpr]}`}</Tooltip>
                  )}
                </LinkName>
                <Popover
                  content={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {map(array, (item) => (
                        <Item key={item[keyExpr]}>
                          <Link
                            to={item?.url}
                            onClick={() => onItemClick(item)}
                          >
                            {item[displayExpr]}
                          </Link>
                        </Item>
                      ))}
                    </div>
                  }
                  {...props}
                >
                  {popoverProps?.children || (
                    <>
                      {array?.length > 1 && (
                        <LinkNumber>{`+${array?.length - 1}`}</LinkNumber>
                      )}
                    </>
                  )}
                </Popover>
              </RowNumber>
            );
          return null;
        };
      case "string":
      default:
        return null;
    }
  }
};

const getSortValue = ({ order, field }) => {
  switch (order) {
    case "descend":
      return `-${field}`;
    case "ascend":
      return `+${field}`;
    default:
      return undefined;
  }
};
export const createPagingConfig = (
  t: (key: string, values?: Record<string, any>) => string
) => ({
  position: ["bottomRight"],
  size: "default",
  showSizeChanger: true,
  defaultPageSize: 20,
  pageSizeOptions: [20, 50, 100],
  showTotal: (total: number, range: [number, number]) =>
    t("data.infoText", { 0: range[0], 1: range[1], 2: total }),
  responsive: true,
});
const defaultProps = {
  width: "100%",
  columnWidth: "auto",
  // bordered: true,
  size: "small",
};

export interface TableColumn {
  dataType?:
    | "array"
    | "link"
    | "date"
    | "datetime"
    | "time"
    | "number"
    | "boolean"
    | "object"
    | "buttons"
    | "popovers"
    | "string";
  arrayProps?: { displayExpr: string };
}

export type TableColumnType<RecordType = any> = TableColumn &
  TableProps<RecordType>["columns"];

export interface ITableProps<RecordType = any> {
  invisibleVisibilityOnly?: boolean;
  insideTab?: boolean;
  height?: string;
  columns?: TableColumnType<RecordType>[];
  actions?: TableColumnType<RecordType>;
  pageIndex?: number;
  pageSize?: number;
  onChange?: (params: {
    pagination: any;
    filters: any;
    sorter: any;
    extra: any;
    sort: string | undefined;
  }) => void;
  showIndexCol?: { number: boolean };
  offsetBottom?: number;
  customClassName?: string;
  pagination?: boolean | any;
  indexColProps?: any;
}

export const Table = forwardRef((props: any, ref) => {
  const {
    invisibleVisibilityOnly,
    insideTab = false,
    height = "100vh",
    columns = [],
    actions,
    pageIndex,
    pageSize,
    onChange,
    showIndexCol = { number: false },
    offsetBottom = 16,
    customClassName = "",
    pagination = false,
    firstColumn,
    indexColProps = {},
    ...rest
  } = props;
  const t = useTranslations();
  const [paging, setPaging] = useState({ pageIndex, pageSize });
  const size = useSize(document.querySelector("body"));
  const scroll = useMemo(() => {
    // debounce(() => {
    let tableHeight = "auto";
    const h = getScrollHeightByClassName([
      "scroll-caculate-item",
      insideTab && "ant-tabs-nav",
    ]);
    const tableHeaderElement = document.querySelector(`.ant-table-thead`);
    const tableHeaderHeight = tableHeaderElement?.clientHeight || 0;
    const subHeight =
      h + offsetBottom + (pagination ? 52 : 0) + tableHeaderHeight;

    if (subHeight > 0) {
      tableHeight = `calc(${height} - ${subHeight}px)`;
    }
    return { y: size?.height > 600 ? tableHeight : "auto" };
    // }, 300);
  }, [size, height, insideTab, pagination, offsetBottom]);
  useEffect(() => {
    if (pageIndex && pageSize) setPaging({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);
  const indexRender = useCallback(
    (item, record, index) => {
      if (record?.isChildren) {
        return index + 1;
      }
      const numberSTT =
        ((paging?.pageIndex || 1) - 1) * (paging?.pageSize || 20) + index + 1;
      return showIndexCol?.number ? numberSTT : numberSTT.toLocaleString();
    },
    [paging, showIndexCol]
  );

  const indexCol = {
    title: t("order"),
    width: 80,
    sorter: false,
    align: "left",
    key: "index",
    dataIndex: "index",
    render: indexRender,
    ...indexColProps,
  };

  const cols = useMemo(() => {
    let indexOption = findIndex(columns, { type: "option" });
    if (indexOption < 0) indexOption = columns.length;
    let d = columns?.filter(
      (i, index) => i && i?.type !== "option" && index < indexOption
    );

    if (showIndexCol) d = [indexCol, ...d];
    if (firstColumn) d = [firstColumn, ...d];
    if (actions) d = [...d, actions];
    return d.map((props) => {
      if (typeof props === "string") return AntdTable[props];
      return {
        ...props,
        render: dataTypeRender({
          ...props,
          invisibleVisibilityOnly: invisibleVisibilityOnly,
        }),
      };
    });
  }, [columns, showIndexCol, indexRender, actions]);

  if (customClassName) defaultProps.className = customClassName;
  const mergeProps = { ...defaultProps, ...rest };
  const onTableChange = (pagination, filters, sorter, extra) => {
    if (extra?.action == "paginate") {
      setPaging({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
    const sort = getSortValue(sorter);
    onChange?.({ pagination, filters, sorter, extra, sort });
  };
  const defaultPaging = createPagingConfig(t);
  return (
    <CustomGridData
      ref={ref}
      onChange={onTableChange}
      columns={cols}
      scroll={rest.scroll ? rest.scroll : scroll}
      {...mergeProps}
      pagination={pagination && { ...defaultPaging, ...(pagination || {}) }}
    ></CustomGridData>
  );
});
Table.SELECTION_ALL = AntdTable.SELECTION_ALL;
Table.SELECTION_INVERT = AntdTable.SELECTION_INVERT;
Table.SELECTION_NONE = AntdTable.SELECTION_NONE;
Table.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;
Table.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;
