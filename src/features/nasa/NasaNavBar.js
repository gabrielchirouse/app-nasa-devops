import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";
import {NasaList} from "./NasaList";
import {NasaCaroussel} from "./NasaCaroussel";
import {NasaFavoris} from "./NasaFavoris";
import $ from "jquery";

export const NasaNavBar = () => {

    const handleActive = (item) => {
        console.log(item.toString()+"A")
        $(".nav-item").removeClass("active")
    }
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => handleActive.bind(this)}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoris">Favoris</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <Switch>
                        <Route exact path="/">
                            <NasaCaroussel />
                            <NasaList/>
                        </Route>
                        <Route exact path="/favoris">
                            <NasaFavoris />
                        </Route>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

const NoMatch = () => {
    let location = useLocation();
    return (
        <div className={"col-12"}>
            <div className="d-flex text-center align-items-center justify-content-center">
                <img width="50" height="50" src="https://img.icons8.com/ios/452/alien.png" alt={"Alien.png"}/>
                <h3>
                    Oups Error 404 no match for <code>{location.pathname}</code>.
                </h3>
            </div>
            <div className="text-center">
                <img width="150" height="200" src="https://c.tenor.com/O7kYXW3ag-oAAAAj/coffee-lover-hot-coffee.gif" alt={"coffee.png"}/>
            </div>
        </div>
    );
}
