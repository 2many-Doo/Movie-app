"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
};

type CrewMember = {
  job: string;
  name: string;
};

type CastMember = {
  name: string;
  character: string;
};
export const Production = () => {
  const params = useParams();
  const movieId = params?.movieId;

  const [writers, setWriters] = useState<string[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [actors, setActors] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data: movieData } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_KEY}`
        );
        setMovie(movieData);

        const { data: creditsData } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`
        );

        const directorData = creditsData.crew.find(
          (crewMember: CrewMember) => crewMember.job === "Director"
        );
        setDirector(directorData?.name || "Unknown");

        const writerData = creditsData.crew.filter((crewMember: CrewMember) =>
          ["Writer", "Screenplay", "Story"].includes(crewMember.job)
        );
        setWriters(writerData.map((writer: CrewMember) => writer.name));

        const actorData = creditsData.cast.slice(0, 3);
        setActors(actorData);
      } catch (err) {
        console.error("Error fetching movie details or credits:", err);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);
  return (
    <div className="">
      {movie && (
        <div className="flex flex-col gap-8 ">
          <div className="flex ">
            <p className="font-bold"> Director: </p>
            <p className="pl-10">{director}</p>
          </div>
          <div className="w-full h-[1px] bg-black dark:bg-white"></div>
          <div className="flex ">
            <p className="font-bold">Writers: </p>
            <p className="pl-10">{writers.join(", ")}</p>
          </div>
          <div className="w-full h-[1px] bg-black dark:bg-white"></div>
          <div className="flex ">
            <p className="font-bold">Actors: </p>
            <p className="pl-10">
              {actors.map((actor) => actor.name).join(", ")}
            </p>
          </div>
          <div className="w-full h-[1px] bg-black dark:bg-white"></div>
        </div>
      )}
    </div>
  );
};
