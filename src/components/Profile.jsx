import React, { useState, useEffect } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import TopArtist from "./TopArtist";

export default function Profile() {
  const [{ token, userInfo, top, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getTop = async () => {
      const res = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const top = {
        artist: res.data.items.map((artist) => {
          return {
            name: artist.name,
            image: artist.images[1].url,
            type: artist.type,
          };
        }),
      };

      dispatch({ type: reducerCases.SET_TOP, top });
    };

    getTop();
  }, [dispatch, token]);

  return (
    <div className="w-full h-full bg-[#1F1F1F] font-sans">
      <div className="bg-gradient-to-b  from-[#7a7a7ac9] to-[#4646464c] min-h-[35vh]">
        <div className="flex items-center justify-between">
          <div className=" flex gap-5 rounded-full py-2 px-5 text-[#7b7b7b]">
            <i class="fa-solid fa-less-than rounded-full bg-[#1e1d1da5] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
            <i class="fa-solid fa-greater-than rounded-full bg-[#1e1d1da5] hover:bg-[#0A0A0A] h-8 w-8 flex items-center justify-center cursor-pointer"></i>
          </div>
          <div className="hidden md:flex bg-[#272626b7] rounded-full h-fit px-2 py-1 ">
            <a href="#" className="flex gap-x-2 font-semibold">
              <span className="border-white border-2  rounded-full ">
                {userInfo.image ? (
                  <img
                    src={userInfo.image}
                    alt="user"
                    className="w-8 rounded-full"
                  />
                ) : (
                  <i className="fa-regular fa-user"></i>
                )}
              </span>
              <p className="self-center">{userInfo.userName}</p>
            </a>
          </div>
        </div>
        <div className="max-w-[95%] mx-auto flex gap-10 ">
          <img
            className="rounded-full w-60"
            src={
              userInfo.image === "" ? (
                <i className="fa-solid fa-user"></i>
              ) : (
                userInfo.image
              )
            }
            alt=""
          />
          <div className="flex flex-col justify-center font-black">
            <h1 className="uppercase text-sm font-semibold">Profile</h1>
            <h1 className="text-[90px]">{userInfo.userName}</h1>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-[#080808]">
        <div className="max-w-[95%] min-h-[35vh] mx-auto mt-10">
          <div>
            <h1 className="font-bold text-2xl text-white">
              Top Artists this month
            </h1>
            <p className="text-sm text-gray-500 font-semibold">
              Only visible to you
            </p>
          </div>
          <div className="flex  gap-3 items-center justify-center mt-5  transition overflow-hidden">
            <TopArtist top={top} random={0} />
            <TopArtist top={top} random={1} />
            <TopArtist top={top} random={2} />
            <TopArtist top={top} random={3} />
            <TopArtist top={top} random={4} />
            <TopArtist top={top} random={5} />
            <TopArtist top={top} random={6} />
            <TopArtist top={top} random={7} />
          </div>
        </div>
        <div className="max-w-[95%] min-h-[35vh] mx-auto mt-10">
          <h1 className="font-bold text-2xl text-white">Public Playlists</h1>
          <div className="flex  gap-3 items-center  mt-5 overflow-x-hidden">
            {playlists &&
              playlists.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="hover:bg-[#525252] hover:scale-95   transition pt-3 bg-gradient-to-t from-[#181818] min-h-[250px] flex flex-col items-center rounded-xl w-[200px]"
                  >
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="h-36 rounded-lg w-36"
                    />
                    <h1 className="self-start px-6 font-bold mt-3">
                      {item.name}
                    </h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
