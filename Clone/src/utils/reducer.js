import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: "",
  selectedPlaylistId: "5HvBRvRgC8LqgP0PIK9uRr",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  recommended: null,
  search: null,
  top: null,
  recent: null,
  selected: "",
  artistInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    case reducerCases.SET_RECOMMEND: {
      return {
        ...state,
        recommended: action.recommended,
      };
    }
    case reducerCases.SET_SEARCH: {
      return {
        ...state,
        search: action.search,
      };
    }
    case reducerCases.SET_TOP: {
      return {
        ...state,
        top: action.top,
      };
    }
    case reducerCases.SET_PLAYLISTS_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_RECENT: {
      return {
        ...state,
        recent: action.recent,
      };
    }
    case reducerCases.SET_SELECTED: {
      return {
        ...state,
        selected: action.selected,
      };
    }
    case reducerCases.SET_ARTIST_INFO: {
      return {
        ...state,
        artistInfo: action.artistInfo,
      };
    }

    default:
      return state;
  }
};

export default reducer;
