import React from "react";

export const MovieListSkeletom = () => {
  const skelton = Array.from({ length: 20 });
  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px] ">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 md:m-10 ">
        {skelton.map((_, index) => (
          <div
            key={index}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-1 animate-pulse  bg-gray-200 dark:bg-[#3F3F46] h-[381px] md:h-[590px]"
          ></div>
        ))}
      </div>
    </div>
  );
};
