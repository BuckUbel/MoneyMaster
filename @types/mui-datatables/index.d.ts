declare module "mui-datatables" {

  import { ReactNode } from "react";

  export interface IMUIDataTableColumn {
    name: string;
    options?: IMUIDataTableColumnOptions;
  }

  export interface IMUIDataTableColumnOptions {
    display?: "true" | "false" | "excluded";
    filter?: boolean;
    sort?: boolean;
    download?: boolean;
    customHeadRender?: (value, tableMeta, updateValue) => string;
    customBodyRender?: (value, tableMeta, updateValue) => string | ReactNode;
  }

  export interface IMUIDataTableOptions {
    page?: number;
    count?: number;
    serverSide?: boolean;
    filterList?: any[];
    rowsSelected?: any[];
    filterType?: string;
    textLabels?: object;
    pagination?: boolean;
    selectableRows?: boolean;
    resizableColumns?: boolean;
    customToolbar?: () => ReactNode;
    customToolbarSelect?: () => ReactNode;
    customFooter?: () => ReactNode;
    caseSensitive?: boolean;
    responsive?: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    rowHover?: boolean;
    sortFilterList?: boolean;
    sort?: boolean;
    filter?: boolean;
    search?: boolean;
    print?: boolean;
    download?: boolean;
    downloadOptions?: {filename: string, separator: string};
    viewColumns?: boolean;
    onRowsSelect?: (currentRowsSelected: any[], rowsSelected: any[]) => void;
    onRowsDelete?: (rowsDeleted: any[]) => void;
    onRowClick?: (rowData: string[], rowMeta: {dataIndex: number, rowIndex: number}) => void;
    onCellClick?: (colIndex: number, rowIndex: number) => void;
    onChangePage?: (currentPage: number) => void;
    onChangeRowsPerPage?: (numberOfRows: number) => void;
    onSearchChange?: (searchText: string) => void;
    onFilterChange?: (changedColumn: string, filterList: any[]) => void;
    onColumnSortChange?: (changedColumn: string, direction: string) => void;
    onColumnViewChange?: (changedColumn: string, action: string) => void;
    onServerRequest?: (action: string, tableState: IMUIDataTablesTableState) => void;
  }

  export interface IMUIDataTablesTableState {
    page: number;
    rowsPerPage: number;
    filterList: any[];
  }

  export type MUIDataTableColumnDef = string | IMUIDataTableColumn;

  export interface IMUIDataTableProps {
    title: string;
    columns: MUIDataTableColumnDef[];
    data: any[];
    options?: IMUIDataTableOptions;
  }

  export const MUIDataTable: React.ComponentType<IMUIDataTableProps>;

  export default MUIDataTable;
}
