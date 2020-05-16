import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ReactPlayer from "react-player";
import { Progress } from "reactstrap";
import jsmediatags from "jsmediatags";
require("dotenv").config();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            currentTrack: { data: "", filename: "", blob: "", id3: '' },
            currentProgess: 0,
            totalProgress: 0,
            image: '',
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
                            blob: res1.data,
                            id3: '',
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
                            blob: res1.data,
                            id3: '',
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

    _arrayBufferToBase64 = ( buffer ) => {
        // var binary = '';
        // var bytes = new Uint8Array( buffer );
        // var len = bytes.byteLength;
        // for (var i = 0; i < len; i++) {
        //     binary += String.fromCharCode( bytes[ i ] );
        // }
        let base64String = '';
        for (let i = 0; i < buffer.data.length; i++) {
            base64String += String.fromCharCode(buffer.data[i]);
        }
        // this.setState({ image: `data:${buffer.format};base64${window.btoa(base64String)}` })
        return `data:${buffer.format};base64,${window.btoa(base64String)}`
        // return `;base64,${window.btoa( binary )}`;
    }

    getTags = (url) => {      
        return new Promise((resolve, reject) => {
            new jsmediatags.Reader(url)
              .read({
                onSuccess: (tag) => {                
                //   resolve( this._arrayBufferToBase64(tag.tags.picture["data"]));
                    resolve(tag)
                },
                onError: (error) => {                
                  reject(error);
                }
              });
          });
      }

    readID3 = async () => {
        if (this.state.currentTrack.id3 !== '') return;
        if (this.state.currentTrack.blob !== "") {
            this.getTags(this.state.currentTrack.blob).then(res => {
                const ct = {
                    ...this.state.currentTrack,
                    id3: res
                };

                console.log(ct);
                const image = this._arrayBufferToBase64(res.tags.picture)
                console.log("image", image)

                this.setState({ currentTrack: ct, image });
            })
        }
    }

    render() {
        this.readID3();
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
                <button onClick={() => this.setNewTrack()}>New Track</button>
                <p className="text-center">
                    {this.state.currentTrack.filename}
                </p>
                <div className="text-center">
                    {dd1} - {dd}
                </div>
                <div className="image-wrapper">
                    <img className="img" alt="logo" src={this.state.image} />
                </div>
                <ReactPlayer
                    url={this.state.currentTrack.data}
                    playing
                    controls={false}
                    onEnded={this.setNewTrack}
                    height="0px"
                    onProgress={this.setProgess}
                    style={{visibility: 'hidden'}}
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
