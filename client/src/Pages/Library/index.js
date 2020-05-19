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
            <div className="header-content"></div>
            <MusicList 
            tracks={props.library.tracks} 
            playSong={props.playSong} 
            index={props.library.currentTrack.index} />
        </div>
    );
}

Library.propTypes = {};

function mapStateToProps(state) {
    return {
        library: state.library
    };
}

export default connect(mapStateToProps, {
    playSong
})(Library);