import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";
import {NasaList} from "../List/NasaList";
import {NasaCaroussel} from "../Caroussel/NasaCaroussel";
import {NasaFavoris} from "../Favoris/NasaFavoris";
import {NasaSearch} from "../Search/NasaSearch";
import {NasaHistorique} from "../Historique/NasaHistorique";

export const NasaNavBar = () => {

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
                                <Link className="nav-link" to="/" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoris">Favoris</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/historique">Historique</Link>
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
                            <NasaSearch />
                            <NasaList/>
                        </Route>
                        <Route exact path="/favoris">
                            <NasaFavoris />
                        </Route>
                        <Route exact path="/historique">
                            <NasaHistorique />
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

// ---- route 404
const NoMatch = () => {
    let location = useLocation();
    return (
        <div className={"col-12"}>
            <div className="d-flex text-center align-items-center justify-content-center">
                <h3 className={'text-white'}>
                    Oups Error 404 no match for <code>{location.pathname}</code>.
                </h3>
            </div>
            <div className="text-center">
                <img src="/alien-vert.jpg" alt={"coffee.png"}/>
            </div>
        </div>
    );
}
// ----
