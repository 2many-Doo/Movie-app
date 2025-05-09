import { MovieLogo } from "@/common/MovieLogo";
import { Linkfooter } from "./Linkfooter";
import { Information } from "./Information";

export const FooteerContainer = () => {
  return (
    <div className="flex bg-[#4238ca] text-white  py-10 px-5 md:justify-between flex-grow md:px-20 md:gap-20 ">
      <div className="md:flex md:justify-between md:w-full">
        <div className="">
          <MovieLogo />
          <p className="mt-5">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div>
          <Information />
        </div>
      </div>
      <div>
        <Linkfooter />
      </div>
    </div>
  );
};
