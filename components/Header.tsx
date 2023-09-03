import useAuth from "@/hooks/useAuth";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-[#232222]"}`}>
      <div className="flex top-0 px-10 items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt=""
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex ">
          <li className="headerlink">Home</li>
          <li className="headerlink">Movies</li>
          <li className="headerlink">Tv Shows</li>
          <li className="headerlink">Novos & Populares</li>
          <li className="headerlink">Minha Lista</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="w-6 h-6 sm:inline cursor-pointer" />
        <BellIcon className="w-6 h-6 sm:inline cursor-pointer" />
        {/* <Link href={"/account"}> */}
        <img
          onClick={() => logout()}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
