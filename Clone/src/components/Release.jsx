import React from "react";

export default function Release({ random, recent }) {
  return (
    <>
      {recent && (
        <div className="overflow-hidden hover:scale-95 duration-300 hover:bg-[#525252] transition pt-3  bg-[#181818] h-[250px] flex flex-col items-center rounded-lg w-[200px]">
          <img
            className="h-36 rounded-lg w-36"
            src={recent.album[random].image}
            alt={recent.album[random].name}
          />
          <div className="self-start px-3">
            <h1 className="font-semibold truncate">
              {recent.album[random].name}
            </h1>
            <h1 className="text-sm font-semibold text-gray-500">
              {recent.album[random].artist}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
