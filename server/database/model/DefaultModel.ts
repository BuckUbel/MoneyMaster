import { Requireable } from "prop-types";

type Diff<T extends keyof any, U extends keyof any> =
  ({ [P in T]: P } & { [P in U]: never } & {[ x: string ]: never})[T];
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export interface IDefaultModel {
  tableName: string;
  // fields: Array<IDBCol<any>>;
}

export interface IDBCol<T> {
  fieldName: string;
  value: T;
  type: Requireable<T> | DateConstructor;
}
