import React from "react";
import { connect } from "react-redux";

function Home(props) {
    return (
        <div className="home-wrapper">
            <h1>Muse</h1>
            <br />
            <p>
                This is the demo site for Muse Audio Player, a Spotify like application built in React. The site is
                currently hosted on{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://www.netlify.com">
                    Netlify
                </a>{" "}
                and the backend server is hosted on{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://heroku.com/">
                    Heroku
                </a>
                .
            </p>
            <p>Songs may take a bit to load due to Heroku's server sleep.</p>
            <p>Features:</p>
            <ul>
                <li>Select Song</li>
                <li>Song plays next available song</li>
                <li>Loop Song, Loop All Songs, No Loop</li>
                <li>Play/Pause</li>
                <li>Volume</li>
                <li>Next/Previous song buttons</li>
                <li>Album Info, including album cover art</li>
                <li>Seeking</li>
            </ul>
            <p>Tech Stack:</p>
            <ul>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org">
                        ReactJS
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://nodejs.org/en/">
                        NodeJS
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://expressjs.com">
                        ExpressJS
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com">
                        MongoDB
                    </a>
                </li>
            </ul>
            <p>
                You can find the source code for the site here:{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/Nicocchi/MADR">
                    Site Code
                </a>
            </p>
            <p>
                You can find the source code for the server here:{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/Nicocchi/MAD">
                    Server Code
                </a>
            </p>
            <br />
            <br />
            <h3>Music Attribution</h3>
            <p>Song: Lost Sky - Need You [NCS Release]</p>
            <p>
                Music provided by{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://ncs.io">
                    NoCopyrightSounds
                </a>
            </p>
            <p>
                Free Download/Stream:{" "}
                <a target="_blank" rel="noopener noreferrer" href="http://ncs.io/NeedYou">
                    http://ncs.io/NeedYou
                </a>
            </p>
            <p>
                Watch:{" "}
                <a target="_blank" rel="noopener noreferrer" href="http://youtu.be/ZpsV5SGa5R4">
                    http://youtu.be/ZpsV5SGa5R4
                </a>
            </p>
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Home);
