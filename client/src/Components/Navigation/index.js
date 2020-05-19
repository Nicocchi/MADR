import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const styles = {
    border: "none",
    backgroundColor: "#0b132b",
    cursor: "pointer",
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevIndex: 0,
            hoverIndex: 3,
        };
    }

    onMouseEnter = (i) => {
        this.setState({ prevIndex: this.state.hoverIndex, hoverIndex: i });
    };

    onMouseLeave = (i) => {
        this.setState({ hoverIndex: 3 });
    };

    render() {
        return (
            <div className="navbar-wrapper">
                <div className="navbar-logo">
                    <img alt="muse-logo" src="/images/MuseLogo.png" />
                </div>
                <ListGroup className="list-container">
                    <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
                        <ListGroupItem
                            className="list-item"
                            active={true}
                            style={{ ...styles, backgroundColor: this.state.hoverIndex === 0 ? "#3a506b" : "#0b132b" }}
                            onMouseEnter={() => this.onMouseEnter(0)}
                            onMouseLeave={() => this.onMouseLeave(0)}
                        >
                            Home
                        </ListGroupItem>
                    </NavLink>
                    <ListGroupItem
                        className="list-item"
                        style={{ ...styles, backgroundColor: this.state.hoverIndex === 1 ? "#3a506b" : "#0b132b" }}
                        onMouseEnter={() => this.onMouseEnter(1)}
                        onMouseLeave={() => this.onMouseLeave(1)}
                    >
                        Search
                    </ListGroupItem>
                    <NavLink to="/library" style={{ textDecoration: "none", color: "white" }}>
                        <ListGroupItem
                            className="list-item"
                            style={{ ...styles, backgroundColor: this.state.hoverIndex === 2 ? "#3a506b" : "#0b132b" }}
                            onMouseEnter={() => this.onMouseEnter(2)}
                            onMouseLeave={() => this.onMouseLeave(2)}
                        >
                            Your Library
                        </ListGroupItem>
                    </NavLink>
                </ListGroup>
                <div className="navbar-playlists">
                    <h4>Playlists</h4>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;
