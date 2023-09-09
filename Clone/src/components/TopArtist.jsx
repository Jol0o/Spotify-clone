import React from "react";

export default function TopArtist({ top, random }) {
  return (
    <>
      {top && (
        <div
          key={top.artist.id}
          className="hover:bg-[#525252] hover:scale-95 duration-300  transition pt-3 bg-gradient-to-t from-[#181818] min-h-[250px] flex flex-col items-center rounded-xl w-[200px]"
        >
          <img
            src={top.artist[random].image}
            alt={top.artist[random].name}
            className="h-36 rounded-full w-36"
          />
          <div className="items-start w-full px-5 mt-2">
            <h1 className="font-bold text-md">{top.artist[random].name}</h1>
            <h1 className="font-semibold text-sm text-gray-500 capitalize">
              {top.artist[random].type}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
