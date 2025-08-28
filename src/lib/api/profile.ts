import axiosInstance from '@/lib/axios/axios';

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  status?: string;
  company?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  company?: string;
  createdAt: string;
  status?: string;
  updatedAt: string;
}

export async function updateProfile(data: UpdateProfileDto): Promise<User> {
  const res = await axiosInstance.patch<User>("/user/update", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function getProfile(): Promise<User> {
  const res = await axiosInstance.get<User>(`user/details`, {
    withCredentials: true,
  });
  return res.data;
}
