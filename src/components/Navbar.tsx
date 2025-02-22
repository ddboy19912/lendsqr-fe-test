import { Logo } from "@/assets";
import { useBasicProfile } from "@/hooks/useUsers";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const CustomInput = lazy(() => import("./CustomInput"));
const Hamburger = lazy(() => import("./Hamburger"));

interface NavbarProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const Navbar = ({ isSidebarOpen, onMenuClick }: NavbarProps) => {
  const [searchParam, setSearchParam] = useState("");
  const { data: user, isLoading } = useBasicProfile();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParam(e.target.value);

  return (
    <header className="font-work-sans shadow-header fixed top-0 right-0 left-0 z-50 h-[100px] bg-white px-[30px]">
      <div className="flex h-full items-center justify-between xl:max-w-[1350px]">
        <div className="chromebook:hidden">
          <Hamburger isOpen={isSidebarOpen} onClick={onMenuClick} />
        </div>
        <Link to="/">
          <img
            loading="eager"
            className="h-5 md:h-[30px]"
            src={Logo}
            alt="logo"
          />
        </Link>
        <div className="chromebook:block hidden w-[400px]">
          <CustomInput
            inputType="search"
            placeholderText="Search for anything"
            value={searchParam}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link className="link-text chromebook:block hidden" to="/link">
            Docs
          </Link>
          <Icon
            icon="bell"
            size={26}
            className="!fill-primary-blue hover:!fill-teal ml-[47px] !hidden cursor-pointer transition-all duration-200 md:block"
          />
          <div className="ml-[30px] flex items-center">
            {isLoading ? (
              <div className="size-12 animate-pulse rounded-full bg-gray-200" />
            ) : (
              <img
                loading="lazy"
                className="size-9 rounded-full bg-gray-200 object-cover md:size-12"
                src={user?.profileImage}
                alt={user?.firstName ?? "User avatar"}
              />
            )}

            <div className="hidden items-center md:flex">
              {isLoading ? (
                <div className="ml-[10px] h-4 w-24 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="ml-[10px]">{user?.firstName}</p>
              )}
              <Icon icon="dropdown" size={20} className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
