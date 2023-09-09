import React, { useEffect } from "react";
import { useStateProvider } from "./../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "./../utils/Constants";

export default function Recommend({ add }) {
  const [{ token, recommended }, dispatch] = useStateProvider();
  useEffect(() => {
    const getRecommend = async () => {
      const SEED_ARTISTS = "3XGlotxI2yAE3RV0DX6oD2";
      const SEED_GENRES = "HipHop";
      const SEED_TRACKS = "37i9dQZF1DX0iFfuXuP4Pm";
      const res = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          params: {
            seed_artists: SEED_ARTISTS,
            seed_genres: SEED_GENRES,
            seed_tracks: SEED_TRACKS,
          },
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const recommended = res.data;
      dispatch({ type: reducerCases.SET_RECOMMEND, recommended });
    };
    getRecommend();
  }, [token, dispatch]);

  return (
    <div className="h-fit w-full">
      <h1 className="text-xl font-bold">Recommended</h1>
      <p className="text-sm mt-4 text-gray-500 font-semibold">
        Based on what's in this playlist
      </p>

      {recommended && (
        <ul className="flex flex-col gap-5">
          {recommended.tracks.map((track) => (
            <div
              key={track.id}
              className="flex justify-between group sm:grid sm:grid-cols-[40%_50%_10%] "
            >
              {" "}
              <li
                className="flex items-center  gap-4 group-hover:bg-[#636161] p-2 rounded-l-lg hover:ease-in-out duration-200"
                key={track.id}
              >
                <img
                  src={track.album.images[1].url}
                  alt={track.name}
                  className="h-12"
                />
                <div className="flex flex-col ">
                  <h1>{track.name}</h1>
                  <h1 className="capitalize">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </h1>
                </div>
              </li>
              <li className="group-hover:bg-[#636161] flex items-center hover:ease-in-out duration-200">
                {track.name}
              </li>
              <li className="group-hover:bg-[#636161] flex items-center justify-center rounded-r-lg hover:ease-in duration-200 ">
                <button
                  onClick={() => add(track.uri)}
                  className="border border-gray-500 rounded-full h-8 w-16 font-bold transition ease-in-out   hover:-translate-y-1 hover:scale-100 hover:border-white duration-200 "
                >
                  Add
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
