import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ReactPlayer from "react-player";
import { Progress } from "reactstrap";
require("dotenv").config();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            currentTrack: { data: "", filename: "" },
            currentProgess: 0,
            totalProgress: 0,
        };
    }
    componentDidMount() {
        axios
            .get(
                `${
                    process.env.REACT_APP_STREAM_URL
                }/api/tracks/random?amount=${2}`
            )
            .then((res) => {
                axios
                    .get(
                        `${process.env.REACT_APP_STREAM_URL}/api/tracks/${res.data.songs[0]._id}`,
                        { responseType: "blob" }
                    )
                    .then((res1) => {
                        const url = window.URL.createObjectURL(res1.data);

                        const ct = {
                            data: url,
                            filename: res.data.songs[0].filename,
                        };
                        this.setState(
                            { tracks: res.data.songs, currentTrack: ct },
                            () => {
                                console.log(
                                    "CDM -> state tracks",
                                    this.state.tracks
                                );
                                console.log(
                                    "CDM -> state current track",
                                    this.state.currentTrack.filename
                                );
                            }
                        );
                    });
            });
    }

    setNewTrack = () => {
        let oldTracks = this.state.tracks;
        oldTracks.shift();
        axios
            .get(
                `${
                    process.env.REACT_APP_STREAM_URL
                }/api/tracks/random?amount=${1}`
            )
            .then((res) => {
                axios
                    .get(
                        `${process.env.REACT_APP_STREAM_URL}/api/tracks/${oldTracks[0]._id}`,
                        { responseType: "blob" }
                    )
                    .then((res1) => {
                        const url = window.URL.createObjectURL(res1.data);

                        const newTrack = res.data.songs[0];
                        oldTracks.push(newTrack);

                        const ct = {
                            data: url,
                            filename: oldTracks[0].filename,
                        };
                        this.setState(
                            { tracks: oldTracks, currentTrack: ct },
                            () => {
                                console.log(
                                    "CDM -> state tracks",
                                    this.state.tracks
                                );
                                console.log(
                                    "CDM -> state current track",
                                    this.state.currentTrack.filename
                                );
                            }
                        );
                    });
            });
        // const newTrack = await this.getTracks(1);
        // console.log(newTrack);
    };

    setProgess = (value) => {
        // console.log(value);
        this.setState(
            {
                currentProgess: value.playedSeconds,
                totalProgress: value.loadedSeconds,
            },
            () => {
                // console.log(this.state.currentProgess, this.state.totalProgress)
            }
        );
    };

    render() {
        var h = Math.floor(this.state.totalProgress / 3600);
        var m = Math.floor((this.state.totalProgress % 3600) / 60);
        var s = Math.floor((this.state.totalProgress % 3600) % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "0:0";
        var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "0";

        const dd = hDisplay + mDisplay + sDisplay;

        var h = Math.floor(this.state.currentProgess / 3600);
        var m = Math.floor((this.state.currentProgess % 3600) / 60);
        var s = Math.floor((this.state.currentProgess % 3600) % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "0:0";
        var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "0";

        const dd1 = hDisplay + mDisplay + sDisplay;
        return (
            <div>
                {/* <button onClick={() => this.setNewTrack()}>New Track</button> */}
                <p className="text-center">
                    {this.state.currentTrack.filename}
                </p>
                <div className="text-center">
                    {dd1} - {dd}
                </div>
                {/* <audio controls="controls" src={this.state.currentTrack.data} type="audio/mp3" /> */}
                <ReactPlayer
                    url={this.state.currentTrack.data}
                    playing
                    controls={false}
                    onEnded={this.setNewTrack}
                    height="50px"
                    onProgress={this.setProgess}
                />
                <Progress
                    striped
                    value={this.state.currentProgess}
                    max={this.state.totalProgress}
                />
                {/* <input
                    type="range"
                    min={0}
                    max={this.state.totalProgress}
                    step="any"
                    value={this.state.currentProgess}
                /> */}
            </div>
        );
    }
}

export default App;
