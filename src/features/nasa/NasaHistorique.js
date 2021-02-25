import React from "react";
import {useSelector} from "react-redux";
import {selectNasaHistorique} from "./nasaSlice";

export const NasaHistorique = () => {

    // ---- récupération de l'historique
    const historique = useSelector(selectNasaHistorique);
    // ----
    return(
        <div className="col-12 d-flex flex-column">
            <h1 className={"text-white"}>Historique</h1>
            <ul className="list-group">
                {
                    historique.map(query => {
                        return(
                            <li className="list-group-item d-flex justify-content-between">
                                <span>{query.rover}, {query.camera}</span>
                            </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}
