import React, { PureComponent } from "react";
import axios from "axios";
import "./App.css";
import ReactPlayer from "react-player";
import { Table } from "reactstrap";
import shortid from "shortid";
import Duration from "./Duration";
require("dotenv").config();

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            currentTrack: { url: "", index: 0, metadata: {} },
            currentProgess: 0,
            totalProgress: 0,
            image: "",
            playing: false,
            duration: 0,
            played: 0,
            seeking: false,
            volume: 0.8,
            loop: false,
            muted: false,
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/`).then((res) => {
            this.setState({
                tracks: res.data.songs,
            });
        });
    }

    /**
     * Set's the new track index
     */
    setNewTrack = (index) => {
        this.playSong(index);
    };

    /**
     * Convert's an Array Buffer to Base64 String
     */
    _arrayBufferToBase64 = (buffer) => {
        let base64String = "";
        for (let i = 0; i < buffer.data.length; i++) {
            base64String += String.fromCharCode(buffer.data[i]);
        }

        return `data:${buffer.format};base64,${window.btoa(base64String)}`;
    };

    /**
     * Play's a song based off given index
     */
    playSong = (index) => {
        const track = this.state.tracks[index];
        if (track === undefined) return;
        axios
            .get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/${track._id}`, { responseType: "blob" })
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);
                const currentTrack = {
                    url,
                    index: index,
                };

                this.setState({
                    currentTrack,
                    playing: true,
                    played: 0,
                });
            });
    };

    /**
     * Pause the player
     */
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    handleVolumeChange = (e) => {
        this.setState({ volume: parseFloat(e.target.value) });
    };

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop });
    };

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    };

    handlePause = () => {
        console.log("onPause");
        this.setState({ playing: false });
    };

    handlePlay = () => {
        console.log("onPlay");
        this.setState({ playing: true });
    };

    /**
     * Handle seeking mouse down event
     *
     * @memberof App
     */
    handleSeekMouseDown = (e) => {
        if (!this.state.playing) return;
        this.setState({ seeking: true });
    };

    /**
     * Handle seeking the played amount of the media file
     *
     * @memberof App
     */
    handleSeekChange = (e) => {
        if (!this.state.playing) return;
        this.setState({ played: parseFloat(e.target.value) });
    };

    /**
     * Handle seeking mouse up event
     *
     * @memberof App
     */
    handleSeekMouseUp = (e) => {
        if (!this.state.playing) return;
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    };

    /**
     * Handle the slider's progress
     *
     * @memberof App
     */
    handleProgress = (state) => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        }
    };

    /**
     * Handles setting the duration of the media file
     *
     * @memberof App
     */
    handleDuration = (duration) => {
        this.setState({ duration });
    };

    handleEnded = () => {
        console.log("onEnded");
        this.setState({ playing: this.state.loop });
    };

    ref = (player) => {
        this.player = player;
    };

    render() {
        // var h = Math.floor(this.state.totalProgress / 3600);
        // var m = Math.floor((this.state.totalProgress % 3600) / 60);
        // var s = Math.floor((this.state.totalProgress % 3600) % 60);

        const title =
            this.state.tracks.length > 0 &&
            this.state.tracks[this.state.currentTrack.index].metadata.hasOwnProperty("tags")
                ? this.state.tracks[this.state.currentTrack.index].metadata.tags.title
                : "";

        const album =
            this.state.tracks.length > 0 &&
            this.state.tracks[this.state.currentTrack.index].metadata.hasOwnProperty("tags")
                ? this.state.tracks[this.state.currentTrack.index].metadata.tags.album
                : "";

        const artist =
            this.state.tracks.length > 0 &&
            this.state.tracks[this.state.currentTrack.index].metadata.hasOwnProperty("tags")
                ? this.state.tracks[this.state.currentTrack.index].metadata.tags.artist
                : "";

        const image =
            this.state.tracks.length > 0 &&
            this.state.tracks[this.state.currentTrack.index].metadata.hasOwnProperty("tags")
                ? this.state.tracks[this.state.currentTrack.index].metadata.tags.hasOwnProperty("picture")
                    ? this._arrayBufferToBase64(this.state.tracks[this.state.currentTrack.index].metadata.tags.picture)
                    : "/images/temp-cover.png"
                : "/images/temp-cover.png";

        return (
            <div className="parent-wrapper">
                <div className="media-player">
                    <div className="media-top">
                        <div className="image-wrapper">
                            <img className="img" alt="logo" src={image} />
                        </div>
                        <div className="player">
                            <ReactPlayer
                                ref={this.ref}
                                height="0px"
                                url={this.state.currentTrack.url}
                                playing={this.state.playing}
                                controls={false}
                                loop={this.state.loop}
                                muted={this.state.muted}
                                volume={this.state.volume}
                                onPlay={this.handlePlay}
                                onPause={this.handlePause}
                                onEnded={this.handleEnded}
                                onSeek={(e) => console.log("onSeek", e)}
                                onProgress={this.handleProgress}
                                onDuration={this.handleDuration}
                                style={{ visibility: "hidden" }}
                            />
                            <div className="media-info">
                                <p>Currently playing - {title}</p>
                                <p>Album - {album}</p>
                                <p>Artist - {artist}</p>
                            </div>
                            <div className="media-buttons">
                                <span className="media-span">
                                    <label htmlFor="volume">Volume</label>
                                    <input
                                        id="volume"
                                        type="range"
                                        min={0}
                                        max={1}
                                        step="any"
                                        value={this.state.volume}
                                        onChange={this.handleVolumeChange}
                                    />
                                </span>
                                <span className="media-span">
                                    <label htmlFor="muted">Muted</label>
                                    <input
                                        id="muted"
                                        type="checkbox"
                                        checked={this.state.muted}
                                        onChange={this.handleToggleMuted}
                                    />
                                </span>
                                <span className="media-span">
                                    <label htmlFor="loop">Loop</label>
                                    <input
                                        id="loop"
                                        type="checkbox"
                                        checked={this.state.loop}
                                        onChange={this.handleToggleLoop}
                                    />
                                </span>
                                <button onClick={() => this.setNewTrack(this.state.currentTrack.index - 1)}>
                                    Previous
                                </button>
                                <button onClick={() => this.handlePlayPause()}>
                                    {this.state.playing ? "Pause" : "Play"}
                                </button>
                                <button onClick={() => this.setNewTrack(this.state.currentTrack.index + 1)}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="media-seek">
                        <Duration seconds={this.state.duration * this.state.played} />
                        <input
                            className="progess-bar"
                            type="range"
                            min={0}
                            max={0.999999}
                            step="any"
                            value={this.state.played}
                            onMouseDown={this.handleSeekMouseDown}
                            onChange={this.handleSeekChange}
                            onMouseUp={this.handleSeekMouseUp}
                        />
                        <Duration seconds={this.state.duration} />
                    </div>
                </div>

                <div className="media-list">
                    {
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tracks.map((track, index) => {
                                    return (
                                        <tr
                                            onClick={() => this.playSong(index)}
                                            key={shortid.generate()}
                                            className={
                                                this.state.currentTrack.index === index
                                                    ? "highlighted-song"
                                                    : "table-hover"
                                            }
                                        >
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {track.metadata.hasOwnProperty("tags") ? track.metadata.tags.title : ""}
                                            </td>
                                            <td>
                                                {track.metadata.hasOwnProperty("tags") ? track.metadata.tags.album : ""}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        );
    }
}

export default App;
