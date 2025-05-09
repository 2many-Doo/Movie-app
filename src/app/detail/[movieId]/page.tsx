"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";
import { useClint } from "@/hooks/useClint";
import { Trailer } from "@/components/layouts/header/Trailer";
import { Production } from "@/components/detail/Production";
import { DetailSkelton } from "@/components/detail/DetailSkelton";
import { SimilarMovies } from "@/app/moreSee/[seeId]/MoreLikeThis";

type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  runtime: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
};

type VideoType = {
  key: string;
  site: string;
  type: string;
};

export default function MovieDetailPage() {
  const [trailerkey, setTrailerKey] = useState<string | null>(null);
  const params = useParams();
  const movieId = Number(params?.movieId);

  const { data } = useClint(`/movie/${movieId}?language=en-US`);
  const movie = data as MovieDetailType;

  if (!movieId) return <div className="p-10">Invalid movie ID</div>;

  const fetchTrailer = async (movieId: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`
    );
    const data = await response.json();
    const trailer = data.results?.find(
      (video: VideoType) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
    } else {
      alert("Trailer not available");
    }
  };

  if (!data) {
    return (
      <div>
        <DetailSkelton />;
      </div>
    );
  }

  return (
    <div className="md:px-40 px-5 py-5 ">
      <div className=" flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <span className="text-[#09090B]">
            {movie.release_date} {movie.runtime}min
          </span>
        </div>

        <div className="flex relative items-center">
          <p className="absolute -top-1 -left-3 md:-top-3 md:-left-5">
            Rating:
          </p>
          <Star className="fill-amber-400 text-amber-400" />
          {movie.vote_average.toFixed(1)}
          <p className="text-gray-500">/10</p>
        </div>
      </div>
      <div className="md:flex md:gap-8  md:py-6 relative ">
        <img
          className="hidden md:block md:h-[428px] md:w-[290px] bg-cover shrink-0 object-cover"
          src={`http://image.tmdb.org/t/p/original/${
            movie.poster_path || "hidden"
          }`}
        />
        <img
          className="w-full md:h-[428px] md:w-full bg-cover"
          src={`http://image.tmdb.org/t/p/original/${
            movie.backdrop_path || "hidden"
          }`}
        />

        <Button
          variant="outline"
          onClick={() => fetchTrailer(movie.id)}
          className=" w-[145px] md:w-36 h-10 rounded-md absolute text-white cursor-pointer border bottom-2 left-2 md:bottom-9 md:left-85 md:text-white "
        >
          <Play className="size-5 text-white " />
          Play trailer
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <img
          className="md:hidden h-[148px] mb-auto pt-8 bg-cover shrink-0 object-cover"
          src={`http://image.tmdb.org/t/p/original/${
            movie.poster_path || "hidden"
          }`}
        />
        <div className="py-8 gap-8 flex ml-5 flex-col md:gap-4 ">
          <div className="md:flex md:gap-6 flex flex-wrap items-center">
            {movie.genres.map(({ id, name }: { id: number; name: string }) => (
              <span className="rounded-2xl px-2 border " key={id}>
                {name}
              </span>
            ))}
          </div>
          <span className="w-[241px]  md:py-5 md:w-full">{movie.overview}</span>
        </div>
      </div>
      <Production />
      <div className="flex justify-between md:py-10"></div>
      <Trailer trailerKey={trailerkey} setTrailerKey={setTrailerKey} />
      <SimilarMovies movieId={movie.id} genres={movie.genres} />
    </div>
  );
}
