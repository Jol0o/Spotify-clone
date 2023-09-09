import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";

export default function Sidebar() {
  const [{ token, userInfo }, dispatch] = useStateProvider();

  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`,
        {
          name: "My Awesome Playlist",

          description: "This is a playlist of my favorite songs!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Playlist created:", response.data);
      alert("Playlist created successfully!");
    } catch (error) {
      console.error("Failed to create playlist:", error);
      alert("Failed to create playlist.");
    }
  };

  return (
    <div className="bg-black flex h-full flex-col items-start px-5 gap-y-10 pt-10">
      <div className="">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
          alt="logo"
          className="h-10 md:flex"
        />
      </div>
      <div className="border-b  border-[#494848] w-full pb-5">
        <ul className="flex flex-col gap-5 ">
          <Link to="/">
            <li className="hover:text-white text-gray-400">
              <i className="fa-solid fa-house text-2xl"></i>
              <span className="ml-4  text-md font-bold">Home</span>
            </li>
          </Link>

          <Link to="/search">
            <li className="hover:text-white text-gray-400">
              <i className="fa-solid fa-magnifying-glass text-2xl "></i>
              <span className="ml-4  text-md font-bold">Search</span>
            </li>
          </Link>
          <li className="hover:text-white text-gray-400">
            <i className="fa fa-book text-2xl"></i>
            <span className="ml-4  text-md font-bold">Your Library</span>
          </li>
        </ul>
        <div
          className="font-bold flex gap-3 mt-10 group "
          onClick={createPlaylist}
        >
          <i class="fa-solid fa-plus bg-gray-500 text-md text-black h-6 w-6 group-hover:bg-white  flex items-center justify-center rounded-sm"></i>
          <h1 className="text-gray-400 group-hover:text-white">
            Create Playlist
          </h1>
        </div>
      </div>
      <Link to="/track">
        <Playlist />
      </Link>
    </div>
  );
}
