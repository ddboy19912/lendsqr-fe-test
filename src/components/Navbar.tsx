import { Logo } from "@/assets";
import { useBasicProfile } from "@/hooks/useUsers";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInput";
import Icon from "./Icon";

const Navbar = () => {
  const [searchParam, setSearchParam] = useState("");
  const { data: user, isLoading } = useBasicProfile();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParam(e.target.value);

  return (
    <header className="font-work-sans shadow-header fixed top-0 right-0 left-0 z-50 h-[100px] bg-white px-[30px]">
      <div className="mx-auto flex h-full items-center justify-between xl:max-w-[1350px]">
        <Link to="/">
          <img className="h-[30px]" src={Logo} alt="logo" />
        </Link>
        <div className="w-[400px]">
          <CustomInput
            inputType="search"
            placeholderText="Search for anything"
            value={searchParam}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link className="link-text" to="/link">
            Docs
          </Link>
          <Icon
            icon="bell"
            size={26}
            className="!fill-primary-blue hover:!fill-teal ml-[47px] cursor-pointer transition-all duration-200"
          />
          <div className="ml-[30px] flex items-center">
            {isLoading ? (
              <div className="size-12 animate-pulse rounded-full bg-gray-200" />
            ) : (
              <img
                className="size-12 rounded-full bg-gray-200 object-cover"
                src={user?.profileImage}
                alt={user?.firstName ?? "User avatar"}
              />
            )}

            {isLoading ? (
              <div className="ml-[10px] h-4 w-24 animate-pulse rounded bg-gray-200" />
            ) : (
              <p className="ml-[10px]">{user?.firstName}</p>
            )}
            <Icon icon="dropdown" size={20} className="ml-1" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
