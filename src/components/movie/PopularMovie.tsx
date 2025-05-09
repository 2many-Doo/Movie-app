"use client";
import { useClint } from "@/hooks/useClint";
import { useRouter } from "next/navigation";
import { MovieSkeltom } from "./MovieSkeltom";
import { MoveRight, Star } from "lucide-react";
type getType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
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

type Movie = {
  movieType: "upcoming" | "popular" | "top_rated";
};

export const PopularMovie = ({ movieType }: Movie) => {
  const router = useRouter();

  const { data } = useClint(`/movie/${movieType}?language=en-US&page=1`);
  const movies: getType[] = data?.results ?? [];

  if (movies.length === 0) {
    return (
      <div>
        <MovieSkeltom />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-5 md:px-20 pb-4 md:pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl py-9 font-extrabold">
          {movieType.charAt(0).toUpperCase() + movieType.slice(1)}
        </h1>
        <h1
          className="flex cursor-pointer items-center gap-1 md:py-2 text-blue-500 hover:underline"
          onClick={() => router.push(`/MovieListPage/${movieType}`)}
        >
          See more <MoveRight />
        </h1>
      </div>
      <div className="grid grid-cols-2 grid-rows-4 gap-5 md:grid-cols-5 md:grid-rows-2 md:gap-9">
        {movies.slice(0, 10).map((movie: getType) => (
          <div
            key={movie.id}
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <img
              className="rounded-t-2xl hover:opacity-50 cursor-pointer"
              src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="bg-[#f4f4f5] dark:bg-[#09090b] px-2 py-4 rounded-b-2xl">
              <span className="flex  font-bold gap-1">
                <Star className="text-amber-300 fill-amber-300" />
                {movie.vote_average.toFixed(1)}
                <span className="font-normal">/10</span>
              </span>
              <span className="text-[19px] font-bold">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
