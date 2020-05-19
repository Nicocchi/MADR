import React, { PureComponent } from "react";
import axios from "axios";
import "./App.scss";
import ReactPlayer from "react-player";
import ControlBar from "./Components/ControlBar";
import Navigation from "./Components/Navigation";
import MusicList from "./Components/MainContent/MusicList/MusicList";
import TopNavbar from "./Components/Navigation/TopNavbar";
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
            volume: 1,
            loop: false,
            loopAll: false,
            loopIndex: 0,
            muted: false,
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_STREAM_URL}/api/tracks/`).then((res) => {
            this.setState({
                tracks: res.data.songs,
            }, () => console.log("NO LOOP", this.state.loopIndex));
        });
    }

    /**
     * Set's the new track index
     */
    setNewTrack = (index) => {
        this.playSong(index)
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
        const index = this.state.loopIndex + 1;
        if (index >= 3) {
            this.setState({ loop: false, loopIndex: 0, loopAll: false }, () => console.log("NO LOOP", this.state.loopIndex));
        }
        else if (index === 2) {
            this.setState({ loop: false, loopIndex: index, loopAll: true }, () => console.log("LOOP ALL", this.state.loopIndex));
            return;
        } else if (index === 1) {
            this.setState({ loop: true, loopIndex: index, loopAll: false }, () => console.log("LOOP", this.state.loopIndex));
            return;
        } else if (index === 0) {
            this.setState({ loop: false, loopIndex: index, loopAll: false }, () => console.log("NO LOOP", this.state.loopIndex));
        }
    };

    handleToggleLoopAll = () => {
        this.setState({ loop: false, loopAll: !this.state.loopAll, loopIndex: 0 }, () => console.log(this.state.loopIndex));
    };

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    };

    handlePause = () => {
        this.setState({ playing: false });
    };

    handlePlay = () => {
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
        console.log("handleEnded", this.state)
        if (this.state.loopAll) {
            console.log("HE LOOPALL")
            if (this.state.tracks[this.state.currentTrack.index + 1]) {
                this.playSong(this.state.currentTrack.index + 1);
            } else {
                this.playSong(0);
            }
            return;
        }
        if (!this.state.loop) {
            this.playSong(this.state.currentTrack.index + 1);
            return;
        } else if (!this.state.loopAll) {
            this.playSong(this.state.currentTrack.index + 1);
            return;
        }

        this.setState({ playing: this.state.loop });
    };

    ref = (player) => {
        this.player = player;
    };

    render() {
        const currentTrack = this.state.tracks[this.state.currentTrack.index]
            ? this.state.tracks[this.state.currentTrack.index]
            : this.state.currentTrack;
        return (
            <div className="wrapper">
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
                <div className="main-container">
                    <Navigation />
                    <div className="main-content">
                        <TopNavbar />
                        <div className="header-content">

                        </div>
                        <MusicList
                            tracks={this.state.tracks}
                            playSong={this.playSong}
                            index={this.state.currentTrack.index}
                        />
                    </div>
                </div>

                <ControlBar
                    played={this.state.played}
                    playing={this.state.playing}
                    volume={this.state.volume}
                    loop={this.state.loop}
                    loopAll={this.state.loopAll}
                    muted={this.state.muted}
                    index={this.state.currentTrack.index}
                    duration={this.state.duration}
                    currentTrack={currentTrack}
                    handleSeekMouseDown={this.handleSeekMouseDown}
                    handleSeekChange={this.handleSeekChange}
                    handleSeekMouseUp={this.handleSeekMouseUp}
                    handlePlayPause={this.handlePlayPause}
                    handleVolumeChange={this.handleVolumeChange}
                    handleToggleMuted={this.handleToggleMuted}
                    handleToggleLoop={this.handleToggleLoop}
                    handleToggleLoopAll={this.handleToggleLoopAll}
                    _arrayBufferToBase64={this._arrayBufferToBase64}
                    setNewTrack={this.setNewTrack}
                />
            </div>
        );
    }
}

export default App;
