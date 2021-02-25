import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {nasaHistorique,queryIndex, selectNasaQuery} from "./nasaSlice";


export const NasaSearch = () => {
    // ---- récupération du dispatch et des paramètres de la dernière requête
    const dispatch = useDispatch();
    const query = useSelector(selectNasaQuery);
    // ----

    // ---- changement du rover
    const updateQuery = {
        camera: query.camera,
        rover: query.rover,
        page: 1
    };
    const handleRover = (item) => {
        updateQuery.rover = item.target.value;
        dispatch(
            queryIndex(updateQuery)
        );
        dispatch(
            nasaHistorique({
                historique:updateQuery
            })
        );
    };
    // ----

    // ---- changement de camera
    const handleCamera = (item) => {
        updateQuery.camera = item.target.value;
        dispatch(
            queryIndex(updateQuery)
        );
        dispatch(
            nasaHistorique({
                historique:updateQuery
            })
        );
    };
    // ----

    return(
        <div className={"col-12 d-flex justify-content-around mt-5"}>
           <div className={"input-group d-flex justify-content-center"}>
               <label className={" input-group-text bg-dark text-white"}>rover :</label>
               <select defaultValue={query.rover} onChange={(item)=> handleRover(item)} className="form-select form-select-lg" aria-label="Default select example">
                   <option value="curiosity">Curiosity</option>
                   <option value="opportunity">Opportunity</option>
                   <option value="spirit">Spirit</option>
               </select>
           </div>
            <div className={"input-group d-flex justify-content-center"}>
                <label className={"input-group-text bg-dark text-white"}>camera :</label>
                <select defaultValue={query.camera}  onChange={(item)=> handleCamera(item)} className="form-select form-select-lg" aria-label="Default select example">
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="MAST">Mast Camera</option>
                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                    <option value="MAHLI">Mars Hand Lens Imager</option>
                    <option value="MARDI">Mars Descent Imager</option>
                    <option value="NAVCAM">Navigation Camera</option>
                    <option value="PANCAM">Panoramic Camera</option>
                    <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
                </select>
            </div>
        </div>
    )
}
