import { modalState, movieState } from "@/atoms/modalAtom";
import { Element, Genre } from "@/typings";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ThumbUp, VolumeOff, VolumeUp } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";

function MaterialModal() {
  const handleClose = () => {
    setShowModal(false);
  };
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=pt-BR&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      // if data exists
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      } 

      // if data = genre exist
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  const [showModal, setShowModal] = useRecoilState(modalState);
  return (
    // Modal for showing the trailer of the movie
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-8  left-0 right-0 z-50 mx-auto w-full max-w-4xl 
      overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 
          border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer} || "Esse trailer não existe em protuguês"`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-3 md:bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold 
              text-black transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="w-5 h-5 text-black" />
                Play
              </button>
              <button className="modalButton ">
                <PlusIcon className="w-5 h-5" />
              </button>
              <button className="modalButton">
                <ThumbUp className="w-5 h-5" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOff className="h-5 w-5" />
              ) : (
                <VolumeUp className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-20 rounded-b-md bg-[#181818] px-12 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-12 gap-y-4 font-light md:flex-row">
              <p className="w-5/6 line-clamp-6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default MaterialModal;
