"use client";

import { useClint } from "@/hooks/useClint";
import { ChevronRight, Star, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import { cn } from "@/lib/utils";
import { GenrePageSkeleton } from "./GenrePageSkeleton";
import { DynamicPagination } from "@/common/DynamicPagination";

type getType = {
  id: number;
  name: string;
};
type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type genreName = {
  name: string;
};

export const GenrePage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { selectedGenresId, generateQuery } = useURLSearchParams();
  const page = params.get("page") ?? 1;
  const handleSelectedGenre = (genreId: string) => {
    const newPath = generateQuery(genreId);
    router.push(newPath);
  };

  const { data } = useClint("/genre/movie/list?language=en");
  const genres: getType[] = data?.genres ?? [];

  const { data: dataMovie } = useClint(
    `/discover/movie?language=en&with_genres=${selectedGenresId.join(
      ","
    )}&page=1${page}`
  );
  const movie: MovieData[] = dataMovie?.results ?? [];
  const totalResults = dataMovie?.total_results;
  const totalPage = dataMovie?.total_pages;
  if (!data || !dataMovie) {
    return (
      <div>
        <GenrePageSkeleton />
      </div>
    );
  }

  if (movie.length === 0) {
    return (
      <div className="px-20 text-2xl">
        No movies found for the selected genres.
        <GenrePageSkeleton />
      </div>
    );
  }

  return (
    <div className=" md:flex  gap-3 md:gap-5 md:py-10">
      <div className="px-7 w-100 md:w-150 md:h-1/3  md:border-r-2 md:border-gray-200 flex flex-wrap gap-4 md:pl-20">
        <h1 className="text-3xl font-semibold w-full">Genre</h1>
        <p className="w-full">See lists of movies by genre</p>
        {genres.map(({ name, id }) => {
          const genreIds = id.toString();
          const isSelected = selectedGenresId.includes(genreIds);
          return (
            <div
              className={cn(
                "flex items-center font-semibold text-[12px] gap-0.5 py-0.5 pr-1 pl-2 border rounded-full cursor-pointer border-[#E4E4E7]",
                isSelected &&
                  "bg-black text-white dark:bg-white dark:text-black"
              )}
              onClick={() => handleSelectedGenre(genreIds)}
              key={id}
            >
              {name}
              {isSelected ? (
                <X size={16} className="ml-2" />
              ) : (
                <ChevronRight size={16} className="ml-2" />
              )}
            </div>
          );
        })}
      </div>
      <div className="md:w-2/3">
        <p className="text-3xl px-5 py-3 font-semibold md:px-10 md:py-5">
          {totalResults} titles in &#34;
          {genres
            .filter((genre) => selectedGenresId.includes(genre.id.toString()))
            .map((genre) => genre.name)
            .join(", ") || "Unknown Genre"}
          &#34;
        </p>
        <div className="grid grid-cols-2 grid-rows-6 gap-5 md:grid-cols-4 md:grid-rows-3 md:w-full  md:gap-12 px-4 py-8 md:py-0 md:px-10 ">
          {movie.map((movie: MovieData) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/detail/${movie.id}`)}
              className=" bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg"
            >
              <img
                className="rounded-t-lg cursor-pointer h-61 md:70 w-full hover:opacity-70 "
                src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
              <div className="py-4 pl-3">
                <div className="flex">
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
        <div className="pt-10 ">
          <DynamicPagination totalPage={Number(totalPage)} />
        </div>
      </div>
    </div>
  );
};
