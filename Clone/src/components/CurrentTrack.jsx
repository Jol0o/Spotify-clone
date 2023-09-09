import React, { useState, useEffect } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";

export default function CurrentTrack() {
  const [heart, setHeart] = useState(false);
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== null) {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getTrack();
  }, [token, dispatch]);

  return (
    <>
      {" "}
      {currentlyPlaying ? (
        <div className="flex gap-4 justify-center items-center">
          <img src={currentlyPlaying.image} alt="image" />
          <div>
            <h1 className="font-semibold text-md">{currentlyPlaying.name}</h1>
            <div className="flex font-medium gap-1 text-xs text-gray-400">
              <h2>{currentlyPlaying.artists[0]},</h2>
              <h2>{currentlyPlaying.artists[1]}</h2>
            </div>
          </div>
          <div
            className="ml-5"
            onClick={() => {
              setHeart(!heart);
            }}
          >
            {heart ? (
              <i class="fa-solid fa-heart text-red-500 motion-safe:animate-pulse"></i>
            ) : (
              <i className="fa-regular fa-heart "></i>
            )}
          </div>
        </div>
      ) : (
        <h1 className="text-[#17181a]">.</h1>
      )}
    </>
  );
}
