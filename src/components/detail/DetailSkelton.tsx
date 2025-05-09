import React from "react";

export const DetailSkelton = () => {
  return (
    <div className="animate-pulse flex flex-col  px-5 md:px-20 w-full py-8  bg-white dark:bg-black gap-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[300px] h-[200px] md:h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-full hidden h-[200px] md:block md:h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-16 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-20 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-12 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full h-20 md:h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-3/4 h-6 md:h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-1/2 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-1/3 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-1/4 h-5 md:h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
