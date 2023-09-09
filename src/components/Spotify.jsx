import React, { useEffect } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Track from "./Track";
import SelectedArtist from "./SelectedArtist";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        image: data.images && data.images.length > 0 ? data.images[0].url : "",
      };

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };

    getUserInfo();
  }, [dispatch, token]);

  return (
    <div className="font-[Lato] min-h-screen w-full bg-[#887e7e]">
      <div className="relative text-[#D6E4E5] transition grid grid-cols-[250px_85vw_1fr] grid-flow-row grid-rows-[85vh_15vh]">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="relative col-span-2 bg-[#121212] max-h-full overflow-auto">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/track" element={<Track />} />
            <Route path="/artist" element={<SelectedArtist />} />
          </Routes>
        </div>
        <div className="col-span-2">
          <Footer />
        </div>
      </div>
    </div>
  );
}
