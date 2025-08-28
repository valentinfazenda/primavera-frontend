import axiosInstance from "@/lib/axios/axios";

export async function joinWaitingList(email: string) {
  const { data } = await axiosInstance.post("/waitingList/join", { email });
  return data;
}
