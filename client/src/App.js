import React, { PureComponent } from "react";
import routes from "./routes";
import { withRouter, Switch } from "react-router-dom";
import {
    getLibrary,
    playSong,
    handlePlay,
    handlePlayPause,
    handleProgress,
    handleDuration,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleVolumeChange,
    handleToggleLoop,
    handleToggleMuted,
} from "./Store/actions";
import { connect } from "react-redux";
import "./App.scss";
import ReactPlayer from "react-player";
import ControlBar from "./Components/ControlBar";
import Navigation from "./Components/Navigation";

class App extends PureComponent {
    componentDidMount() {
        this.props.getLibrary();
    }

    /**
     * Convert's an Array Buffer to Base64 String
     */
    _arrayBufferToBase64 = (buffer) => {
        console.log("BUFFER", buffer)
        let base64String = "";
        for (let i = 0; i < buffer.data.length; i++) {
            base64String += String.fromCharCode(buffer.data[i]);
        }

        console.log(`data:${buffer.format};base64,${window.btoa(base64String)}`)

        return `data:${buffer.format};base64,${window.btoa(base64String)}`;
    };

    handleToggleLoop = () => {
        const index = this.state.loopIndex + 1;
        if (index >= 3) {
            this.setState({ loop: false, loopIndex: 0, loopAll: false }, () =>
                console.log("NO LOOP", this.state.loopIndex)
            );
        } else if (index === 2) {
            this.setState({ loop: false, loopIndex: index, loopAll: true }, () =>
                console.log("LOOP ALL", this.state.loopIndex)
            );
            return;
        } else if (index === 1) {
            this.setState({ loop: true, loopIndex: index, loopAll: false }, () =>
                console.log("LOOP", this.state.loopIndex)
            );
            return;
        } else if (index === 0) {
            this.setState({ loop: false, loopIndex: index, loopAll: false }, () =>
                console.log("NO LOOP", this.state.loopIndex)
            );
        }
    };

    /**
     * Handle seeking mouse up event
     *
     * @memberof App
     */
    handleSeekMouseUp = (e) => {
        this.player.seekTo(parseFloat(e.target.value));
        this.props.handleSeekMouseUp();
    };

    handleEnded = () => {
        console.log("handleEnded", this.state);
        if (this.props.library.loopAll) {
            console.log("HE LOOPALL");
            if (this.props.library.tracks[this.props.library.currentTrack.index + 1]) {
                this.props.playSong(this.props.library.currentTrack.index + 1);
            } else {
                this.props.playSong(0);
            }
            return;
        }
        if (!this.props.library.loop) {
            this.props.playSong(this.props.library.currentTrack.index + 1);
            return;
        } else if (!this.props.library.loopAll) {
            this.props.playSong(this.props.library.currentTrack.index + 1);
            return;
        }

        this.props.handlePlay();
    };

    ref = (player) => {
        this.player = player;
    };

    render() {
        const currentTrack = this.props.library.tracks[this.props.library.currentTrack.index]
            ? this.props.library.tracks[this.props.library.currentTrack.index]
            : this.props.library.currentTrack;

        return (
            <div className="wrapper">
                <ReactPlayer
                    ref={this.ref}
                    height="0px"
                    url={this.props.library.currentTrack.url}
                    playing={this.props.library.playing}
                    controls={false}
                    loop={this.props.library.loop}
                    muted={this.props.library.muted}
                    volume={this.props.library.volume}
                    onEnded={this.handleEnded}
                    onProgress={this.props.handleProgress}
                    onDuration={this.props.handleDuration}
                    style={{ visibility: "hidden" }}
                />
                <div className="main-container">
                    <Navigation />
                    <div className="main-content">
                        <Switch>{routes}</Switch>
                    </div>
                </div>

                <ControlBar
                    played={this.props.library.played}
                    playing={this.props.library.playing}
                    volume={this.props.library.volume}
                    loop={this.props.library.loop}
                    loopAll={this.props.library.loopAll}
                    muted={this.props.library.muted}
                    index={this.props.library.currentTrack.index}
                    duration={this.props.library.duration}
                    currentTrack={currentTrack}
                    handleSeekMouseDown={this.props.handleSeekMouseDown}
                    handleSeekChange={this.props.handleSeekChange}
                    handleSeekMouseUp={this.handleSeekMouseUp}
                    handlePlayPause={this.props.handlePlayPause}
                    handleVolumeChange={this.props.handleVolumeChange}
                    handleToggleMuted={this.props.handleToggleMuted}
                    handleToggleLoop={this.props.handleToggleLoop}
                    _arrayBufferToBase64={this._arrayBufferToBase64}
                    setNewTrack={this.props.playSong}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        library: state.library,
    };
}

export default connect(mapStateToProps, {
    getLibrary,
    playSong,
    handlePlay,
    handlePlayPause,
    handleProgress,
    handleDuration,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleVolumeChange,
    handleToggleLoop,
    handleToggleMuted,
})(withRouter(App));
