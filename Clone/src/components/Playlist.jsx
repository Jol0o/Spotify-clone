import React, { useEffect } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data;
      const playlists = items.map(({ name, id, images }) => {
        return { name, id, images };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changePlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLISTS_ID, selectedPlaylistId });
  };
  return (
    <ul className="flex flex-col gap-2 text-[#7b7b7b] text-md font-black cursor-pointer">
      {playlists.map(({ name, id }) => {
        return (
          <li
            key={id}
            onClick={() => changePlaylist(id)}
            className="active:text-white"
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
}
