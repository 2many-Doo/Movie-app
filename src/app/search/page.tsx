"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useClint } from "@/hooks/useClint";
import { cn } from "@/lib/utils";
import { ChevronRight, Star, X } from "lucide-react";
import { useState } from "react";
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

const Search = () => {
  const params = useSearchParams();
  const searchValue = params.get("searchText") || "searchText";
  const router = useRouter();
  const page = Number(params.get("page") ?? 1);
  const [selectedGenresId, setSelectedGenresId] = useState<string[]>([]);

  const { data: datagenre } = useClint("/genre/movie/list?language=en");
  const genres: getType[] = datagenre?.genres ?? [];

  const { data } = useClint(
    `/search/movie?query=${encodeURIComponent(
      searchValue
    )}&language=en-US&page=${page}`
  );
  const movies: MovieData[] = data?.results ?? [];
  const totalPage = data?.total_pages ?? 0;

  const filteredMovies = movies.filter((movie: MovieData) => {
    if (selectedGenresId.length === 0) return true;
    return movie.genre_ids.some((id: number) =>
      selectedGenresId.includes(id.toString())
    );
  });

  const handleGenreSelection = (genreId: string) => {
    setSelectedGenresId((selectedids) =>
      selectedids.includes(genreId)
        ? selectedids.filter((id) => id !== genreId)
        : [...selectedids, genreId]
    );
  };

  return (
    <div className=" md:px-10">
      <p className="text-3xl font-semibold px-10">
        {filteredMovies.length} results for &#34;{searchValue}&#34;
      </p>
      <div className="md:flex gap-3 md:gap-5 md:py-10">
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 md:w-2/3 gap-4 px-10">
          {filteredMovies.slice(0, 12).map((movie: MovieData) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/detail/${movie.id}`)}
              className=" bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg"
            >
              <img
                className="rounded-t-lg cursor-pointer h-61 md:70 w-full hover:opacity-70"
                src={`http://image.tmdb.org/t/p/original/${
                  movie.poster_path || "/fallback-poster.jpg"
                }`}
                alt={movie.title || "Unknown Title"}
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
        <div className="px-7 w-100 md:w-150 md:h-1/3  md:border-l-2 md:border-gray-200 flex py-5 flex-wrap gap-4 md:pl-10">
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
                onClick={() => handleGenreSelection(genreIds)}
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
      </div>
      <div className="pt-10 ">
        <DynamicPagination totalPage={Number(totalPage) || 1} />
      </div>
    </div>
  );
};

export default Search;
