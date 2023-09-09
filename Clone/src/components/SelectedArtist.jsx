import React, { useEffect, useState } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import Navbar from "./Navbar";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";

export default function SelectedArtist() {
  const [{ token, selected, artistInfo }, dispatch] = useStateProvider();
  const thousands = (selected.followers / 1000000).toFixed(2);

  useEffect(() => {
    const getArtistInfo = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/artists/${selected.id}/top-tracks`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            market: "PH",
          },
        }
      );

      const artistInfo = {
        track: res.data.tracks.map((track) => {
          return {
            name: track.name,
            type: track.type,
            duration: track.duration_ms,
            album: {
              image: track.album.images[0].url,
              name: track.album.name,
              release: track.album.release_date,
              id: track.album.id,
              artist: track.album.artists[0].name,
            },
          };
        }),
      };

      dispatch({ type: reducerCases.SET_ARTIST_INFO, artistInfo });
    };
    getArtistInfo();
  }, [dispatch, token]);
  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  console.log(artistInfo);
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="max-w-[96%] mx-auto h-full mt-5">
        <div className="flex w-full  min-h-[35vh] gap-10">
          <img
            src={selected.image}
            alt="artist"
            className="w-60 h-60 rounded-full"
          />
          <div className="flex flex-col justify-center  font-black">
            <div className="flex items-center font-semibold text-sm gap-3">
              <img src="./verified.png" alt="verified" className="h-7 w-7" />
              <h1>Verified Artist</h1>
            </div>

            <h1 className="text-[90px]">{selected.name}</h1>

            <h1>{thousands}M Monthly Listeners</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <i class="fa-solid fa-play text-black bg-green-500 h-12 w-12 hover:scale-110 transition flex items-center justify-center rounded-full"></i>
            <span className="border border-gray-400 py-1 w-32 flex items-center justify-center rounded-lg font-bold text-white">
              Following
            </span>
            <i class="fa fa-ellipsis text-xl"></i>
          </div>
          {artistInfo && (
            <div className="w-full mt-10">
              <h1 className="font-black text-2xl">Popular</h1>
              {artistInfo.track && artistInfo.track.length > 0 ? (
                artistInfo.track.map((item, index) => (
                  <ul className="grid  grid-cols-2 group mt-3" key={item.id}>
                    <li className="mb-1">
                      <div className="flex group-hover:bg-[#6361616f]  items-center p-1 gap-3 rounded-l-md ">
                        <h1 className="text-gray-500 font-medium">
                          {index + 1}
                        </h1>
                        <img
                          src={item.album.image}
                          alt="image"
                          className="w-10"
                        />
                        {item.name}
                      </div>
                    </li>
                    <li className="mb-1">
                      <div className="flex items-center justify-end group-hover:bg-[#6361616f] p-1 h-full  rounded-r-md gap-3">
                        {msToMinutes(item.duration)}
                      </div>
                    </li>
                  </ul>
                ))
              ) : (
                <p>No artists to display.</p>
              )}
            </div>
          )}
          <div className="flex flex-col my-5">
            <h1 className="font-black text-2xl">Album</h1>
            <div className="flex gap-3 mt-3">
              {artistInfo?.track?.length > 0 ? (
                artistInfo.track.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#181818] p-3 rounded-lg hover:bg-[#6361616f] hover:scale-110 transition"
                  >
                    <img src={item.album.image} alt="album" className="w-40" />
                    <h1 className="font-bold text-md ">{item.name}</h1>
                    <h2 className="font-semibold text-sm text-gray-500">
                      {item.album.release}
                    </h2>
                  </div>
                ))
              ) : (
                <p>No tracks to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
