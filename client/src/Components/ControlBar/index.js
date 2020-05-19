import React from "react";
import PropTypes from "prop-types";
import Duration from "../Duration";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlay, faPause, faForward, faBackward, faRedo, faAsterisk, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

function ControlBar(props) {
    const title = props.currentTrack
        ? props.currentTrack.metadata.hasOwnProperty("tags")
            ? props.currentTrack.metadata.tags.title
            : props.currentTrack.filename
        : "";
    const artist = props.currentTrack
        ? props.currentTrack.metadata.hasOwnProperty("tags")
            ? props.currentTrack.metadata.tags.artist
            : ""
        : "";
    const image = props.currentTrack.metadata.hasOwnProperty("tags")
        ? props.currentTrack.metadata.tags.hasOwnProperty("picture")
            ? props._arrayBufferToBase64(props.currentTrack.metadata.tags.picture)
            : "/images/temp-cover.png"
        : "/images/temp-cover.png";
    return (
        <div className="controlbar-wrapper">
            <div className="album-info">
                <img alt="album-cover" src={image} />
                <div className="album-text">
                    <p>{title}</p>
                    <p>{artist}</p>
                </div>
            </div>
            <div className="controls">
                <div className="controls-top">
                    {/* <button onClick={() => props.setNewTrack(props.index - 1)}>Previous</button> */}
                    <FontAwesomeIcon icon={faBackward} onClick={() => props.setNewTrack(props.index - 1)} />
                    <FontAwesomeIcon icon={props.playing ? faPause : faPlay} onClick={() => props.handlePlayPause()} />
                    <FontAwesomeIcon icon={faForward} onClick={() => props.setNewTrack(props.index + 1)} />
                    {/* <button onClick={() => props.handlePlayPause()}>{props.playing ? "Pause" : "Play"}</button> */}
                    {/* <button onClick={() => props.setNewTrack(props.index + 1)}>Next</button> */}
                </div>
                <div className="controls-bottom">
                    <Duration seconds={props.duration * props.played} />
                    <input
                        className="progress-bar"
                        type="range"
                        min={0}
                        max={0.999999}
                        step="any"
                        value={props.played}
                        onMouseDown={props.handleSeekMouseDown}
                        onChange={props.handleSeekChange}
                        onMouseUp={props.handleSeekMouseUp}
                    />
                    <Duration seconds={props.duration} />
                </div>
            </div>
            <div className="controls-right">
                {/* <FontAwesomeIcon style={{marginRight: "5px"}} icon={faCoffee} /> */}
                <FontAwesomeIcon style={{marginRight: "5px"}} onClick={props.handleToggleLoop} icon={props.loop ? faRedo : props.loopAll ? faCoffee : faAsterisk} />
                <FontAwesomeIcon style={{marginRight: "5px"}} onClick={props.handleToggleMuted} icon={props.muted || props.volume === 0 ? faVolumeMute : faVolumeUp} />
                <input
                    id="volume"
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={props.volume}
                    onChange={props.handleVolumeChange}
                />
            </div>
        </div>
    );
}

ControlBar.propTypes = {};

export default ControlBar;
