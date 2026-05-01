export interface IProperty {
  id?: string;
  title: string;
  developer: string;
  location: string;
  yieldValue: number;
  status: string;
  description: string;
  image: string;
  price: number;
  pdfUrl: string;
  createdAt: Date
  updatedAt: Date
  currency: string;
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