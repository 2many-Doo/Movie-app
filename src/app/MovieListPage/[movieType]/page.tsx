"use client";

import { DynamicPagination } from "@/common/DynamicPagination";
import { useClint } from "@/hooks/useClint";
import { Star } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { MovieListSkeletom } from "./MovieListSkeletom";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};
type MoviesByListCategoryProps = {
  movieType: "upcoming" | "popular" | "top_rated";
};
export const MovieListPage = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const { movieType } = useParams();
  const page = searchParam.get("page") ?? 1;

  const movieMap: Record<MoviesByListCategoryProps["movieType"], string> = {
    upcoming: "Upcoming Movies",
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
  };

  const movieTitle = movieMap[movieType as keyof typeof movieMap];

  const { data } = useClint(`/movie/${movieType}?language=en-US&page=${page}`);
  const movies = data?.results ?? [];
  const totalPage = data?.total_pages;
  if (!data) {
    return <MovieListSkeletom />;
  }

  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px] ">
      <h1 className="text-2xl font-bold mb-4 capitalize mt-10">{movieTitle}</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 md:m-10 ">
        {movies.map((movie: Movie) => (
          <div
            key={movie.id}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 hover:opacity-75 cursor-pointer"
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="object-cover"
            />
            <div className="p-4 dark:bg-[#27272A]">
              <p className="flex gap-1 items-center">
                <Star className="size-4 text-amber-300 dark:text-white fill-amber-300 dark:fill-white" />
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-[16px] font-normal text-gray-500">
                  /10
                </span>
              </p>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <DynamicPagination totalPage={Number(totalPage)} />
    </div>
  );
};
