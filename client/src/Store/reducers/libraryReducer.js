import { CONSTANTS } from "../actions";

const initialState = {
    tracks: [],
    currentTrack: { url: "", index: 0, metadata: {common: {title: "Unkown", artist: "Unkown"}} },
    currentProgess: 0,
    totalProgress: 0,
    image: "",
    playing: false,
    duration: 0,
    played: 0,
    seeking: false,
    volume: 1,
    loop: false,
    loopAll: false,
    loopIndex: 0,
    muted: false,
};

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LIBRARY: {
            return { ...state, tracks: action.payload.tracks };
        }

        case CONSTANTS.PLAY_SONG: {
          return { ...state, currentTrack: action.payload.currentTrack, playing: action.payload.playing, played: action.payload.played }
        }

        case CONSTANTS.PAUSE_SONG: {
          return { ...state, playing: action.payload.playing }
        }

        case CONSTANTS.HANDLE_PLAY: {
          return { ...state, playing: action.payload.playing }
        }

        case CONSTANTS.HANDLE_PROGRESS: {
          return { ...state, ...action.payload.state }
        }

        case CONSTANTS.HANDLE_DURATION: {
          return { ...state, duration: action.payload.duration }
        }

        case CONSTANTS.HANDLE_SEEK_CHANGE: {
          return { ...state, played: action.payload.played }
        }

        case CONSTANTS.HANDLE_SEEK_MOUSEDOWN: {
          return { ...state, seeking: action.payload.seeking }
        }

        case CONSTANTS.HANDLE_SEEK_MOUSEUP: {
          return { ...state, seeking: action.payload.seeking }
        }

        case CONSTANTS.HANDLE_VOLUME_CHANGE: {
          return { ...state, volume: action.payload.volume }
        }

        case CONSTANTS.HANDLE_TOGGLE_LOOP: {
          return { ...state, loop: action.payload.loop, loopIndex: action.payload.loopIndex, loopAll: action.payload.loopAll }
        }

        case CONSTANTS.HANDLE_TOGGLE_MUTED: {
          return { ...state, muted: action.payload.muted }
        }

        default:
            return state;
    }
};

export default libraryReducer;
