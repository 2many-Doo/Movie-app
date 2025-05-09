"use client";
import { useState } from "react";
import { GenreDrop } from "./GenreDrop";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SearchResult } from "./SearchResult";
import { Button } from "@/components/ui/button";
import { Movie } from "@/components/types/Movie";
import { SearchForGenre } from "./SearchForGenre";
import { axiosInstance } from "@/lib/axiosinstance";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBarAnimationVariants } from "@/constants/search-bar-animation";

export const SearchforOtherPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const pathName = usePathname();

  const searchMoviesByName = async (name: string) => {
    try {
      const { data } = await axiosInstance<{ results: Movie[] }>(
        `/search/movie?query=${name}&language=en-US&page=1`
      );
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movie search by name:", error);
      setMovies([]);
    }
  };

  const searchButtonClick = () => {
    setShowSearch(!showSearch);
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
        {pathName === "/genre" ? <GenreDrop /> : <SearchForGenre />}

        <SearchResult
          searchText={searchText}
          movies={movies}
          handleTextChange={handleTextChange}
          clearSearchText={clearSearchText}
        />
      </div>

      <Button className="flex md:hidden ml-auto" onClick={searchButtonClick}>
        <Search />
      </Button>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            variants={SearchBarAnimationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex md:hidden  absolute  px-5 py-[7.5px] justify-between inset-x-0 bg-white dark:bg-black"
          >
            {pathName === "/genre" ? <GenreDrop /> : <SearchForGenre />}

            <SearchResult
              searchText={searchText}
              movies={movies}
              handleTextChange={handleTextChange}
              clearSearchText={clearSearchText}
            />
            <Button
              className="bg-white dark:bg-black"
              onClick={searchButtonClick}
            >
              <X className="flex items-center" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
