import { IProperty } from "./propertyInterface"

export enum Role {
    AGENT = "AGENT",
    ADMIN = "ADMIN",
    SUPPORT = "SUPPORT",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IUser {
    id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  properties?: IProperty[]
}