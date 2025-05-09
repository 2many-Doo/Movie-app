"use client";
import { useClint } from "@/hooks/useClint";
import { ArrowRight, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
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

export const SimilarMovies = ({
  movieId,
  genres,
}: {
  movieId: number;
  genres: { id: number; name: string }[];
}) => {
  const router = useRouter();
  const params = useParams();

  const page = params.get ?? 1;
  const { data: dataMovie } = useClint(
    `/search/movie?query=${movieId}&language=en-US&page=1${page}`
  );
  const movies: MovieData[] = dataMovie?.results ?? [];
  const totalPage = dataMovie?.total_pages;

  const { data } = useClint(`/movie/${movieId}/similar?language=en-US&page=1`);
  const similarMovies: Movie[] = data?.results ?? [];

  if (!similarMovies.length) return null;
  const firstGenreId = similarMovies?.[0]?.id;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 flex justify-between">
        More like this
        <p
          className="flex font-normal text-lg md:py-2 items-center cursor-pointer"
          onClick={() => router.push(`/moreSee/${firstGenreId}`)}
        >
          see more
          <ArrowRight />
        </p>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {similarMovies.slice(0, 5).map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t-2xl w-full h-[250px] object-cover"
            />
            <div className="bg-gray-300 pt-4 pb-6 rounded-b-2xl">
              <p className="flex ">
                <Star className="fill-amber-300 text-amber-300" />
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="mt-2 text-xl font-medium truncate">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
