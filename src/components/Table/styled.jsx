import styled from 'styled-components';
import { Table } from 'antd';
export const CustomGridData = styled(Table)`
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  tbody tr td {
    vertical-align: middle !important;
  }
  tbody
    tr
    td:first-child:not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ) {
    padding-left: 20px !important;
  }
  thead
    tr
    th:first-child:not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ) {
    padding-left: 20px !important;
  }
  tbody tr td:first-child.ant-table-selection-column {
    padding-left: 12px !important;
  }
  thead tr th:first-child.ant-table-selection-column {
    padding-left: 12px !important;
  }
  .ant-table-cell-fix-right.ant-table-cell-fix-right-first {
    right: 0 !important;
  }
  && .ant-table {
    scrollbar-color: unset !important;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background: transparent;
  }
  :hover::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colorPrimaryHover};
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colorPrimary};
  }
  && .ant-table-body {
    overflow: overlay !important;
  }
  &&.ant-table-wrapper .ant-table-pagination.ant-pagination {
    margin: 0;
    padding: 8px 0;
  }
  &&,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container,
  .ant-table-header {
    border-top-left-radius: ${(props) => props.theme.borderRadius}px;
    border-top-right-radius: ${(props) => props.theme.borderRadius}px;
  }
  && .ant-table-header > table {
    border-top-left-radius: ${(props) => props.theme.borderRadius}px;
    border-top-right-radius: ${(props) => props.theme.borderRadius}px;
    > thead {
      border-top-left-radius: ${(props) => props.theme.borderRadius}px;
      border-top-right-radius: ${(props) => props.theme.borderRadius}px;
      > tr {
        border-top-left-radius: ${(props) => props.theme.borderRadius}px;
        border-top-right-radius: ${(props) => props.theme.borderRadius}px;
        th:first-child {
          border-top-left-radius: ${(props) => props.theme.borderRadius}px;
        }
        th:last-child {
          border-top-right-radius: ${(props) => props.theme.borderRadius}px;
        }
      }
    }
  }

  .ant-table-cell.ant-table-row-expand-icon-cell {
    z-index: 1;
  }

  .ant-table-wrapper
    .ant-table-tbody
    .ant-table-row.ant-table-row-selected
    > .ant-table-cell {
    background: #e5ebec;
  }
`;
export const Item = styled.div`
  // background-color: ${(props) => props.theme.colorBorderSecondary};
  border-radius: 10px;
  padding: 2px 8px;
  display: flex;
  justify-content: space-between;
  min-width: 180px;
  align-items: center;
`;
export const LinkName = styled.div`
  // width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 25px;
  -webkit-box-orient: vertical;
`;
export const LinkNumber = styled.div`
  background: rgba(60, 60, 67, 0.1);
  border-radius: 18px;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;
export const RowNumber = styled.div`
  display: flex;
`;
