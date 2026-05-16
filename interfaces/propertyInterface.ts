export interface IProperty {
  id?: string;
  title: string;
  developer: string;
  location: string;
  price: number;
  yieldValue?: number;
  status: string;
  description: string;
  images: string[];
  currency: string;
  tag: string;
  pdfUrl: string;
  category: string;
  verified: boolean;
  interests: string[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
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