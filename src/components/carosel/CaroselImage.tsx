"use client";
import { useClint } from "@/hooks/useClint";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Trailer } from "../layouts/header/Trailer";
import { CaroselSkeleton } from "./CaroselSkeleton";
import { useRouter } from "next/navigation";

type getType = {
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
};
type VideoType = {
  key: string;
  site: string;
  type: string;
};

export const CaroselImage = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data } = useClint("/movie/now_playing?language=en-US&page=1");
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const nowPlaying: getType[] = data?.results ?? [];
  const router = useRouter();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  if (nowPlaying.length === 0) {
    return <CaroselSkeleton />;
  }

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

  return (
    <div>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {nowPlaying.map((movie: getType) => (
            <CarouselItem
              key={movie.id}
              onClick={() => router.push(`/detail/${movie.id}`)}
              className="md:relative transition:transform 0.5s ease-in-out"
            >
              <img
                className="w-full  md:h-[700px] md:w-full bg-cover shrink-0"
                src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="md:h-100 md:text-white  md:absolute flex flex-col justify-between md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <h1 className="text: md:text-xl">Now Playing:</h1>
                <div className="flex md:block items-center justify-between ">
                  <h1 className="text-3xl md:text-6xl ">{movie.title}</h1>
                  <h1 className="flex gap-2  md:text-xl md:pt-4">
                    <Star className="text-amber-300 fill-amber-300" />
                    {movie.vote_average.toFixed(1)}/10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">{movie.overview}</h6>
                <Button
                  variant="outline"
                  onClick={() => fetchTrailer(movie.id)}
                  className="w-[145px] md:w-36 h-10 rounded-md cursor-pointer bg-black text-white md:bg-white  md:text-black "
                >
                  <Play />
                  watch trailer
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-150 md:bottom-100 left-0 right-0 flex justify-center gap-2">
        {nowPlaying.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
            }}
            className={`w-1 h-1 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-white scale-155 shadow-lg "
                : "bg-gray-500 opacity-60"
            }`}
          ></button>
        ))}
      </div>
      <Trailer trailerKey={trailerKey} setTrailerKey={setTrailerKey} />
    </div>
  );
};
