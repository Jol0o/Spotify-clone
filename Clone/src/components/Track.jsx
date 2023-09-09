import React, { useState } from "react";
import Body from "./Body";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";
import Navbar from "./Navbar";
import { useStateProvider } from "./../utils/StateProvider";

export default function Track() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  const [show, setShow] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState({
    newName: "",
    description: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`;
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    const data = {};
    if (playlistDetails.newName) {
      data.name = playlistDetails.newName;
    }
    if (playlistDetails.description) {
      data.description = playlistDetails.description;
    }
    axios
      .put(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        setShow(!show);
        // Update the state or perform any other actions on success
      })
      .catch((error) => {
        console.log(error.response);
        // Handle the error or perform any other actions on failure
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlaylistDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const toggle = () => {
    setShow(!show);
  };
  return (
    <>
      {selectedPlaylist && show && (
        <div className="w-full absolute h-full bg-[#2e2d2d2e] flex justify-center items-center z-10">
          <div className="bg-[#282828] h-[400px] w-[600px] flex flex-col p-5 justify-around ">
            <div className="mb-2">
              <h1>Edit Details</h1>
            </div>
            <div className="flex h-full gap-5 w-full items-center">
              {selectedPlaylist && selectedPlaylist.image ? (
                <img
                  src={selectedPlaylist.image}
                  alt=""
                  className="w-1/2 h-3/4 self-start"
                />
              ) : (
                <i className="fa-regular fa-user"></i>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full"
              >
                <label className="flex flex-col">
                  <input
                    className="bg-[#3E3E3E] px-3 py-1 rounded-lg outline-none outline-offset-0"
                    placeholder={selectedPlaylist.name}
                    type="text"
                    name="newName"
                    value={playlistDetails.newName}
                    onChange={handleChange}
                  />
                </label>

                <label className="flex flex-col">
                  <input
                    className="h-[160px] bg-[#3E3E3E] px-3 py-1 rounded-lg outline-none outline-offset-0"
                    placeholder={
                      selectedPlaylist.description
                        ? selectedPlaylist.description
                        : "Add dexcription"
                    }
                    type="text"
                    name="description"
                    value={playlistDetails.description}
                    onChange={handleChange}
                  />
                </label>

                <button
                  className="self-end bg-white h-12 w-24 rounded-full text-black font-bold"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
            <div>
              <p className="font-medium text-sm">
                By proceeding, you agree to give Spotify access to the image you
                choose to upload. Please make sure you have the right to upload
                the image.
              </p>
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <Body toggle={toggle} />
    </>
  );
}
