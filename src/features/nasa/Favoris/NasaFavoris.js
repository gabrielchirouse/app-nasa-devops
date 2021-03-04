import React, {useState} from "react";
import {NasaInfo} from "../Info/NasaInfo";
import {useSelector} from "react-redux";
import {selectNasaFavoris} from "../Slice/nasaSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/fontawesome-free-solid";

export const NasaFavoris = () => {

    // ---- récupération des favoris
    let favoris = useSelector(selectNasaFavoris);
    // ----

    // ---- gestion du filtrage des favoris
    const [value, setValue] = useState("");
    const handleFiltre = (e) => {
        setValue(e.target.value);
    };
    // ----

    return (
            <div className={"col-12 mt-3"}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={IconSolid.faSearch}/>
                    </span>
                    <input type="text" className="form-control" onChange={(e)=> handleFiltre(e)} placeholder="camera ou rover.." aria-label="camera"/>
                </div>
                <div className="row">
                    {
                        favoris.filter(favori =>
                            favori.rover.name.toUpperCase().includes(value.toUpperCase()) ||
                            favori.camera.name.toUpperCase().includes(value.toUpperCase()))
                            .map(favori => {
                            return <NasaInfo photo={favori} isFavoris={true} key={favori.id} class={"mt-3"}/>;
                        } )
                    }
                </div>
            </div>
    )
}
