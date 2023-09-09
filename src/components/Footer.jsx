import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControl from "./PlayerControl";
import Volume from "./Volume";

export default function Footer() {
  return (
    <div className="bg-[#17181a] backdrop-blur-md min-w-full md:w-screen h-full border-t-2 border-[#494848]">
      <div className="flex h-full w-auto mx-[2%] justify-between items-center">
        <CurrentTrack />
        <PlayerControl />
        <Volume />
      </div>
    </div>
  );
}
