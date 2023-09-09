import React from "react";
import { useStateProvider } from "./../utils/StateProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();

  return (
    <div className="sticky bg-[#1F1F1F] px-[2%] flex justify-between w-full h-24 items-center">
      <div className="flex gap-5 text-lg">
        <i className="fa-solid  fa-less-than rounded-full bg-[#1e1d1d] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
        <i className="fa-solid fa-greater-than rounded-full bg-[#1e1d1d] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
      </div>
      <div className="hidden md:flex  bg-[#272626b7] rounded-full py-1 pr-3 pl-1">
        <Link
          to="/profile"
          className="flex items-center justify-between gap-2 pr-3 font-bold"
        >
          <span className="border-white border-2 bg-[#7b7b7b] text-center rounded-full ">
            <img src={userInfo.image} alt="" className="w-8 rounded-full" />
          </span>
          <p>{userInfo.userName}</p>
        </Link>
      </div>
    </div>
  );
}
