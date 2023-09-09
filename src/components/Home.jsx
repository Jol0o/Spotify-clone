import React, { useEffect, useState } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import { Link } from "react-router-dom";

import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import Recent from "./Recent";
import Release from "./Release";

export default function () {
  const [{ token, userInfo, recent }, dispatch] = useStateProvider();

  useEffect(() => {
    const getRecent = async () => {
      const res = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const recent = {
        recent: res.data.items.map((item) => {
          return {
            artist: item.track.artists.map((artist) => artist.name),
            name: item.track.name,
            image: item.track.album.images[0].url,
            Id: item.track.id,
            uri: item.track.uri,
          };
        }),
        album: data.data.albums.items.map((album) => {
          return {
            name: album.name,
            image: album.images[0].url,
            uri: album.uri,
            artist: album.artists.map((artist) => artist.name),
          };
        }),
      };
      dispatch({ type: reducerCases.SET_RECENT, recent });
    };

    getRecent();
  }, [dispatch, token]);

  return (
    <div className="bg-gradient-to-b  to-[#1D1D1D] from-[#1D1D1D] h-full w-full">
      <div className="sticky bg-[#1F1F1F] px-[2%] flex justify-between w-full h-24 items-center">
        <div className="flex gap-5 text-lg">
          <i className="fa-solid  fa-less-than rounded-full bg-[#1e1d1d] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
          <i className="fa-solid fa-greater-than rounded-full bg-[#1e1d1d] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
        </div>
        <div className="hidden md:flex  bg-[#272626b7] rounded-full py-1 pr-3 pl-1">
          <Link
            to="/profile"
            className="flex items-center justify-between gap-2 pr-3 font-bold"
          >
            <span className="border-white border-2 bg-[#7b7b7b] text-center rounded-full ">
              <img src={userInfo.image} alt="" className="w-8 rounded-full" />
            </span>
            <p>{userInfo.userName}</p>
          </Link>
        </div>
      </div>
      <div className="max-w-[96%] mx-auto px-[1%] min-h-[35vh]">
        <div className="my-5">
          <div className="flex justify-between items-center">
            <h1 className="font-extrabold text-2xl ">Recently played</h1>
            <p className="font-bold text-sm text-gray-500">Show all</p>
          </div>

          <div className="flex  gap-3 items-center justify-center mt-5">
            <Recent recent={recent} random={0} />
            <Recent recent={recent} random={1} />
            <Recent recent={recent} random={2} />
            <Recent recent={recent} random={3} />
            <Recent recent={recent} random={4} />
            <Recent recent={recent} random={5} />
            <Recent recent={recent} random={6} />
            <Recent recent={recent} random={7} />
          </div>
        </div>
        <div className="my-5">
          <div className="flex justify-between items-center">
            <h1 className="font-extrabold text-2xl ">New Release</h1>
            <p className="font-bold text-sm text-gray-500">Show all</p>
          </div>

          <div className="flex  gap-3 items-center justify-center mt-5">
            <Release recent={recent} random={0} />
            <Release recent={recent} random={1} />
            <Release recent={recent} random={2} />
            <Release recent={recent} random={3} />
            <Release recent={recent} random={4} />
            <Release recent={recent} random={5} />
            <Release recent={recent} random={6} />
            <Release recent={recent} random={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
