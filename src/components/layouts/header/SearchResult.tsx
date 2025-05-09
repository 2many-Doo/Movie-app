import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { X, MoveRight, Star } from "lucide-react";

interface Movie {
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
}

interface SearchResultProps {
  movies: Movie[];
  searchText: string;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearchText: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  movies,
  searchText,
  handleTextChange,
  clearSearchText,
}) => {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-black shadow-2xl relative rounded-xl p-1 flex flex-col gap-1">
      <div className="flex text-gray-500">
        <Input
          value={searchText}
          onChange={handleTextChange}
          placeholder="Movie нэрээ бичнэ үү..."
        />
        <button onClick={clearSearchText}>
          <X />
        </button>
      </div>
      {movies.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 top-10 -left-20 w-[335px] md:w-[577px] md:-left-30  absolute md:grid-cols-3 lg:grid-cols-1">
          {movies.slice(0, 3).map((movie) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/detail/${movie.id}`)}
              className="bg-white dark:bg-gray-800 flex items-center px-5 relative h-[128px] md:h-[166px]   overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[100px] h-[64px] object-cover bg-cover"
                />
              ) : (
                <div className="w-[100px] h-[64px] bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-md font-bold text-gray-900 dark:text-white truncate">
                  {movie.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center line-clamp-3">
                  <Star className="size-3.5 fill-amber-300 text-amber-300" />
                  {movie.vote_average.toFixed(1) || "Үнэлгээ хийгдээгүй"}/10
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {movie.release_date.slice(0, 4)}
                </p>
              </div>

              <div className="text-[14px] font-normal flex absolute bottom-5 md:py-2 right-5 text-gray-900 dark:text-white truncate">
                see more
                <MoveRight />
              </div>
            </div>
          ))}
          <p
            className="md:py-7 md:px-5 px-3 py-4 bg-white dark:bg-gray-800 cursor-pointer hover:scale-105 transform transition-all duration-300"
            onClick={() => router.push(`/search?searchText=${searchText}`)}
          >
            See all results for &#34;{searchText}&#34;
          </p>
        </div>
      )}
    </div>
  );
};
