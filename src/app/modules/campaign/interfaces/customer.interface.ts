import { Status } from "../enums/status.enum";

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: Status;
  emails: number;
}
