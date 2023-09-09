import React from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";

export default function () {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 text-gray-500">
      <i class="fa fa-microphone hover:text-white"></i>
      <i class="fa fa-laptop-code hover:text-white"></i>
      <i class="fa fa-volume-high hover:text-white"></i>
      <input
        type="range"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
        className="h-[0.2em] bg-red-500"
      />
    </div>
  );
}
