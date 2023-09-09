import React from "react";

export default function Songs({ search, random }) {
  return (
    <>
      {search && (
        <div className="flex gap-4 hover:bg-[#4545457d] transition p-1 rounded-lg">
          <img
            className="w-10"
            src={search.album[random].image}
            alt={search.album[random].name}
          />
          <div>
            <h1 className="font-semibold">{search.album[random].name}</h1>
            <h1 className="text-sm font-semibold text-gray-500">
              {search.album[random].artist.join(" , ")}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
