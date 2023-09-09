import React, { useEffect, useState } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import Songs from "./Songs";
import Feature from "./Feature";
import List from "./List";
import { Link } from "react-router-dom";

export default function Search() {
  const [{ token, search, userInfo }, dispatch] = useStateProvider();
  const [query, setQuery] = useState("");

  const handleClick = (id) => {
    if (search && Array.isArray(search.artist)) {
      const selected = search.artist.find((m) => m.id === id);
      if (selected) {
        dispatch({ type: reducerCases.SET_SELECTED, selected });
      } else {
        console.log(`No artist found with id ${id}`);
      }
    } else {
      console.log(`Search is null or undefined`);
    }
  };

  const handleSearch = async () => {
    const res = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      params: {
        q: query,
        type: "album,artist,playlist,track",
      },
    });

    const search = {
      album: res.data.albums.items.map((album) => {
        return {
          id: album.id,
          name: album.name,
          image: album.images[2].url,
          artist: album.artists.map((artist) => artist.name),
        };
      }),
      artist: res.data.artists.items.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          image:
            artist.images && artist.images.length > 0
              ? artist.images[0].url
              : "",
          type: artist.type,
          uri: artist.uri,
          followers: artist.followers.total,
        };
      }),
      playlist: res.data.playlists.items.map((list) => {
        return {
          id: list.id,
          name: list.name,
          image:
            list.images && list.images.length > 0 ? list.images[0].url : "",
          owner: list.owner.display_name,
        };
      }),
    };

    dispatch({ type: reducerCases.SET_SEARCH, search });
  };
  useEffect(() => {
    handleClick();
    handleSearch();
  }, [token, dispatch]);
  return (
    <div className="w-full h-fit bg-[#121212]">
      <div className="h-full w-full pt-5 px-[2%] bg-[#121212]">
        <div className="flex justify-between bg-[#121212] ">
          <div className="bg-white rounded-full py-2 px-5 text-[#7b7b7b]">
            <i onClick={handleSearch} class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artists , Songs , or Podcasts"
              className="outline-0 text-black font-semibold px-2 outline-offset-0 "
            />
          </div>
          <div className="hidden md:flex bg-[#272626b7] rounded-full py-1 pr-3 pl-2 items-center">
            <a href="#" className="flex gap-x-2 font-semibold">
              <span className="border-white border-2 bg-[#7b7b7b] text-center rounded-full ">
                <img src={userInfo.image} alt="" className="w-8 rounded-full" />
              </span>
              <p className="self-center">{userInfo.userName}</p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <ul className="flex gap-5 mt-5">
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit  px-3 py-1 text-white  active:text-black font-medium text-md text-center ">
              All
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Songs
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Artists
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Potcasts & Shows
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              PlayLists
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Albums
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Profiles
            </li>
            <li className="bg-[#7b7b7b] active:bg-white curser-pointer hover:bg-[#a09f9f] rounded-full w-fit text-clip h-fit px-3 py-1 text-white active:text-black font-medium text-md text-center ">
              Genres & Moods
            </li>
          </ul>
          {search && (
            <>
              <div className="flex my-5 w-full h-[26vh] gap-5">
                <Link to="/artist">
                  <div
                    className="w-[400px] "
                    onClick={() => handleClick(search.artist[0].id)}
                  >
                    <h1 className="font-bold text-2xl">Top Results</h1>
                    <div className="bg-[#181818] rounded-xl p-5 h-full w-full text-white mt-3 hover:bg-[#4545457d]">
                      <img
                        src={search.artist[0].image}
                        alt={search.artist[0].name}
                        className="rounded-full w-28 h-28"
                      />
                      <h1 className="font-semibold text-3xl mt-3">
                        {search.artist[0].name}
                      </h1>
                      <div className="flex justify-between mt-1 ">
                        <p className="bg-[#131313] h-fit rounded-full px-2 py-1 capitalize">
                          {search.artist[0].type}
                        </p>
                        <i class="fa-solid fa-play bg-[#1ED760] rounded-full px-4 py-4 text-[#121212]"></i>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="h-full flex flex-col flex-1">
                  <h1 className="font-bold text-2xl">Songs</h1>
                  <div className="flex flex-col mt-3 gap-2 ">
                    <Songs search={search} random={0} />
                    <Songs search={search} random={1} />
                    <Songs search={search} random={2} />
                    <Songs search={search} random={3} />
                  </div>
                </div>
              </div>
              <div className="h-[28vh] mt-10 bg-[#121212]">
                <h1 className="font-bold text-2xl">Artists</h1>
                <div className="flex flex-wrap gap-5 h-[30vh] mt-3">
                  <Feature search={search} random={0} />
                  <Feature search={search} random={1} />
                  <Feature search={search} random={2} />
                  <Feature search={search} random={3} />
                  <Feature search={search} random={4} />
                  <Feature search={search} random={5} />
                  <Feature search={search} random={6} />
                </div>
              </div>
              <div className="h-fit w-full my-10 bg-[#121212]">
                <h1 className="font-bold text-2xl">Playlists</h1>
                <div className="flex flex-wrap gap-5 h-[30vh] mt-3">
                  <List search={search} random={0} />
                  <List search={search} random={1} />
                  <List search={search} random={2} />
                  <List search={search} random={3} />
                  <List search={search} random={4} />
                  <List search={search} random={5} />
                  <List search={search} random={6} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
