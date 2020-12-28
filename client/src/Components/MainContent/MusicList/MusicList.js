import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import shortid from "shortid";
import Duration from "../../Duration";

class MusicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevIndex: 0,
            hoverIndex: -1,
        };
    }

    onMouseEnter = (i) => {
        this.setState({ prevIndex: this.state.hoverIndex, hoverIndex: i })
    }

    onMouseLeave = (i) => {
        this.setState({ hoverIndex: -1 })
    }

    render() {
        if (this.props.tracks.length < 1 || !this.props.tracks) return <div></div>;
        // const title = track.metadata.common.title ? track.metadata.common.title : track.filename;
        // const duration = track.metadata.format ? track.metadata.format.duration : '0:00';
        // console.log(duration);

        return (
            <div>
                <ListGroup className="list-container" style={{paddingBottom: "40px"}}>
                    {this.props.tracks.map((track, index) => (
                        <ListGroupItem
                            key={shortid.generate()}
                            // active={this.props.index === index ? true : false}
                            className="list-item"
                            onMouseEnter={() => this.onMouseEnter(index)}
                            onMouseLeave={() => this.onMouseLeave(index)}
                            style={{
                                cursor: "pointer",
                                border: "none",
                                background: this.state.hoverIndex === index ? "#0b132b" : "#1c2541",
                                color: this.props.index === index ? "#19A660" : "#3a506b",
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                            onClick={() => this.props.playSong(index)}
                        >
                            {track.metadata.common.title ? track.metadata.common.title : track.filename}
                            <Duration seconds={track.metadata.format ? track.metadata.format.duration : 0} />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

MusicList.propTypes = {
    tracks: PropTypes.array,
    index: PropTypes.number,
};

export default MusicList;
