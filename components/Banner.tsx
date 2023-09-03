import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/typings";
import { baseUrl } from "@/utils/movie";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";

type Props = {
  topRated: Movie[];
  trendingNow: Movie[];
};

const Banner = ({ topRated, trendingNow }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentmovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(topRated[Math.floor(Math.random() * topRated.length)]);
  }, [topRated]);
  return (
    <div className="flex flex-col space-y-4 py-16 md:space-y-8 lg:h-[85vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-full">
        <Image
          alt="banner-img"
          className="object-cover"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill={true}
          sizes="(max-width: 1028px) 100vw"
          priority={true}
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      {/* <p className="font-semibold text-green-400 text-2xl">
        {movie!.vote_average * 10}% Match
      </p> */}
      <p className="line-clamp-3 lg:line-clamp-4 max-w-xs text-shadow-md text-xs md:max-w-l md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-4 truncate text-ellipsis">
        <button className="bannerButton bg-white text-black">
          {" "}
          <FaPlay className="w-4 h-4 text-black md:h-5 md:w-5" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setShowModal(true);
            setCurrentMovie(movie);
          }}
        >
          {" "}
          <InformationCircleIcon className="w-5 h-5 md:h-6 md:w-6" /> Trailer
        </button>
      </div>
    </div>
  );
};

export default Banner;
