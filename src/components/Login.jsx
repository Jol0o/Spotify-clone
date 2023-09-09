import React from "react";

export default function Login() {
  const handleClick = () => {
    const clientId = "6156f41413d24114a6321e6800d87c75";
    const redirectUrl = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
      "playlist-modify-private",
      "playlist-modify-public",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=ture`;
  };
  return (
    <div className="bg-green-500 h-screen w-full flex flex-col justify-center items-center gap-10">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
        className="h-40"
      />
      <button
        onClick={handleClick}
        className="bg-black text-green-500 text-lg font-semibold py-2 px-10 rounded-full"
      >
        Connect Spotify
      </button>
    </div>
  );
}
