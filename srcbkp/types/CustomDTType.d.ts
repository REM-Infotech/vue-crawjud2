import { type Api } from "datatables.net";
import type DataTable from "datatables.net-bs5";

interface TDataTables extends Api {
  dt: Api<DataTable>;
}

export type { TDataTables };
