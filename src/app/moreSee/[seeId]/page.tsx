"use client";

import { Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DynamicPagination } from "@/common/DynamicPagination";
import { useClint } from "@/hooks/useClint";

type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  runtime: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genres: { id: number; name: string }[];
};
const MoreSee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const movieId = Number(searchParams.get("movieId") ?? 1);

  const { data: sameMoviesData } = useClint(
    `/movie/${movieId}/similar?language=en-US&page=${page}`
  );

  const sameMovies: MovieDetailType[] = sameMoviesData?.results ?? [];
  const totalPage = sameMoviesData?.total_pages;
  console.log(totalPage, "asljb");

  return (
    <div className="flex flex-col gap-5 px-5 md:px-35 pt-10">
      <div className="flex justify-between mt-10">
        <p className="font-semibold text-2xl">More like this</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-5 gap-5 md:grid-cols-5 md:grid-rows-2 md:gap-9 ">
        {sameMovies.slice(0, 10).map((movie: MovieDetailType) => (
          <div
            key={movie.id}
            onClick={() => router.push(`/detail/${movie.id}`)}
            className=" bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg"
          >
            <img
              className="rounded-t-lg cursor-pointer h-80  md:h-100 w-full hover:opacity-70 "
              src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <div className="  py-4 pl-3 ">
              <div className="flex ">
                <Star className="text-[#FDE047] fill-[#FDE047] dark:text-[#F4F4F5] dark:fill-[#F4F4F5]" />
                <span className="font-semibold">
                  {movie.vote_average.toFixed(1)}
                  <span className="font-normal text-gray-400">/10</span>
                </span>
              </div>
              <p className="text-[18px] font-normal">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>

      <DynamicPagination totalPage={Number(totalPage)} />
    </div>
  );
};

export default MoreSee;
