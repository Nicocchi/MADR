import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import shortid from "shortid";

class MusicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevIndex: 0,
            hoverIndex: 0,
        };
    }

    onMouseEnter = (i) => {
        this.setState({ prevIndex: this.state.hoverIndex, hoverIndex: i })
    }

    onMouseLeave = (i) => {
        this.setState({ hoverIndex: this.props.index })
    }

    render() {
        if (this.props.tracks.length < 1 || !this.props.tracks) return <div></div>;

        return (
            <div>
                <ListGroup className="list-container">
                    {this.props.tracks.map((track, index) => (
                        <ListGroupItem
                            key={shortid.generate()}
                            active={this.props.index === index ? true : false}
                            className="list-item"
                            onMouseEnter={() => this.onMouseEnter(index)}
                            onMouseLeave={() => this.onMouseLeave(index)}
                            style={{
                                cursor: "pointer",
                                border: "none",
                                background: this.state.hoverIndex === index ? "#0b132b" : "#1c2541" || this.props.index === index ? "#1c2541" : "#0b132b",
                                color: this.props.index === index ? "#5bc0be" : "#3a506b",
                            }}
                            onClick={() => this.props.playSong(index)}
                        >
                            {track.metadata.tags.title ? track.metadata.tags.title : track.filename}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

MusicList.propTypes = {};

export default MusicList;
