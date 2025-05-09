import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TrailerProps = {
  trailerKey: string | null;
  setTrailerKey: Dispatch<SetStateAction<string | null>>;
};

export const Trailer = ({ trailerKey, setTrailerKey }: TrailerProps) => {
  return (
    <div>
      {trailerKey && (
        <div className="fixed inset-0 bg-opacity-75 bg-black md:bg-transparent flex items-center justify-center z-50">
          <div className="relative w-full  md:max-w-4xl">
            <iframe
              className="w-full h-[211px] md:h-[500px] -top-50 md:-top-100 absolute"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 text-white rounded-full p-2"
              onClick={() => setTrailerKey(null)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
