import { fectchMovieData } from "@/lib/fetch-movie-data";
import useSWR from "swr";

export const useClint = (endPoint: string) => {
  const { data } = useSWR(endPoint, fectchMovieData);
  return { data };
};
