import React from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";

export default function PlayerControl() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {}, // You can pass an empty object, or provide additional parameters if needed.
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changeTrack = async (type) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {}, // You can pass an empty object, or provide additional parameters if needed.
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });

      const response1 = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response1.data && response1.data.item) {
        const currentPlaying = {
          id: response1.data.item.id,
          name: response1.data.item.name,
          artists: response1.data.item.artists.map((artist) => artist.name),
          image: response1.data.item.album.images[2].url,
        };

        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-5 items-center ">
      <div>
        <i className="fa-solid fa-shuffle"></i>
      </div>
      <div onClick={() => changeTrack("previous")} className="cursor-pointer">
        <i className="fa-solid fa-backward-step"></i>
      </div>
      <div
        onClick={changeState}
        className="text-black bg-white rounded-full w-10 h-10 flex items-center justify-center"
      >
        {playerState ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </div>
      <div className="cursor-pointer" onClick={() => changeTrack("next")}>
        <i className="fa-sharp fa-solid fa-forward-step"></i>
      </div>
      <div>
        <i className="fa-solid fa-repeat"></i>
      </div>
    </div>
  );
}
