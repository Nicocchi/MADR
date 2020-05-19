import React from "react";
import { Route } from "react-router";
import Library from "./Pages/Library";
import shortID from "shortid";

const routes = [
    <Route key={shortID.generate()} exact path="/" />,
    <Route key={shortID.generate()} exact path="/library" component={Library} />,
]
export default routes;