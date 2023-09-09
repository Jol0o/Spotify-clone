import React, { useEffect, useState } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import Recommend from "./Recommend";

export default function Body({ toggle }) {
  const [
    { token, selectedPlaylistId, selectedPlaylist, recommended },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        image:
          res.data.images && res.data.images.length > 0
            ? res.data.images[0].url
            : "",
        tracks: res.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getPlaylist();
  }, [dispatch, token, selectedPlaylistId]);
  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async ({
    id,
    name,
    artists,
    image,
    duration,
    album,
    context_uri,
    track_number,
  }) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  const addTrack = async () => {
    const res = await axios
      .post(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.error(error);
      });
    console.log(res);
    //dispatch({ type: reducerCases.SET_PLAYLISTS_ID, selectedPlaylistId });
  };

  return (
    <div className="bg-[#1F1F1F]">
      <div className="sticky h-full w-full flex flex-col overscroll-y-auto ">
        {selectedPlaylist && (
          <>
            <div className="flex w-auto px-[3%] h-[30vh] mb-5">
              <div className=" mr-5 w-[300px] h-full ">
                {selectedPlaylist.image ? (
                  <img
                    src={selectedPlaylist.image}
                    alt="playlist"
                    className="h-full w-[300px] mr-5 shadow-2xl rounded-md "
                    onClick={toggle}
                  />
                ) : (
                  <i class="fa-solid fa-music w-[300px] mr-3 drop-shadow-3xl bg-[#71707033] h-full text-5xl flex items-center justify-center"></i>
                )}
              </div>
              <div className="flex h-full  flex-col justify-center ">
                <span className="font-semibold text-gray-300">PLAYLIST</span>
                <h1 className="text-[80px] tracking-wide font-black">
                  {selectedPlaylist.name}
                </h1>
                <p>{selectedPlaylist.description}</p>
              </div>
            </div>
            <div className="w-auto h-fit bg-[rgba(41,41,41,0.47)] shadow-[0_8px_30px_0_rgba(31,38,135,0.57)] backdrop-blur-lg z-0 px-10 pt-5  ">
              <ul className="grid grid-cols-[2%_40%_50%_8%] gap-2 border-b mb-4 pb-4 border-[#525050] font-semibold text-xs text-gray-400">
                <li>#</li>
                <li>TITLE</li>
                <li className="hidden sm:block">ALBUM</li>
                <li className="hidden sm:block">
                  <i className="fa-regular fa-clock"></i>
                </li>
              </ul>

              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <ul
                      key={id}
                      className="group flex  items-center  sm:grid sm:grid-cols-[2%_40%_50%_8%]"
                    >
                      <li
                        className="rounded-l-lg group-hover:bg-[#636161] h-full flex items-center justify-center"
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                      >
                        {index + 1}
                      </li>
                      <li
                        className="flex  h-full cursor-pointer py-2 group-hover:bg-[#636161]"
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                      >
                        <img src={image} alt="image" className="mr-2 h-12" />
                        <div className="flex flex-col justify-center ">
                          <h1 className="text-ellipsis group-hover:bg-[#636161] overflow-hidden font-semibold text-sm">
                            {name}
                          </h1>
                          <h1 className="text-xs font-semibold text-gray-400">
                            {artists}
                          </h1>
                        </div>
                      </li>
                      <li
                        className="text-sm h-full  items-center text-gray-400 group-hover:bg-[#636161] hidden sm:flex"
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                      >
                        {album}
                      </li>
                      <li
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                        className="hidden h-full sm:flex items-center rounded-r-lg group-hover:bg-[#636161] text-gray-400 text-sm font-semibold"
                      >
                        {msToMinutes(duration)}
                      </li>
                    </ul>
                  );
                }
              )}
              <div className="mt-32">
                <Recommend add={addTrack} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
