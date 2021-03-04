import React, {useEffect} from "react";
import {querySlider, selectNasaSlider} from "../Slice/nasaSlice";
import {useDispatch, useSelector} from "react-redux";

export const NasaCaroussel = () => {

    // ---- liste des photos et récupération du dispatch
    const photos = useSelector(selectNasaSlider);
    const dispatch = useDispatch();
    // ----

    // ---- effectuer useEffect une seul fois grâce au [] et appel de la query
    useEffect(() => {
        dispatch(
            querySlider()
        );
    },[dispatch] );
    // ----

    // ---- mise en place des images du slider
    let first = true;
    const renderedPhotos = photos.map(photo => {
        let className = "carousel-item";
        if (first) {
            className+= " active"
            first=!first
        }
        return (
            <div className={className} key={photo.id}>
                <img src={photo.img_src} className="d-block w-100 img-carousel border border-white rounded" alt={photo.id}/>
            </div>
        );
    })
    // ----

    return(
        <div className={"col-12 d-flex justify-content-center mt-3"}>
            <div id="carousel" className="carousel carousel-dark slide w-100" data-ride="carousel">
                <div className="carousel-inner">
                    {renderedPhotos}
                </div>
                <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Back</span>
                </a>
                <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span className="visually-hidden">Next</span>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>
        </div>
    )
}


