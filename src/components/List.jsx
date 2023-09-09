import React from "react";

export default function List({ search, random }) {
  return (
    <div className="bg-[#181818] h-full rounded-lg w-[200px] flex flex-col items-center hover:bg-[#4545457d] overflow-hidden gap-3">
      {search.playlist ? (
        <img
          className="rounded-full h-36 w-36 mt-4"
          src={search.playlist[random].image}
          alt={search.playlist[random].name}
        />
      ) : (
        <i class="fa-light fa-user-tie"></i>
      )}
      <div className="self-start ml-3 w-[250px]">
        <h1 className=" font-semibold truncate ">
          {search.playlist[random].name}
        </h1>
        <h1 className=" font-medium text-gray-500">
          {search.playlist[random].owner}
        </h1>
      </div>
    </div>
  );
}
