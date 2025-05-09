import { CaroselImage } from "./carosel/CaroselImage";
import { PopularMovie } from "./movie/PopularMovie";

export const MainContainer = () => {
  return (
    <div>
      <CaroselImage />
      <PopularMovie movieType="upcoming" />
      <PopularMovie movieType="popular" />
      <PopularMovie movieType="top_rated" />
    </div>
  );
};
