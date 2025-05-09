"use client";
import { useState } from "react";
import { GenreDrop } from "./GenreDrop";
import { useRouter } from "next/navigation";
import { SearchResult } from "./SearchResult";
import { Movie } from "@/components/types/Movie";
import { axiosInstance } from "@/lib/axiosinstance";

export const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  const searchMoviesByName = async (name: string) => {
    try {
      const { data } = await axiosInstance(
        `/search/movie?searchText=${name}&language=en-US&page=1`
      );

      setMovies(data.results);
      router.push(`/search?searchText=${searchText}`);
    } catch (error) {
      console.error("Error fetching movie search by name:", error);
    }
  };

  const clearSearchText = () => {
    setSearchText("");
    setMovies([]);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchText(value);

    if (value.length > 0) {
      searchMoviesByName(value);
    }
  };

  return (
    <div className="flex items-center gap-4 flex-1 md:flex-0 z-10 ">
      <div className="hidden lg:flex gap-4">
        <GenreDrop />

        <SearchResult
          searchText={searchText}
          movies={movies}
          handleTextChange={handleTextChange}
          clearSearchText={clearSearchText}
        />
      </div>
    </div>
  );
};
