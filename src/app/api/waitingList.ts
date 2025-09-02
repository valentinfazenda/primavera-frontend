import axiosInstance from "@/lib/axios/instance";

export async function joinWaitingList(email: string) {
  const { data } = await axiosInstance.post("/waitingList/join", { email });
  return data;
}
