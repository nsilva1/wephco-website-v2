export interface IProperty {
  id?: string;
  name: string;
  description: string;
  images: Array<string>;
  price?: number;
  country: string;
  city: string;
  address?: string;
  pdfUrl?: string;
  createdAt: Date
  updatedAt: Date
}

export interface ISellEnquiry {
  id?: string;
  address: string;
  name: string;
  email: string;
  status: boolean;
  phone: string;
  timeline: string;
  createdAt?: Date;
}

export interface IPropertyEnquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  property?: IProperty
  propertyId: string;
  createdAt?: Date;
}