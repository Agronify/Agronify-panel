export interface User {
  id?: number;
  email: string;
  phone: string;
  password: string | null;
  name: string;
  is_admin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Knowledge {
  id?: number;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UploadResp {
  url: string;
  path: string;
}

export interface Crop {
  id?: number;
  name: string;
  image: string;
  description: string;
  type: string;
  is_fruit: boolean;
}
