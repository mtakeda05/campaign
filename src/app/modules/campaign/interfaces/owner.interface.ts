import { Customer } from "./customer.interface";

export interface Owner {
  id: string;
  name: string;
  email: string;
  customers: Customer[];
}
