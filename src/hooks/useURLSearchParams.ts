"use client";
import { useSearchParams } from "next/navigation";

export const useURLSearchParams = () => {
  const searchParams = useSearchParams();

  const selectedGenresId =
    searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [];

  const generateQuery = (genreId: string) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    let updatedParams: string[];

    if (selectedGenresId.includes(genreId)) {
      updatedParams = selectedGenresId.filter((id) => id !== genreId);
    } else {
      updatedParams = [...selectedGenresId, genreId];
    }

    if (updatedParams.length > 0) {
      currentParams.set("genreIds", updatedParams.join(","));
    } else {
      currentParams.delete("genreIds");
    }

    return `?${currentParams.toString()}`;
  };

  return { selectedGenresId, generateQuery };
};
