import { axiosInstance } from "./axiosinstance";

export const fectchMovieData = async (endPoint: string) => {
  const { data } = await axiosInstance(endPoint);
  return data;
};
