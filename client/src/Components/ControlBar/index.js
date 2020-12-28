import React from "react";
import PropTypes from "prop-types";
import Duration from "../Duration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faPlay,
    faPause,
    faForward,
    faBackward,
    faRedo,
    faAsterisk,
    faVolumeMute,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

function ControlBar(props) {
    const title = props.currentTrack ? props.currentTrack.metadata.common.title : props.currentTrack.filename;
    const artist = props.currentTrack ? props.currentTrack.metadata.common.artist : "Unkown";
    const image = props.currentTrack
        ? props.currentTrack.metadata.common.picture
            ? `data:${props.currentTrack.metadata.common.picture[0].format};base64,${props.currentTrack.metadata.common.picture[0].data.toString('base64')}`
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
                    <FontAwesomeIcon icon={faBackward} onClick={() => props.setNewTrack(props.index - 1)} />
                    <FontAwesomeIcon icon={props.playing ? faPause : faPlay} onClick={() => props.handlePlayPause()} />
                    <FontAwesomeIcon icon={faForward} onClick={() => props.setNewTrack(props.index + 1)} />
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
                <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    onClick={props.handleToggleLoop}
                    icon={props.loop ? faRedo : props.loopAll ? faCoffee : faAsterisk}
                />
                <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    onClick={props.handleToggleMuted}
                    icon={props.muted || props.volume === 0 ? faVolumeMute : faVolumeUp}
                />
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

ControlBar.propTypes = {
    currentTrack: PropTypes.object,
    playing: PropTypes.bool,
    loop: PropTypes.bool,
    loopAll: PropTypes.bool,
    muted: PropTypes.bool,
    handlePlayPause: PropTypes.func,
    handleSeekMouseDown: PropTypes.func,
    handleSeekChange: PropTypes.func,
    handleSeekMouseUp: PropTypes.func,
    handleToggleLoop: PropTypes.func,
    handleToggleMuted: PropTypes.func,
    index: PropTypes.number,
    duration: PropTypes.number,
    played: PropTypes.number,
    volume: PropTypes.number,
};

export default ControlBar;
