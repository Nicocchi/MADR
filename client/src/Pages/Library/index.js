import React from "react";
import PropTypes from "prop-types";
import { playSong } from "../../Store/actions";
import { connect } from "react-redux";
import TopNavbar from "../../Components/Navigation/TopNavbar";
import MusicList from "../../Components/MainContent/MusicList/MusicList";

function Library(props) {
    return (
        <div>
            <TopNavbar />
            <div className="header-content">
                <img atl="playlist logo" src="/images/temp-cover.png" alt="album cover" />
                <div className="header-text">
                    <h2>Your Library</h2>
                </div>
            </div>
            <MusicList 
            tracks={props.library.tracks} 
            playSong={props.playSong} 
            index={props.library.currentTrack.index} />
        </div>
    );
}

Library.propTypes = {
    library: PropTypes.object
};

function mapStateToProps(state) {
    return {
        library: state.library
    };
}

export default connect(mapStateToProps, {
    playSong
})(Library);