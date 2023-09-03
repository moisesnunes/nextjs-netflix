import Header from "@/components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/request";
import { Movie } from "../typings";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import MaterialModal from "@/components/Modal";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { logout, loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  if (loading) return null;
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner topRated={topRated} trendingNow={trendingNow} />
        <section className="md:space-y-24">
          <Row title="Originais Netflix" movies={netflixOriginals} />
          <Row title="Em alta agora" movies={trendingNow} />
          <Row title="Melhores notas" movies={topRated} />
          <Row title="Ação" movies={actionMovies} />
          <Row title="Comédia" movies={comedyMovies} />
          <Row title="Terror" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Documentários" movies={documentaries} />
        </section>
      </main>
      {showModal && <MaterialModal />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests?.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

export default Home;
