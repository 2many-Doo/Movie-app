"use client";
import { Theme } from "./Theme";
import { MovieLogo } from "@/common/MovieLogo";
import { usePathname } from "next/navigation";
import { SearchforOtherPage } from "./SearchforOtherPage";
import { SearchPage } from "./SearchPage";
export const HeaderContainer = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center md:justify-between inset- py-[11.5] gap-3 px-5 md:px-20 md:py-5 relative">
      <MovieLogo />

      {pathName === "/search" ? <SearchPage /> : <SearchforOtherPage />}

      <Theme />
    </div>
  );
};
