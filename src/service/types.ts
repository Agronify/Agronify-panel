export interface User {
  id?: number;
  email: string;
  phone: string;
  password: string | null;
  name: string;
  token?: string;
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
  image?: string;
  type: string;
  is_fruit: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CropDisease {
  id?: number;
  crop_id: number;
  image?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Model {
  id?: number;
  crop_id: number;
  name: string;
  type: string;
  file?: string;
  active: boolean;
  inputWidth?: number;
  inputHeight?: number;
  classAmount?: number;
  normalize: boolean;
  threshold: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModelClass {
  id?: number;
  model_id: number;
  disease_id?: number;
  disease?: CropDisease;
  index: number;
  ripe: boolean;
}
