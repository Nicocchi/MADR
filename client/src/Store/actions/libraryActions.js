import { CONSTANTS } from "../actions";
import axios from "axios";

export const getLibrary = () => {
    return (dispatch, getState) => {
        axios.get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/`).then((res) => {
            dispatch({
                type: CONSTANTS.GET_LIBRARY,
                payload: { tracks: res.data.songs },
            });
        });
    };
};

export const playSong = (index) => {
    return (dispatch, getState) => {
        const state = getState();
        const track = state.library.tracks[index];
        if (track === undefined) return;
        axios
            .get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/${track._id}`, { responseType: "blob" })
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);
                const currentTrack = {
                    url,
                    index: index,
                };

                dispatch({
                    type: CONSTANTS.PLAY_SONG,
                    payload: { currentTrack: currentTrack, playing: true, played: 0 },
                });
            });
    };
};

export const handlePlayPause = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.library.currentTrack.url === "") {
            const track = state.library.tracks[0];
            if (track === undefined) return;
            axios
                .get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/${track._id}`, { responseType: "blob" })
                .then((res) => {
                    const url = window.URL.createObjectURL(res.data);
                    const currentTrack = {
                        url,
                        index: 0,
                    };

                    return dispatch({
                        type: CONSTANTS.PLAY_SONG,
                        payload: { currentTrack: currentTrack, playing: true, played: 0 },
                    });
                });
        }
        dispatch({
            type: CONSTANTS.PAUSE_SONG,
            payload: { playing: !state.library.playing },
        });
    };
};

export const handlePlay = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: CONSTANTS.HANDLE_PLAY,
            payload: { playing: state.library.loop },
        });
    };
};

export const handleProgress = (state) => {
    return (dispatch, getState) => {
        const oldState = getState();
        if (!oldState.library.seeking) {
            dispatch({
                type: CONSTANTS.HANDLE_PROGRESS,
                payload: { state: state },
            });
        }
    };
};

export const handleDuration = (duration) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.HANDLE_DURATION,
            payload: { duration: duration },
        });
    };
};

export const handleSeekMouseDown = (e) => {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.library.playing) return;
        dispatch({
            type: CONSTANTS.HANDLE_SEEK_MOUSEDOWN,
            payload: { seeking: true },
        });
    };
};

export const handleSeekChange = (e) => {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.library.playing) return;
        dispatch({
            type: CONSTANTS.HANDLE_SEEK_CHANGE,
            payload: { played: parseFloat(e.target.value) },
        });
    };
};

export const handleSeekMouseUp = (e) => {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.library.playing) return;
        dispatch({
            type: CONSTANTS.HANDLE_SEEK_MOUSEUP,
            payload: { seeking: false },
        });
    };
};

export const handleVolumeChange = (e) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.HANDLE_VOLUME_CHANGE,
            payload: { volume: parseFloat(e.target.value) },
        });
    };
};

export const handleToggleLoop = () => {
    return (dispatch, getState) => {
        const state = getState();
        const index = state.library.loopIndex + 1;
        if (index >= 3) {
            // No Loop
            return dispatch({
                type: CONSTANTS.HANDLE_TOGGLE_LOOP,
                payload: { loop: false, loopIndex: 0, loopAll: false },
            });
        } else if (index === 2) {
            // Loop All
            return dispatch({
                type: CONSTANTS.HANDLE_TOGGLE_LOOP,
                payload: { loop: false, loopIndex: index, loopAll: true },
            });
        } else if (index === 1) {
            // Loop
            return dispatch({
                type: CONSTANTS.HANDLE_TOGGLE_LOOP,
                payload: { loop: true, loopIndex: index, loopAll: false },
            });
        } else if (index === 0) {
            // No Loop
            return dispatch({
                type: CONSTANTS.HANDLE_TOGGLE_LOOP,
                payload: { loop: false, loopIndex: index, loopAll: false },
            });
        }
    };
};

export const handleToggleMuted = (e) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: CONSTANTS.HANDLE_TOGGLE_MUTED,
            payload: { muted: !state.library.muted },
        });
    };
};
