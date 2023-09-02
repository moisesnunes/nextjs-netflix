import { Movie } from "@/typings";
import Image from "next/image";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm md:rounded object-cover"
        alt="movie"
        fill={true}
        sizes="(max-width: 768px) 100vw"
        priority={true}
      />
    </div>
  );
};

export default Thumbnail;
