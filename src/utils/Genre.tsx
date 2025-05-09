import { axiosInstance } from "@/lib/axiosinstance";

type GetType = {
  id: number;
  name: string;
};

export const getGenre = async () => {
  const { data } = await axiosInstance("/genre/movie/list?language=en");
  return data.genres as GetType[];
};
