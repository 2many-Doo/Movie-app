"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useClint } from "@/hooks/useClint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";

type getType = {
  id: number;
  name: string;
};

export const GenreDrop = () => {
  const { push } = useRouter();
  const { selectedGenresId, generateQuery } = useURLSearchParams();
  const { data: genreData } = useClint("/genre/movie/list?language=en");
  const genres: getType[] = genreData?.genres ?? [];

  const handleSelectedGenre = (genreId: string) => {
    const newPath = `/genre${generateQuery(genreId)}`;
    push(newPath);
  };

  return (
    <div className="md:px-3 md:py-2 items-center rounded-xl px-2 py-1 flex gap-2 dark:bg-black shadow-md relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <ChevronDown />
          <span className="hidden md:block">Genres</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[235px] md:w-[577px] shadow-xl flex bg-white dark:bg-black flex-wrap rounded-xl p-5 gap-4 absolute z-50 left-10 top-7 md:-left-12 md:top-10">
          <DropdownMenuLabel className="w-full flex text-3xl">
            Genres
          </DropdownMenuLabel>
          <DropdownMenuLabel className="w-full flex text-[12px]">
            See lists of movies by genre
          </DropdownMenuLabel>
          <div className="w-full h-[1px] bg-black dark:bg-white"></div>
          {genres.map(({ name, id }) => {
            const genreId = id.toString();
            const isSelected = selectedGenresId.includes(genreId);

            return (
              <Badge
                className={cn(
                  "font-semibold text-[12px] gap-0.5 py-0.5 pr-1 pl-2 border rounded-full cursor-pointer border-[#E4E4E7]",
                  isSelected &&
                    "bg-black text-white dark:bg-white dark:text-black"
                )}
                onClick={() => handleSelectedGenre(genreId)}
                key={id}
              >
                {name}
                {isSelected ? (
                  <X size={16} className="ml-2" />
                ) : (
                  <ChevronRight size={16} className="ml-2" />
                )}
              </Badge>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
