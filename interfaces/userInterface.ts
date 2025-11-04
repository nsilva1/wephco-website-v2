// import { IProperty } from "./propertyInterface"

export enum Role {
    AFFILIATE = "AFFILIATE",
    ADMIN = "ADMIN",
    SUPPORT = "SUPPORT",
    SUPERADMIN = "SUPERADMIN",
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
}

export interface IContactUs {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: boolean;
    message: string;
    createdAt?: Date;
}

export interface IConsultation {
    id?: string;
    service: string;
    meetingDate: Date;
    meetingLocation: string;
    phoneNumber: string;
    email: string;
    organizationName: string;
    name: string;
    details: string;
    preferredModeOfContact: string;
    status: boolean;
    createdAt?: Date;
}

export interface IAffiliate {
  id?: string;
  name: string;
  email: string;
  location: string;
  createdAt?: Date;
}