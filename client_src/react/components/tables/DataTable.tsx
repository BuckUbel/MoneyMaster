import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export interface IRow {
  [ key: string ]: any;
}

export interface ICol {
  key: string;
  name: string;
  style?: React.CSSProperties;
}

export interface IDataTableProps {
  rowData: IRow[];
  colData: ICol[];
}

export interface IDataTableState {
  orderDesc: boolean;
  orderRow: string;
}

export default class DataTable extends React.Component<IDataTableProps, IDataTableState> {

  public state: IDataTableState = {
    orderDesc: true,
    orderRow: "1",
  };

  constructor(props: IDataTableProps) {
    super(props);
  }

  public render() {

    const {colData, rowData} = this.props;

    return (
      <React.Fragment>
        <Paper>
          <Table>
            <TableHead>
              <TableRow key={"-1"}>
                {colData.map((col, index) => {
                  return (<TableCell key={col.key} style={col.style}>{col.name}</TableCell>);
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {Object.keys(row).map((key) => {
                      return (<TableCell key={key}>{row[ key ]}</TableCell>);
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}
