import React from "react";
import { Link } from "react-router-dom";

export default function Feature({ random, search }) {
  return (
    <Link to="/artist">
      <div className="bg-[#181818] h-full rounded-lg w-[200px] flex flex-col items-center gap-3 hover:bg-[#4545457d]">
        {search.artist ? (
          <img
            className="rounded-full h-36 w-36 mt-4"
            src={search.artist[random].image}
            alt={search.artist[random].name}
          />
        ) : (
          <i class="fa-light fa-user-tie"></i>
        )}
        <div className="self-start ml-3">
          <h1 className=" font-semibold">{search.artist[random].name}</h1>
          <h1 className=" font-medium text-gray-500">
            {search.artist[random].type}
          </h1>
        </div>
      </div>
    </Link>
  );
}
